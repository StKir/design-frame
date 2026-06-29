import type { ReactNode } from 'react';

type ScreenShellProps = {
  children: ReactNode;
  footer?: ReactNode;
};

export const ScreenShell = ({ children, footer }: ScreenShellProps) => (
  <div className='coach-screen coach-screen-enter h-[844px] overflow-hidden'>
    <div className='coach-screen__glow' aria-hidden='true' />
    <div className={`coach-screen__content relative z-10 flex h-full flex-col ${footer ? '' : ''}`}>
      <div className={`coach-hide-scrollbar flex-1 px-5 ${footer ? 'overflow-y-auto' : 'overflow-y-auto'}`}>
        {children}
      </div>
      {footer}
    </div>
  </div>
);
