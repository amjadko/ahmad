import { z } from 'zod';
import { firm } from '../data/firm';
import { departments } from '../data/departments';
import { lawyers } from '../data/lawyers';

const Localized = z.object({
  en: z.string().min(1),
  de: z.string().min(1),
  tr: z.string().min(1),
  ar: z.string().min(1)
});

const Firm = z.object({
  name: Localized,
  shortName: Localized,
  founded: z.number().int().min(2000).max(2030),
  founderSlug: z.string().min(1),
  address: Localized,
  phone: z.string().regex(/^\+?\d+$/),
  mobile: z.string().regex(/^\+?\d+$/),
  whatsappNumber: z.string().regex(/^\d+$/),
  email: z.string().email(),
  hours: Localized,
  mapsQuery: z.string().min(1)
});

const Department = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: Localized,
  shortDescription: Localized,
  fullDescription: Localized,
  iconKey: z.enum(['corporate', 'litigation', 'labor', 'tax', 'ip', 'translation']),
  leadLawyerSlug: z.string().min(1)
});

const ClientCompany = z.object({
  name: z.string().min(1),
  arabicName: z.string().optional()
});

const ClientCountry = z.object({
  code: z.enum(['DE', 'TR', 'JO', 'SY']),
  name: Localized,
  companies: z.array(ClientCompany).min(1)
});

const Lawyer = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: Localized,
  title: Localized,
  credentials: Localized,
  bio: Localized,
  shortBio: Localized,
  photo: z.string().nullable(),
  monogram: Localized,
  departments: z.array(z.string()),
  languages: z.array(z.enum(['ar', 'en', 'tr', 'fr', 'de'])),
  education: z.array(Localized),
  notableMatters: z.array(Localized),
  clients: z.array(ClientCountry).optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?\d+$/).optional(),
  isFounder: z.boolean().optional()
});

let errorCount = 0;
function check(label: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${label}`);
  } catch (e) {
    errorCount++;
    console.error(`✗ ${label}`);
    console.error(e);
  }
}

check('firm.ts', () => Firm.parse(firm));
check('departments.ts', () => z.array(Department).parse(departments));
check('lawyers.ts', () => z.array(Lawyer).parse(lawyers));

check('departments → leadLawyerSlug references a real lawyer', () => {
  for (const d of departments) {
    if (!lawyers.find((l) => l.slug === d.leadLawyerSlug)) {
      throw new Error(`Department "${d.slug}" references missing lawyer "${d.leadLawyerSlug}"`);
    }
  }
});

check('lawyers → departments[] all reference real departments', () => {
  for (const l of lawyers) {
    for (const ds of l.departments) {
      if (!departments.find((d) => d.slug === ds)) {
        throw new Error(`Lawyer "${l.slug}" references missing department "${ds}"`);
      }
    }
  }
});

check('firm.founderSlug points to a lawyer with isFounder=true', () => {
  const founder = lawyers.find((l) => l.slug === firm.founderSlug);
  if (!founder) throw new Error(`firm.founderSlug "${firm.founderSlug}" not found in lawyers.ts`);
  if (!founder.isFounder) throw new Error(`Lawyer "${founder.slug}" referenced as founder but isFounder is not true`);
});

if (errorCount > 0) {
  console.error(`\n${errorCount} validation error(s).`);
  process.exit(1);
}
console.log('\nAll data files valid.');
