import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
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
  unstable_setRequestLocale(locale as Locale);

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
