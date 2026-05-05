import { unstable_setRequestLocale } from 'next-intl/server';
import { legalServiceJsonLd } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';
import { TopNav } from '@/components/layout/TopNav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { IdentityStrip } from '@/components/sections/IdentityStrip';
import { About } from '@/components/sections/About';
import { FounderSpotlight } from '@/components/sections/FounderSpotlight';
import { Departments } from '@/components/sections/Departments';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  return (
    <>
      <TopNav />
      <main id="main">
        <Hero />
        <IdentityStrip />
        <About />
        <FounderSpotlight />
        <Departments />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd(locale as Locale)) }}
      />
    </>
  );
}
