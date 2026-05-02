import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/contact
 * Persists a contact / project inquiry to Neon Postgres.
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
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Failed to save contact:', err);
    return res.status(500).json({ error: 'Failed to save your message' });
  }
}
