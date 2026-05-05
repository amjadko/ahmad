import { firm } from '@/data/firm';
import { lawyers } from '@/data/lawyers';
import type { Locale } from '@/i18n/routing';

export function legalServiceJsonLd(locale: Locale) {
  const founder = lawyers.find((l) => l.isFounder);
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: firm.name[locale],
    founder: founder
      ? {
          '@type': 'Person',
          name: founder.name[locale]
        }
      : undefined,
    foundingDate: String(firm.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: firm.address[locale],
      addressLocality: 'Damascus',
      addressCountry: 'SY'
    },
    telephone: firm.phone,
    email: firm.email,
    url: 'https://kourabi.com',
    areaServed: ['SY', 'DE', 'TR', 'JO']
  };
}

export function personJsonLd(slug: string, locale: Locale) {
  const lawyer = lawyers.find((l) => l.slug === slug);
  if (!lawyer) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: lawyer.name[locale],
    jobTitle: lawyer.title[locale],
    worksFor: {
      '@type': 'LegalService',
      name: firm.name[locale]
    },
    description: lawyer.shortBio[locale],
    knowsLanguage: lawyer.languages,
    email: lawyer.email,
    telephone: lawyer.phone
  };
}
