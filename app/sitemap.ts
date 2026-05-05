import type { MetadataRoute } from 'next';
import { lawyers } from '@/data/lawyers';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kourabi.com';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({ url: `${base}/${locale}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 });
    for (const lawyer of lawyers) {
      entries.push({ url: `${base}/${locale}/lawyer/${lawyer.slug}/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 });
    }
    entries.push({ url: `${base}/${locale}/legal/privacy/`, changeFrequency: 'yearly', priority: 0.2 });
    entries.push({ url: `${base}/${locale}/legal/terms/`, changeFrequency: 'yearly', priority: 0.2 });
  }
  return entries;
}
