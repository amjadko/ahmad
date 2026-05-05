import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import type { Lawyer } from '@/data/types';
import { departments } from '@/data/departments';

const languageNames: Record<Locale, Record<string, string>> = {
  ar: { ar: 'العربية', en: 'الإنكليزية', tr: 'التركية', fr: 'الفرنسية', de: 'الألمانية' },
  en: { ar: 'Arabic', en: 'English', tr: 'Turkish', fr: 'French', de: 'German' },
  de: { ar: 'Arabisch', en: 'Englisch', tr: 'Türkisch', fr: 'Französisch', de: 'Deutsch' },
  tr: { ar: 'Arapça', en: 'İngilizce', tr: 'Türkçe', fr: 'Fransızca', de: 'Almanca' }
};

export function LawyerBody({ lawyer, locale }: { lawyer: Lawyer; locale: Locale }) {
  const t = useTranslations('lawyer');
  const isAr = locale === 'ar';
  const ledDepartments = departments.filter((d) => lawyer.departments.includes(d.slug));
  const departmentCountWord =
    ledDepartments.length > 1 ? t('headings.leadsPlural') : t('headings.leadsSingular');

  const hasMatters = lawyer.notableMatters.length > 0;
  const hasEducation = lawyer.education.length > 0;

  const sections = [
    { id: 'about', label: t('sections.about') },
    { id: 'departments', label: t('sections.departments') },
    ...(hasMatters ? [{ id: 'matters', label: t('sections.matters') }] : []),
    ...(hasEducation ? [{ id: 'education', label: t('sections.education') }] : []),
    { id: 'languages', label: t('sections.languages') }
  ];

  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.25fr_0.75fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start lg:h-fit">
          <p className="eyebrow mb-5">{t('tableOfContents')}</p>
          <ul className="space-y-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-cream-muted hover:text-gold transition">{s.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="space-y-16">
          <div id="about">
            <Eyebrow>{t('sections.about')}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {t('headings.background')}
            </Heading>
            <Divider className="my-5" />
            <p className="text-cream-muted leading-relaxed whitespace-pre-line">{lawyer.bio[locale]}</p>
          </div>

          <div id="departments">
            <Eyebrow>{t('sections.departments')}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {t('headings.leads')} {ledDepartments.length} {departmentCountWord}
            </Heading>
            <Divider className="my-5" />
            <ul className="grid gap-3 md:grid-cols-2">
              {ledDepartments.map((d) => (
                <li key={d.slug}>
                  <Link
                    href="/#departments"
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

          {hasMatters && (
          <div id="matters">
            <Eyebrow>{t('sections.matters')}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {t('headings.selectedWork')}
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
          )}

          {hasEducation && (
          <div id="education">
            <Eyebrow>{t('sections.education')}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {t('headings.academic')}
            </Heading>
            <Divider className="my-5" />
            <ul className="space-y-3 list-none">
              {lawyer.education.map((e, i) => (
                <li key={i} className="text-cream-muted">{e[locale]}</li>
              ))}
            </ul>
          </div>
          )}

          <div id="languages">
            <Eyebrow>{t('sections.languages')}</Eyebrow>
            <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
              {t('headings.working')}
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
