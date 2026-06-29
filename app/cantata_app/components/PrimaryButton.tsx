import type { ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  pulse?: boolean;
  className?: string;
};

export const PrimaryButton = ({
  children,
  onClick,
  variant = 'primary',
  pulse = false,
  className = '',
}: PrimaryButtonProps) => {
  const base =
    'flex h-14 w-full items-center justify-center rounded-2xl text-sm font-semibold uppercase tracking-widest transition active:scale-[0.98]';

  const variants = {
    primary: `bg-gradient-to-r from-[#4CBC89] to-[#31A570] text-white ${pulse ? 'cantata-pulse-cta' : ''}`,
    secondary: 'cantata-glass text-[rgba(48,48,48,1)]',
  };

  return (
    <button
      type='button'
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
