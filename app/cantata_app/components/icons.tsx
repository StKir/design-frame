type IconProps = {
  size?: number;
  className?: string;
};

export const IconHome = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M5 12l-2 0l9 -9l9 9l-2 0' />
    <path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7' />
    <path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6' />
  </svg>
);

export const IconCatalog = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M4 4h6v6h-6z' />
    <path d='M14 4h6v6h-6z' />
    <path d='M4 14h6v6h-6z' />
    <path d='M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
  </svg>
);

export const IconStores = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
    <path d='M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z' />
  </svg>
);

export const IconCart = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2 -1.61l1.6 -8.39h-15.32' />
  </svg>
);

export const IconProfile = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
    <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
  </svg>
);

export const IconSearch = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
    <path d='M21 21l-6 -6' />
  </svg>
);

export const IconMenu = ({ size = 22, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </svg>
);

export const IconPin = ({ size = 13, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' />
    <path d='M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z' />
  </svg>
);

export const IconBack = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M5 12l14 0' />
    <path d='M5 12l6 6' />
    <path d='M5 12l6 -6' />
  </svg>
);

export const IconHeart = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
  </svg>
);

export const IconPlus = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M12 5l0 14' />
    <path d='M5 12l14 0' />
  </svg>
);

export const IconRepeat = ({ size = 11, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
    <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
  </svg>
);

export const IconChevronRight = ({ size = 12, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M9 6l6 6l-6 6' />
  </svg>
);

export const IconTag = ({ size = 28, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
    <path d='M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z' />
  </svg>
);

export const IconGift = ({ size = 28, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M3 8m0 1a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1z' />
    <path d='M12 8l0 13' />
    <path d='M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7' />
    <path d='M7.5 8a2.5 2.5 0 0 1 0 -5a4.8 8 0 0 1 4.5 5a4.8 8 0 0 1 4.5 -5a2.5 2.5 0 0 1 0 5' />
  </svg>
);

export const IconTicket = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M15 5l0 2' />
    <path d='M15 11l0 2' />
    <path d='M15 17l0 2' />
    <path d='M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2' />
  </svg>
);

export const IconChevronDown = ({ size = 16, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M6 9l6 6l6 -6' />
  </svg>
);

export const IconClipboard = ({ size = 17, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z' />
    <path d='M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1' />
  </svg>
);

export const IconTrash = ({ size = 17, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M4 7l16 0' />
    <path d='M10 11l0 6' />
    <path d='M14 11l0 6' />
    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
  </svg>
);

export const IconCartAdd = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
    <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2 -1.61l1.6 -8.39h-15.32' />
    <path d='M15 6h6m-3 -3v6' />
  </svg>
);

export const IconCheckout = ({ size = 18, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2' />
    <path d='M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z' />
    <path d='M9 14l2 2l4 -4' />
  </svg>
);

export const IconFilter = ({ size = 14, className }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className}>
    <path d='M4 6h16' />
    <path d='M7 12h10' />
    <path d='M10 18h4' />
  </svg>
);
