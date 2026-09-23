// Line icons copied from the design references (24×24, stroke 1.6 unless noted).
type P = { size?: number; className?: string };
const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SearchIcon = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} className={className} aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
export const AccountIcon = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} className={className} aria-hidden>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
export const CartIcon = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.6} className={className} aria-hidden>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.4 12.4a1.5 1.5 0 0 0 1.5 1.2h8.2a1.5 1.5 0 0 0 1.5-1.2L22 7H6" />
  </svg>
);
export const CloseIcon = ({ size = 30, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.3} className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const PlusIcon = ({ size = 22, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...line} strokeWidth={1.4} className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const WhatsAppIcon = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2z" />
  </svg>
);
/** Menu button glyphs: two long stripes (desktop) / three uprights (mobile portrait). */
export const MenuStripes = () => (
  <svg width="38" height="14" viewBox="0 0 38 14" {...line} strokeWidth={2} aria-hidden>
    <path d="M1 2h36M1 12h36" />
  </svg>
);
export const MenuThree = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" {...line} strokeWidth={1.2} aria-hidden>
    <path d="M5 2.5v19M12 2.5v19M19 2.5v19" />
  </svg>
);
