import { getCartItemLabel, getCartTotal } from '~/cantata_app/data/cart';
import { getDrinkById } from '~/cantata_app/data/drinks';
import type { CantataTab, CartItem } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { BottomNav } from '~/cantata_app/components/BottomNav';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import {
  IconCheckout,
  IconChevronDown,
  IconClipboard,
  IconHeart,
  IconTicket,
  IconTrash,
} from '~/cantata_app/components/icons';

type CartScreenProps = {
  activeTab: CantataTab;
  cartCount: number;
  items: CartItem[];
  onTabChange: (tab: CantataTab) => void;
  onBack: () => void;
  onOpenCatalog: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
};

export const CartScreen = ({
  activeTab,
  cartCount,
  items,
  onTabChange,
  onBack,
  onOpenCatalog,
  onUpdateQuantity,
  onRemoveItem,
}: CartScreenProps) => {
  const total = getCartTotal(items);
  const drinkCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='cantata-sc'>
      <header className='cantata-shdr'>
        <BackButton onClick={onBack} variant='pill' />
        <span className='cantata-htitle'>Корзина</span>
        <div className='w-[38px]' />
      </header>

      <div className='cantata-scont cantata-hide-scrollbar px-5'>
        {items.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <p className='mb-2 text-base font-semibold text-[var(--text-ink)]'>Корзина пуста</p>
            <p className='mb-6 text-sm text-[var(--text-sub)]'>Добавьте напитки из каталога</p>
            <button
              type='button'
              onClick={onOpenCatalog}
              className='cantata-tp cantata-tp--a'
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <>
            {items.map((item) => {
              const drink = getDrinkById(item.drinkId);

              if (!drink) {
                return null;
              }

              return (
                <div key={item.id} className='cantata-citem'>
                  <div className='cantata-citem__thumb'>
                    {drink.image && <img src={drink.image} alt={drink.displayName} />}
                  </div>
                  <div className='cantata-citem__mid'>
                    <div className='cantata-citem__nm'>
                      {drink.category} «{drink.displayName}»
                    </div>
                    <div className='cantata-citem__opt'>{getCartItemLabel(item)}</div>
                    <div className='cantata-citem__price'>{item.unitPrice * item.quantity} ₽</div>
                    <div className='cantata-citem__actions'>
                      <span className='cantata-citem__icon'>
                        <IconClipboard />
                      </span>
                      <span className='cantata-citem__icon'>
                        <IconHeart size={20} />
                      </span>
                      <button
                        type='button'
                        onClick={() => onRemoveItem(item.id)}
                        className='cantata-citem__icon'
                        aria-label='Удалить'
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                  <div className='cantata-citem__right'>
                    <div className='cantata-cqstepper'>
                      <button
                        type='button'
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className='cantata-cqbtn'
                        aria-label='Уменьшить'
                      >
                        −
                      </button>
                      <span className='cantata-cqval'>{item.quantity}</span>
                      <button
                        type='button'
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className='cantata-cqbtn'
                        aria-label='Увеличить'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className='cantata-promo-row'>
              <span className='flex items-center'>
                <span className='mr-1.5' style={{ color: 'var(--cinnamon)' }}>
                  <IconTicket />
                </span>
                У меня есть промокод
              </span>
              <IconChevronDown />
            </div>

            <div className='cantata-totals'>
              <div className='cantata-trow'>
                <span>Напитки ({drinkCount})</span>
                <span>{total} ₽</span>
              </div>
              <div className='cantata-trow cantata-trow--total'>
                <span>Итого</span>
                <span>{total} ₽</span>
              </div>
            </div>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className='cantata-ctabar'>
          <CtaButton>
            <IconCheckout /> Оформить заказ · {total} ₽
          </CtaButton>
        </div>
      )}

      <BottomNav activeTab={activeTab} cartCount={cartCount} onTabChange={onTabChange} />
    </div>
  );
};
