import type { ReactNode } from 'react';

type SecondaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const SecondaryButton = ({
  children,
  onClick,
  className = '',
}: SecondaryButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-14 w-full items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white text-[15px] font-semibold text-[#0A0A0A] transition active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);
