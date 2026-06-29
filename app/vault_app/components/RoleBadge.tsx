import type { ContainerRole } from '~/vault_app/types';

const roleLabels: Record<ContainerRole, string> = {
  personal: 'Личный',
  work: 'Рабочий',
  shared: 'Общий',
};

type RoleBadgeProps = {
  role: ContainerRole;
};

export const RoleBadge = ({ role }: RoleBadgeProps) => (
  <span className={`vault-role-badge ${role !== 'personal' ? `vault-role-badge--${role}` : ''}`}>
    {roleLabels[role]}
  </span>
);
