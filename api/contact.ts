import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Lead {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mdEscape(s: string): string {
  return s.replace(/([_*`\[])/g, '\\$1');
}

/** Send the lead as an email via Brevo transactional email HTTP API. */
async function sendLeadEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.LEAD_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || to;
  if (!apiKey || !to || !from) {
    console.error('Brevo env not set (BREVO_API_KEY / LEAD_EMAIL)');
    return;
  }

  const html =
    `<h2>New Contact Form Submission</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>` +
    `<p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>` +
    `<p><strong>Message:</strong></p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(lead.message || '(no message)')}</p>`;

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: from, name: 'Portfolio Contact' },
        to: [{ email: to }],
        replyTo: { email: lead.email, name: lead.name },
        subject: `New portfolio lead: ${lead.name}`,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      console.error('Brevo send failed:', res.status, await res.text().catch(() => ''));
    }
  } catch (err) {
    console.error('Brevo request error:', err);
  }
}

/** Send the lead as a Telegram message (reuses the visitor-alert bot). */
async function sendLeadTelegram(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text =
    `📬 *New Contact Form Submission!*\n\n` +
    `👤 *Name:* ${mdEscape(lead.name)}\n` +
    `📧 *Email:* ${mdEscape(lead.email)}\n` +
    `📝 *Message:* ${mdEscape(lead.message || '(no message)')}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    });
  } catch (err) {
    console.error('Telegram lead send failed:', err);
  }
}

/**
 * POST /api/contact
 * Persists a contact / project inquiry to Neon Postgres, then sends
 * best-effort email (Brevo) + Telegram notifications.
 * Body: { name: string; email: string; message?: string }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set');
    return res.status(500).json({ error: 'Server is not configured' });
  }

  // req.body may arrive as a string depending on content-type.
  let body: { name?: string; email?: string; message?: string } = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {});
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const message = (body.message ?? '').trim();

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long' });
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      INSERT INTO contacts (name, email, message, source)
      VALUES (${name}, ${email}, ${message || null}, 'portfolio-contact')
      ON CONFLICT (email) DO UPDATE
        SET name       = EXCLUDED.name,
            message    = EXCLUDED.message,
            updated_at = now()
    `;

    // Best-effort notifications — DB write above is the source of truth, so a
    // failed email/Telegram send must not fail the request.
    await Promise.allSettled([
      sendLeadEmail({ name, email, message }),
      sendLeadTelegram({ name, email, message }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to save contact:', err);
    return res.status(500).json({ error: 'Failed to save your message' });
  }
}
