import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { LawyerHero } from '@/components/sections/LawyerHero';
import { LawyerBody } from '@/components/sections/LawyerBody';
import { lawyers, getLawyerBySlug } from '@/data/lawyers';
import { routing, type Locale } from '@/i18n/routing';

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
  const loc = (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
  return {
    title: lawyer.name[loc],
    description: lawyer.shortBio[loc]
  };
}

export default async function LawyerPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  unstable_setRequestLocale(locale);
  const lawyer = getLawyerBySlug(slug);
  if (!lawyer) notFound();

  return (
    <>
      <TopNav />
      <main id="main">
        <LawyerHero lawyer={lawyer} locale={locale as Locale} />
        <LawyerBody lawyer={lawyer} locale={locale as Locale} />
      </main>
      <Footer />
    </>
  );
}
