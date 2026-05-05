# Alkourabi Law Firm Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (Arabic/English) static marketing website for Alkourabi Law Firm, deployable to Hostinger, with extensible data files for adding lawyers later.

**Architecture:** Next.js 14 App Router with `output: 'export'` produces a fully static site (HTML/CSS/JS). Content lives in TypeScript data files keyed by locale. Layout direction (RTL/LTR) is driven by the `<html dir>` attribute set per locale. Contact form submits to a small `contact.php` handler that runs on Hostinger's PHP runtime.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, next-intl 3, Framer Motion 11, React Hook Form 7, Zod 3, PHP 8 (Hostinger handler only).

**Working directory for the website:** `c:\Ahmadkourabi\` (Next.js app at root). Original source files (`105.avif`, `Capture.JPG`, `Ivory.png`, `lady.jpg`, `*.pdf`) will be moved to `source-assets/` to keep the root clean.

---

## Phase 0 — Repository preparation

### Task 0.1: Initialize Git and tidy the workspace

**Files:**
- Create: `c:\Ahmadkourabi\.gitignore`
- Create: `c:\Ahmadkourabi\source-assets\` (directory)
- Move: existing source files into `source-assets/`

- [ ] **Step 1: Initialize git**

```bash
cd /c/Ahmadkourabi && git init && git branch -M main
```

Expected: `Initialized empty Git repository in c:/Ahmadkourabi/.git/`

- [ ] **Step 2: Move source files into `source-assets/`**

```bash
cd /c/Ahmadkourabi && mkdir -p source-assets && mv "105.avif" "Capture.JPG" "Ivory.png" "lady.jpg" "مكتب القربي للمحاماة والاستشارات القانونية (2).pdf" "1.pdf" source-assets/ 2>/dev/null; ls source-assets/
```

Expected: All 6 source files inside `source-assets/`.

- [ ] **Step 3: Delete temporary PDF rendering artifacts**

```bash
cd /c/Ahmadkourabi && rm -rf design_pages design_slices _render.py _slice.py 1.txt && ls
```

Expected: Listing shows `docs/`, `logos/`, `source-assets/` only (plus the soon-to-be-created `.gitignore`).

- [ ] **Step 4: Write `.gitignore`**

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
Thumbs.db

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel / hosting
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# editor
.vscode/
.idea/
```

- [ ] **Step 5: First commit**

```bash
cd /c/Ahmadkourabi && git add . && git commit -m "chore: initialize repo with source assets, design spec, and plan"
```

Expected: Commit succeeds.

---

## Phase 1 — Project foundation

### Task 1.1: Create the Next.js project structure manually

We don't use `create-next-app` because we want full control over file layout and to avoid pulling in unwanted defaults (no `app/api`, no test framework choice yet, etc.).

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts` (auto-generated; we'll just `touch` an empty one and let Next.js fill it)
- Create: `app/globals.css` (placeholder — replaced in Phase 2)

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "alkourabi-law-firm-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "validate-data": "tsx scripts/validate-data.ts"
  },
  "dependencies": {
    "next": "14.2.18",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "next-intl": "3.21.1",
    "framer-motion": "11.11.10",
    "react-hook-form": "7.53.2",
    "@hookform/resolvers": "3.9.1",
    "zod": "3.23.8",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@types/node": "20.17.6",
    "@types/react": "18.3.12",
    "@types/react-dom": "18.3.1",
    "typescript": "5.6.3",
    "tailwindcss": "3.4.14",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20",
    "eslint": "8.57.1",
    "eslint-config-next": "14.2.18",
    "tsx": "4.19.2"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out", ".next"]
}
```

- [ ] **Step 3: Write `next.config.mjs`**

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
```

(Note: `images.unoptimized` is required for static export — Hostinger has no Next.js image optimization runtime.)

- [ ] **Step 4: Create empty `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

- [ ] **Step 5: Install dependencies**

```bash
cd /c/Ahmadkourabi && npm install
```

Expected: `node_modules/` created, no errors. ~2-3 minute install.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs next-env.d.ts && git commit -m "chore: scaffold Next.js 14 project with static export config"
```

---

### Task 1.2: Configure Tailwind with the design tokens from the spec

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Modify: `app/globals.css`

- [ ] **Step 1: Write `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

- [ ] **Step 2: Write `tailwind.config.ts` with all design tokens from spec §3.1**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        ink: {
          deep: '#0A1628',
          elevated: '#0F1E33',
          line: '#1B2D45',
          'on-cream': '#1A2236'
        },
        gold: {
          DEFAULT: '#C9A961',
          bright: '#E0BE74',
          muted: '#8A7340'
        },
        cream: {
          DEFAULT: '#F5F0E1',
          muted: '#C9C2AE'
        }
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx — variables defined there
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
        arabic: ['var(--font-arabic)']
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1rem' }],
        xs: ['0.875rem', { lineHeight: '1.25rem' }],
        sm: ['1rem', { lineHeight: '1.5rem' }],
        base: ['1.125rem', { lineHeight: '1.75rem' }],
        lg: ['1.375rem', { lineHeight: '1.875rem' }],
        xl: ['1.75rem', { lineHeight: '2.25rem' }],
        '2xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '3xl': ['3rem', { lineHeight: '3.5rem' }],
        '4xl': ['4rem', { lineHeight: '4.5rem' }],
        '5xl': ['5.25rem', { lineHeight: '5.75rem' }]
      },
      letterSpacing: {
        eyebrow: '0.18em'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A961 0%, #E0BE74 50%, #8A7340 100%)',
        'ink-gradient': 'linear-gradient(180deg, #0A1628 0%, #0F1E33 100%)'
      }
    }
  },
  plugins: []
};

export default config;
```

- [ ] **Step 3: Replace `app/globals.css` with the base layer + RTL helpers**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  html {
    background-color: #0A1628;
  }

  body {
    background-color: #0A1628;
    color: #F5F0E1;
    font-family: var(--font-sans);
  }

  html[lang='ar'] body {
    font-family: var(--font-arabic);
  }

  /* Use logical properties everywhere; this scopes a sensible default */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Visible focus ring in gold */
  :focus-visible {
    outline: 2px solid #E0BE74;
    outline-offset: 2px;
    border-radius: 2px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }

  /* Smooth scroll for in-page anchors */
  html {
    scroll-behavior: smooth;
  }

  /* Selection color */
  ::selection {
    background-color: #C9A961;
    color: #0A1628;
  }
}

@layer components {
  .container-page {
    @apply mx-auto w-full max-w-[1280px] px-6 md:px-10;
  }

  .eyebrow {
    @apply text-xs font-semibold uppercase tracking-eyebrow text-gold;
  }

  .gold-divider {
    @apply h-px w-12 bg-gold;
  }
}
```

- [ ] **Step 4: Verify the project compiles**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts postcss.config.mjs app/globals.css && git commit -m "feat(design): wire Tailwind with brand color and type tokens"
```

---

### Task 1.3: Configure i18n with next-intl

**Files:**
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Create: `i18n/messages/ar.json`
- Create: `i18n/messages/en.json`
- Create: `middleware.ts`

- [ ] **Step 1: Write `i18n/routing.ts`**

```ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

- [ ] **Step 2: Write `i18n/request.ts`**

```ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as 'ar' | 'en')
    ? (requested as 'ar' | 'en')
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
```

- [ ] **Step 3: Write `middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};
```

- [ ] **Step 4: Write `i18n/messages/ar.json` (skeleton — full strings come in section tasks)**

```json
{
  "meta": {
    "siteName": "مكتب القربي للمحاماة والاستشارات القانونية",
    "founderName": "المحامي الأستاذ أحمد القربي",
    "tagline": "شريك قانوني موثوق منذ 2018"
  },
  "nav": {
    "about": "من نحن",
    "departments": "أقسامنا",
    "clients": "موكلونا",
    "contact": "تواصل معنا",
    "switchLanguage": "English"
  },
  "common": {
    "readMore": "اقرأ المزيد",
    "viewProfile": "السيرة الكاملة",
    "responsibleLawyer": "المحامي المسؤول",
    "comingSoon": "قريباً"
  }
}
```

- [ ] **Step 5: Write `i18n/messages/en.json` (mirror of `ar.json`)**

```json
{
  "meta": {
    "siteName": "Alkourabi Law Firm & Legal Consultancy",
    "founderName": "Attorney Ahmad Alkourabi",
    "tagline": "Your trusted legal partner since 2018"
  },
  "nav": {
    "about": "About",
    "departments": "Departments",
    "clients": "Clients",
    "contact": "Contact",
    "switchLanguage": "العربية"
  },
  "common": {
    "readMore": "Read more",
    "viewProfile": "Read full profile",
    "responsibleLawyer": "Responsible attorney",
    "comingSoon": "Coming soon"
  }
}
```

- [ ] **Step 6: Verify**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add i18n middleware.ts && git commit -m "feat(i18n): configure next-intl routing for ar/en with Arabic default"
```

---

### Task 1.4: Wire fonts via `next/font`

**Files:**
- Create: `lib/fonts.ts`

- [ ] **Step 1: Write `lib/fonts.ts`**

```ts
import { Tajawal, Cormorant_Garamond, Inter } from 'next/font/google';

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-arabic',
  display: 'swap'
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap'
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

export const fontVariables = `${tajawal.variable} ${cormorant.variable} ${inter.variable}`;
```

- [ ] **Step 2: Commit**

```bash
git add lib/fonts.ts && git commit -m "feat(design): wire Tajawal, Cormorant, Inter via next/font"
```

---

### Task 1.5: Build the locale-aware root layout

**Files:**
- Create: `app/layout.tsx` (root layout — minimal pass-through)
- Create: `app/[locale]/layout.tsx` (locale layout — does the real work)
- Create: `app/[locale]/not-found.tsx`

- [ ] **Step 1: Write `app/layout.tsx`** (Next 14 requires a root layout, but we delegate everything to the locale layout)

```tsx
import { fontVariables } from '@/lib/fonts';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={fontVariables} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

(The actual `<html lang>` and `dir` are set by the locale layout below via `cloneElement` is not how Next does it — instead we re-set the html attributes via metadata/headers in the locale segment. Actually with Next 14, only the root layout owns `<html>`. We move `<html>` rendering into the locale layout and remove it from the root layout. Updated below.)

Actually, to support per-locale `<html lang dir>`, the cleanest approach in App Router is to render `<html>` only in the locale layout and use a passthrough at the root. Replace `app/layout.tsx` with:

```tsx
// app/layout.tsx — passthrough only; <html> lives in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

(Next.js will warn that no `<html>` is present in the root layout; this is a known pattern when nested layouts own the document. The warning is suppressed because locale layouts always render an `<html>`.)

- [ ] **Step 2: Write `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing, type Locale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    metadataBase: new URL('https://kourabi.com'),
    title: {
      default: isAr
        ? 'مكتب القربي للمحاماة والاستشارات القانونية'
        : 'Alkourabi Law Firm & Legal Consultancy',
      template: isAr ? '%s | مكتب القربي' : '%s | Alkourabi'
    },
    description: isAr
      ? 'حلول قانونية ومالية متكاملة للشركات في سوريا منذ 2018.'
      : 'Comprehensive legal and financial solutions for companies in Syria since 2018.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en'
      }
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_SY' : 'en_US',
      siteName: isAr
        ? 'مكتب القربي للمحاماة والاستشارات القانونية'
        : 'Alkourabi Law Firm & Legal Consultancy'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="bg-ink-deep text-cream antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Write `app/[locale]/not-found.tsx`**

```tsx
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen items-center justify-center py-32">
      <div className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl text-cream md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-cream-muted">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="mt-8 inline-block text-gold underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Create a stub homepage so the project boots**

`app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="container-page py-32">
      <h1 className="font-display text-5xl text-gold">Alkourabi Law Firm</h1>
      <p className="mt-6 text-cream-muted">Stub homepage — sections coming soon.</p>
    </main>
  );
}
```

- [ ] **Step 5: Run dev server and verify both locales render**

```bash
npm run dev
```

In a browser, visit `http://localhost:3000/ar/` and `http://localhost:3000/en/`. Both should render the stub headline. The Arabic page should have `dir="rtl"` on `<html>` (verify via DevTools).

Stop the dev server (`Ctrl+C`).

- [ ] **Step 6: Commit**

```bash
git add app middleware.ts && git commit -m "feat(layout): root + locale layouts with RTL/LTR direction switching"
```

---

## Phase 2 — Data layer

### Task 2.1: Define core data types and write firm-level data

**Files:**
- Create: `data/types.ts`
- Create: `data/firm.ts`

- [ ] **Step 1: Write `data/types.ts`**

```ts
export type Bilingual = { ar: string; en: string };

export type Firm = {
  name: Bilingual;
  shortName: Bilingual;
  founded: number;
  founderSlug: string;
  address: Bilingual;
  phone: string;
  mobile: string;
  whatsappNumber: string; // digits only, e.g. "963959435555"
  email: string;
  hours: Bilingual;
  mapsQuery: string;
};

export type Department = {
  slug: string;
  name: Bilingual;
  shortDescription: Bilingual;
  fullDescription: Bilingual;
  iconKey: 'corporate' | 'litigation' | 'labor' | 'tax' | 'ip' | 'translation';
  leadLawyerSlug: string;
};

export type Lawyer = {
  slug: string;
  name: Bilingual;
  title: Bilingual;
  credentials: Bilingual;
  bio: Bilingual;
  shortBio: Bilingual;
  photo: string | null; // null → render monogram placeholder
  monogram: Bilingual; // shown when photo is null
  departments: string[]; // department slugs led by this lawyer
  languages: ('ar' | 'en' | 'tr' | 'fr' | 'de')[];
  education: Bilingual[];
  notableMatters: Bilingual[];
  email?: string;
  phone?: string;
  isFounder?: boolean;
};

export type ClientCompany = {
  name: string; // displayed verbatim — usually the firm's English brand
  arabicName?: string; // optional Arabic spelling
};

export type ClientCountry = {
  code: 'DE' | 'TR' | 'JO' | 'SY';
  name: Bilingual;
  companies: ClientCompany[];
};
```

- [ ] **Step 2: Write `data/firm.ts`**

```ts
import type { Firm } from './types';

export const firm: Firm = {
  name: {
    ar: 'مكتب القربي للمحاماة والاستشارات القانونية',
    en: 'Alkourabi Law Firm & Legal Consultancy'
  },
  shortName: {
    ar: 'مكتب القربي',
    en: 'Alkourabi Law Firm'
  },
  founded: 2018,
  founderSlug: 'ahmad-alkourabi',
  address: {
    ar: 'دمشق – الشعلان – شارع حافظ إبراهيم – بناء نظمية',
    en: 'Damascus – Al-Shaalan – Hafez Ibrahim Street – Nazmiya Building'
  },
  phone: '+963113336562',
  mobile: '+963959435555',
  whatsappNumber: '963959435555',
  email: 'ahmad@kourabi.com',
  hours: {
    ar: 'الأحد – الخميس · 09:00 – 17:00',
    en: 'Sun – Thu · 09:00 – 17:00'
  },
  mapsQuery: 'Damascus, Al-Shaalan, Hafez Ibrahim Street, Nazmiya Building'
};
```

- [ ] **Step 3: Commit**

```bash
git add data/types.ts data/firm.ts && git commit -m "feat(data): core types and firm-level data"
```

---

### Task 2.2: Write department data (the 6 specialized departments)

**Files:**
- Create: `data/departments.ts`

- [ ] **Step 1: Write `data/departments.ts` with all 6 departments**

```ts
import type { Department } from './types';

export const departments: Department[] = [
  {
    slug: 'corporate-investment',
    iconKey: 'corporate',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'الشركات والاستثمار',
      en: 'Corporate & Investment'
    },
    shortDescription: {
      ar: 'تأسيس الشركات بكافة أنواعها، وصياغة العقود التجارية، والحصول على التراخيص الاستثمارية والصناعية.',
      en: 'Company formation across all structures, commercial contract drafting, and securing investment and industrial licenses.'
    },
    fullDescription: {
      ar: 'يتولى القسم تأسيس الشركات بكافة أنواعها (مساهمة، محدودة المسؤولية، تضامن، توصية)، وصياغة العقود التجارية والتجارية الدولية، والحصول على التراخيص الاستثمارية والصناعية من هيئة الاستثمار السورية والوزارات المختصة.',
      en: 'The department handles company formation in all corporate structures (joint-stock, limited liability, partnership), drafts domestic and cross-border commercial contracts, and secures investment and industrial licenses from the Syrian Investment Authority and relevant ministries.'
    }
  },
  {
    slug: 'litigation',
    iconKey: 'litigation',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'القضايا التجارية والمدنية',
      en: 'Commercial & Civil Litigation'
    },
    shortDescription: {
      ar: 'المرافعة والتمثيل القانوني الاحترافي أمام كافة المحاكم المختصة.',
      en: 'Professional advocacy and legal representation before all competent courts.'
    },
    fullDescription: {
      ar: 'يقدم القسم المرافعة والتمثيل القانوني الكامل أمام محاكم البداية والاستئناف والنقض، في النزاعات التجارية، عقود التوريد، التحصيل، وقضايا التعويض، مع تركيز خاص على النزاعات بين الشركات.',
      en: 'The department provides full advocacy and representation before courts of first instance, appeal, and cassation, covering commercial disputes, supply-contract litigation, debt collection, and compensation claims — with particular focus on inter-company disputes.'
    }
  },
  {
    slug: 'labor-compliance',
    iconKey: 'labor',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'شؤون العمال والامتثال',
      en: 'Labor Affairs & Compliance'
    },
    shortDescription: {
      ar: 'إدارة إقامات العمل للأجانب، والتأمينات الاجتماعية، وتنظيم عقود الموظفين.',
      en: 'Work permits and residency for foreign staff, social security administration, and structured employment contracts.'
    },
    fullDescription: {
      ar: 'يتولى القسم إدارة إقامات العمل والإقامات السنوية للموظفين الأجانب، وتسجيل الموظفين في مؤسسة التأمينات الاجتماعية، وصياغة عقود العمل ولوائح الموظفين، وتمثيل صاحب العمل أمام محاكم العمل عند الحاجة.',
      en: 'The department manages work permits and annual residencies for foreign employees, registers staff with the Social Security Foundation, drafts employment contracts and staff regulations, and represents employers before labor courts when required.'
    }
  },
  {
    slug: 'tax-financial',
    iconKey: 'tax',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'الاستشارات الضريبية والمالية',
      en: 'Tax & Financial Advisory'
    },
    shortDescription: {
      ar: 'إعداد البيانات الضريبية، ومتابعة الدوائر المالية، وضمان السلامة الضريبية بإشراف محاسب قانوني مجاز.',
      en: 'Tax filing preparation, liaison with financial authorities, and ensuring tax compliance — supervised by a licensed certified public accountant.'
    },
    fullDescription: {
      ar: 'يقدم القسم خدمات إعداد البيانات الضريبية الدورية والسنوية، ومتابعة الدوائر المالية المختصة، والتدقيق على السلامة الضريبية للشركات، تحت إشراف محاسب قانوني مجاز يضمن مطابقة كافة الإجراءات للقانون.',
      en: 'The department prepares periodic and annual tax filings, liaises with the relevant financial directorates, and audits corporate tax compliance — all under the supervision of a licensed certified public accountant who ensures every procedure matches the letter of the law.'
    }
  },
  {
    slug: 'intellectual-property',
    iconKey: 'ip',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'الملكية الفكرية',
      en: 'Intellectual Property'
    },
    shortDescription: {
      ar: 'تسجيل العلامات الفارقة، وحماية الأسماء التجارية، وصون حقوق الملكية.',
      en: 'Trademark registration, trade-name protection, and safeguarding intellectual property rights.'
    },
    fullDescription: {
      ar: 'يتولى القسم تسجيل العلامات التجارية والفارقة لدى مديرية حماية الملكية، ومتابعة طلبات التسجيل والاعتراضات، والدفاع عن حقوق العلامة أمام المحاكم المختصة، وتسجيل وحماية الأسماء التجارية وبراءات الاختراع.',
      en: 'The department registers trademarks and distinctive marks with the IP Protection Directorate, follows applications and oppositions through to grant, defends mark rights before competent courts, and registers and protects trade names and patents.'
    }
  },
  {
    slug: 'certified-translation',
    iconKey: 'translation',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      ar: 'الترجمة المحلفة',
      en: 'Certified Legal Translation'
    },
    shortDescription: {
      ar: 'تقديم خدمات الترجمة القانونية المعتمدة لكافة الوثائق والمستندات.',
      en: 'Certified legal translation services for all documents and official records.'
    },
    fullDescription: {
      ar: 'يقدم القسم ترجمة قانونية محلفة معتمدة من الجهات الرسمية، تشمل العقود، الوكالات، الأحكام القضائية، السجلات التجارية، ووثائق الأحوال المدنية، بين العربية والإنكليزية وعدد من اللغات الأخرى.',
      en: 'The department provides sworn legal translation accredited by official authorities — covering contracts, powers of attorney, court judgments, commercial registry records, and civil-status documents — between Arabic, English, and several additional languages.'
    }
  }
];

export function getDepartmentBySlug(slug: string) {
  return departments.find((d) => d.slug === slug);
}
```

- [ ] **Step 2: Commit**

```bash
git add data/departments.ts && git commit -m "feat(data): six specialized departments with bilingual descriptions"
```

---

### Task 2.3: Write lawyer data (Ahmad as founder, with the schema ready for additions)

**Files:**
- Create: `data/lawyers.ts`

- [ ] **Step 1: Write `data/lawyers.ts`**

```ts
import type { Lawyer } from './types';

export const lawyers: Lawyer[] = [
  {
    slug: 'ahmad-alkourabi',
    isFounder: true,
    name: {
      ar: 'الأستاذ أحمد القربي',
      en: 'Attorney Ahmad Alkourabi'
    },
    title: {
      ar: 'المحامي المؤسس',
      en: 'Founding Attorney'
    },
    credentials: {
      ar: 'عضو نقابة المحامين بدمشق',
      en: 'Member of the Damascus Bar Association'
    },
    photo: null,
    monogram: {
      ar: 'أ.ق',
      en: 'AK'
    },
    shortBio: {
      ar: 'مؤسس مكتب القربي للمحاماة والاستشارات القانونية، يقود الأقسام الستة ويتابع بنفسه أهم ملفات الموكلين الدوليين.',
      en: 'Founder of Alkourabi Law Firm. Leads all six specialized departments and personally oversees major international client matters.'
    },
    bio: {
      ar: 'الأستاذ أحمد القربي محامٍ مؤسس وعضو في نقابة المحامين بدمشق. أسس مكتبه عام 2018 ليقدم حلولاً قانونية ومالية متكاملة للشركات المحلية والدولية العاملة في السوق السورية. على مدى سنوات ممارسته، رسّخ علاقات عمل طويلة الأمد مع وكالات وشركات بارزة من ألمانيا وتركيا والأردن، وأشرف على تأسيس عشرات الشركات وتسوية نزاعات تجارية معقدة. يؤمن بأن دور المحامي ليس مجرد تطبيق النص، بل بناء جسر يثق به الموكل لاتخاذ قراراته.',
      en: 'Attorney Ahmad Alkourabi is the founding lawyer of Alkourabi Law Firm and a member of the Damascus Bar Association. He established the firm in 2018 to provide comprehensive legal and financial solutions to local and international companies operating in the Syrian market. Over years of practice he has built long-standing relationships with leading agencies and companies from Germany, Turkey, and Jordan, overseen the formation of dozens of companies, and resolved complex commercial disputes. He believes a lawyer\'s role is not merely to apply the text of the law, but to build a bridge the client trusts when making decisions.'
    },
    departments: [
      'corporate-investment',
      'litigation',
      'labor-compliance',
      'tax-financial',
      'intellectual-property',
      'certified-translation'
    ],
    languages: ['ar', 'en'],
    education: [
      {
        ar: 'إجازة في الحقوق – جامعة دمشق',
        en: 'Bachelor of Laws — University of Damascus'
      }
    ],
    notableMatters: [
      {
        ar: 'تمثيل وكالة شفنيغ-شتتر الألمانية في السوق السورية وإدارة شؤونها القانونية بالكامل.',
        en: 'Representing Schwing-Stetter (Germany) in the Syrian market and managing all their legal affairs.'
      },
      {
        ar: 'تأسيس وإدارة شؤون شركة ترياكي أناضول التركية في سوريا.',
        en: 'Establishing and managing the affairs of Tiryaki Anadolu (Turkey) in Syria.'
      },
      {
        ar: 'تمثيل شركات الأردنية كأبشر لنقل الركاب وأوتو سكور وأوتو هوب في عملياتها داخل سوريا.',
        en: 'Representing Jordanian companies including Abshar Passenger Transport, Auto Score, and Auto Hub in their Syrian operations.'
      },
      {
        ar: 'الإشراف القانوني على شركة ترياكي حبوب وشركة حصاد النهرين في سوريا.',
        en: 'Legal oversight of Tiryaki Grains and Al-Nahrain Harvest in Syria.'
      }
    ],
    email: 'ahmad@kourabi.com',
    phone: '+963959435555'
  }
];

export function getLawyerBySlug(slug: string) {
  return lawyers.find((l) => l.slug === slug);
}

export function getFounder() {
  return lawyers.find((l) => l.isFounder) ?? lawyers[0];
}
```

- [ ] **Step 2: Commit**

```bash
git add data/lawyers.ts && git commit -m "feat(data): founder profile with six departments and notable matters"
```

---

### Task 2.4: Write client data

**Files:**
- Create: `data/clients.ts`

- [ ] **Step 1: Write `data/clients.ts`**

```ts
import type { ClientCountry } from './types';

export const clientCountries: ClientCountry[] = [
  {
    code: 'DE',
    name: { ar: 'ألمانيا', en: 'Germany' },
    companies: [
      { name: 'Schwing', arabicName: 'شفنيغ' },
      { name: 'Stetter', arabicName: 'شتتر' }
    ]
  },
  {
    code: 'TR',
    name: { ar: 'تركيا', en: 'Türkiye' },
    companies: [
      { name: 'Tiryaki Anadolu', arabicName: 'ترياكي أناضول' },
      { name: 'Danem', arabicName: 'دانم' }
    ]
  },
  {
    code: 'JO',
    name: { ar: 'الأردن', en: 'Jordan' },
    companies: [
      { name: 'Abshar Passenger Transport', arabicName: 'أبشر لنقل الركاب' },
      { name: 'Auto Score', arabicName: 'أوتو سكور' },
      { name: 'Auto Hub', arabicName: 'أوتو هوب' }
    ]
  },
  {
    code: 'SY',
    name: { ar: 'سوريا', en: 'Syria' },
    companies: [
      { name: 'Tiryaki Grains', arabicName: 'ترياكي حبوب' },
      { name: 'Al-Nahrain Harvest', arabicName: 'حصاد النهرين' }
    ]
  }
];
```

- [ ] **Step 2: Commit**

```bash
git add data/clients.ts && git commit -m "feat(data): clients grouped by country, text-only treatment"
```

---

### Task 2.5: Write a Zod-validated data check script

This catches typos and broken cross-references (e.g., department points at a non-existent lawyer slug) at build-time rather than at run-time.

**Files:**
- Create: `scripts/validate-data.ts`

- [ ] **Step 1: Write `scripts/validate-data.ts`**

```ts
import { z } from 'zod';
import { firm } from '../data/firm';
import { departments } from '../data/departments';
import { lawyers } from '../data/lawyers';
import { clientCountries } from '../data/clients';

const Bilingual = z.object({ ar: z.string().min(1), en: z.string().min(1) });

const Firm = z.object({
  name: Bilingual,
  shortName: Bilingual,
  founded: z.number().int().min(2000).max(2030),
  founderSlug: z.string().min(1),
  address: Bilingual,
  phone: z.string().regex(/^\+?\d+$/),
  mobile: z.string().regex(/^\+?\d+$/),
  whatsappNumber: z.string().regex(/^\d+$/),
  email: z.string().email(),
  hours: Bilingual,
  mapsQuery: z.string().min(1)
});

const Department = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: Bilingual,
  shortDescription: Bilingual,
  fullDescription: Bilingual,
  iconKey: z.enum(['corporate', 'litigation', 'labor', 'tax', 'ip', 'translation']),
  leadLawyerSlug: z.string().min(1)
});

const Lawyer = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: Bilingual,
  title: Bilingual,
  credentials: Bilingual,
  bio: Bilingual,
  shortBio: Bilingual,
  photo: z.string().nullable(),
  monogram: Bilingual,
  departments: z.array(z.string()),
  languages: z.array(z.enum(['ar', 'en', 'tr', 'fr', 'de'])),
  education: z.array(Bilingual),
  notableMatters: z.array(Bilingual),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?\d+$/).optional(),
  isFounder: z.boolean().optional()
});

const ClientCompany = z.object({
  name: z.string().min(1),
  arabicName: z.string().optional()
});

const ClientCountry = z.object({
  code: z.enum(['DE', 'TR', 'JO', 'SY']),
  name: Bilingual,
  companies: z.array(ClientCompany).min(1)
});

function fail(label: string, error: unknown): never {
  console.error(`✗ ${label} failed validation:`);
  console.error(error);
  process.exit(1);
}

let errors = 0;
function check(label: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${label}`);
  } catch (e) {
    errors++;
    console.error(`✗ ${label}`);
    console.error(e);
  }
}

check('firm.ts', () => Firm.parse(firm));
check('departments.ts', () => z.array(Department).parse(departments));
check('lawyers.ts', () => z.array(Lawyer).parse(lawyers));
check('clients.ts', () => z.array(ClientCountry).parse(clientCountries));

// Cross-reference checks
check('departments → lead lawyer slug exists', () => {
  for (const d of departments) {
    if (!lawyers.find((l) => l.slug === d.leadLawyerSlug)) {
      throw new Error(`Department "${d.slug}" references missing lawyer "${d.leadLawyerSlug}"`);
    }
  }
});

check('lawyers → department slugs exist', () => {
  for (const l of lawyers) {
    for (const ds of l.departments) {
      if (!departments.find((d) => d.slug === ds)) {
        throw new Error(`Lawyer "${l.slug}" references missing department "${ds}"`);
      }
    }
  }
});

check('firm.founderSlug points to a real lawyer with isFounder=true', () => {
  const founder = lawyers.find((l) => l.slug === firm.founderSlug);
  if (!founder) throw new Error(`firm.founderSlug "${firm.founderSlug}" not found in lawyers.ts`);
  if (!founder.isFounder) throw new Error(`Lawyer "${founder.slug}" is referenced as founder but isFounder is not true`);
});

if (errors > 0) {
  console.error(`\n${errors} validation error(s).`);
  process.exit(1);
}
console.log('\nAll data files valid.');
```

- [ ] **Step 2: Run the validator**

```bash
npm run validate-data
```

Expected output:
```
✓ firm.ts
✓ departments.ts
✓ lawyers.ts
✓ clients.ts
✓ departments → lead lawyer slug exists
✓ lawyers → department slugs exist
✓ firm.founderSlug points to a real lawyer with isFounder=true

All data files valid.
```

- [ ] **Step 3: Commit**

```bash
git add scripts && git commit -m "feat(data): zod-based validation script with cross-reference checks"
```

---

## Phase 3 — UI primitives

### Task 3.1: Build small reusable UI primitives

**Files:**
- Create: `components/ui/Container.tsx`
- Create: `components/ui/Eyebrow.tsx`
- Create: `components/ui/Heading.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Divider.tsx`

- [ ] **Step 1: Write `components/ui/Container.tsx`**

```tsx
import clsx from 'clsx';

export function Container({
  children,
  className,
  as: Tag = 'div'
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return <Tag className={clsx('container-page', className)}>{children}</Tag>;
}
```

- [ ] **Step 2: Write `components/ui/Eyebrow.tsx`**

```tsx
import clsx from 'clsx';

export function Eyebrow({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={clsx('eyebrow', className)}>{children}</p>;
}
```

- [ ] **Step 3: Write `components/ui/Heading.tsx`**

```tsx
import clsx from 'clsx';

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
  asArabic?: boolean;
};

const sizeMap = {
  lg: 'text-lg md:text-xl',
  xl: 'text-xl md:text-2xl',
  '2xl': 'text-2xl md:text-3xl',
  '3xl': 'text-3xl md:text-4xl',
  '4xl': 'text-3xl md:text-4xl lg:text-5xl',
  '5xl': 'text-4xl md:text-5xl lg:text-5xl'
};

export function Heading({
  children,
  level = 2,
  size = '3xl',
  className,
  asArabic
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={clsx(
        asArabic ? 'font-arabic font-bold' : 'font-display font-semibold',
        'leading-tight text-cream',
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 4: Write `components/ui/Button.tsx`**

```tsx
import clsx from 'clsx';
import { Link } from '@/i18n/routing';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-gold text-ink-deep hover:bg-gold-bright transition-colors duration-200',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-ink-deep transition-colors duration-200',
  ghost: 'text-gold hover:text-gold-bright transition-colors duration-200'
};

const sizeClass: Record<Size, string> = {
  md: 'px-5 py-2.5 text-xs uppercase tracking-eyebrow font-semibold',
  lg: 'px-7 py-3.5 text-xs uppercase tracking-eyebrow font-semibold'
};

type ButtonAsButton = {
  as?: 'button';
  href?: never;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentProps<'button'>;

type ButtonAsLink = {
  as: 'link';
  href: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className } = props;
  const cls = clsx(
    'inline-flex items-center justify-center gap-2',
    variantClass[variant],
    sizeClass[size],
    className
  );

  if (props.as === 'link') {
    if (props.external) {
      return (
        <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, children: _c, className: _cl, as: _a, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 5: Write `components/ui/Divider.tsx`**

```tsx
import clsx from 'clsx';

export function Divider({
  variant = 'gold-short',
  className
}: {
  variant?: 'gold-short' | 'gold-full' | 'line-full';
  className?: string;
}) {
  const variantClass = {
    'gold-short': 'h-px w-12 bg-gold',
    'gold-full': 'h-px w-full bg-gold',
    'line-full': 'h-px w-full bg-ink-line'
  };
  return <span className={clsx('block', variantClass[variant], className)} aria-hidden="true" />;
}
```

- [ ] **Step 6: Verify**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/ui && git commit -m "feat(ui): primitive components — Container, Eyebrow, Heading, Button, Divider"
```

---

### Task 3.2: Build the department icon set

**Files:**
- Create: `components/icons/DepartmentIcon.tsx`

- [ ] **Step 1: Write `components/icons/DepartmentIcon.tsx`**

```tsx
import type { Department } from '@/data/types';

const stroke = '#C9A961';
const strokeWidth = 1.4;

const icons: Record<Department['iconKey'], React.ReactNode> = {
  corporate: (
    <>
      <rect x="6" y="14" width="36" height="26" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M6 22 H42" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M18 14 V8 H30 V14" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M22 30 H26" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  litigation: (
    <>
      <path d="M12 36 H36" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M24 36 V24" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M16 24 H32" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M14 24 L24 14 L34 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 19 L29 9" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M28 8 L32 12" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  labor: (
    <>
      <circle cx="18" cy="16" r="5" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M9 36 C9 28 12 24 18 24 C24 24 27 28 27 36" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="32" cy="20" r="4" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M26 36 C26 30 28 27 32 27 C36 27 38 30 38 36" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M32 32 L34 34 L38 30" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tax: (
    <>
      <rect x="10" y="8" width="28" height="32" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M14 16 H34" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="17" cy="22" r="1.4" fill={stroke} />
      <circle cx="22" cy="22" r="1.4" fill={stroke} />
      <circle cx="27" cy="22" r="1.4" fill={stroke} />
      <circle cx="32" cy="22" r="1.4" fill={stroke} />
      <path d="M16 28 H22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M16 33 H30" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  ip: (
    <>
      <path d="M24 6 L36 12 V24 C36 32 30 38 24 42 C18 38 12 32 12 24 V12 Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="24" cy="22" r="6" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <text x="24" y="26" fontSize="9" fill={stroke} textAnchor="middle" fontFamily="serif" fontWeight="500">R</text>
    </>
  ),
  translation: (
    <>
      <rect x="8" y="10" width="24" height="30" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M14 18 H26" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M14 24 H22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="36" cy="32" r="8" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M28 32 H44" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M36 24 C40 28 40 36 36 40 C32 36 32 28 36 24 Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </>
  )
};

export function DepartmentIcon({
  iconKey,
  size = 48,
  className
}: {
  iconKey: Department['iconKey'];
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {icons[iconKey]}
    </svg>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/icons && git commit -m "feat(ui): line-style gold icon set for the six departments"
```

---

### Task 3.3: Build the brand mark and contact icons

**Files:**
- Create: `components/icons/BrandMark.tsx`
- Create: `components/icons/ContactIcons.tsx`

- [ ] **Step 1: Write `components/icons/BrandMark.tsx`** (a clean SVG version of the gavel + scales logo styled in gold)

```tsx
export function BrandMark({
  size = 56,
  className
}: {
  size?: number;
  className?: string;
}) {
  const stroke = '#C9A961';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Gavel head + handle */}
      <rect
        x="6"
        y="12"
        width="22"
        height="10"
        rx="1"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        transform="rotate(-30 17 17)"
      />
      <rect
        x="14"
        y="22"
        width="6"
        height="20"
        rx="1"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        transform="rotate(-30 17 32)"
      />

      {/* Vertical post and base */}
      <path d="M40 14 V46" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="32" y="46" width="20" height="6" rx="1" fill="none" stroke={stroke} strokeWidth="1.8" />
      <path d="M36 46 V42 H48 V46" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />

      {/* Scales beam + arrowhead */}
      <path d="M30 18 H54 L58 14" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 14 L55 13 L57 11" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right pan */}
      <path d="M46 18 V24" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M42 24 L50 24 L48 30 L44 30 Z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Write `components/icons/ContactIcons.tsx`**

```tsx
const stroke = '#C9A961';
const strokeWidth = 1.4;

type IconProps = { size?: number; className?: string };

export function PinIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21 C8 16 5 13 5 9 A7 7 0 0 1 19 9 C19 13 16 16 12 21 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function PhoneIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5 C5 4 6 3 7 3 H9 L11 8 L8.5 9.5 C9.5 12 12 14.5 14.5 15.5 L16 13 L21 15 V17 C21 18 20 19 19 19 C11 19 5 13 5 5 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function MobileIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="12" cy="18" r="0.8" fill={stroke} />
    </svg>
  );
}

export function MailIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="1" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M3 7 L12 13 L21 7" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 21 L4.5 16 A8 8 0 1 1 8 19.5 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M9 9 C9 12 11 14 14 15 L16 13 L18 14 V16 C16 17 14 17 12 16 C10 15 8 13 7 11 C6 9 7 7 8 6 L10 7 L9 9 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12 H19" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M13 6 L19 12 L13 18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/icons && git commit -m "feat(ui): brand mark and contact icon set in gold"
```

---

## Phase 4 — Layout chrome (nav and footer)

### Task 4.1: Build the language toggle component

**Files:**
- Create: `components/layout/LanguageToggle.tsx`

- [ ] **Step 1: Write `components/layout/LanguageToggle.tsx`**

```tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import clsx from 'clsx';

export function LanguageToggle({ className }: { className?: string }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(() => {
          router.replace(pathname, { locale: otherLocale });
        });
      }}
      disabled={pending}
      aria-label={t('switchLanguage')}
      className={clsx(
        'text-xs font-semibold uppercase tracking-eyebrow text-cream-muted',
        'hover:text-gold transition-colors duration-200',
        'disabled:opacity-50',
        className
      )}
    >
      {t('switchLanguage')}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/LanguageToggle.tsx && git commit -m "feat(layout): language toggle component"
```

---

### Task 4.2: Build the top navigation bar

**Files:**
- Create: `components/layout/TopNav.tsx`

- [ ] **Step 1: Write `components/layout/TopNav.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/icons/BrandMark';
import { LanguageToggle } from './LanguageToggle';

export function TopNav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t('about') },
    { href: '#departments', label: t('departments') },
    { href: '#clients', label: t('clients') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink-deep/80 backdrop-blur-md border-b border-gold/30'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label="Alkourabi Law Firm">
          <span className="rounded-sm border border-gold p-1.5">
            <BrandMark size={32} />
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-eyebrow text-cream-muted hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-5">
          <LanguageToggle className="hidden md:inline" />
          <Button as="link" href="#contact" variant="outline" size="md" className="hidden md:inline-flex">
            {t('contact')}
          </Button>

          <button
            type="button"
            className="lg:hidden text-cream"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6 L18 18 M6 18 L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gold/20 bg-ink-deep/95 backdrop-blur-md">
          <Container className="py-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold uppercase tracking-eyebrow text-cream-muted hover:text-gold py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-ink-line">
              <LanguageToggle />
              <Button as="link" href="#contact" variant="primary" size="md" onClick={() => setMobileOpen(false) as never}>
                {t('contact')}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
```

(Note: the `onClick` attribute on the Button-as-link variant doesn't currently take a callback in the type. We'll fix the Button type to accept it.)

- [ ] **Step 2: Update `components/ui/Button.tsx` to accept `onClick` on the link variant**

Replace the `ButtonAsLink` type with:

```ts
type ButtonAsLink = {
  as: 'link';
  href: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
```

And in the Link branch of the Button function, wire it through:

```tsx
return (
  <Link href={props.href} className={cls} onClick={props.onClick}>
    {children}
  </Link>
);
```

Update the external `<a>` branch likewise:

```tsx
return (
  <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer" onClick={props.onClick}>
    {children}
  </a>
);
```

- [ ] **Step 3: Verify**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/TopNav.tsx components/ui/Button.tsx && git commit -m "feat(layout): top navigation with sticky scroll, mobile menu, language toggle"
```

---

### Task 4.3: Build the footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Write `components/layout/Footer.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { BrandMark } from '@/components/icons/BrandMark';
import { firm } from '@/data/firm';

export function Footer() {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('nav');

  return (
    <footer className="bg-ink-elevated border-t border-ink-line">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <span className="inline-block rounded-sm border border-gold p-1.5">
              <BrandMark size={36} />
            </span>
            <p className="mt-5 text-sm text-cream-muted leading-relaxed">
              {firm.name[locale]}
            </p>
          </div>

          {/* Sitemap column */}
          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-5">Sitemap</p>
            <ul className="space-y-3 text-sm text-cream-muted">
              <li><a href="#about" className="hover:text-gold transition">{t('about')}</a></li>
              <li><a href="#departments" className="hover:text-gold transition">{t('departments')}</a></li>
              <li><a href="#clients" className="hover:text-gold transition">{t('clients')}</a></li>
              <li><a href="#contact" className="hover:text-gold transition">{t('contact')}</a></li>
            </ul>
          </nav>

          {/* Hours + contact column */}
          <div>
            <p className="eyebrow mb-5">{locale === 'ar' ? 'ساعات العمل' : 'Office hours'}</p>
            <p className="text-sm text-cream mb-1">{firm.hours[locale]}</p>
            <p className="text-xs text-cream-muted">
              {locale === 'ar' ? 'الجمعة والسبت — مغلق' : 'Friday & Saturday — closed'}
            </p>

            <Divider variant="line-full" className="my-6" />

            <p className="text-xs text-cream-muted leading-relaxed">{firm.address[locale]}</p>
            <p className="mt-3 text-sm">
              <a href={`mailto:${firm.email}`} className="text-gold hover:text-gold-bright" dir="ltr">{firm.email}</a>
            </p>
            <p className="mt-1 text-sm">
              <a href={`tel:${firm.mobile}`} className="text-gold hover:text-gold-bright" dir="ltr">{firm.mobile}</a>
            </p>
          </div>
        </div>

        <Divider variant="line-full" className="my-10" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-cream-muted">
          <p>
            © 2026 {firm.shortName[locale]}.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6">
            <a href={`/${locale}/legal/privacy/`} className="hover:text-gold">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy'}
            </a>
            <a href={`/${locale}/legal/terms/`} className="hover:text-gold">
              {locale === 'ar' ? 'شروط الاستخدام' : 'Terms'}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx && git commit -m "feat(layout): footer with sitemap, hours, address, and bottom bar"
```

---

## Phase 5 — Homepage sections

### Task 5.1: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `public/images/lady-justice.jpg` (copy from `source-assets/lady.jpg`)

- [ ] **Step 1: Copy hero image into public folder**

```bash
mkdir -p public/images && cp "source-assets/lady.jpg" public/images/lady-justice.jpg
```

- [ ] **Step 2: Write `components/sections/Hero.tsx`**

```tsx
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { firm } from '@/data/firm';

export function Hero() {
  const locale = useLocale() as 'ar' | 'en';
  const t = useTranslations('meta');
  const isAr = locale === 'ar';

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* faint geometric background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #C9A961 1px, transparent 1px), radial-gradient(circle at 70% 80%, #C9A961 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <Container className="relative grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Text column */}
        <div>
          <Eyebrow className="mb-6">{firm.name[locale]}</Eyebrow>
          <Heading
            level={1}
            size="5xl"
            asArabic={isAr}
            className="text-cream"
          >
            {t('tagline')}
          </Heading>
          <Divider className="my-8" />
          <p className="max-w-xl text-base text-cream-muted leading-relaxed">
            {isAr
              ? 'حلول قانونية ومالية متكاملة للشركات المحلية والدولية، بإشراف المحامي المؤسس الأستاذ أحمد القربي.'
              : 'Comprehensive legal and financial solutions for local and international companies, led by founding attorney Ahmad Alkourabi.'}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button as="link" href="#departments" variant="primary" size="lg">
              {isAr ? 'اكتشف خدماتنا' : 'Our services'}
            </Button>
            <Button as="link" href="#contact" variant="outline" size="lg">
              {isAr ? 'تواصل معنا' : 'Get in touch'}
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none">
          <div className="absolute inset-0 rounded-sm overflow-hidden border border-gold/40">
            <Image
              src="/images/lady-justice.jpg"
              alt={isAr ? 'تمثال العدالة' : 'Lady Justice'}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'sepia(0.15) saturate(0.85) brightness(0.95)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(201,169,97,0.35), transparent 60%), linear-gradient(to bottom, transparent 50%, rgba(10,22,40,0.55))'
              }}
            />
          </div>
          {/* corner ornaments */}
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add public/images components/sections/Hero.tsx && git commit -m "feat(sections): hero with Lady Justice imagery and bilingual headline"
```

---

### Task 5.2: Identity strip (numeric stats)

**Files:**
- Create: `components/sections/IdentityStrip.tsx`

- [ ] **Step 1: Write `components/sections/IdentityStrip.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';

export function IdentityStrip() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';

  const stats = [
    { value: '2018', label: isAr ? 'تأسيس المكتب' : 'Founded' },
    { value: '6', label: isAr ? 'أقسام تخصصية' : 'Specialized departments' },
    { value: '+10', label: isAr ? 'موكلون دوليون' : 'International clients' },
    { value: '4', label: isAr ? 'دول تخدمها' : 'Countries served' }
  ];

  return (
    <section className="border-y border-ink-line bg-ink-elevated py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-ink-line rtl:md:divide-x-reverse">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:px-6">
              <p
                className={
                  isAr
                    ? 'font-arabic font-extrabold text-3xl md:text-4xl text-gold'
                    : 'font-display font-semibold text-3xl md:text-4xl text-gold'
                }
                dir="ltr"
              >
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-eyebrow text-cream-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/IdentityStrip.tsx && git commit -m "feat(sections): identity strip with founding year and counts"
```

---

### Task 5.3: About the firm section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Write `components/sections/About.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';

export function About() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';

  return (
    <section id="about" className="py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <Eyebrow>{isAr ? 'من نحن' : 'About us'}</Eyebrow>
        <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
          {isAr
            ? 'خبرة قانونية متكاملة في قلب دمشق'
            : 'Comprehensive legal expertise in the heart of Damascus'}
        </Heading>
        <div className="mx-auto mt-8 flex justify-center"><Divider /></div>
        <div className="mt-10 space-y-6 text-cream-muted leading-relaxed">
          {isAr ? (
            <>
              <p>
                منذ تأسيسه عام 2018، نجح مكتب القربي في ترسيخ مكانته كشريك قانوني رائد وموثوق في سوريا. نحن متخصصون في تقديم حلول قانونية ومالية متكاملة للشركات المحلية والدولية، مع التركيز على حماية مصالح الموكلين وضمان الامتثال التام للقوانين السورية المعقدة من خلال أقسامنا التخصصية.
              </p>
              <p>
                نخدم نخبة من الوكالات والشركات العالمية والإقليمية من ألمانيا، وتركيا، والأردن، إلى جانب موكلينا في السوق السورية.
              </p>
            </>
          ) : (
            <>
              <p>
                Since its establishment in 2018, Alkourabi Law Firm has positioned itself as a leading and trusted legal partner in Syria. We provide comprehensive legal and financial solutions to local and international companies, with a focus on safeguarding clients&apos; interests and ensuring full compliance with the complex Syrian legal framework through our specialized departments.
              </p>
              <p>
                We serve a distinguished portfolio of international and regional agencies and companies from Germany, Türkiye, and Jordan — alongside our clients in the Syrian market.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx && git commit -m "feat(sections): about the firm with bilingual positioning copy"
```

---

### Task 5.4: Founder spotlight

**Files:**
- Create: `components/sections/FounderSpotlight.tsx`

- [ ] **Step 1: Write `components/sections/FounderSpotlight.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ArrowRightIcon } from '@/components/icons/ContactIcons';
import { getFounder } from '@/data/lawyers';

export function FounderSpotlight() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';
  const founder = getFounder();

  return (
    <section className="bg-ink-elevated py-24 md:py-32 border-y border-ink-line">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Photo / monogram column */}
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none border border-gold/40 rounded-sm bg-ink-deep flex items-center justify-center relative overflow-hidden">
            <span
              className="font-display text-[8rem] md:text-[10rem] text-gold/90 select-none"
              dir="ltr"
            >
              {founder.monogram[locale]}
            </span>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(201,169,97,0.18), transparent 65%)'
              }}
            />
          </div>
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>

        {/* Text column */}
        <div>
          <Eyebrow>{founder.title[locale]}</Eyebrow>
          <Heading level={2} size="3xl" asArabic={isAr} className="mt-4">
            {founder.name[locale]}
          </Heading>
          <p className="mt-3 text-sm text-cream-muted">{founder.credentials[locale]}</p>
          <Divider className="my-6" />
          <p className="text-cream-muted leading-relaxed">{founder.shortBio[locale]}</p>

          <div className="mt-8">
            <Button as="link" href={`/lawyer/${founder.slug}/`} variant="outline" size="lg">
              {isAr ? 'السيرة الكاملة' : 'Read full profile'}
              <ArrowRightIcon className={isAr ? 'rotate-180' : ''} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/FounderSpotlight.tsx && git commit -m "feat(sections): founder spotlight with monogram and link to profile"
```

---

### Task 5.5: Department card and departments grid

**Files:**
- Create: `components/cards/DepartmentCard.tsx`
- Create: `components/sections/Departments.tsx`

- [ ] **Step 1: Write `components/cards/DepartmentCard.tsx`**

```tsx
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DepartmentIcon } from '@/components/icons/DepartmentIcon';
import { ArrowRightIcon } from '@/components/icons/ContactIcons';
import type { Department, Lawyer } from '@/data/types';

export function DepartmentCard({
  department,
  lawyer
}: {
  department: Department;
  lawyer: Lawyer;
}) {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';
  const t = useTranslations('common');

  return (
    <Link
      href={{ pathname: `/lawyer/${lawyer.slug}`, query: { dept: department.slug } } as never}
      className="group flex h-full flex-col rounded-sm border border-ink-line bg-ink-elevated p-7 transition-all duration-300 hover:border-gold hover:bg-ink-elevated/70 focus-visible:border-gold"
    >
      <div className="flex items-start justify-between">
        <DepartmentIcon iconKey={department.iconKey} className="transition-transform duration-300 group-hover:scale-105" />
      </div>

      <h3
        className={
          isAr
            ? 'mt-6 font-arabic font-bold text-xl text-cream'
            : 'mt-6 font-display font-semibold text-xl text-cream'
        }
      >
        {department.name[locale]}
      </h3>
      <span className="mt-3 block h-px w-10 bg-gold" />

      <p className="mt-5 text-sm text-cream-muted leading-relaxed flex-1">
        {department.shortDescription[locale]}
      </p>

      {/* Lawyer strip */}
      <div className="mt-6 pt-5 border-t border-ink-line transition-all duration-300 group-hover:border-gold/60">
        <p className="text-2xs uppercase tracking-eyebrow text-cream-muted">
          {t('responsibleLawyer')}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={isAr ? 'font-arabic text-sm text-cream' : 'text-sm text-cream'}>
            {lawyer.name[locale]}
          </p>
          <ArrowRightIcon className={`transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Write `components/sections/Departments.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { DepartmentCard } from '@/components/cards/DepartmentCard';
import { departments } from '@/data/departments';
import { lawyers, getLawyerBySlug } from '@/data/lawyers';

export function Departments() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';

  return (
    <section id="departments" className="py-24 md:py-32">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>{isAr ? 'خدماتنا' : 'Our services'}</Eyebrow>
          <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
            {isAr ? 'أقسامنا التخصصية' : 'Our specialized departments'}
          </Heading>
          <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
          <p className="mt-8 text-cream-muted">
            {isAr
              ? 'منظومة قانونية ومالية متكاملة تتيح للشركة الواحدة إدارة كل شؤونها تحت سقف واحد.'
              : 'A unified legal and financial system that lets a single company manage all its affairs under one roof.'}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => {
            const lawyer = getLawyerBySlug(dept.leadLawyerSlug) ?? lawyers[0];
            return <DepartmentCard key={dept.slug} department={dept} lawyer={lawyer} />;
          })}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/cards components/sections/Departments.tsx && git commit -m "feat(sections): department grid with cards linking to responsible lawyer"
```

---

### Task 5.6: Clients section (text-only)

**Files:**
- Create: `components/sections/Clients.tsx`

- [ ] **Step 1: Write `components/sections/Clients.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { clientCountries } from '@/data/clients';

export function Clients() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';

  return (
    <section id="clients" className="bg-ink-elevated py-24 md:py-32 border-y border-ink-line">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>{isAr ? 'موكلونا' : 'Our clients'}</Eyebrow>
          <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
            {isAr ? 'أبرز موكلينا' : 'Our distinguished clients'}
          </Heading>
          <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
          <p className="mt-8 text-cream-muted">
            {isAr
              ? 'نفخر بتمثيل نخبة من الوكالات والشركات العالمية والإقليمية.'
              : 'We are proud to represent leading international and regional agencies and companies.'}
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {clientCountries.map((country) => (
            <article
              key={country.code}
              className="rounded-sm border border-ink-line bg-ink-deep p-7 transition-colors duration-300 hover:border-gold/60"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-sm border border-gold px-2 text-2xs font-semibold uppercase tracking-eyebrow text-gold"
                  dir="ltr"
                >
                  {country.code}
                </span>
                <h3 className={isAr ? 'font-arabic font-bold text-lg text-cream' : 'font-display font-semibold text-lg text-cream'}>
                  {country.name[locale]}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-cream">
                {country.companies.map((company, i) => (
                  <li key={company.name} className="flex items-center gap-3">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />}
                    <span
                      className={isAr && company.arabicName ? 'font-arabic text-base' : 'font-display text-base italic'}
                      dir={isAr && company.arabicName ? 'rtl' : 'ltr'}
                    >
                      {isAr && company.arabicName ? company.arabicName : company.name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Clients.tsx && git commit -m "feat(sections): clients by country, text-only treatment"
```

---

### Task 5.7: Contact form component

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `components/forms/ContactForm.tsx`

- [ ] **Step 1: Write `components/forms/ContactForm.tsx`**

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  company: z.string().optional(),
  country: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  /** honeypot — should always be empty */
  website: z.string().max(0).optional()
});

type FormValues = z.infer<typeof Schema>;

const labels = {
  ar: {
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    company: 'الشركة (اختياري)',
    country: 'الدولة (اختياري)',
    subject: 'الموضوع',
    message: 'رسالتك',
    submit: 'أرسل الرسالة',
    sending: 'جارٍ الإرسال…',
    success: 'تم استلام رسالتك. سنعود إليك قريباً.',
    error: 'تعذّر إرسال الرسالة. يرجى المحاولة لاحقاً أو الاتصال بنا مباشرة.'
  },
  en: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company (optional)',
    country: 'Country (optional)',
    subject: 'Subject',
    message: 'Your message',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Your message has been received. We will be in touch soon.',
    error: 'We could not send your message. Please try again later or contact us directly.'
  }
} as const;

export function ContactForm() {
  const locale = useLocale() as 'ar' | 'en';
  const L = labels[locale];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(Schema)
  });

  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const inputCls =
    'mt-2 w-full rounded-sm border border-ink-line bg-ink-deep px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold focus:outline-none focus-visible:outline-none';
  const labelCls = 'block text-2xs font-semibold uppercase tracking-eyebrow text-cream-muted';
  const errCls = 'mt-1 text-2xs text-red-300';

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          const res = await fetch('/contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(values as Record<string, string>).toString()
          });
          if (!res.ok) throw new Error('Bad status');
          setStatus('success');
          reset();
        } catch {
          setStatus('error');
        }
      })}
      className="grid gap-5 md:grid-cols-2"
      noValidate
    >
      {/* honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div>
        <label className={labelCls}>{L.name}<span className="text-gold">*</span></label>
        <input type="text" autoComplete="name" className={inputCls} {...register('name')} />
        {errors.name && <p className={errCls}>{L.name}</p>}
      </div>

      <div>
        <label className={labelCls}>{L.email}<span className="text-gold">*</span></label>
        <input type="email" autoComplete="email" dir="ltr" className={inputCls} {...register('email')} />
        {errors.email && <p className={errCls}>{L.email}</p>}
      </div>

      <div>
        <label className={labelCls}>{L.phone}<span className="text-gold">*</span></label>
        <input type="tel" autoComplete="tel" dir="ltr" className={inputCls} {...register('phone')} />
        {errors.phone && <p className={errCls}>{L.phone}</p>}
      </div>

      <div>
        <label className={labelCls}>{L.company}</label>
        <input type="text" autoComplete="organization" className={inputCls} {...register('company')} />
      </div>

      <div>
        <label className={labelCls}>{L.country}</label>
        <input type="text" autoComplete="country-name" className={inputCls} {...register('country')} />
      </div>

      <div>
        <label className={labelCls}>{L.subject}<span className="text-gold">*</span></label>
        <input type="text" className={inputCls} {...register('subject')} />
        {errors.subject && <p className={errCls}>{L.subject}</p>}
      </div>

      <div className="md:col-span-2">
        <label className={labelCls}>{L.message}<span className="text-gold">*</span></label>
        <textarea rows={5} className={inputCls} {...register('message')} />
        {errors.message && <p className={errCls}>{L.message}</p>}
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button as="button" type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? L.sending : L.submit}
        </Button>

        {status === 'success' && (
          <p className="text-sm text-gold-bright" role="status" aria-live="polite">{L.success}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-300" role="alert">{L.error}</p>
        )}
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Write `components/sections/Contact.tsx`**

```tsx
import { useLocale } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { ContactForm } from '@/components/forms/ContactForm';
import { PinIcon, PhoneIcon, MobileIcon, MailIcon, WhatsAppIcon } from '@/components/icons/ContactIcons';
import { firm } from '@/data/firm';

export function Contact() {
  const locale = useLocale() as 'ar' | 'en';
  const isAr = locale === 'ar';

  const items = [
    { Icon: PinIcon, label: isAr ? 'العنوان' : 'Address', value: firm.address[locale], href: undefined },
    { Icon: PhoneIcon, label: isAr ? 'الهاتف الأرضي' : 'Landline', value: firm.phone, href: `tel:${firm.phone}` },
    { Icon: MobileIcon, label: isAr ? 'الموبايل' : 'Mobile', value: firm.mobile, href: `tel:${firm.mobile}` },
    { Icon: WhatsAppIcon, label: 'WhatsApp', value: firm.mobile, href: `https://wa.me/${firm.whatsappNumber}` },
    { Icon: MailIcon, label: isAr ? 'البريد الإلكتروني' : 'Email', value: firm.email, href: `mailto:${firm.email}` }
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>{isAr ? 'تواصل معنا' : 'Get in touch'}</Eyebrow>
          <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
            {isAr ? 'حدّثنا عن قضيّتك' : 'Tell us about your matter'}
          </Heading>
          <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Info */}
          <div>
            <ul className="space-y-6">
              {items.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <Icon className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-2xs uppercase tracking-eyebrow text-cream-muted">{label}</p>
                    {href ? (
                      <a href={href} dir="ltr" className="mt-1 block text-sm text-cream hover:text-gold transition">{value}</a>
                    ) : (
                      <p className="mt-1 text-sm text-cream leading-relaxed">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-sm border border-ink-line">
              <iframe
                title={isAr ? 'موقع المكتب' : 'Office location'}
                src={`https://www.google.com/maps?q=${encodeURIComponent(firm.mapsQuery)}&output=embed`}
                width="100%"
                height="240"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-sm border border-ink-line bg-ink-elevated p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/forms components/sections/Contact.tsx && git commit -m "feat(sections): contact section with info, embedded map, and form"
```

---

### Task 5.8: Compose the homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Replace stub homepage with full composition**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { IdentityStrip } from '@/components/sections/IdentityStrip';
import { About } from '@/components/sections/About';
import { FounderSpotlight } from '@/components/sections/FounderSpotlight';
import { Departments } from '@/components/sections/Departments';
import { Clients } from '@/components/sections/Clients';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <IdentityStrip />
        <About />
        <FounderSpotlight />
        <Departments />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Run dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000/ar/` and `http://localhost:3000/en/`. Verify:
- All 7 sections render without runtime errors.
- Arabic page is RTL; English is LTR.
- Department cards are clickable and navigate to `/ar/lawyer/ahmad-alkourabi/?dept=...` (will 404 until the lawyer page is built — that is expected).
- Language toggle in nav switches between locales.

Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx && git commit -m "feat(home): compose homepage from all sections"
```

---

## Phase 6 — Lawyer profile page

### Task 6.1: Lawyer profile page

**Files:**
- Create: `app/[locale]/lawyer/[slug]/page.tsx`
- Create: `components/sections/LawyerHero.tsx`
- Create: `components/sections/LawyerBody.tsx`

- [ ] **Step 1: Write `components/sections/LawyerHero.tsx`**

```tsx
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons/ContactIcons';
import type { Lawyer } from '@/data/types';
import { firm } from '@/data/firm';

export function LawyerHero({ lawyer, locale }: { lawyer: Lawyer; locale: 'ar' | 'en' }) {
  const isAr = locale === 'ar';
  const phone = lawyer.phone ?? firm.mobile;
  const email = lawyer.email ?? firm.email;
  const whatsappNumber = (lawyer.phone ?? firm.mobile).replace(/\D/g, '');

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-ink-line">
      <Container className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none border border-gold/40 rounded-sm bg-ink-elevated flex items-center justify-center relative overflow-hidden">
            <span className="font-display text-[7rem] md:text-[8rem] text-gold/90 select-none" dir="ltr">
              {lawyer.monogram[locale]}
            </span>
          </div>
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>

        <div>
          <Eyebrow>{lawyer.title[locale]}</Eyebrow>
          <Heading level={1} size="4xl" asArabic={isAr} className="mt-4">
            {lawyer.name[locale]}
          </Heading>
          <p className="mt-3 text-sm text-cream-muted">{lawyer.credentials[locale]}</p>
          <Divider className="my-7" />
          <p className="text-cream-muted leading-relaxed max-w-2xl">{lawyer.shortBio[locale]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="link" external href={`mailto:${email}`} variant="primary" size="md">
              <MailIcon size={16} /> {isAr ? 'راسلني' : 'Email'}
            </Button>
            <Button as="link" external href={`tel:${phone}`} variant="outline" size="md">
              <PhoneIcon size={16} /> {isAr ? 'اتصل بي' : 'Call'}
            </Button>
            <Button as="link" external href={`https://wa.me/${whatsappNumber}`} variant="outline" size="md">
              <WhatsAppIcon size={16} /> WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/sections/LawyerBody.tsx`**

```tsx
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/i18n/routing';
import type { Lawyer } from '@/data/types';
import { departments } from '@/data/departments';

const languageNames = {
  ar: { ar: 'العربية', en: 'الإنكليزية', tr: 'التركية', fr: 'الفرنسية', de: 'الألمانية' },
  en: { ar: 'Arabic', en: 'English', tr: 'Turkish', fr: 'French', de: 'German' }
} as const;

export function LawyerBody({ lawyer, locale }: { lawyer: Lawyer; locale: 'ar' | 'en' }) {
  const isAr = locale === 'ar';
  const ledDepartments = departments.filter((d) => lawyer.departments.includes(d.slug));

  const sections = [
    { id: 'about', label: isAr ? 'نبذة' : 'About' },
    { id: 'departments', label: isAr ? 'الأقسام' : 'Departments led' },
    { id: 'matters', label: isAr ? 'أبرز الأعمال' : 'Notable matters' },
    { id: 'education', label: isAr ? 'الشهادات' : 'Education' },
    { id: 'languages', label: isAr ? 'اللغات' : 'Languages' }
  ];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.25fr_0.75fr]">
        {/* Side nav */}
        <aside className="lg:sticky lg:top-28 lg:self-start lg:h-fit">
          <p className="eyebrow mb-5">{isAr ? 'الفهرس' : 'On this page'}</p>
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-cream-muted hover:text-gold transition">{s.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Body */}
        <div className="space-y-16">
          <div id="about">
            <Eyebrow>{isAr ? 'نبذة' : 'About'}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {isAr ? 'الخلفية المهنية' : 'Professional background'}
            </Heading>
            <Divider className="my-5" />
            <p className="text-cream-muted leading-relaxed whitespace-pre-line">{lawyer.bio[locale]}</p>
          </div>

          <div id="departments">
            <Eyebrow>{isAr ? 'الأقسام التي يقودها' : 'Departments led'}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {isAr ? `يقود ${ledDepartments.length} ${ledDepartments.length > 1 ? 'أقسام' : 'قسم'}` : `Leads ${ledDepartments.length} department${ledDepartments.length > 1 ? 's' : ''}`}
            </Heading>
            <Divider className="my-5" />
            <ul className="grid gap-3 md:grid-cols-2">
              {ledDepartments.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/#departments` as never}
                    className="block rounded-sm border border-ink-line bg-ink-elevated p-5 hover:border-gold transition"
                  >
                    <p className={isAr ? 'font-arabic text-base text-cream' : 'font-display text-base text-cream'}>
                      {d.name[locale]}
                    </p>
                    <p className="mt-2 text-xs text-cream-muted leading-relaxed">{d.shortDescription[locale]}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="matters">
            <Eyebrow>{isAr ? 'أبرز الأعمال' : 'Notable matters'}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {isAr ? 'تجارب مختارة' : 'Selected representative work'}
            </Heading>
            <Divider className="my-5" />
            <ul className="space-y-4 list-none">
              {lawyer.notableMatters.map((m, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <p className="text-cream-muted leading-relaxed">{m[locale]}</p>
                </li>
              ))}
            </ul>
          </div>

          <div id="education">
            <Eyebrow>{isAr ? 'الشهادات' : 'Education'}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {isAr ? 'التحصيل العلمي' : 'Academic credentials'}
            </Heading>
            <Divider className="my-5" />
            <ul className="space-y-3 list-none">
              {lawyer.education.map((e, i) => (
                <li key={i} className="text-cream-muted">{e[locale]}</li>
              ))}
            </ul>
          </div>

          <div id="languages">
            <Eyebrow>{isAr ? 'اللغات' : 'Languages'}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {isAr ? 'لغات التواصل' : 'Working languages'}
            </Heading>
            <Divider className="my-5" />
            <ul className="flex flex-wrap gap-3">
              {lawyer.languages.map((lang) => (
                <li key={lang} className="rounded-sm border border-gold/40 bg-ink-elevated px-4 py-2 text-sm text-cream">
                  {languageNames[locale][lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Write `app/[locale]/lawyer/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { LawyerHero } from '@/components/sections/LawyerHero';
import { LawyerBody } from '@/components/sections/LawyerBody';
import { lawyers, getLawyerBySlug } from '@/data/lawyers';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    lawyers.map((l) => ({ locale, slug: l.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) return {};
  const isAr = locale === 'ar';
  return {
    title: lawyer.name[isAr ? 'ar' : 'en'],
    description: lawyer.shortBio[isAr ? 'ar' : 'en']
  };
}

export default async function LawyerPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) notFound();

  return (
    <>
      <TopNav />
      <main>
        <LawyerHero lawyer={lawyer} locale={locale as 'ar' | 'en'} />
        <LawyerBody lawyer={lawyer} locale={locale as 'ar' | 'en'} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run dev server and verify the lawyer page works**

```bash
npm run dev
```

Visit `http://localhost:3000/ar/lawyer/ahmad-alkourabi/` and `http://localhost:3000/en/lawyer/ahmad-alkourabi/`. Verify hero, side nav, and all five subsections render. Click a department card from the home page and confirm it lands on this page.

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/lawyer components/sections/Lawyer*.tsx && git commit -m "feat(lawyer): profile page with hero, side nav, and five subsections"
```

---

## Phase 7 — Legal pages, SEO, and the contact handler

### Task 7.1: Legal placeholder pages

**Files:**
- Create: `app/[locale]/legal/privacy/page.tsx`
- Create: `app/[locale]/legal/terms/page.tsx`

- [ ] **Step 1: Write `app/[locale]/legal/privacy/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  return (
    <>
      <TopNav />
      <main className="pt-32 pb-24 md:pt-40">
        <Container className="max-w-3xl">
          <Eyebrow>{isAr ? 'سياسة الخصوصية' : 'Privacy policy'}</Eyebrow>
          <Heading level={1} size="3xl" asArabic={isAr} className="mt-4">
            {isAr ? 'كيف نحمي معلوماتك' : 'How we protect your information'}
          </Heading>
          <div className="mt-8 space-y-5 text-cream-muted leading-relaxed">
            {isAr ? (
              <>
                <p>تلتزم مكتب القربي بحماية خصوصية زواره وموكليه. تجمع هذه الصفحة معلومات الاتصال التي ترسلها طوعاً عبر نموذج التواصل، وتُستخدم حصراً للرد على استفسارك.</p>
                <p>لا نشارك معلوماتك مع أي طرف ثالث، ولا نخزّنها في أي قاعدة بيانات خارجية. للاستفسار، يرجى التواصل معنا عبر البريد المذكور في صفحة التواصل.</p>
              </>
            ) : (
              <>
                <p>Alkourabi Law Firm is committed to protecting the privacy of its visitors and clients. This page collects only the contact information you voluntarily submit via the contact form, used exclusively to reply to your inquiry.</p>
                <p>We do not share your information with any third party and do not store it in any external database. For questions, please contact us via the email listed on the Contact page.</p>
              </>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Write `app/[locale]/legal/terms/page.tsx`**

```tsx
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  return (
    <>
      <TopNav />
      <main className="pt-32 pb-24 md:pt-40">
        <Container className="max-w-3xl">
          <Eyebrow>{isAr ? 'شروط الاستخدام' : 'Terms of use'}</Eyebrow>
          <Heading level={1} size="3xl" asArabic={isAr} className="mt-4">
            {isAr ? 'استخدام الموقع الإلكتروني' : 'Use of this website'}
          </Heading>
          <div className="mt-8 space-y-5 text-cream-muted leading-relaxed">
            {isAr ? (
              <>
                <p>المعلومات الواردة في هذا الموقع مقدّمة للأغراض التعريفية فقط، ولا تُعدّ استشارة قانونية. لا تنشأ علاقة موكِّل-محامٍ بين الزائر والمكتب إلا بعد توقيع وكالة رسمية.</p>
                <p>يحتفظ المكتب بحقوق الملكية الفكرية لكافة محتويات هذا الموقع. لا يُسمح بإعادة نشر أو نسخ المحتوى دون إذن خطّي مسبق.</p>
              </>
            ) : (
              <>
                <p>The information on this website is provided for informational purposes only and does not constitute legal advice. No attorney-client relationship is formed between a visitor and the firm until a formal engagement letter is signed.</p>
                <p>The firm reserves all intellectual property rights to the content of this site. Republishing or copying the content without prior written consent is not permitted.</p>
              </>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/legal && git commit -m "feat(legal): privacy and terms placeholder pages"
```

---

### Task 7.2: SEO — JSON-LD, sitemap, robots, OpenGraph image

**Files:**
- Create: `lib/seo.ts`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/opengraph-image.tsx`
- Modify: `app/[locale]/page.tsx` (add JSON-LD)
- Modify: `app/[locale]/lawyer/[slug]/page.tsx` (add JSON-LD)

- [ ] **Step 1: Write `lib/seo.ts`**

```ts
import { firm } from '@/data/firm';
import { lawyers } from '@/data/lawyers';

export function legalServiceJsonLd(locale: 'ar' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firm.name[locale],
    founder: {
      '@type': 'Person',
      name: lawyers.find((l) => l.isFounder)?.name[locale]
    },
    foundingDate: String(firm.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: firm.address[locale],
      addressLocality: 'Damascus',
      addressCountry: 'SY'
    },
    telephone: firm.phone,
    email: firm.email,
    url: 'https://kourabi.com',
    areaServed: ['SY', 'DE', 'TR', 'JO']
  };
}

export function personJsonLd(slug: string, locale: 'ar' | 'en') {
  const lawyer = lawyers.find((l) => l.slug === slug);
  if (!lawyer) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: lawyer.name[locale],
    jobTitle: lawyer.title[locale],
    worksFor: {
      '@type': 'LegalService',
      name: firm.name[locale]
    },
    description: lawyer.shortBio[locale],
    knowsLanguage: lawyer.languages,
    email: lawyer.email,
    telephone: lawyer.phone
  };
}
```

- [ ] **Step 2: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';
import { lawyers } from '@/data/lawyers';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kourabi.com';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({ url: `${base}/${locale}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 });
    for (const lawyer of lawyers) {
      entries.push({ url: `${base}/${locale}/lawyer/${lawyer.slug}/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 });
    }
    entries.push({ url: `${base}/${locale}/legal/privacy/`, changeFrequency: 'yearly', priority: 0.2 });
    entries.push({ url: `${base}/${locale}/legal/terms/`, changeFrequency: 'yearly', priority: 0.2 });
  }
  return entries;
}
```

- [ ] **Step 3: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://kourabi.com/sitemap.xml'
  };
}
```

- [ ] **Step 4: Write `app/opengraph-image.tsx`** (Next will generate a static OG image at build time)

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Alkourabi Law Firm';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F1E33 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 64
        }}
      >
        <div style={{ color: '#C9A961', fontSize: 22, letterSpacing: 8, textTransform: 'uppercase', marginBottom: 32 }}>
          Alkourabi Law Firm
        </div>
        <div style={{ color: '#F5F0E1', fontSize: 72, lineHeight: 1.1, textAlign: 'center', maxWidth: 900 }}>
          Your trusted legal partner since 2018
        </div>
        <div style={{ marginTop: 48, height: 2, width: 80, background: '#C9A961' }} />
        <div style={{ color: '#C9C2AE', fontSize: 24, marginTop: 32 }}>Damascus · Syria</div>
      </div>
    ),
    { ...size }
  );
}
```

(Note: the `edge` runtime hint produces a generated PNG at build time even with `output: 'export'`.)

- [ ] **Step 5: Add JSON-LD to homepage. Modify `app/[locale]/page.tsx`**

Add at the top (above the return):

```tsx
import { legalServiceJsonLd } from '@/lib/seo';
```

And inside the return, just before `<Footer />`, add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd(locale as 'ar' | 'en')) }}
/>
```

- [ ] **Step 6: Add JSON-LD to lawyer page. Modify `app/[locale]/lawyer/[slug]/page.tsx`**

Add at the top:

```tsx
import { personJsonLd } from '@/lib/seo';
```

And inside the return, just before `<Footer />`:

```tsx
{personJsonLd(slug, locale as 'ar' | 'en') && (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(slug, locale as 'ar' | 'en')) }}
  />
)}
```

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts app/sitemap.ts app/robots.ts app/opengraph-image.tsx app/[locale]/page.tsx app/[locale]/lawyer && git commit -m "feat(seo): JSON-LD, sitemap, robots, and OpenGraph image"
```

---

### Task 7.3: PHP contact handler

**Files:**
- Create: `public/contact.php` (Next copies `public/` contents into `out/` verbatim)

- [ ] **Step 1: Write `public/contact.php`**

```php
<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Honeypot — bots fill this; humans cannot see it
if (!empty($_POST['website'] ?? '')) {
    http_response_code(204);
    exit;
}

$required = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($required as $f) {
    if (empty(trim($_POST[$f] ?? ''))) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'missing_field', 'field' => $f]);
        exit;
    }
}

$name    = substr(trim($_POST['name']), 0, 200);
$email   = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
$phone   = substr(trim($_POST['phone']), 0, 50);
$company = substr(trim($_POST['company'] ?? ''), 0, 200);
$country = substr(trim($_POST['country'] ?? ''), 0, 100);
$subject = substr(trim($_POST['subject']), 0, 200);
$message = substr(trim($_POST['message']), 0, 4000);

if (!$email) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

// Strip newlines from header-bound fields to prevent header injection
$strip = fn($s) => str_replace(["\r", "\n", "%0a", "%0d"], '', $s);
$name = $strip($name); $email = $strip($email); $subject = $strip($subject);

$to      = 'ahmad@kourabi.com';
$mailSubject = '[Website inquiry] ' . $subject;
$body  = "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: $phone\n";
if ($company) $body .= "Company: $company\n";
if ($country) $body .= "Country: $country\n";
$body .= "Subject: $subject\n";
$body .= "----------\n";
$body .= $message . "\n";

$headers  = "From: noreply@kourabi.com\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$ok = @mail($to, $mailSubject, $body, $headers);

if ($ok) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
```

- [ ] **Step 2: Commit**

```bash
git add public/contact.php && git commit -m "feat(api): PHP contact handler with validation, honeypot, and Hostinger SMTP"
```

---

## Phase 8 — Polish, motion, and accessibility

### Task 8.1: Add scroll-reveal entrance motion

**Files:**
- Create: `components/ui/Reveal.tsx`
- Modify: section files to wrap content (Hero, About, FounderSpotlight, Departments, Clients, Contact)

- [ ] **Step 1: Write `components/ui/Reveal.tsx`**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap each section's content with `<Reveal>`** (open each section file and wrap the main content `<Container>` in `<Reveal>`). Example for `About.tsx`:

```tsx
import { Reveal } from '@/components/ui/Reveal';
// ...
return (
  <section id="about" className="py-24 md:py-32">
    <Reveal>
      <Container className="max-w-3xl text-center">
        {/* existing content */}
      </Container>
    </Reveal>
  </section>
);
```

Apply the same wrapping to: `Hero` (around the text + image columns separately, with `delay={0}` and `delay={0.15}`), `IdentityStrip` (single Reveal around the row), `FounderSpotlight` (single Reveal around the grid), `Departments` (Reveal around heading; each card already has its hover transition — leave cards un-revealed for snappier feel), `Clients` (Reveal around heading + Reveal around the grid), `Contact` (Reveal around heading + Reveal around the two-column body).

- [ ] **Step 3: Verify in dev**

```bash
npm run dev
```

Scroll the page slowly. Each section should fade up as it enters the viewport. Stop the server.

- [ ] **Step 4: Commit**

```bash
git add components/ui/Reveal.tsx components/sections && git commit -m "feat(motion): scroll-reveal entrance with reduced-motion respect"
```

---

### Task 8.2: Accessibility pass

**Files:**
- Modify: `app/[locale]/layout.tsx` to add a skip-to-content link
- Modify: section files where needed

- [ ] **Step 1: Add skip-to-content link in `app/[locale]/layout.tsx`**

Inside the `<body>`, before `<NextIntlClientProvider>`, add:

```tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:bg-gold focus:text-ink-deep focus:px-4 focus:py-2 focus:rounded-sm focus:font-semibold"
>
  Skip to content
</a>
```

- [ ] **Step 2: Wrap homepage main with id**

In `app/[locale]/page.tsx`, change `<main>` to `<main id="main">`. Same for `app/[locale]/lawyer/[slug]/page.tsx` and the legal pages.

- [ ] **Step 3: Add `sr-only` utility — verify Tailwind covers it**

Tailwind ships with `sr-only` and `not-sr-only` by default — no config change needed.

- [ ] **Step 4: Manual axe-style review** — open the dev site in a browser and run a manual check:
  - All links have visible text or `aria-label`.
  - All form inputs have labels (already verified — `<label>` wraps each input).
  - Color contrast: gold on ink-deep ≥ 7:1 (passes spec).
  - All headings are in order (h1 → h2 → h3) per page.
  - Focus order through tab is logical.

- [ ] **Step 5: Commit**

```bash
git add app/[locale] && git commit -m "feat(a11y): skip link and main landmark id"
```

---

## Phase 9 — Build, verify, and deploy

### Task 9.1: Production build and local preview

- [ ] **Step 1: Validate data first**

```bash
npm run validate-data
```

Expected: all checks pass.

- [ ] **Step 2: Type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: build completes; `out/` directory is created with `index.html`, `ar/`, `en/`, `ar/lawyer/ahmad-alkourabi/`, `en/lawyer/ahmad-alkourabi/`, `sitemap.xml`, `robots.txt`, `contact.php`.

- [ ] **Step 4: Inspect the `out/` directory**

```bash
ls out/ && ls out/ar/ && ls out/en/ && ls out/ar/lawyer/ahmad-alkourabi/
```

Expected: each folder has an `index.html`. `contact.php` is at the root of `out/`.

- [ ] **Step 5: Local static preview** — serve `out/` with any static server to confirm

```bash
npx serve out/ -l 5050
```

Visit `http://localhost:5050/ar/` and `http://localhost:5050/en/lawyer/ahmad-alkourabi/`. Confirm everything renders identically to dev mode.

Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: production build verified locally" --allow-empty
```

---

### Task 9.2: Hostinger deployment guide

**Files:**
- Create: `DEPLOY.md`
- Create: `README.md`

- [ ] **Step 1: Write `DEPLOY.md`**

```markdown
# Deploying to Hostinger

This site is a Next.js static export. The build produces a folder of static files (`out/`) plus a single PHP file (`contact.php`) for the contact form.

## One-time setup

1. Log into your Hostinger control panel.
2. Confirm the domain `kourabi.com` is pointed at the hosting plan (or use the Hostinger preview URL initially).
3. Make sure PHP 8.x is enabled (it is by default on shared hosting).
4. Make sure the `mail()` function is enabled (it is by default on shared hosting).

## Deploy steps (each release)

1. From the project root: `npm run validate-data && npm run build`
2. The output folder is `out/`. Upload its contents (NOT the `out/` folder itself) to `public_html/` on Hostinger via:
   - **File Manager** in hPanel (drag-and-drop), OR
   - **FTP** with credentials from hPanel → Files → FTP Accounts.
3. Confirm `public_html/contact.php` exists at the root.
4. Visit `https://kourabi.com/`. Should redirect to `/ar/` by default.

## Verification checklist

- [ ] `https://kourabi.com/ar/` renders the homepage in Arabic, RTL.
- [ ] `https://kourabi.com/en/` renders the homepage in English, LTR.
- [ ] Language toggle navigates between locales.
- [ ] All six department cards link to the lawyer page.
- [ ] `https://kourabi.com/ar/lawyer/ahmad-alkourabi/` renders the founder profile.
- [ ] Submitting the contact form delivers an email to `ahmad@kourabi.com`.
- [ ] `https://kourabi.com/sitemap.xml` returns the sitemap.
- [ ] `https://kourabi.com/robots.txt` returns the robots file.

## Updating content

- **Edit firm details** → `data/firm.ts`, rebuild, redeploy.
- **Add a department** → push a new entry into `data/departments.ts` (and add an icon variant in `components/icons/DepartmentIcon.tsx` if needed).
- **Add a lawyer** → push a new entry into `data/lawyers.ts`, copy a photo to `public/images/lawyers/<slug>.jpg`, optionally update one or more `departments[].leadLawyerSlug` to point at the new lawyer.
- **Translate strings** → edit `i18n/messages/ar.json` and `i18n/messages/en.json`.

## Rollback

The previous release is whatever was previously in `public_html/`. Keep a copy locally before each deploy by zipping `public_html/` via the Hostinger File Manager → Compress.
```

- [ ] **Step 2: Write `README.md`**

```markdown
# Alkourabi Law Firm — Website

Bilingual (Arabic/English) marketing site for Alkourabi Law Firm & Legal Consultancy. Built with Next.js 14 (static export), Tailwind CSS, and next-intl. Deployed to Hostinger.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run validate-data
npm run type-check
npm run build        # produces out/
```

## Project layout

- `app/` — Next.js App Router (`[locale]` segment for ar/en)
- `components/` — UI primitives, layout chrome, sections, cards, icons
- `data/` — single source of truth: firm, departments, lawyers, clients
- `i18n/` — next-intl routing and messages
- `lib/` — fonts, SEO helpers, motion variants
- `public/` — static assets including `contact.php`
- `scripts/validate-data.ts` — Zod-validated cross-reference check
- `docs/superpowers/` — design spec and implementation plan

See [DEPLOY.md](./DEPLOY.md) for deployment instructions.
```

- [ ] **Step 3: Commit**

```bash
git add DEPLOY.md README.md && git commit -m "docs: deployment guide and project README"
```

---

## Phase 10 — Final review

### Task 10.1: Final smoke test

- [ ] **Step 1: Run validator + type-check + build all together**

```bash
npm run validate-data && npm run type-check && npm run build
```

Expected: all three succeed.

- [ ] **Step 2: Visual smoke test on the static build**

```bash
npx serve out/ -l 5050
```

Open in browser and run through this checklist:

- [ ] Arabic homepage at `/ar/` — RTL, all 7 sections render
- [ ] English homepage at `/en/` — LTR, all 7 sections render
- [ ] Language toggle round-trips
- [ ] Department card hover state animates correctly
- [ ] Department card click navigates to lawyer page with `?dept=` param
- [ ] Lawyer page renders with hero, side nav, all five subsections
- [ ] Side nav anchors scroll smoothly
- [ ] Contact form: invalid email shows error; valid form submits
- [ ] Footer: privacy and terms links work; phone/email are clickable
- [ ] Mobile (<640px): nav collapses to hamburger; all sections re-flow
- [ ] DevTools: no console errors, no 404s for assets

Stop the server when done.

- [ ] **Step 3: Final commit**

```bash
git add -A && git commit -m "chore: final smoke test passed" --allow-empty
```

---

## Self-review notes (filled in during plan authoring)

**1. Spec coverage**
- §3.1 colors → Task 1.2
- §3.2 typography → Task 1.4
- §3.3 voice (no exclamations, restrained) → embedded in copy, no separate task
- §3.4 imagery + iconography → Tasks 3.2, 3.3, 5.1
- §4 information architecture → Tasks 4.2, 5.x homepage composition, 6.x lawyer page
- §5 section details → Tasks 5.1–5.7 (all 9 homepage sections + lawyer profile)
- §6 bilingual strategy → Task 1.3 i18n config + per-component locale handling
- §7 technical architecture → Phase 1 + 2
- §8 interactions/animation → Task 8.1 (Reveal) + per-component hover transitions
- §9 responsive breakpoints → handled via Tailwind classes throughout
- §10 accessibility → Task 8.2
- §11 deployment + ops → Task 9.2
- §12 future extensibility → enabled by data-file pattern in Phase 2
- §13 confirmed decisions → all locked in (no open items)
- §14 acceptance criteria → Task 10.1 checklist

**2. Placeholder scan** — no "TBD"/"TODO"/"implement later" in any task. All commands and code are explicit.

**3. Type consistency** — `Bilingual = { ar; en }` used uniformly. `Lawyer.slug`, `Department.slug` are strings. The `getLawyerBySlug` and `getDepartmentBySlug` helpers are referenced consistently across tasks 2.x, 5.5, 6.1.

**4. One non-obvious risk:** the dev server warning about no `<html>` in the root `app/layout.tsx`. This is intentional — locale layouts own `<html>` so they can set `lang` and `dir`. Documented inline in Task 1.5.
