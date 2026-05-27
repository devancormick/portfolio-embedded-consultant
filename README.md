# Embedded Consultant Portfolio

A single-page portfolio for an embedded-systems / firmware consultant, built with
**Vite + React + TypeScript + Tailwind + shadcn/ui**. The contact form persists
inquiries to **Neon Postgres** through a Vercel Serverless Function, and the whole
project deploys to **Vercel**.

## Architecture

| Layer    | Tech                                                      |
| -------- | --------------------------------------------------------- |
| Frontend | Vite SPA (`src/`), output to `dist/`                      |
| API      | Vercel Serverless Function — [api/contact.ts](api/contact.ts) |
| Database | Neon Postgres (`contacts` table)                          |
| Hosting  | Vercel (static SPA + `/api` functions)                    |

The contact form (`src/components/portfolio/Contact.tsx`) POSTs to `/api/contact`,
which validates the payload and upserts a row into the `contacts` table.

## Local development

```bash
npm install
```

### 1. Provision a Neon database

Create a database at <https://neon.tech> (or via the Neon integration on Vercel),
then create the table:

```bash
psql "$DATABASE_URL" -f api/schema.sql
```

(or paste the contents of [api/schema.sql](api/schema.sql) into the Neon SQL Editor).

### 2. Configure the environment

```bash
cp .env.example .env
# edit .env and paste your Neon pooled connection string into DATABASE_URL
```

### 3. Run locally

Running the SPA **and** the serverless function together requires the Vercel CLI
(plain `vite` will not serve `/api`):

```bash
npm i -g vercel        # once
vercel dev             # serves the SPA + /api/contact on http://localhost:3000
```

For frontend-only work (no API), `npm run dev` runs the Vite dev server on :8080.

## Deploying to Vercel

1. **Push this repo to GitHub** and import it at <https://vercel.com/new>, or run
   `vercel` from the project root. The framework is auto-detected as Vite.
2. **Add the Neon integration** (Vercel dashboard → your project → Storage → Neon)
   *or* add the `DATABASE_URL` environment variable manually:
   ```bash
   vercel env add DATABASE_URL production
   ```
   The Neon integration sets `DATABASE_URL` automatically for all environments.
3. **Create the table** in the Neon database (step 1 above) if you haven't already.
4. **Deploy:**
   ```bash
   vercel --prod
   ```

That's it. `vercel.json` configures the Vite build, the `dist` output directory,
and an SPA rewrite that leaves `/api/*` routes untouched.

## Viewing submissions

```bash
psql "$DATABASE_URL" -c "SELECT name, email, message, created_at FROM contacts ORDER BY created_at DESC;"
```
