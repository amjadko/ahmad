import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { ArrowRightIcon } from '@/components/icons/ContactIcons';
import type { Locale } from '@/i18n/routing';
import { getFounder } from '@/data/lawyers';

export function FounderSpotlight() {
  const locale = useLocale() as Locale;
  const tCommon = useTranslations('common');
  const founder = getFounder();
  const isAr = locale === 'ar';

  return (
    <section className="bg-ink-elevated py-24 md:py-32 border-y border-ink-line">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Photo / monogram column */}
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none border border-gold/40 rounded-sm bg-ink-deep flex items-center justify-center relative overflow-hidden">
            <span
              className="font-display text-[8rem] md:text-[10rem] text-gold/90 select-none"
              dir="ltr"
            >
              {founder.monogram[locale]}
            </span>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(201,169,97,0.18), transparent 65%)'
              }}
            />
          </div>
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>

        {/* Text column */}
        <div>
          <Eyebrow>{founder.title[locale]}</Eyebrow>
          <Heading level={2} size="3xl" asArabic={isAr} className="mt-4">
            {founder.name[locale]}
          </Heading>
          <p className="mt-3 text-sm text-cream-muted">{founder.credentials[locale]}</p>
          <Divider className="my-6" />
          <p className="text-cream-muted leading-relaxed">{founder.shortBio[locale]}</p>

          <div className="mt-8">
            <Button as="link" href={`/lawyer/${founder.slug}/`} variant="outline" size="lg">
              {tCommon('viewProfile')}
              <ArrowRightIcon className={isAr ? 'rotate-180' : ''} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
