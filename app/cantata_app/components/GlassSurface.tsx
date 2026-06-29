import type { ReactNode, CSSProperties } from 'react';

type GlassSurfaceProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong';
  style?: CSSProperties;
};

export const GlassSurface = ({
  children,
  className = '',
  variant = 'default',
  style,
}: GlassSurfaceProps) => (
  <div
    className={`relative overflow-hidden ${
      variant === 'strong' ? 'cantata-glass-strong' : 'cantata-glass'
    } ${className}`}
    style={style}
  >
    {children}
  </div>
);
