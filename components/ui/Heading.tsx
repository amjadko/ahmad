import clsx from 'clsx';

type HeadingProps = {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
  /** When true, uses Tajawal (Arabic). Otherwise uses Cormorant Garamond (display). */
  asArabic?: boolean;
};

const sizeMap = {
  lg: 'text-lg md:text-xl',
  xl: 'text-xl md:text-2xl',
  '2xl': 'text-2xl md:text-3xl',
  '3xl': 'text-3xl md:text-4xl',
  '4xl': 'text-3xl md:text-4xl lg:text-5xl',
  '5xl': 'text-4xl md:text-5xl lg:text-5xl'
};

export function Heading({
  children,
  level = 2,
  size = '3xl',
  className,
  asArabic
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={clsx(
        asArabic ? 'font-arabic font-bold' : 'font-display font-semibold',
        'leading-tight text-cream',
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
