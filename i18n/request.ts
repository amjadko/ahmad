import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
