import { useTranslations } from 'next-intl';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import type { Locale } from '@/i18n/routing';
import type { ClientCountry } from '@/data/types';

export function LawyerClients({
  clients,
  locale
}: {
  clients: ClientCountry[];
  locale: Locale;
}) {
  const t = useTranslations('lawyer');
  const isAr = locale === 'ar';

  return (
    <div id="clients">
      <Eyebrow>{t('sections.clients')}</Eyebrow>
      <Heading level={2} size="2xl" asArabic={isAr} className="mt-3">
        {t('headings.representsCompanies')}
      </Heading>
      <Divider className="my-5" />

      <div className="grid gap-4 md:grid-cols-2">
        {clients.map((country) => (
          <article
            key={country.code}
            className="rounded-sm border border-ink-line bg-ink-elevated p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="inline-flex h-7 min-w-[2.5rem] items-center justify-center rounded-sm border border-gold px-2 text-2xs font-semibold uppercase tracking-eyebrow text-gold"
                dir="ltr"
              >
                {country.code}
              </span>
              <h3 className={isAr ? 'font-arabic font-bold text-base text-cream' : 'font-display font-semibold text-base text-cream'}>
                {country.name[locale]}
              </h3>
            </div>

            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-cream">
              {country.companies.map((company, i) => (
                <li key={company.name} className="flex items-center gap-3">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-gold/70" aria-hidden="true" />}
                  <span
                    className={isAr && company.arabicName ? 'font-arabic text-sm' : 'font-display text-sm italic'}
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
    </div>
  );
}
