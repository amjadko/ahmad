'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/icons/BrandMark';
import { LanguagePicker } from './LanguagePicker';

export function TopNav() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t('about') },
    { href: '#departments', label: t('departments') },
    { href: '#clients', label: t('clients') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink-deep/80 backdrop-blur-md border-b border-gold/30'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3" aria-label="Alkourabi Law Firm">
          <span className="rounded-sm border border-gold p-1.5">
            <BrandMark size={32} />
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-eyebrow text-cream-muted hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-5">
          <LanguagePicker className="hidden md:block" />
          <Button as="link" href="#contact" variant="outline" size="md" className="hidden md:inline-flex">
            {t('contact')}
          </Button>

          <button
            type="button"
            className="lg:hidden text-cream"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6 L18 18 M6 18 L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gold/20 bg-ink-deep/95 backdrop-blur-md">
          <Container className="py-6 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold uppercase tracking-eyebrow text-cream-muted hover:text-gold py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-ink-line">
              <LanguagePicker />
              <Button as="link" href="#contact" variant="primary" size="md" onClick={() => setMobileOpen(false)}>
                {t('contact')}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
