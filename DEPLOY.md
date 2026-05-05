# Deploying to Hostinger

This site is a Next.js static export. The build produces a folder of static files (`out/`) plus a single PHP file (`contact.php`) for the contact form. Both deploy to a Hostinger shared/business plan via the File Manager or FTP.

## Locales

The site is published in **four** UI locales:

- `/en/` — English (fallback)
- `/de/` — German
- `/tr/` — Turkish
- `/ar/` — Arabic (RTL)

The root URL `/` serves a small splash that detects the visitor's preferred language via:
1. A `preferred_locale` cookie (if previously set).
2. `navigator.language` (browser).
3. A free geo-IP lookup (`ipapi.co/json/`) with a 2-second timeout.
4. Falls back to `/en/`.

Once detected, the choice is cookied for one year and the user is redirected to the matched locale. The 4-way language picker in the nav allows manual override.

## One-time setup

1. Log into your Hostinger control panel (hPanel).
2. Confirm the domain `kourabi.com` is pointed at the hosting plan (or temporarily use the Hostinger preview URL).
3. PHP 8.x must be enabled (default on shared hosting).
4. The `mail()` function must be available (default on shared hosting).
5. (Optional) Set up a Hostinger email mailbox for `ahmad@kourabi.com` if it does not already exist — this is the recipient address used by the contact form.

## Each release — deploy steps

From the project root:

```bash
npm run validate-data && npm run type-check && npm run build
```

The output folder is `out/`. Upload **its contents** (not the `out/` folder itself) to `public_html/` on Hostinger:

- **Option A — File Manager (hPanel):** Compress `out/` locally to a zip, upload via the File Manager, extract into `public_html/`.
- **Option B — FTP:** Use credentials from hPanel → Files → FTP Accounts. Upload everything inside `out/` to `public_html/`.

After upload, `public_html/` should contain at least:
- `index.html` (the splash/redirect page)
- `contact.php`
- `sitemap.xml`, `robots.txt`, `404.html`
- `_next/` folder (CSS, JS chunks, fonts)
- `ar/`, `de/`, `en/`, `tr/` folders (one per locale)

## Verification checklist

- [ ] `https://kourabi.com/` shows the splash and redirects to a locale within 2 seconds.
- [ ] `https://kourabi.com/en/` renders the homepage in English (LTR).
- [ ] `https://kourabi.com/de/` renders in German.
- [ ] `https://kourabi.com/tr/` renders in Turkish.
- [ ] `https://kourabi.com/ar/` renders in Arabic (RTL).
- [ ] The 4-way language picker in the nav switches locales.
- [ ] All six department cards link to the lawyer profile.
- [ ] `https://kourabi.com/en/lawyer/ahmad-alkourabi/` renders the founder profile.
- [ ] Submitting the contact form delivers an email to `ahmad@kourabi.com`.
- [ ] `https://kourabi.com/sitemap.xml` returns the sitemap.
- [ ] `https://kourabi.com/robots.txt` returns the robots file.

## Updating content

- **Edit firm details** → `data/firm.ts`, then rebuild and redeploy.
- **Add a department** → push a new entry into `data/departments.ts` (and add an icon variant in `components/icons/DepartmentIcon.tsx` if needed).
- **Add a lawyer** → push a new entry into `data/lawyers.ts`, optionally update one or more `departments[].leadLawyerSlug` to point at the new lawyer. The site auto-generates that lawyer's profile page on the next build.
- **Translate strings** → edit `i18n/messages/{en,de,tr,ar}.json`.
- **Native-speaker review of DE/TR translations is recommended before public launch.** A `// REVIEW PENDING:` comment at the top of `data/departments.ts`, `data/lawyers.ts`, and the `_note` key in `de.json` / `tr.json` flag what needs review.

## Rollback

The previous release is whatever was previously in `public_html/`. Before each deploy, take a snapshot via Hostinger File Manager → select `public_html/` → Compress.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000 — serves /en, /de, /tr, /ar
```

The dev server respects the next-intl middleware so visiting `/` redirects to `/en/` based on `defaultLocale`.

## Known notes

- `next/og` for dynamic OpenGraph images is not used because the edge runtime is incompatible with `output: 'export'`. A static OG image at `public/og-default.png` may be added if needed.
- `images.unoptimized: true` in `next.config.mjs` is required for static export — Hostinger has no Next image optimization runtime.
