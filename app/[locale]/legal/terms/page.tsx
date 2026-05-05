import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
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
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  const isAr = locale === 'ar';

  return (
    <>
      <TopNav />
      <main id="main" className="pt-32 pb-24 md:pt-40">
        <Container className="max-w-3xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <Heading level={1} size="3xl" asArabic={isAr} className="mt-4">{t('heading')}</Heading>
          <div className="mt-8 space-y-5 text-cream-muted leading-relaxed">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
