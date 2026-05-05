# Alkourabi Law Firm Website — Design Specification

**Date:** 2026-05-05
**Author:** Brainstorming session with Ahmad (founder)
**Status:** Draft for user review

---

## 1. Project Overview

A bilingual (Arabic + English) marketing website for **Alkourabi Law Firm & Legal Consultancy** — a Damascus-based legal practice founded by **Attorney Ahmad Alkourabi** in 2018. The firm specializes in serving local and international corporate clients (German, Turkish, Jordanian, Syrian) operating within the Syrian legal framework.

The site presents the firm's six specialized departments as the primary entry points: each department card on the homepage acts as a gateway to the profile of the lawyer who leads it. Today all six departments are led by the founder; in future releases up to four additional associate lawyers will be introduced, each owning one or more departments.

### 1.1 Primary audiences

1. **International companies** considering operations in Syria (need clear English content, credibility signals).
2. **Existing local clients** confirming credentials or referring others (Arabic-first audience).
3. **Search engines** (legal queries in Arabic and English — SEO is critical for organic discovery).

### 1.2 Success criteria

- Visitor immediately understands what the firm does and who founded it within 5 seconds of arriving.
- Visitor can locate the right department and the responsible lawyer in ≤2 clicks.
- Site loads in under 2 seconds on 4G mobile.
- Lighthouse scores: Performance ≥90, Accessibility ≥95, SEO ≥95, Best Practices ≥95.
- Adding a new lawyer requires editing a single JSON/TypeScript data file — no component changes.

---

## 2. Goals and Non-Goals

### 2.1 Goals

- Convey professionalism, trust, and gravitas appropriate to a corporate law firm.
- Bilingual support with proper RTL (Arabic) and LTR (English) handling — not just translated text but mirrored layouts.
- Clear "department → responsible lawyer" navigation pattern.
- Static site that can be deployed to Vercel/Netlify free tier.
- Extensible data model so the founder (or a developer) can add associate lawyers without touching component code.
- Strong SEO: per-page metadata, Open Graph, JSON-LD `LegalService` schema, sitemap, robots.txt.
- WCAG 2.1 AA accessibility.

### 2.2 Non-goals (out of scope for v1)

- Client portal / authenticated case tracking.
- Online payment for legal services.
- Blog / news / articles section. (May be added in a future phase.)
- Live chat. (Replaced by WhatsApp click-to-chat link.)
- Multi-tenant CMS. (Static data files are sufficient.)
- Backend database. (Contact form posts to a serverless function or third-party form service.)

---

## 3. Brand and Visual Identity

### 3.1 Color palette

Derived from the user-provided design PDF (`1.pdf`):

| Token | Hex | Usage |
|---|---|---|
| `--ink-deep` | `#0A1628` | Primary background, dark sections |
| `--ink-elevated` | `#0F1E33` | Card backgrounds, elevated surfaces |
| `--ink-line` | `#1B2D45` | Subtle borders and dividers on dark |
| `--gold` | `#C9A961` | Headings, icons, dividers, key accents |
| `--gold-bright` | `#E0BE74` | Hover states, focus rings |
| `--gold-muted` | `#8A7340` | Quiet secondary accent (e.g., dim borders) |
| `--cream` | `#F5F0E1` | Body text on dark, light section background |
| `--cream-muted` | `#C9C2AE` | Secondary text on dark |
| `--ink-on-cream` | `#1A2236` | Body text when section uses cream background |

The palette is **dark-first**: most of the site is on `--ink-deep`. A few sections (e.g., contact, mid-page break) may invert to `--cream` background with `--ink-on-cream` text for visual rhythm.

### 3.2 Typography

| Role | Arabic | English |
|---|---|---|
| Display headings | **Tajawal** weight 700–900 | **Cormorant Garamond** weight 600 (italic for accent) |
| Body | **Tajawal** weight 400–500 | **Inter** weight 400–500 |
| Eyebrows / labels | **Tajawal** weight 600 uppercase, letter-spaced | **Inter** weight 600 uppercase, letter-spaced |

Both Arabic and English use the same line-height system and the same scale (per-language size adjustments via CSS where needed for visual parity).

**Type scale (desktop):** 12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 84 px. Mobile scales down ~15%.

### 3.3 Voice and tone

- **Formal, precise, restrained** — no marketing hype, no exclamation points.
- Arabic uses MSA (الفصحى) — no colloquial.
- English uses British/international register.
- Department descriptions: 1–2 sentences max, action-oriented.
- Hero copy: dignified statement of identity, not a sales pitch.

### 3.4 Imagery and iconography

- **Hero image:** the provided Lady Justice statue (`lady.jpg`), color-graded with a warm dark tone and gold rim-light. Treated as art, not stock photo.
- **Logo:** the provided gavel + scales logo (`Capture.JPG`), placed inside a thin gold rectangular frame as in the PDF.
- **Department icons:** custom thin-line gold icons (1.5px stroke), one per department:
  - Corporate & Investment → briefcase + skyline
  - Civil & Commercial Litigation → gavel
  - Labor & Compliance → people + checkmark
  - Tax & Financial Advisory → calculator + document
  - Intellectual Property → registered trademark + shield
  - Certified Legal Translation → document + globe
- **Client logos:** monochrome (gold/cream) versions, placed in a unified strip. (Real logos to be sourced or substituted with stylized name-cards in v1.)
- **Decorative motif:** Arabic geometric pattern as faint gold watermark in section transitions.

---

## 4. Information Architecture

### 4.1 Sitemap

```
/                              → Home (single long page)
/lawyer/[slug]                 → Lawyer profile page
    /lawyer/ahmad-alkourabi    → Founder profile (live in v1)
/legal/privacy                 → Privacy policy (placeholder content)
/legal/terms                   → Terms of use (placeholder content)
```

**Language-prefixed URLs:**
- `/ar/...` for Arabic (default for Syrian audience)
- `/en/...` for English

The root `/` redirects based on `Accept-Language` header (default Arabic if ambiguous).

### 4.2 Homepage section flow

1. **Top navigation bar** (sticky, glass-blur on scroll)
2. **Hero**
3. **Identity strip** (small numeric stats: 2018 founded · 6 departments · 10+ international clients · 4 countries served)
4. **About the firm**
5. **Founder spotlight** (Ahmad Alkourabi, full-width)
6. **Departments grid** (the heart of the site — 6 cards, each links to lawyer page)
7. **Trusted by** (client logos by country)
8. **Testimonial / pull quote** (optional — placeholder until real quotes are provided)
9. **Contact**
10. **Footer**

---

## 5. Section-by-Section Detail

### 5.1 Top navigation

- Left (RTL: right): Logo (small, in gold frame).
- Center: in-page anchor links (About · Departments · Clients · Contact).
- Right (RTL: left): Language toggle (`AR | EN`) + a primary CTA button "تواصل معنا / Contact us" (gold outline, gold fill on hover).
- On scroll past 80px: bar gains backdrop-blur and a 1px gold underline.
- Mobile: hamburger → full-screen overlay menu.

### 5.2 Hero

- Two-column on desktop (60/40), stacked on mobile.
- **Text column** (RTL/LTR depending on language):
  - Eyebrow: "مكتب القربي للمحاماة والاستشارات القانونية" (small, gold, uppercase)
  - Headline H1: "شريك قانوني موثوق منذ 2018" / "Your trusted legal partner since 2018"
  - Subhead (2 lines): firm value proposition.
  - Two CTAs: primary gold button "اكتشف خدماتنا / Our services" → scrolls to departments; secondary outline button "تواصل معنا / Get in touch" → scrolls to contact.
- **Image column:** Lady Justice photo, full-bleed within its container, with a subtle gold glow gradient overlay top-right and a thin gold border-bottom.
- Background: `--ink-deep` with a faint geometric Arabic motif at 4% opacity.
- Subtle parallax: image moves slower than text on scroll (10% factor).

### 5.3 Identity strip

A horizontal strip with 4 cells, separated by thin gold vertical dividers:
- `2018` — تأسيس / Founded
- `6` — أقسام تخصصية / Specialized departments
- `10+` — موكلون دوليون / International clients
- `4` — دول تخدمها / Countries served

Numbers are large, in Cormorant for English / Tajawal extra-bold for Arabic, in gold. Labels in cream-muted.

### 5.4 About the firm

Single-column centered layout, max-width 760px.
- Eyebrow: "من نحن / About us"
- Heading: "خبرة قانونية متكاملة في قلب دمشق / Comprehensive legal expertise in the heart of Damascus"
- Body: 2 paragraphs adapted from the PDF text (positioning + specialization).
- A thin gold horizontal divider above and below.

### 5.5 Founder spotlight

Full-width section with two columns (50/50):
- **Left (RTL: right):** photo placeholder for Ahmad (real photo to be provided later — v1 uses a stylized monogram "أ.ق" in gold on dark with a thin frame, swappable for the real photo via data file).
- **Right (RTL: left):**
  - Eyebrow: "المحامي المؤسس / Founding Attorney"
  - Name: "الأستاذ أحمد القربي / Attorney Ahmad Alkourabi"
  - Credentials: "عضو نقابة المحامين بدمشق / Member of the Damascus Bar Association"
  - Short bio: 3–4 sentences.
  - Button: "السيرة الكاملة / Read full profile" → `/lawyer/ahmad-alkourabi`
- Background: subtle `--ink-elevated` to create separation from surrounding sections.

### 5.6 Departments grid (the central feature)

Heading: "أقسامنا التخصصية / Our specialized departments"

A 3×2 grid on desktop (1 column on mobile, 2 on tablet). Each card:

```
┌──────────────────────────────┐
│  [gold line-icon, 48×48]     │
│                              │
│  قسم الشركات والاستثمار      │
│  ──── (short gold underline) │
│                              │
│  Description (2 lines max,   │
│  cream-muted text)            │
│                              │
│  ─────────────────────────── │
│  المحامي المسؤول              │
│  الأستاذ أحمد القربي     →    │
└──────────────────────────────┘
```

- Card background: `--ink-elevated` with a 1px `--ink-line` border.
- On hover: border becomes gold, the bottom "lawyer" strip slides up slightly, the icon pulses gently, and the entire card becomes clickable.
- Click target: entire card → navigates to `/lawyer/[slug]?dept=[dept-slug]`.
- The lawyer's name in the bottom strip is data-driven; updating `data/departments.ts` re-points it.
- Keyboard accessible (Tab to focus, Enter to activate, focus ring in gold).

**The six departments** (slugs in parentheses):
1. الشركات والاستثمار (`corporate-investment`)
2. القضايا التجارية والمدنية (`litigation`)
3. شؤون العمال والامتثال (`labor-compliance`)
4. الاستشارات الضريبية والمالية (`tax-financial`)
5. الملكية الفكرية (`intellectual-property`)
6. الترجمة المحلفة (`certified-translation`)

### 5.7 Trusted by (clients)

Heading: "أبرز موكلينا / Our distinguished clients"

Subhead (one line): "نفخر بتمثيل نخبة من الشركات العالمية والإقليمية / We are proud to represent leading international and regional companies."

**Text-only treatment** — no logos in v1. Layout: 4 country groupings, each a small horizontal panel:

```
[DE] ألمانيا   Schwing  ·  Stetter
[TR] تركيا    Tiryaki Anadolu  ·  Danem
[JO] الأردن   Abshar  ·  Auto Score  ·  Auto Hub
[SY] سوريا    Tiryaki Grains  ·  Al-Nahrain Harvest
```

Visual treatment: the country name is in gold Tajawal next to a small gold ISO country code badge (`DE`, `TR`, `JO`, `SY`) — no flag emoji, to keep the formal register. Client names are large in cream Cormorant (English) / Tajawal weight 600 (Arabic), separated by gold dot bullets. On hover, each name gets a thin gold underline. Each panel has a subtle `--ink-elevated` background and a 1px `--ink-line` border that brightens to gold on hover.

### 5.8 Contact

Two-column layout:
- **Left (RTL: right):** Section heading + 4 contact rows with gold line-icons:
  - 📍 Address (Damascus – Al-Shaalan – Hafez Ibrahim St – Nazmiya Building)
  - ☎ Landline: +963 11 333 6562 (clickable `tel:` link)
  - 📱 Mobile: +963 959 435 555 (clickable `tel:` and WhatsApp link)
  - ✉ Email: kourabi@mail.com (clickable `mailto:` link)
- **Right (RTL: left):** Contact form with these fields (gold-bordered inputs on dark, Tajawal/Inter labels): Name · Email · Phone · Company · Country · Subject · Message. Submit button is gold-filled. Form posts to `/contact.php` (Hostinger PHP handler) which sends mail via Hostinger SMTP to `ahmad@kourabi.com`. Includes a honeypot field for spam protection.

Below the two columns: an embedded Google Maps iframe pointing to the office location (with a gold filter overlay to match the palette, achieved via CSS `filter: hue-rotate` + `saturation`).

### 5.9 Footer

Three columns + bottom bar:
- Logo + 1-line tagline. Social icons omitted in v1 (firm has no accounts yet); data file has commented-out fields ready for later activation.
- Sitemap (in-page anchors + lawyer page + legal pages).
- Office hours: **الأحد–الخميس 09:00–17:00 / Sun–Thu 09:00–17:00** + quick contact (phone, email, WhatsApp).
- Bottom bar: copyright "© 2026 مكتب القربي للمحاماة. جميع الحقوق محفوظة." + small links to /legal/privacy and /legal/terms.

### 5.10 Lawyer profile page (`/lawyer/[slug]`)

Layout:
- Sticky breadcrumb: Home → Lawyers → [Name]
- Hero section: large photo + name + title + credentials + quick contact buttons.
- Body content layout:
  - **Desktop (≥1024px):** a sticky in-page side-nav anchors the five subsections; the right column scrolls through them in order.
  - **Mobile / tablet (<1024px):** the same five subsections are stacked vertically, separated by gold dividers, no tabs.
  - The five subsections are:
    1. **About** — extended bio.
    2. **Departments led** — list of departments this lawyer owns, each linking back to the homepage department anchor.
    3. **Notable matters / clients** — list of representative work (per data file).
    4. **Education and bar memberships** — list.
    5. **Languages** — Arabic, English, etc.
- "Get in touch" panel on the side (sticky on desktop) with direct phone and email.
- Back link to the home page departments section, preserving deep-link to the originating department if `?dept=` query param is present.

---

## 6. Bilingual Strategy

### 6.1 Language detection and switching

- `next-intl` library for translations and locale routing.
- Default locale: `ar`. Available: `ar`, `en`.
- Language switch updates the URL prefix and persists in a cookie.
- The `<html>` element gets `lang` and `dir` attributes that reflect the active locale.

### 6.2 RTL handling

- Tailwind CSS with `tailwindcss-rtl` plugin (or use logical properties `start/end` exclusively).
- Layout direction is driven by the `dir` attribute on `<html>`; all CSS uses logical properties (`margin-inline-start`, `padding-inline-end`, etc.).
- Icons that have directional meaning (arrows) are mirrored in RTL.
- Numbers stay LTR even within Arabic text (browsers handle this correctly with proper `dir="auto"`).

### 6.3 Content storage

- All translatable strings live in `i18n/messages/ar.json` and `i18n/messages/en.json`.
- Structured data (departments, lawyers, clients) lives in TypeScript files under `data/` with each field as `{ ar: string; en: string }`.

---

## 7. Technical Architecture

### 7.1 Stack

- **Framework:** Next.js 14 (App Router, TypeScript).
- **Styling:** Tailwind CSS with a custom design-token theme (colors, typography, spacing) defined in `tailwind.config.ts`.
- **i18n:** `next-intl`.
- **Animations:** Framer Motion for entrance animations and scroll-triggered reveals; pure CSS for hover transitions.
- **Icons:** Custom SVG components (line-icon set, gold stroke).
- **Forms:** React Hook Form + Zod for validation. Submit endpoint is `/contact.php` — a small PHP handler deployed alongside the static files on Hostinger, sending mail via Hostinger SMTP to `ahmad@kourabi.com`.
- **Fonts:** `next/font` for self-hosted Tajawal, Cormorant Garamond, and Inter.
- **Build mode:** Next.js static export (`output: 'export'`). All routes pre-rendered to HTML at build time. No server runtime needed.
- **Deployment target:** Hostinger (client's existing plan). Locally during development the project runs via `next dev`.

### 7.2 Repository layout

```
website/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                 # locale-aware root layout
│   │   ├── page.tsx                   # homepage (composition of sections)
│   │   ├── lawyer/[slug]/page.tsx     # dynamic lawyer page
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   ├── api/contact/route.ts           # contact form handler
│   ├── globals.css
│   ├── opengraph-image.tsx
│   └── icon.tsx                       # favicon
├── components/
│   ├── layout/                        # Nav, Footer, LanguageToggle
│   ├── sections/                      # Hero, About, Founder, Departments, ...
│   ├── cards/                         # DepartmentCard, ClientGroup, LawyerHero
│   ├── ui/                            # Button, Input, Eyebrow, Divider, ...
│   └── icons/                         # custom SVG icon components
├── data/
│   ├── firm.ts                        # firm-level data (name, founded, contact)
│   ├── departments.ts                 # 6 departments with bilingual fields
│   ├── lawyers.ts                     # lawyers with bilingual fields
│   └── clients.ts                     # clients grouped by country
├── i18n/
│   ├── messages/
│   │   ├── ar.json
│   │   └── en.json
│   └── routing.ts
├── lib/
│   ├── motion.ts                      # shared Framer Motion variants
│   └── seo.ts                         # metadata helpers
├── public/
│   ├── images/
│   │   ├── logo-mark.svg
│   │   ├── lady-justice.jpg
│   │   └── og/                        # open graph images
│   └── fonts/                         # if not loaded via next/font
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

### 7.3 Data model

**`data/lawyers.ts`** — the single source of truth for lawyers:

```ts
export type Lawyer = {
  slug: string;
  name: { ar: string; en: string };
  title: { ar: string; en: string };
  credentials: { ar: string; en: string };
  bio: { ar: string; en: string };          // 2–3 paragraphs
  shortBio: { ar: string; en: string };     // 1–2 sentences for cards
  photo: string;                            // /images/lawyers/[slug].jpg
  departments: string[];                    // department slugs led by this lawyer
  languages: string[];                      // ["Arabic", "English"]
  education: { ar: string; en: string }[];
  notableMatters: { ar: string; en: string }[];
  email?: string;
  phone?: string;
  isFounder?: boolean;
};
```

**`data/departments.ts`**:

```ts
export type Department = {
  slug: string;
  name: { ar: string; en: string };
  shortDescription: { ar: string; en: string };
  fullDescription: { ar: string; en: string };
  iconKey: 'corporate' | 'litigation' | 'labor' | 'tax' | 'ip' | 'translation';
  leadLawyerSlug: string;                   // points into lawyers.ts
};
```

**Adding a new lawyer in the future:**
1. Add a new entry to `lawyers.ts`.
2. Add their photo to `public/images/lawyers/[slug].jpg`.
3. Optionally update one or more `departments[].leadLawyerSlug` to point to the new lawyer.
4. The homepage department cards and the lawyer's profile page update automatically.

### 7.4 Routing and rendering

- All pages are statically generated (`export const dynamic = 'force-static'`).
- Lawyer pages use `generateStaticParams` to pre-render one page per lawyer × per locale.
- Image optimization via `next/image` (AVIF/WebP at multiple breakpoints).

### 7.5 SEO

- Per-page `generateMetadata` producing title, description, canonical URL, hreflang alternates, Open Graph image, Twitter card.
- JSON-LD `LegalService` schema on the homepage including address, telephone, founder, languages served.
- JSON-LD `Person` schema on each lawyer page.
- `sitemap.ts` and `robots.ts` route handlers at the app root.
- Hreflang tags between `ar` and `en` versions of each page.

### 7.6 Performance

- Static export means HTML is served immediately; no JS required for first paint.
- Framer Motion is only used in client components that genuinely animate; sections are server components by default.
- Fonts are self-hosted with `font-display: swap` and preloaded.
- The Lady Justice image is served at 3 sizes (mobile/tablet/desktop) in AVIF + WebP.
- Total JS bundle target: ≤80KB gzipped on the homepage.

---

## 8. Interactions and Animation

- **Entrance:** as the user scrolls, each section's heading and primary content fades up (16px translate, 600ms, ease-out) once intersecting the viewport at 20%.
- **Hover on department card:** border transitions from `--ink-line` to `--gold` over 200ms; the icon scales 1.05; the bottom "responsible lawyer" strip slides up 4px and gains a stronger color contrast.
- **Hero image parallax:** 10% slower than scroll, capped at 60px translation.
- **Language toggle:** a 250ms fade between Arabic and English (the URL changes, the layout direction flips with a smooth dir-change handled by the browser).
- **Form feedback:** inline validation on blur, success toast on submit (gold-bordered, top-right desktop / bottom mobile).
- **No bouncy or playful easings** — only `ease-out`, `ease-in-out`, and linear transitions. The brand voice is restrained.

---

## 9. Responsive Breakpoints

- **Mobile:** ≤640px. Single column. Department grid is 1 column. Hero stacks. Type scales down ~15%.
- **Tablet:** 641–1023px. Department grid is 2 columns. Hero remains 2-column but with smaller image.
- **Desktop:** ≥1024px. Full design as specified. Max content width 1280px.
- **Wide:** ≥1536px. Backgrounds extend full-width but content is centered at 1280px.

---

## 10. Accessibility

- All text meets WCAG AA contrast (4.5:1 for body, 3:1 for large text). Gold on dark is checked: `#C9A961` on `#0A1628` = 7.4:1, passes.
- All interactive elements have visible focus rings (gold, 2px, 2px offset).
- Department cards are `<a>` elements wrapping their content, not `<div onClick>`.
- Form inputs have associated `<label>` elements (visible — no placeholder-only labels).
- Skip-to-content link at the top.
- Reduced-motion users get instantaneous transitions (`prefers-reduced-motion`).
- Language toggle announces the change via `aria-live`.

---

## 11. Deployment and Operations

- Source on local disk first; optionally pushed to GitHub later for backup/version control.
- Build command: `npm run build` (produces `out/` directory of static files).
- Deployment to Hostinger: upload the `out/` directory contents plus `contact.php` to `public_html/` via Hostinger File Manager or FTP. No build runtime on Hostinger.
- Domain: assumed `kourabi.com`; client to confirm registration (or use Hostinger's preview URL meanwhile).
- Contact form delivery: PHP `mail()` via Hostinger's SMTP, sending to `ahmad@kourabi.com`. Honeypot field + simple rate-limit IP check to deter spam.
- Analytics: a privacy-friendly self-hosted option (e.g., Plausible self-hosted, or simply Hostinger's built-in stats). Final choice deferred — does not block v1.
- No backend database; all data is build-time.

---

## 12. Future Extensibility

- **Adding lawyers:** edit `data/lawyers.ts`, add a photo, optionally update `departments[].leadLawyerSlug`. No code changes.
- **Adding a third language** (e.g., Turkish, given the client base): add a locale to `i18n/routing.ts`, add `tr.json`, extend bilingual fields in data files to `{ ar, en, tr }`. The component layer auto-adapts.
- **Blog / news:** a future `/news/` section can be added as a new App Router segment with MDX files. Out of scope for v1.
- **Client testimonials:** when real quotes are gathered, replace the placeholder section with a carousel.

---

## 13. Confirmed Decisions

All five questions answered and locked:

1. **Domain & hosting** — local development first, then deploy to client's **Hostinger** plan. Static export (`output: 'export'`) so the site uploads as plain HTML/CSS/JS to any Hostinger plan; the contact form posts to a small `contact.php` script on Hostinger that uses Hostinger SMTP. Domain: `kourabi.com` (assumed; client to confirm registration).
2. **Photo of the founder** — will be provided later. v1 ships with a stylized "أ.ق" gold monogram placeholder; the data file holds the photo path so swapping it is a one-line change.
3. **Contact email** — `ahmad@kourabi.com`. (Originally written as `kourabi@mail.com` in the source PDF; client clarified the new mailbox.)
4. **Client display** — **text-only**, no logos. Each country panel lists company names in cream-on-dark Tajawal/Inter, separated by gold dot bullets. (Cleaner aesthetic, no third-party trademark concerns, faster build.)
5. **Social media** — no accounts yet. Footer omits social icons in v1; data file has commented-out fields ready to populate later.

### Additional confirmed details

- **Office hours:** Sun–Thu, 09:00–17:00. Closed Fri–Sat.
- **Map:** Google Maps embed with address search string `Damascus, Al-Shaalan, Hafez Ibrahim Street, Nazmiya Building` (well-known building per client).
- **Department description voice:** lightly polished web copy (option *b*) — keeps the meaning of the source PDF, tightened for web reading.
- **Contact form fields:** Name · Email · Phone · **Company** · **Country** · Subject · Message. Company and Country are added because most inquiries come from corporate clients (per the firm's positioning).

### Deferred / non-blocking

- The file `logos/Said Kourabi.png` (a green "SK" monogram) is set aside for v1. If it should appear somewhere on the site (e.g., as a personal brand for an associate lawyer named Said Kourabi), client to specify in a later iteration.

---

## 14. Acceptance criteria for v1

- [ ] Homepage renders correctly in Arabic (RTL) and English (LTR) at all three breakpoints.
- [ ] Each of the 6 department cards links to the founder's profile with the correct `?dept=` query param.
- [ ] Lawyer page for Ahmad is complete with bio, departments led, notable matters.
- [ ] Contact form submits successfully and delivers email to the configured inbox.
- [ ] Lighthouse scores pass the targets in §1.2.
- [ ] No console errors, no accessibility violations reported by `axe`.
- [ ] Site is deployed and accessible at a public URL.
