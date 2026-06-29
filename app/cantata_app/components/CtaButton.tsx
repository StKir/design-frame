import type { ReactNode } from 'react';

type CtaButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const CtaButton = ({ children, onClick, className = '' }: CtaButtonProps) => (
  <button type='button' onClick={onClick} className={`cantata-ctabtn ${className}`}>
    {children}
  </button>
);
