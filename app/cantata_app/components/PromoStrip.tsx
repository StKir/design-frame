import type { ReactNode } from 'react';

type PromoStripProps = {
  variant: 'amber' | 'mint';
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge: string;
};

export const PromoStrip = ({ variant, icon, title, subtitle, badge }: PromoStripProps) => (
  <div className={`cantata-promo-strip cantata-promo-strip--${variant}`}>
    <span style={{ color: variant === 'amber' ? 'var(--cinnamon)' : 'var(--mint)' }}>{icon}</span>
    <div className='cantata-promo-strip__body'>
      <div className='cantata-promo-strip__title'>{title}</div>
      <div className='cantata-promo-strip__sub'>{subtitle}</div>
    </div>
    <div className='cantata-promo-strip__badge'>{badge}</div>
  </div>
);
