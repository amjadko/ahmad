import clsx from 'clsx';

export function Container({
  children,
  className,
  as: Tag = 'div'
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return <Tag className={clsx('container-page', className)}>{children}</Tag>;
}
