import { unstable_setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  return (
    <main className="container-page py-32">
      <h1 className="font-display text-5xl text-gold">Alkourabi Law Firm</h1>
      <p className="mt-6 text-cream-muted">Stub homepage — sections coming soon.</p>
    </main>
  );
}
