import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export function IdentityStrip() {
  const t = useTranslations('home.identity');

  const stats = [
    { value: '2018', label: t('founded') },
    { value: '6', label: t('departments') },
    { value: '+10', label: t('internationalClients') },
    { value: '4', label: t('countriesServed') }
  ];

  return (
    <section className="border-y border-ink-line bg-ink-elevated py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-ink-line rtl:md:divide-x-reverse">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:px-6">
              <p
                className="font-display font-semibold text-3xl md:text-4xl text-gold"
                dir="ltr"
              >
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-eyebrow text-cream-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
