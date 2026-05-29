import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * POST /api/track
 * Sends a visitor notification to Telegram. The bot token lives only in
 * server-side env vars (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID) and is never
 * exposed to the browser. Geolocation comes from Vercel's edge headers, so no
 * third-party IP-geo service is needed.
 *
 * The client sends device/browser/OS/referrer (things only the browser knows);
 * the server fills in IP, geo, and timestamp.
 */

function firstHeader(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

function mdEscape(s: string): string {
  // Escape characters that would break Telegram "Markdown" (legacy) parsing.
  return s.replace(/([_*`\[])/g, '\\$1');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    // Misconfiguration: don't leak details, don't break the client.
    console.error('Telegram env vars not set');
    return res.status(204).end();
  }

  let body: { device?: string; browser?: string; os?: string; referrer?: string; path?: string } = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    body = {};
  }

  const device = (body.device || 'Unknown').slice(0, 40);
  const browser = (body.browser || 'Unknown').slice(0, 40);
  const os = (body.os || 'Unknown').slice(0, 40);
  const referrer = (body.referrer || 'Direct').slice(0, 200);
  const path = (body.path || '/').slice(0, 200);

  // Real client IP (x-forwarded-for is a comma-separated list; first is client).
  const xff = firstHeader(req.headers['x-forwarded-for']);
  const ip = (xff.split(',')[0] || firstHeader(req.headers['x-real-ip']) || 'Unknown').trim();

  // Vercel edge geolocation headers (URL-encoded for city/region).
  const country = firstHeader(req.headers['x-vercel-ip-country']) || 'Unknown';
  const region = decodeURIComponent(firstHeader(req.headers['x-vercel-ip-country-region']) || '') || 'Unknown';
  const city = decodeURIComponent(firstHeader(req.headers['x-vercel-ip-city']) || '') || 'Unknown';
  const tz = firstHeader(req.headers['x-vercel-ip-timezone']) || 'America/Chicago';

  let timestamp: string;
  try {
    timestamp = new Date().toLocaleString('en-US', { timeZone: tz });
  } catch {
    timestamp = new Date().toISOString();
  }

  const message =
    `🚀 *New Embedded Portfolio Visitor!*\n\n` +
    `🌐 *IP:* \`${mdEscape(ip)}\`\n` +
    `📍 *Location:* ${mdEscape(`${city}, ${region}, ${country}`)}\n` +
    `📱 *Device:* ${mdEscape(device)}\n` +
    `🖥 *Browser:* ${mdEscape(browser)}\n` +
    `💻 *OS:* ${mdEscape(os)}\n` +
    `🔗 *Referrer:* ${mdEscape(referrer)}\n` +
    `📄 *Path:* ${mdEscape(path)}\n` +
    `🕒 *Time:* ${mdEscape(timestamp)} (${mdEscape(tz)})`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
    });
  } catch (err) {
    console.error('Telegram send failed:', err);
  }

  // Always succeed to the client — tracking must never affect the page.
  return res.status(204).end();
}
