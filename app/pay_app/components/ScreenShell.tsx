import type { CSSProperties, ReactNode } from 'react';

import { BankBackground } from '~/pay_app/components/BankBackground';
import { IconBattery, IconSignal } from '~/pay_app/components/icons';
import type { Bank } from '~/pay_app/types';

type ScreenShellProps = {
  bank: Bank;
  children: ReactNode;
  overlay?: ReactNode;
  showStatusBar?: boolean;
};

export const ScreenShell = ({ bank, children, overlay, showStatusBar = true }: ScreenShellProps) => (
  <div
    className='pay-screen pay-screen-enter'
    style={{ '--pay-bank-accent': bank.accent } as CSSProperties}
  >
    <BankBackground bank={bank} />
    <div className='pay-screen__content'>
      {showStatusBar && (
        <div className='pay-status-bar'>
          <span className='pay-status-bar__time'>9:41</span>
          <div className='pay-status-bar__icons'>
            <IconSignal />
            <IconBattery />
          </div>
        </div>
      )}
      <div className='pay-scroll pay-hide-scrollbar'>{children}</div>
      {overlay}
    </div>
  </div>
);
