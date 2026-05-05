# Alkourabi Law Firm — Website

Bilingual (4-language) marketing site for **Alkourabi Law Firm & Legal Consultancy**, a Damascus-based legal practice founded by Attorney Ahmad Alkourabi in 2018.

Live locales: English · Deutsch · Türkçe · العربية

Built with Next.js 14 (App Router, static export), Tailwind CSS, next-intl, and Framer Motion. Deployed to Hostinger.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run validate-data
npm run type-check
npm run build        # produces out/
```

## Project layout

- `app/` — Next.js App Router. The `[locale]` segment serves all four locales.
- `components/` — UI primitives, layout chrome (TopNav, Footer, LanguagePicker), homepage sections, lawyer page sections, cards, icons.
- `data/` — single source of truth: `firm.ts`, `departments.ts`, `lawyers.ts`, `clients.ts`, `types.ts`. Each translatable field is a `Localized` (`Record<Locale, string>`) object.
- `i18n/` — next-intl routing config and `messages/{en,de,tr,ar}.json` translation files.
- `lib/` — fonts (Tajawal / Cormorant Garamond / Inter via `next/font`) and SEO helpers.
- `public/` — static assets (images, `contact.php`, `index.html` splash redirect).
- `scripts/validate-data.ts` — Zod-validated cross-reference check.
- `docs/superpowers/` — design spec and implementation plan.
- `source-assets/` — original PDFs, logo image, hero image (kept for reference; not deployed).

See [DEPLOY.md](./DEPLOY.md) for deployment instructions.

## Adding a lawyer (later)

1. Edit `data/lawyers.ts` and add a new entry with translations in all 4 locales.
2. Optionally update `data/departments.ts` to set `leadLawyerSlug` to the new lawyer for one or more departments.
3. Run `npm run build`. The site auto-generates `/{locale}/lawyer/{slug}/` for all 4 locales.
4. Re-deploy.

## Translation review

The German and Turkish translations were produced as best-effort by AI. The data files (`departments.ts`, `lawyers.ts`) and message files (`de.json`, `tr.json`) include `REVIEW PENDING` flags. Have a native German speaker and a native Turkish speaker review before public launch — for a law firm, wording precision matters.
