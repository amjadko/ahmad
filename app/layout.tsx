import { fontVariables } from '@/lib/fonts';
import './globals.css';

// This root layout is only used by the root route (app/page.tsx — the splash).
// Locale routes use app/[locale]/layout.tsx which provides its own <html lang dir>.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="bg-ink-deep text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
