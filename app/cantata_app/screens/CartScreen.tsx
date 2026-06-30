import {
  getCartDiscount,
  getCartItemLabel,
  getCartPayableTotal,
  getCartTotal,
} from '~/cantata_app/data/cart';
import { getDrinkById } from '~/cantata_app/data/drinks';
import type { CartItem } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import {
  IconCheckout,
  IconChevronDown,
  IconClipboard,
  IconHeart,
  IconTicket,
  IconTrash,
} from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type CartScreenProps = {
  items: CartItem[];
  onBack: () => void;
  onOpenCatalog: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
};

export const CartScreen = ({
  items,
  onBack,
  onOpenCatalog,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartScreenProps) => {
  const total = getCartTotal(items);
  const discount = getCartDiscount(items);
  const payableTotal = getCartPayableTotal(items);
  const drinkCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='cantata-sc'>
      <StatusBar />
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
              const title = drink ? `${drink.category} «${drink.displayName}»` : item.title;

              return (
                <div key={item.id} className='cantata-citem'>
                  <div className='cantata-citem__thumb'>
                    {drink?.image ? <img src={drink.image} alt={drink.displayName} /> : '🍫'}
                  </div>
                  <div className='cantata-citem__mid'>
                    <div className='cantata-citem__nm'>{title}</div>
                    <div className='cantata-citem__opt'>
                      {drink ? getCartItemLabel(item) : 'К напитку'}
                    </div>
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

            <div className='cantata-cart-discount-block'>
              <div className='cantata-cart-discount__title'>Скидка по карте лояльности</div>
              <div className='cantata-cart-discount__row'>
                <span>Ваша скидка</span>
                <strong>20%</strong>
              </div>
              <div className='cantata-cart-discount__row cantata-cart-discount__row--green'>
                <span>Экономия</span>
                <strong>−{discount} ₽</strong>
              </div>
            </div>

            <div className='cantata-cart-next-block'>
              <span>🏆</span>
              <strong>До скидки 25% осталось заказать на 870 ₽</strong>
            </div>

            <div className='cantata-promo-row'>
              <span className='flex items-center'>
                <span className='mr-1.5' style={{ color: 'var(--cinnamon)' }}>
                  <IconTicket />
                </span>
                У меня есть купон / промокод
              </span>
              <IconChevronDown />
            </div>

            <div className='cantata-totals'>
              <div className='cantata-trow'>
                <span>Напитки ({drinkCount})</span>
                <span>{total} ₽</span>
              </div>
              <div className='cantata-trow cantata-trow--discount'>
                <span>Скидка 20%</span>
                <span>−{discount} ₽</span>
              </div>
              <div className='cantata-trow cantata-trow--total'>
                <span>Итого</span>
                <span>{payableTotal} ₽</span>
              </div>
            </div>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className='cantata-ctabar'>
          <CtaButton onClick={onCheckout}>
            <IconCheckout /> Оформить заказ · {payableTotal} ₽
          </CtaButton>
        </div>
      )}
    </div>
  );
};
