import type { Locale } from '@/i18n/routing';

/** A string available in all 4 supported UI locales. */
export type Localized = Record<Locale, string>;

export type Firm = {
  name: Localized;
  shortName: Localized;
  founded: number;
  founderSlug: string;
  address: Localized;
  phone: string;
  mobile: string;
  whatsappNumber: string;
  email: string;
  hours: Localized;
  mapsQuery: string;
};

export type Department = {
  slug: string;
  name: Localized;
  shortDescription: Localized;
  fullDescription: Localized;
  iconKey: 'corporate' | 'litigation' | 'labor' | 'tax' | 'ip' | 'translation';
  leadLawyerSlug: string;
};

export type Lawyer = {
  slug: string;
  name: Localized;
  title: Localized;
  credentials: Localized;
  bio: Localized;
  shortBio: Localized;
  photo: string | null;
  monogram: Localized;
  departments: string[];
  /** ISO-639-1 codes of languages this lawyer speaks (display only). */
  languages: ('ar' | 'en' | 'tr' | 'fr' | 'de')[];
  education: Localized[];
  notableMatters: Localized[];
  /** Companies this lawyer represents, grouped by country. */
  clients?: ClientCountry[];
  email?: string;
  phone?: string;
  isFounder?: boolean;
};

export type ClientCompany = {
  /** Latin/English display name — primary. */
  name: string;
  /** Optional Arabic display when locale is ar. */
  arabicName?: string;
};

export type ClientCountry = {
  code: 'DE' | 'TR' | 'JO' | 'SY';
  name: Localized;
  companies: ClientCompany[];
};
