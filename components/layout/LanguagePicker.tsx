'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter, type Locale } from '@/i18n/routing';
import clsx from 'clsx';

const localeOptions: { code: Locale; native: string; latin: string }[] = [
  { code: 'en', native: 'English', latin: 'EN' },
  { code: 'de', native: 'Deutsch', latin: 'DE' },
  { code: 'tr', native: 'Türkçe', latin: 'TR' },
  { code: 'ar', native: 'العربية', latin: 'AR' }
];

function setLocaleCookie(locale: Locale) {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `preferred_locale=${encodeURIComponent(locale)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

export function LanguagePicker({ className }: { className?: string }) {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const choose = (loc: Locale) => {
    setOpen(false);
    if (loc === currentLocale) return;
    setLocaleCookie(loc);
    router.replace(pathname, { locale: loc });
  };

  const current = localeOptions.find((o) => o.code === currentLocale) ?? localeOptions[0];

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-eyebrow text-cream-muted hover:text-gold transition-colors duration-200"
      >
        <span>{current.latin}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className={clsx('transition-transform duration-200', open && 'rotate-180')}
        >
          <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className="absolute end-0 top-full z-50 mt-3 min-w-[180px] rounded-sm border border-gold/30 bg-ink-elevated shadow-lg overflow-hidden"
        >
          {localeOptions.map((opt) => {
            const active = opt.code === currentLocale;
            return (
              <li
                key={opt.code}
                role="option"
                aria-selected={active}
              >
                <button
                  type="button"
                  disabled={active}
                  onClick={() => choose(opt.code)}
                  className={clsx(
                    'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors duration-150',
                    active
                      ? 'bg-gold/10 text-gold cursor-default'
                      : 'text-cream hover:bg-gold hover:text-ink-deep'
                  )}
                  dir={opt.code === 'ar' ? 'rtl' : 'ltr'}
                >
                  <span
                    className={clsx(
                      'text-2xs font-semibold uppercase tracking-eyebrow',
                      active ? 'text-gold' : 'text-cream-muted'
                    )}
                  >
                    {opt.latin}
                  </span>
                  <span
                    className={clsx(
                      opt.code === 'ar' ? 'font-arabic font-semibold' : 'font-display italic',
                      'text-base'
                    )}
                  >
                    {opt.native}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
