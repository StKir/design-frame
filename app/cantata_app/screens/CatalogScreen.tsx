import { useMemo, useState } from 'react';

import { catalogTabs, getCategoryTitle } from '~/cantata_app/data/categories';
import { drinks } from '~/cantata_app/data/drinks';
import type { CantataTab, CatalogCategory } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { BottomNav } from '~/cantata_app/components/BottomNav';
import { CatalogProductCard } from '~/cantata_app/components/CatalogProductCard';
import { IconSearch } from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type CatalogScreenProps = {
  activeTab: CantataTab;
  cartCount: number;
  initialCategory?: CatalogCategory;
  onTabChange: (tab: CantataTab) => void;
  onBack: () => void;
  onSelectDrink: (id: string) => void;
  onQuickAdd: (id: string) => void;
};

export const CatalogScreen = ({
  activeTab,
  cartCount,
  initialCategory,
  onTabChange,
  onBack,
  onSelectDrink,
  onQuickAdd,
}: CatalogScreenProps) => {
  const defaultTab = initialCategory
    ? catalogTabs.find((tab) => tab.filter === initialCategory)?.id ?? 'signature'
    : 'signature';

  const [activeTabId, setActiveTabId] = useState(defaultTab);

  const activeFilter = catalogTabs.find((tab) => tab.id === activeTabId)?.filter ?? 'signature';

  const filteredDrinks = useMemo(() => {
    if (activeFilter === 'all') {
      return drinks;
    }

    return drinks.filter((drink) => drink.catalogCategory === activeFilter);
  }, [activeFilter]);

  const title =
    initialCategory && initialCategory !== 'all'
      ? getCategoryTitle(initialCategory)
      : activeFilter === 'all'
        ? 'Все'
        : getCategoryTitle(activeFilter as CatalogCategory);

  return (
    <div className='cantata-sc'>
      <StatusBar />
      <header className='cantata-shdr'>
        <BackButton onClick={onBack} variant='pill' />
        <span className='cantata-htitle'>{title}</span>
        <button type='button' className='cantata-hbtn' aria-label='Поиск'>
          <IconSearch />
        </button>
      </header>

      <div className='cantata-scont cantata-hide-scrollbar'>
        <div className='cantata-tabs'>
          <div className='cantata-tabsi cantata-hide-scrollbar'>
            {catalogTabs.map((tab) => (
              <button
                key={tab.id}
                type='button'
                onClick={() => setActiveTabId(tab.id)}
                className={`cantata-tp ${activeTabId === tab.id ? 'cantata-tp--a' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className='cantata-pgrid cantata-pgrid-narrow'>
          {filteredDrinks.map((drink) => (
            <CatalogProductCard
              key={drink.id}
              drink={drink}
              onSelect={onSelectDrink}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </div>

      <BottomNav activeTab={activeTab} cartCount={cartCount} onTabChange={onTabChange} />
    </div>
  );
};
