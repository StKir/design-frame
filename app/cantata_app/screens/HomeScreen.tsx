import { useState } from 'react';

import { drinks, featuredDrink, popularDrinkIds } from '~/cantata_app/data/drinks';
import { recentOrders } from '~/cantata_app/data/recentOrders';
import type { CantataTab, CatalogCategory } from '~/cantata_app/types';

import { BottomNav } from '~/cantata_app/components/BottomNav';
import {
  IconChevronRight,
  IconCup,
  IconMenu,
  IconPin,
  IconPlus,
  IconSearch,
  IconTag,
  IconWalk,
} from '~/cantata_app/components/icons';
import { PromoStrip } from '~/cantata_app/components/PromoStrip';
import { RecentOrderCard } from '~/cantata_app/components/RecentOrderCard';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type HomeScreenProps = {
  activeTab: CantataTab;
  cartCount: number;
  onTabChange: (tab: CantataTab) => void;
  onOpenCatalog: (category?: CatalogCategory) => void;
  onSelectDrink: (id: string) => void;
};

const miniCards = popularDrinkIds
  .map((id) => drinks.find((drink) => drink.id === id))
  .filter((drink) => drink !== undefined)
  .slice(0, 6);

const seasonalCards = miniCards.slice(0, 2);
const frequentCards = miniCards.slice(2, 5);
const energyCards = miniCards.slice(3, 6);

const MiniSection = ({
  title,
  drinks: sectionDrinks,
  onOpenCatalog,
  onSelectDrink,
}: {
  title: string;
  drinks: typeof miniCards;
  onOpenCatalog?: () => void;
  onSelectDrink: (id: string) => void;
}) => (
  <>
    <div className='cantata-sec-row' style={{ marginTop: 20 }}>
      <span className='cantata-sec-title'>{title}</span>
      {onOpenCatalog && (
        <button type='button' onClick={onOpenCatalog} className='cantata-sec-link'>
          <IconChevronRight /> В каталог
        </button>
      )}
    </div>
    <div className='cantata-mini-scroll cantata-hide-scrollbar'>
      {sectionDrinks.map((drink) => (
        <button
          key={`${title}-${drink.id}`}
          type='button'
          onClick={() => onSelectDrink(drink.id)}
          className='cantata-mini-card cantata-card-press'
        >
          <span className='cantata-mini-card__ph'>
            {drink.image ? <img src={drink.image} alt={drink.displayName} /> : '☕'}
            <span className='cantata-mini-card__add'>
              <IconPlus size={13} />
            </span>
          </span>
          <span className='cantata-mini-card__nm'>{drink.displayName}</span>
          <span className='cantata-mini-card__pr'>от {drink.basePrice} ₽</span>
        </button>
      ))}
    </div>
  </>
);

export const HomeScreen = ({
  activeTab,
  cartCount,
  onTabChange,
  onOpenCatalog,
  onSelectDrink,
}: HomeScreenProps) => {
  const [orderMode, setOrderMode] = useState<'gallery' | 'takeaway'>('gallery');

  return (
    <div className='cantata-sc'>
      <StatusBar />
      <header className='cantata-shdr'>
        <button type='button' className='cantata-hbtn' aria-label='Меню'>
          <span style={{ color: 'var(--cinnamon)' }}>
            <IconMenu />
          </span>
        </button>
        <div className='cantata-hloc'>
          <span className='cantata-hloc__pin'>
            <IconPin />
          </span>
          <span className='cantata-hloc__addr'>Тульская улица, 13</span>
          <span className='cantata-hloc__eta'>
            <IconWalk size={14} />5 мин
          </span>
        </div>
        <button type='button' className='cantata-hbtn' aria-label='Поиск'>
          <IconSearch />
        </button>
      </header>

      <div className='cantata-order-mode' role='group' aria-label='Формат заказа'>
        <button
          type='button'
          onClick={() => setOrderMode('gallery')}
          className={`cantata-order-mode__item ${
            orderMode === 'gallery' ? 'cantata-order-mode__item--active' : ''
          }`}
        >
          Галерея
        </button>
        <button
          type='button'
          onClick={() => setOrderMode('takeaway')}
          className={`cantata-order-mode__item ${
            orderMode === 'takeaway' ? 'cantata-order-mode__item--active' : ''
          }`}
        >
          Напитки с собой
        </button>
      </div>

      <div className='cantata-scont cantata-hide-scrollbar'>
        <div className='cantata-hero-band'>
          {featuredDrink?.image && (
            <img src={featuredDrink.image} alt='' className='cantata-hero-band__img' />
          )}
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

        <button
          type='button'
          onClick={() => onSelectDrink('cherry-patchouli')}
          className='cantata-status-card cantata-card-press'
        >
          <span className='cantata-status-card__icon'>
            <IconCup />
          </span>
          <span className='cantata-status-card__body'>
            <span className='cantata-status-card__time'>~4 мин</span>
            <span className='cantata-status-card__top'>
              <strong>Ваш заказ готовится</strong>
            </span>
            <span className='cantata-status-card__drink'>Латте «Вишня–Пачули»</span>
            {/* <span className='cantata-status-card__progress'>
              <span />
            </span> */}
          </span>
          <em className='cantata-status-card__cta'>
            Детали
            <IconChevronRight />
          </em>
        </button>

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

        <div className='cantata-loyalty-card'>
          <div>
            <span>До скидки</span>
            <strong>25%</strong>
          </div>
          <div className='cantata-loyalty-card__bar'>
            <span />
          </div>
          <p>осталось на 870 ₽</p>
        </div>

        <MiniSection
          title='Новинки сезона'
          drinks={seasonalCards}
          onOpenCatalog={() => onOpenCatalog()}
          onSelectDrink={onSelectDrink}
        />
        <MiniSection
          title='Чаще всего заказывают'
          drinks={frequentCards}
          onSelectDrink={onSelectDrink}
        />
        <MiniSection
          title='Кофе для бодрого дня'
          drinks={energyCards}
          onSelectDrink={onSelectDrink}
        />
      </div>

      <BottomNav activeTab={activeTab} cartCount={cartCount} onTabChange={onTabChange} />
    </div>
  );
};
