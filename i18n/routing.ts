import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de', 'tr', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];

/** RTL locales — used to set `<html dir>` and `dir` on form inputs. */
export const RTL_LOCALES: Locale[] = ['ar'];

export const isRtl = (locale: string): boolean =>
  RTL_LOCALES.includes(locale as Locale);

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
