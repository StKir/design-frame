import type { ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'ghost';
};

export const PrimaryButton = ({
  children,
  onClick,
  className = '',
  variant = 'solid',
}: PrimaryButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className={`flex h-12 w-full items-center justify-center rounded-xl text-[14px] font-semibold tracking-[-0.01em] transition active:scale-[0.98] ${
      variant === 'solid'
        ? 'bg-[#1C1C1E] text-white'
        : 'border border-[rgba(0,0,0,0.1)] bg-white/80 coach-text'
    } ${className}`}
  >
    {children}
  </button>
);
