import clsx from 'clsx';

export function Divider({
  variant = 'gold-short',
  className
}: {
  variant?: 'gold-short' | 'gold-full' | 'line-full';
  className?: string;
}) {
  const variantClass = {
    'gold-short': 'h-px w-12 bg-gold',
    'gold-full': 'h-px w-full bg-gold',
    'line-full': 'h-px w-full bg-ink-line'
  };
  return <span className={clsx('block', variantClass[variant], className)} aria-hidden="true" />;
}
