export function BrandMark({
  size = 56,
  className
}: {
  size?: number;
  className?: string;
}) {
  const stroke = '#C9A961';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Gavel head + handle */}
      <rect
        x="6"
        y="12"
        width="22"
        height="10"
        rx="1"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        transform="rotate(-30 17 17)"
      />
      <rect
        x="14"
        y="22"
        width="6"
        height="20"
        rx="1"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        transform="rotate(-30 17 32)"
      />

      {/* Vertical post and base */}
      <path d="M40 14 V46" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="32" y="46" width="20" height="6" rx="1" fill="none" stroke={stroke} strokeWidth="1.8" />
      <path d="M36 46 V42 H48 V46" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />

      {/* Scales beam + arrowhead */}
      <path d="M30 18 H54 L58 14" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 14 L55 13 L57 11" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

      {/* Right pan */}
      <path d="M46 18 V24" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M42 24 L50 24 L48 30 L44 30 Z" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
