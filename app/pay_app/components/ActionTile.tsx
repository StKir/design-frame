import type { ReactNode } from 'react';

type ActionTileProps = {
  icon: ReactNode;
  label: string;
  hint?: string;
};

export const ActionTile = ({ icon, label, hint }: ActionTileProps) => (
  <button type='button' className='pay-action-tile'>
    <span className='pay-action-tile__icon'>{icon}</span>
    <span className='pay-action-tile__label'>{label}</span>
    {hint && <span className='pay-action-tile__hint'>{hint}</span>}
  </button>
);
