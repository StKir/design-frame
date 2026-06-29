import type { ReactNode } from 'react';

import { IconPlus } from '~/vault_app/components/icons';

type PrimaryButtonProps = {
  children: ReactNode;
};

export const PrimaryButton = ({ children }: PrimaryButtonProps) => (
  <button type='button' className='vault-btn-primary'>
    <IconPlus />
    {children}
  </button>
);
