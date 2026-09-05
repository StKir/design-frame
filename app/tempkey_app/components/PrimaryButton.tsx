import type { ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => (
  <button type="button" className="tempkey-btn" onClick={onClick}>
    {children}
  </button>
);
