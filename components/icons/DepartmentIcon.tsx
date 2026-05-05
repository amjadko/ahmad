import type { Department } from '@/data/types';

const stroke = '#C9A961';
const strokeWidth = 1.4;

const icons: Record<Department['iconKey'], React.ReactNode> = {
  corporate: (
    <>
      <rect x="6" y="14" width="36" height="26" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M6 22 H42" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M18 14 V8 H30 V14" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M22 30 H26" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  litigation: (
    <>
      <path d="M12 36 H36" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M24 36 V24" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M16 24 H32" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M14 24 L24 14 L34 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 19 L29 9" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M28 8 L32 12" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  labor: (
    <>
      <circle cx="18" cy="16" r="5" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M9 36 C9 28 12 24 18 24 C24 24 27 28 27 36" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="32" cy="20" r="4" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M26 36 C26 30 28 27 32 27 C36 27 38 30 38 36" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M32 32 L34 34 L38 30" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  tax: (
    <>
      <rect x="10" y="8" width="28" height="32" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M14 16 H34" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="17" cy="22" r="1.4" fill={stroke} />
      <circle cx="22" cy="22" r="1.4" fill={stroke} />
      <circle cx="27" cy="22" r="1.4" fill={stroke} />
      <circle cx="32" cy="22" r="1.4" fill={stroke} />
      <path d="M16 28 H22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M16 33 H30" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
    </>
  ),
  ip: (
    <>
      <path d="M24 6 L36 12 V24 C36 32 30 38 24 42 C18 38 12 32 12 24 V12 Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="24" cy="22" r="6" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <text x="24" y="26" fontSize="9" fill={stroke} textAnchor="middle" fontFamily="serif" fontWeight="500">R</text>
    </>
  ),
  translation: (
    <>
      <rect x="8" y="10" width="24" height="30" rx="2" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M14 18 H26" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M14 24 H22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="36" cy="32" r="8" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M28 32 H44" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M36 24 C40 28 40 36 36 40 C32 36 32 28 36 24 Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </>
  )
};

export function DepartmentIcon({
  iconKey,
  size = 48,
  className
}: {
  iconKey: Department['iconKey'];
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {icons[iconKey]}
    </svg>
  );
}
