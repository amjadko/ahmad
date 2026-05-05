import { lawyers } from '@/data/lawyers';
import type { ClientCountry } from '@/data/types';

const COUNTRY_ORDER: ClientCountry['code'][] = ['DE', 'TR', 'JO', 'SY'];

/**
 * Aggregate the clients from every lawyer into a single firm-wide list,
 * grouped by country, with duplicate companies removed (matched by `name`).
 *
 * Returns countries in fixed order (DE, TR, JO, SY) so the homepage display
 * stays stable as new lawyers are added.
 */
export function getAllFirmClients(): ClientCountry[] {
  const byCode = new Map<ClientCountry['code'], ClientCountry>();

  for (const lawyer of lawyers) {
    if (!lawyer.clients) continue;
    for (const country of lawyer.clients) {
      const existing = byCode.get(country.code);
      if (!existing) {
        byCode.set(country.code, {
          code: country.code,
          name: country.name,
          companies: [...country.companies]
        });
      } else {
        for (const company of country.companies) {
          if (!existing.companies.find((c) => c.name === company.name)) {
            existing.companies.push(company);
          }
        }
      }
    }
  }

  return COUNTRY_ORDER.map((code) => byCode.get(code)).filter(
    (c): c is ClientCountry => c !== undefined
  );
}
