import type { ReactNode } from 'react';

type ScreenShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  fab?: ReactNode;
};

export const ScreenShell = ({ children, footer, fab }: ScreenShellProps) => (
  <div className='vault-screen vault-screen-enter h-[844px] overflow-hidden'>
    <div className='vault-screen__content relative flex h-full flex-col'>
      <div className='vault-hide-scrollbar flex-1 overflow-y-auto'>{children}</div>
      {fab}
      {footer}
    </div>
  </div>
);
