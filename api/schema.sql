-- Schema for the portfolio contact form (Neon Postgres).
-- Run once against your Neon database:
--   psql "$DATABASE_URL" -f api/schema.sql
-- or paste into the Neon SQL Editor.

CREATE TABLE IF NOT EXISTS contacts (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text        NOT NULL,
  email      text        NOT NULL UNIQUE,
  message    text,
  source     text        NOT NULL DEFAULT 'portfolio-contact',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
