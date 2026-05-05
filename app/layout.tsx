// app/layout.tsx — passthrough only; <html> lives in app/[locale]/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
