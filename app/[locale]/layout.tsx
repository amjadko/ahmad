import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing, type Locale, isRtl } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_NAME: Record<Locale, string> = {
  ar: 'مكتب القربي للمحاماة والاستشارات القانونية',
  en: 'Alkourabi Law Firm & Legal Consultancy',
  de: 'Alkourabi Anwaltskanzlei & Rechtsberatung',
  tr: 'Alkourabi Hukuk Bürosu ve Hukuki Danışmanlık'
};

const SITE_DESCRIPTION: Record<Locale, string> = {
  ar: 'حلول قانونية ومالية متكاملة للشركات في سوريا منذ 2018.',
  en: 'Comprehensive legal and financial solutions for companies in Syria since 2018.',
  de: 'Umfassende rechtliche und finanzielle Lösungen für Unternehmen in Syrien seit 2018.',
  tr: 'Suriye\'de faaliyet gösteren şirketlere kapsamlı hukuki ve mali çözümler — 2018\'den beri.'
};

const TITLE_TEMPLATE: Record<Locale, string> = {
  ar: '%s | مكتب القربي',
  en: '%s | Alkourabi',
  de: '%s | Alkourabi',
  tr: '%s | Alkourabi'
};

const OG_LOCALE: Record<Locale, string> = {
  ar: 'ar_SY',
  en: 'en_US',
  de: 'de_DE',
  tr: 'tr_TR'
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;

  return {
    metadataBase: new URL('https://kourabi.com'),
    title: {
      default: SITE_NAME[loc],
      template: TITLE_TEMPLATE[loc]
    },
    description: SITE_DESCRIPTION[loc],
    alternates: {
      canonical: `/${loc}`,
      languages: {
        ar: '/ar',
        en: '/en',
        de: '/de',
        tr: '/tr'
      }
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[loc],
      siteName: SITE_NAME[loc]
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
  unstable_setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

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
