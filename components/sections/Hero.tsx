import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import type { Locale } from '@/i18n/routing';
import { firm } from '@/data/firm';

export function Hero() {
  const locale = useLocale() as Locale;
  const tMeta = useTranslations('meta');
  const tHero = useTranslations('home.hero');

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* faint geometric background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #C9A961 1px, transparent 1px), radial-gradient(circle at 70% 80%, #C9A961 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <Container className="relative grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        {/* Text column */}
        <div>
          <Eyebrow className="mb-6">{firm.name[locale]}</Eyebrow>
          <Heading
            level={1}
            size="5xl"
            asArabic={locale === 'ar'}
            className="text-cream"
          >
            {tMeta('tagline')}
          </Heading>
          <Divider className="my-8" />
          <p className="max-w-xl text-base text-cream-muted leading-relaxed">
            {tHero('subhead')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button as="link" href="#departments" variant="primary" size="lg">
              {tHero('ctaServices')}
            </Button>
            <Button as="link" href="#contact" variant="outline" size="lg">
              {tHero('ctaContact')}
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none">
          <div className="absolute inset-0 rounded-sm overflow-hidden border border-gold/40">
            <Image
              src="/images/lady-justice.jpg"
              alt={tHero('imageAlt')}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: 'sepia(0.15) saturate(0.85) brightness(0.95)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at top right, rgba(201,169,97,0.35), transparent 60%), linear-gradient(to bottom, transparent 50%, rgba(10,22,40,0.55))'
              }}
            />
          </div>
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
