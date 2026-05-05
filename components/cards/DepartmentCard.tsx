import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DepartmentIcon } from '@/components/icons/DepartmentIcon';
import { ArrowRightIcon } from '@/components/icons/ContactIcons';
import type { Locale } from '@/i18n/routing';
import type { Department, Lawyer } from '@/data/types';

export function DepartmentCard({
  department,
  lawyer
}: {
  department: Department;
  lawyer: Lawyer;
}) {
  const locale = useLocale() as Locale;
  const isAr = locale === 'ar';
  const t = useTranslations('common');

  return (
    <Link
      href={`/lawyer/${lawyer.slug}?dept=${department.slug}`}
      className="group flex h-full flex-col rounded-sm border border-ink-line bg-ink-elevated p-7 transition-all duration-300 hover:border-gold hover:bg-ink-elevated/70 focus-visible:border-gold"
    >
      <div className="flex items-start justify-between">
        <DepartmentIcon iconKey={department.iconKey} className="transition-transform duration-300 group-hover:scale-105" />
      </div>

      <h3
        className={
          isAr
            ? 'mt-6 font-arabic font-bold text-xl text-cream'
            : 'mt-6 font-display font-semibold text-xl text-cream'
        }
      >
        {department.name[locale]}
      </h3>
      <span className="mt-3 block h-px w-10 bg-gold" />

      <p className="mt-5 text-sm text-cream-muted leading-relaxed flex-1">
        {department.shortDescription[locale]}
      </p>

      <div className="mt-6 pt-5 border-t border-ink-line transition-all duration-300 group-hover:border-gold/60">
        <p className="text-2xs uppercase tracking-eyebrow text-cream-muted">
          {t('responsibleLawyer')}
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className={isAr ? 'font-arabic text-sm text-cream' : 'text-sm text-cream'}>
            {lawyer.name[locale]}
          </p>
          <ArrowRightIcon className={`transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
        </div>
      </div>
    </Link>
  );
}
