import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Reveal } from '@/components/ui/Reveal';
import type { Locale } from '@/i18n/routing';

export function About() {
  const locale = useLocale() as Locale;
  const t = useTranslations('home.about');

  return (
    <section id="about" className="py-24 md:py-32">
      <Reveal>
        <Container className="max-w-3xl text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <Heading level={2} size="4xl" asArabic={locale === 'ar'} className="mt-6">
            {t('heading')}
          </Heading>
          <div className="mx-auto mt-8 flex justify-center"><Divider /></div>
          <div className="mt-10 space-y-6 text-cream-muted leading-relaxed">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
