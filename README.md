# Bonlife Oil Website

Marketing site and lead-capture forms for Bonlife Oil (bonlifeoil.info), a vegetable oil and
foodservice products distributor in the Dominican Republic.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (leads, referrals, blog content, edge functions)
- Deployed on Vercel, auto-deploys on push to `main`

## Local development

```sh
npm install
npm run dev
```

## Supabase

The `supabase/` directory holds migrations and edge functions for the project's backend
(lead capture, SEO blog automation, sitemap generation, lead email notifications). See
`supabase/config.toml` for the linked project ref.
