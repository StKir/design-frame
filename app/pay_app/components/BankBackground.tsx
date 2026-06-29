import type { Bank } from '~/pay_app/types';

type BankBackgroundProps = {
  bank: Bank;
};

const withAlpha = (hex: string, alpha: number): string => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const BankBackground = ({ bank }: BankBackgroundProps) => (
  <div className='pay-bg'>
    <div
      className='pay-bg__orb'
      style={{
        background: `radial-gradient(circle, ${withAlpha(bank.accent, 0.55)} 0%, ${withAlpha(bank.accent, 0.28)} 42%, transparent 70%)`,
      }}
    />
    <div
      className='pay-bg__glow pay-bg__glow--bottom'
      style={{ background: `radial-gradient(ellipse 90% 55% at 50% 115%, ${bank.glowColor} 0%, transparent 72%)` }}
    />
  </div>
);
