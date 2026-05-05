import { useLocale, useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { ContactForm } from '@/components/forms/ContactForm';
import { PinIcon, PhoneIcon, MobileIcon, MailIcon, WhatsAppIcon } from '@/components/icons/ContactIcons';
import type { Locale } from '@/i18n/routing';
import { firm } from '@/data/firm';

export function Contact() {
  const locale = useLocale() as Locale;
  const isAr = locale === 'ar';
  const t = useTranslations('contact');

  const items = [
    { Icon: PinIcon, label: t('address'), value: firm.address[locale], href: undefined },
    { Icon: PhoneIcon, label: t('landline'), value: firm.phone, href: `tel:${firm.phone}` },
    { Icon: MobileIcon, label: t('mobile'), value: firm.mobile, href: `tel:${firm.mobile}` },
    { Icon: WhatsAppIcon, label: 'WhatsApp', value: firm.mobile, href: `https://wa.me/${firm.whatsappNumber}` },
    { Icon: MailIcon, label: t('email'), value: firm.email, href: `mailto:${firm.email}` }
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <Heading level={2} size="4xl" asArabic={isAr} className="mt-6">
            {t('heading')}
          </Heading>
          <div className="mx-auto mt-6 flex justify-center"><Divider /></div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Info */}
          <div>
            <ul className="space-y-6">
              {items.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <Icon className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-2xs uppercase tracking-eyebrow text-cream-muted">{label}</p>
                    {href ? (
                      <a href={href} dir="ltr" className="mt-1 block text-sm text-cream hover:text-gold transition">{value}</a>
                    ) : (
                      <p className="mt-1 text-sm text-cream leading-relaxed">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-sm border border-ink-line">
              <iframe
                title={t('address')}
                src={`https://www.google.com/maps?q=${encodeURIComponent(firm.mapsQuery)}&output=embed`}
                width="100%"
                height="240"
                style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) saturate(0.8)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-sm border border-ink-line bg-ink-elevated p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
