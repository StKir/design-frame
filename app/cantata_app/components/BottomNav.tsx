import type { CantataTab } from '~/cantata_app/types';

import {
  IconCart,
  IconCatalog,
  IconHome,
  IconProfile,
  IconStores,
} from '~/cantata_app/components/icons';

type BottomNavProps = {
  activeTab: CantataTab;
  cartCount: number;
  onTabChange: (tab: CantataTab) => void;
};

const tabs: { id: CantataTab; label: string; icon: typeof IconHome; stub?: boolean }[] = [
  { id: 'home', label: 'Главная', icon: IconHome },
  { id: 'catalog', label: 'Каталог', icon: IconCatalog },
  { id: 'stores', label: 'Магазины', icon: IconStores, stub: true },
  { id: 'cart', label: 'Корзина', icon: IconCart },
  { id: 'profile', label: 'Профиль', icon: IconProfile, stub: true },
];

export const BottomNav = ({ activeTab, cartCount, onTabChange }: BottomNavProps) => (
  <nav className='cantata-bnav'>
    {tabs.map(({ id, label, icon: Icon, stub }) => {
      const isActive = activeTab === id;

      return (
        <button
          key={id}
          type='button'
          onClick={() => !stub && onTabChange(id)}
          className={`cantata-bni ${isActive ? 'cantata-bni--a' : ''} ${stub ? 'cursor-default opacity-60' : ''}`}
          aria-label={label}
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon />
          <span>{label}</span>
          {id === 'cart' && cartCount > 0 && (
            <span className='cantata-bni-badge'>{cartCount}</span>
          )}
        </button>
      );
    })}
  </nav>
);
