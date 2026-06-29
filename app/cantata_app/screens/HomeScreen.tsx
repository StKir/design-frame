import { categoryGrid } from '~/cantata_app/data/categories';
import { drinks } from '~/cantata_app/data/drinks';
import { recentOrders } from '~/cantata_app/data/recentOrders';
import type { CantataTab, CatalogCategory } from '~/cantata_app/types';

import { BottomNav } from '~/cantata_app/components/BottomNav';
import { CategoryCard } from '~/cantata_app/components/CategoryCard';
import {
  IconChevronRight,
  IconGift,
  IconMenu,
  IconPin,
  IconSearch,
  IconTag,
} from '~/cantata_app/components/icons';
import { PromoStrip } from '~/cantata_app/components/PromoStrip';
import { RecentOrderCard } from '~/cantata_app/components/RecentOrderCard';

type HomeScreenProps = {
  activeTab: CantataTab;
  cartCount: number;
  onTabChange: (tab: CantataTab) => void;
  onOpenCatalog: (category?: CatalogCategory) => void;
  onSelectDrink: (id: string) => void;
};

const heroImage = drinks[0]?.image;

export const HomeScreen = ({
  activeTab,
  cartCount,
  onTabChange,
  onOpenCatalog,
  onSelectDrink,
}: HomeScreenProps) => (
  <div className='cantata-sc'>
    <header className='cantata-shdr'>
      <button type='button' className='cantata-hbtn' aria-label='Меню'>
        <span style={{ color: 'var(--cinnamon)' }}>
          <IconMenu />
        </span>
      </button>
      <div className='cantata-hloc'>
        <span style={{ color: 'var(--cinnamon)' }}>
          <IconPin />
        </span>
        Тульская Б., 13
      </div>
      <button type='button' className='cantata-hbtn' aria-label='Поиск'>
        <IconSearch />
      </button>
    </header>

    <div className='cantata-scont cantata-hide-scrollbar'>
      <div className='cantata-hero-band'>
        {heroImage && <img src={heroImage} alt='' className='cantata-hero-band__img' />}
        <div className='cantata-hero-band__scrim' />
        <div className='cantata-hero-band__body'>
          <div className='cantata-hero-band__tag'>Сезон · 2026</div>
          <div className='cantata-hero-band__title'>
            Настроение —
            <br />
            Солнце!
          </div>
          <div className='cantata-hero-band__sub'>5 новых напитков в меню</div>
        </div>
      </div>

      <div className='cantata-sec-row'>
        <span className='cantata-sec-title'>Недавно заказывали</span>
        <button type='button' onClick={() => onOpenCatalog()} className='cantata-sec-link'>
          <IconChevronRight /> Все
        </button>
      </div>

      <div className='cantata-hscroll cantata-hide-scrollbar'>
        {recentOrders.map((order) => (
          <RecentOrderCard key={order.drinkId} order={order} onRepeat={onSelectDrink} />
        ))}
      </div>

      <PromoStrip
        variant='amber'
        icon={<IconTag />}
        title='Второй напиток −20%'
        subtitle='При заказе двух напитков'
        badge='−20%'
      />
      <PromoStrip
        variant='mint'
        icon={<IconGift />}
        title='Сироп в подарок'
        subtitle='К любому кофейному напитку'
        badge='Бесплатно'
      />

      <div className='cantata-sec-row' style={{ marginTop: 20 }}>
        <span className='cantata-sec-title'>Каталог</span>
      </div>

      <div className='cantata-catgrid'>
        {categoryGrid.map((category) => (
          <CategoryCard key={category.id} category={category} onSelect={onOpenCatalog} />
        ))}
      </div>
    </div>

    <BottomNav activeTab={activeTab} cartCount={cartCount} onTabChange={onTabChange} />
  </div>
);
