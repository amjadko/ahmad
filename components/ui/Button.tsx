import clsx from 'clsx';
import { Link } from '@/i18n/routing';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-gold text-ink-deep hover:bg-gold-bright transition-colors duration-200',
  outline:
    'border border-gold text-gold hover:bg-gold hover:text-ink-deep transition-colors duration-200',
  ghost: 'text-gold hover:text-gold-bright transition-colors duration-200'
};

const sizeClass: Record<Size, string> = {
  md: 'px-5 py-2.5 text-xs uppercase tracking-eyebrow font-semibold',
  lg: 'px-7 py-3.5 text-xs uppercase tracking-eyebrow font-semibold'
};

type ButtonAsButton = {
  as?: 'button';
  href?: never;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentProps<'button'>;

type ButtonAsLink = {
  as: 'link';
  href: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className } = props;
  const cls = clsx(
    'inline-flex items-center justify-center gap-2',
    variantClass[variant],
    sizeClass[size],
    className
  );

  if (props.as === 'link') {
    if (props.external) {
      return (
        <a href={props.href} className={cls} target="_blank" rel="noopener noreferrer" onClick={props.onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, children: _c, className: _cl, as: _a, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
