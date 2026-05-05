import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale
    ? routing.locales.includes(locale as 'ar' | 'en')
      ? (locale as 'ar' | 'en')
      : routing.defaultLocale
    : routing.defaultLocale;

  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
