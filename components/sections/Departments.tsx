import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { DepartmentCard } from '@/components/cards/DepartmentCard';
import { Reveal } from '@/components/ui/Reveal';
import type { Locale } from '@/i18n/routing';
import { departments } from '@/data/departments';
import { lawyers, getLawyerBySlug } from '@/data/lawyers';

export function Departments() {
  const locale = useLocale() as Locale;
  const t = useTranslations('home.departments');

  return (
    <section id="departments" className="py-24 md:py-32">
      <Reveal>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <Heading level={2} size="4xl" asArabic={locale === 'ar'} className="mt-6">
              {t('heading')}
            </Heading>
            <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
            <p className="mt-8 text-cream-muted">{t('subhead')}</p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const lawyer = getLawyerBySlug(dept.leadLawyerSlug) ?? lawyers[0];
              return <DepartmentCard key={dept.slug} department={dept} lawyer={lawyer} />;
            })}
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
