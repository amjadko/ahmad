'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  company: z.string().optional(),
  country: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  /** honeypot — should always be empty */
  website: z.string().max(0).optional()
});

type FormValues = z.infer<typeof Schema>;

export function ContactForm() {
  const t = useTranslations('contact.form');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(Schema)
  });

  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const inputCls =
    'mt-2 w-full rounded-sm border border-ink-line bg-ink-deep px-4 py-3 text-sm text-cream placeholder:text-cream-muted/50 focus:border-gold focus:outline-none';
  const labelCls = 'block text-2xs font-semibold uppercase tracking-eyebrow text-cream-muted';
  const errCls = 'mt-1 text-2xs text-red-300';

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        try {
          const res = await fetch('/contact.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(values as Record<string, string>).toString()
          });
          if (!res.ok) throw new Error('Bad status');
          setStatus('success');
          reset();
        } catch {
          setStatus('error');
        }
      })}
      className="grid gap-5 md:grid-cols-2"
      noValidate
    >
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <div>
        <label className={labelCls}>{t('name')}<span className="text-gold">*</span></label>
        <input type="text" autoComplete="name" className={inputCls} {...register('name')} />
        {errors.name && <p className={errCls}>{t('name')}</p>}
      </div>

      <div>
        <label className={labelCls}>{t('email')}<span className="text-gold">*</span></label>
        <input type="email" autoComplete="email" dir="ltr" className={inputCls} {...register('email')} />
        {errors.email && <p className={errCls}>{t('email')}</p>}
      </div>

      <div>
        <label className={labelCls}>{t('phone')}<span className="text-gold">*</span></label>
        <input type="tel" autoComplete="tel" dir="ltr" className={inputCls} {...register('phone')} />
        {errors.phone && <p className={errCls}>{t('phone')}</p>}
      </div>

      <div>
        <label className={labelCls}>{t('company')}</label>
        <input type="text" autoComplete="organization" className={inputCls} {...register('company')} />
      </div>

      <div>
        <label className={labelCls}>{t('country')}</label>
        <input type="text" autoComplete="country-name" className={inputCls} {...register('country')} />
      </div>

      <div>
        <label className={labelCls}>{t('subject')}<span className="text-gold">*</span></label>
        <input type="text" className={inputCls} {...register('subject')} />
        {errors.subject && <p className={errCls}>{t('subject')}</p>}
      </div>

      <div className="md:col-span-2">
        <label className={labelCls}>{t('message')}<span className="text-gold">*</span></label>
        <textarea rows={5} className={inputCls} {...register('message')} />
        {errors.message && <p className={errCls}>{t('message')}</p>}
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
        <Button as="button" type="submit" variant="primary" size="lg" disabled={isSubmitting}>
          {isSubmitting ? t('sending') : t('submit')}
        </Button>

        {status === 'success' && (
          <p className="text-sm text-gold-bright" role="status" aria-live="polite">{t('success')}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-300" role="alert">{t('error')}</p>
        )}
      </div>
    </form>
  );
}
