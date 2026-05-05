'use client';

import { useEffect } from 'react';

const ARAB_CODES = ['SY','JO','LB','IQ','SA','EG','AE','QA','KW','BH','OM','YE','PS','SD','DZ','TN','MA','LY'];
const DE_CODES = ['DE','AT','CH','LI'];
const TR_CODES = ['TR'];
const FALLBACK = 'en';
const TIMEOUT_MS = 2000;
const COOKIE = 'preferred_locale';
const VALID = ['en','de','tr','ar'] as const;
type Locale = (typeof VALID)[number];

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

function go(locale: string) {
  const target = (VALID as readonly string[]).includes(locale) ? locale : FALLBACK;
  setCookie(COOKIE, target);
  window.location.replace(`/${target}/`);
}

function fromBrowser(): Locale | null {
  const lang = (navigator.language || '').toLowerCase();
  if (lang.startsWith('tr')) return 'tr';
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('ar')) return 'ar';
  return null;
}

function fromCountryCode(cc: string): Locale | null {
  if (!cc) return null;
  const upper = cc.toUpperCase();
  if (DE_CODES.includes(upper)) return 'de';
  if (TR_CODES.includes(upper)) return 'tr';
  if (ARAB_CODES.includes(upper)) return 'ar';
  return null;
}

export default function RootSplashPage() {
  useEffect(() => {
    // Step 1: cookie
    const stored = readCookie(COOKIE);
    if (stored && (VALID as readonly string[]).includes(stored)) {
      go(stored);
      return;
    }
    // Step 2: browser language
    const byBrowser = fromBrowser();
    if (byBrowser) {
      go(byBrowser);
      return;
    }
    // Step 3: geo-IP with timeout
    let done = false;
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      go(FALLBACK);
    }, TIMEOUT_MS);

    fetch('https://ipapi.co/json/', { credentials: 'omit' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        const byCountry = data && data.country_code ? fromCountryCode(data.country_code) : null;
        go(byCountry || FALLBACK);
      })
      .catch(() => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        go(FALLBACK);
      });
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        fontFamily: 'ui-serif, Georgia, "Cormorant Garamond", "Times New Roman", serif'
      }}
    >
      <div
        style={{
          border: '1px solid #C9A961',
          padding: '22px 30px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontSize: 14,
          color: '#C9A961',
          fontWeight: 600
        }}
      >
        Alkourabi Law Firm
      </div>
      <div
        style={{
          fontSize: 32,
          marginTop: 28,
          letterSpacing: '0.04em',
          color: '#F5F0E1'
        }}
      >
        Welcome &middot; مرحباً &middot; Willkommen &middot; Hoş geldiniz
      </div>
      <div style={{ marginTop: 28, color: '#C9C2AE', fontSize: 13, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        <PulseDot delay="0s" /> <PulseDot delay="0.15s" /> <PulseDot delay="0.30s" />
      </div>
      <noscript>
        <p style={{ marginTop: 32, color: '#C9C2AE', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: 14 }}>
          Choose your language: <a href="/en/" style={{ color: '#C9A961', margin: '0 8px' }}>English</a>
          <a href="/de/" style={{ color: '#C9A961', margin: '0 8px' }}>Deutsch</a>
          <a href="/tr/" style={{ color: '#C9A961', margin: '0 8px' }}>Türkçe</a>
          <a href="/ar/" style={{ color: '#C9A961', margin: '0 8px' }}>العربية</a>
        </p>
      </noscript>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.0); }
        }
      `}</style>
    </main>
  );
}

function PulseDot({ delay }: { delay: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 6,
        height: 6,
        margin: '0 4px',
        background: '#C9A961',
        borderRadius: '50%',
        animation: `pulse 1.2s infinite ease-in-out`,
        animationDelay: delay
      }}
    />
  );
}
