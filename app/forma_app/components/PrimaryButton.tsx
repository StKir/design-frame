import type { ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const PrimaryButton = ({
  children,
  onClick,
  className = '',
}: PrimaryButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-14 w-full items-center justify-center rounded-2xl bg-[#0A0A0A] text-[15px] font-semibold text-white transition active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);
