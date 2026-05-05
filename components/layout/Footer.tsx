import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Divider } from '@/components/ui/Divider';
import { BrandMark } from '@/components/icons/BrandMark';
import type { Locale } from '@/i18n/routing';
import { firm } from '@/data/firm';

export function Footer() {
  const locale = useLocale() as Locale;
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  return (
    <footer className="bg-ink-elevated border-t border-ink-line">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <span className="inline-block rounded-sm border border-gold p-1.5">
              <BrandMark size={36} />
            </span>
            <p className="mt-5 text-sm text-cream-muted leading-relaxed">
              {firm.name[locale]}
            </p>
          </div>

          {/* Sitemap column */}
          <nav aria-label={tFooter('sitemap')}>
            <p className="eyebrow mb-5">{tFooter('sitemap')}</p>
            <ul className="space-y-3 text-sm text-cream-muted">
              <li><a href={`/${locale}/#about`} className="hover:text-gold transition">{tNav('about')}</a></li>
              <li><a href={`/${locale}/#departments`} className="hover:text-gold transition">{tNav('departments')}</a></li>
              <li><a href={`/${locale}/#contact`} className="hover:text-gold transition">{tNav('contact')}</a></li>
            </ul>
          </nav>

          {/* Hours + contact column */}
          <div>
            <p className="eyebrow mb-5">{tFooter('officeHours')}</p>
            <p className="text-sm text-cream mb-1">{firm.hours[locale]}</p>
            <p className="text-xs text-cream-muted">{tFooter('closed')}</p>

            <Divider variant="line-full" className="my-6" />

            <p className="text-xs text-cream-muted leading-relaxed">{firm.address[locale]}</p>
            <p className="mt-3 text-sm">
              <a href={`mailto:${firm.email}`} className="text-gold hover:text-gold-bright" dir="ltr">{firm.email}</a>
            </p>
            <p className="mt-1 text-sm">
              <a href={`tel:${firm.mobile}`} className="text-gold hover:text-gold-bright" dir="ltr">{firm.mobile}</a>
            </p>
          </div>
        </div>

        <Divider variant="line-full" className="my-10" />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-cream-muted">
          <p>
            © 2026 {firm.shortName[locale]}. {tFooter('rights')}
          </p>
          <div className="flex gap-6">
            <a href={`/${locale}/legal/privacy/`} className="hover:text-gold">
              {tFooter('privacy')}
            </a>
            <a href={`/${locale}/legal/terms/`} className="hover:text-gold">
              {tFooter('terms')}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
