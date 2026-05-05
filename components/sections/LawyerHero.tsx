import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Divider } from '@/components/ui/Divider';
import { Button } from '@/components/ui/Button';
import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons/ContactIcons';
import type { Locale } from '@/i18n/routing';
import type { Lawyer } from '@/data/types';
import { firm } from '@/data/firm';

export function LawyerHero({ lawyer, locale }: { lawyer: Lawyer; locale: Locale }) {
  const t = useTranslations('lawyer.actions');
  const isAr = locale === 'ar';
  const phone = lawyer.phone ?? firm.mobile;
  const email = lawyer.email ?? firm.email;
  const whatsappNumber = (lawyer.phone ?? firm.mobile).replace(/\D/g, '');

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 border-b border-ink-line">
      <Container className="grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div className="relative">
          <div className="aspect-[4/5] w-full max-w-xs mx-auto md:max-w-none border border-gold/40 rounded-sm bg-ink-elevated flex items-center justify-center relative overflow-hidden">
            <span className="font-display text-[7rem] md:text-[8rem] text-gold/90 select-none" dir="ltr">
              {lawyer.monogram[locale]}
            </span>
          </div>
          <span className="absolute -top-2 -start-2 h-6 w-6 border-t border-s border-gold" aria-hidden="true" />
          <span className="absolute -bottom-2 -end-2 h-6 w-6 border-b border-e border-gold" aria-hidden="true" />
        </div>

        <div>
          <Eyebrow>{lawyer.title[locale]}</Eyebrow>
          <Heading level={1} size="4xl" asArabic={isAr} className="mt-4">
            {lawyer.name[locale]}
          </Heading>
          <p className="mt-3 text-sm text-cream-muted">{lawyer.credentials[locale]}</p>
          <Divider className="my-7" />
          <p className="text-cream-muted leading-relaxed max-w-2xl">{lawyer.shortBio[locale]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="link" external href={`mailto:${email}`} variant="primary" size="md">
              <MailIcon size={16} /> {t('email')}
            </Button>
            <Button as="link" external href={`tel:${phone}`} variant="outline" size="md">
              <PhoneIcon size={16} /> {t('call')}
            </Button>
            <Button as="link" external href={`https://wa.me/${whatsappNumber}`} variant="outline" size="md">
              <WhatsAppIcon size={16} /> WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
