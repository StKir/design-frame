import type { ReactElement } from 'react';

import { IconChat, IconFolder, IconSettings } from '~/vault_app/components/icons';
import type { ContainerTab } from '~/vault_app/types';

type ContainerTabBarProps = {
  activeTab: ContainerTab;
};

const tabs: { id: ContainerTab; label: string }[] = [
  { id: 'data', label: 'Данные' },
  { id: 'chat', label: 'ИИ Чат' },
  { id: 'settings', label: 'Настройки' },
];

const icons: Record<ContainerTab, () => ReactElement> = {
  data: IconFolder,
  chat: IconChat,
  settings: IconSettings,
};

export const ContainerTabBar = ({ activeTab }: ContainerTabBarProps) => (
  <nav className='vault-tab-bar' aria-label='Навигация контейнера'>
    {tabs.map(({ id, label }) => {
      const Icon = icons[id];
      const isActive = activeTab === id;

      return (
        <div
          key={id}
          className={`vault-tab-bar__item ${isActive ? 'vault-tab-bar__item--active' : ''}`}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className='vault-tab-bar__icon'>
            <Icon />
          </span>
          <span className='vault-tab-bar__label'>{label}</span>
        </div>
      );
    })}
  </nav>
);
