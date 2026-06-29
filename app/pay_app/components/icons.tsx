type IconProps = {
  size?: number;
};

export const IconArrowLeft = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M19 12H5M12 19l-7-7 7-7' />
  </svg>
);

export const IconTransfer = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M7 17l-4-4 4-4M3 13h12M17 7l4 4-4 4M21 11H9' />
  </svg>
);

export const IconBalance = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='2' y='5' width='20' height='14' rx='2' />
    <path d='M2 10h20M6 15h2M10 15h4' />
  </svg>
);

export const IconInternal = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3' />
    <path d='M12 8v8M9 11l3-3 3 3M9 13l3 3 3-3' />
  </svg>
);

export const IconMobile = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='5' y='2' width='14' height='20' rx='2' />
    <path d='M12 18h.01' />
  </svg>
);

export const IconContacts = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' />
  </svg>
);

export const IconChevronRight = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M9 18l6-6-6-6' />
  </svg>
);

export const IconSignal = ({ size = 14 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
    <rect x='1' y='14' width='4' height='8' rx='1' />
    <rect x='7' y='10' width='4' height='12' rx='1' />
    <rect x='13' y='6' width='4' height='16' rx='1' />
    <rect x='19' y='2' width='4' height='20' rx='1' opacity='0.3' />
  </svg>
);

export const IconBattery = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 28 14' fill='none'>
    <rect x='0.5' y='0.5' width='23' height='13' rx='3' stroke='currentColor' strokeWidth='1' />
    <rect x='2' y='2' width='17' height='10' rx='2' fill='currentColor' />
    <path d='M25 4.5v5a1.5 1.5 0 000-5z' fill='currentColor' />
  </svg>
);

export const IconAndroid = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M17.6 9.48l1.84-3.18c.16-.31-.04-.69-.37-.69H15.3c-.14 0-.27.07-.35.19l-1.97 3.4a8.96 8.96 0 00-4.96 0L6.05 5.8A.42.42 0 005.7 5.61H4.93c-.33 0-.53.38-.37.69l1.84 3.18A8.9 8.9 0 002 14.5h20a8.9 8.9 0 00-3.4-5.02zM7 17.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z' />
  </svg>
);

export const IconApple = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z' />
  </svg>
);

export const IconQr = ({ size = 22 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='3' width='7' height='7' rx='1' />
    <rect x='14' y='3' width='7' height='7' rx='1' />
    <rect x='3' y='14' width='7' height='7' rx='1' />
    <path d='M14 14h2v2h-2zM18 14h3v3h-3zM14 18h2v3h-2zM18 18h3v3h-3zM21 14v7' />
  </svg>
);

export const IconPlus = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M12 5v14M5 12h14' />
  </svg>
);

export const IconSearch = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='11' cy='11' r='8' />
    <path d='M21 21l-4.35-4.35' />
  </svg>
);

export const IconChevronDown = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M6 9l6 6 6-6' />
  </svg>
);

export const IconCard = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='2' y='5' width='20' height='14' rx='2' />
    <path d='M2 10h20' />
  </svg>
);
