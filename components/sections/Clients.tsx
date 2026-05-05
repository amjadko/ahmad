import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Reveal } from '@/components/ui/Reveal';
import type { Locale } from '@/i18n/routing';
import { clientCountries } from '@/data/clients';

export function Clients() {
  const locale = useLocale() as Locale;
  const isAr = locale === 'ar';
  const t = useTranslations('home.clients');

  return (
    <section id="clients" className="bg-ink-elevated py-24 md:py-32 border-y border-ink-line">
      <Reveal>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
              {t('heading')}
            </Heading>
            <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
            <p className="mt-8 text-cream-muted">{t('subhead')}</p>
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
      </Reveal>
    </section>
  );
}
