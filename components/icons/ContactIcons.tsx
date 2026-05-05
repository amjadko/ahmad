const stroke = '#C9A961';
const strokeWidth = 1.4;

type IconProps = { size?: number; className?: string };

export function PinIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21 C8 16 5 13 5 9 A7 7 0 0 1 19 9 C19 13 16 16 12 21 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function PhoneIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5 C5 4 6 3 7 3 H9 L11 8 L8.5 9.5 C9.5 12 12 14.5 14.5 15.5 L16 13 L21 15 V17 C21 18 20 19 19 19 C11 19 5 13 5 5 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function MobileIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="3" width="10" height="18" rx="2" stroke={stroke} strokeWidth={strokeWidth} />
      <circle cx="12" cy="18" r="0.8" fill={stroke} />
    </svg>
  );
}

export function MailIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="1" stroke={stroke} strokeWidth={strokeWidth} />
      <path d="M3 7 L12 13 L21 7" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 21 L4.5 16 A8 8 0 1 1 8 19.5 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M9 9 C9 12 11 14 14 15 L16 13 L18 14 V16 C16 17 14 17 12 16 C10 15 8 13 7 11 C6 9 7 7 8 6 L10 7 L9 9 Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12 H19" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M13 6 L19 12 L13 18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
