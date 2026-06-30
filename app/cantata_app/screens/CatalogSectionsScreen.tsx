import { categoryGrid } from '~/cantata_app/data/categories';
import type { CantataTab, CatalogCategory } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { BottomNav } from '~/cantata_app/components/BottomNav';
import { IconSearch } from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type CatalogSectionsScreenProps = {
  activeTab: CantataTab;
  cartCount: number;
  onBack: () => void;
  onTabChange: (tab: CantataTab) => void;
  onOpenCategory: (category: CatalogCategory) => void;
  hideBack?: boolean;
};

export const CatalogSectionsScreen = ({
  activeTab,
  cartCount,
  onBack,
  onTabChange,
  onOpenCategory,
  hideBack = false,
}: CatalogSectionsScreenProps) => (
  <div className='cantata-sc'>
    <StatusBar />
    <header className='cantata-shdr'>
      {hideBack ? <div className='w-[38px]' /> : <BackButton onClick={onBack} variant='pill' />}
      <span className='cantata-htitle'>Каталог</span>
      <button type='button' className='cantata-hbtn' aria-label='Поиск'>
        <IconSearch />
      </button>
    </header>

    <div className='cantata-scont cantata-hide-scrollbar px-5'>
      <div className='cantata-catgrid cantata-catgrid--wide'>
        {categoryGrid.map((category) => (
          <button
            key={category.id}
            type='button'
            onClick={() => onOpenCategory(category.id)}
            className='cantata-catcard cantata-catcard--big cantata-card-press'
          >
            {category.image && <img src={category.image} alt='' className='cantata-catcard__img' />}
            <div className='cantata-catcard__content'>
              <span className='cantata-catcard__ic'>{category.icon}</span>
              <span className='cantata-catcard__label'>{category.label}</span>
            </div>
            <div className='cantata-catcard__count'>{category.count} напитков</div>
          </button>
        ))}
      </div>
    </div>

    <BottomNav activeTab={activeTab} cartCount={cartCount} onTabChange={onTabChange} />
  </div>
);
