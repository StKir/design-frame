import type { ReactNode } from 'react';

type ScreenShellProps = {
  children: ReactNode;
};

export const ScreenShell = ({ children }: ScreenShellProps) => (
  <div className="tempkey-screen tempkey-screen-enter">
    <div className="tempkey-screen__body">{children}</div>
  </div>
);
