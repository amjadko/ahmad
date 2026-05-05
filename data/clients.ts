import type { ClientCountry } from './types';

export const clientCountries: ClientCountry[] = [
  {
    code: 'DE',
    name: {
      en: 'Germany',
      de: 'Deutschland',
      tr: 'Almanya',
      ar: 'ألمانيا'
    },
    companies: [
      { name: 'Schwing', arabicName: 'شفنيغ' },
      { name: 'Stetter', arabicName: 'شتتر' }
    ]
  },
  {
    code: 'TR',
    name: {
      en: 'Türkiye',
      de: 'Türkei',
      tr: 'Türkiye',
      ar: 'تركيا'
    },
    companies: [
      { name: 'Tiryaki Anadolu', arabicName: 'ترياكي أناضول' },
      { name: 'Danem', arabicName: 'دانم' }
    ]
  },
  {
    code: 'JO',
    name: {
      en: 'Jordan',
      de: 'Jordanien',
      tr: 'Ürdün',
      ar: 'الأردن'
    },
    companies: [
      { name: 'Abshar Passenger Transport', arabicName: 'أبشر لنقل الركاب' },
      { name: 'Auto Score', arabicName: 'أوتو سكور' },
      { name: 'Auto Hub', arabicName: 'أوتو هوب' }
    ]
  },
  {
    code: 'SY',
    name: {
      en: 'Syria',
      de: 'Syrien',
      tr: 'Suriye',
      ar: 'سوريا'
    },
    companies: [
      { name: 'Tiryaki Grains', arabicName: 'ترياكي حبوب' },
      { name: 'Al-Nahrain Harvest', arabicName: 'حصاد النهرين' }
    ]
  }
];
