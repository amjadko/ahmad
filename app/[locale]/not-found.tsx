import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-screen items-center justify-center py-32">
      <div className="text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-display text-4xl text-cream md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-cream-muted">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="mt-8 inline-block text-gold underline">
          Return home
        </Link>
      </div>
    </main>
  );
}
