import { getCartDiscount, getCartItemLabel, getCartPayableTotal } from '~/cantata_app/data/cart';
import { getDrinkById } from '~/cantata_app/data/drinks';
import type { CartItem } from '~/cantata_app/types';

import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCheckout, IconCup } from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type SuccessScreenProps = {
  items: CartItem[];
  onHome: () => void;
};

const steps = ['Принят', 'Готовится', 'Готов', 'Выдан'];

export const SuccessScreen = ({ items, onHome }: SuccessScreenProps) => {
  const heroDrink = items.map((item) => getDrinkById(item.drinkId)).find((drink) => drink?.image);
  const discount = getCartDiscount(items);
  const total = getCartPayableTotal(items);

  return (
    <div className='cantata-sc cantata-success-sc'>
      <StatusBar />
      <header className='cantata-shdr'>
        <span className='w-[38px]' />
        <span className='cantata-htitle'>Статус заказа</span>
        <button
          type='button'
          onClick={onHome}
          className='cantata-hbtn cantata-hbtn--pill'
          aria-label='Закрыть'
        >
          ×
        </button>
      </header>

      <div className='cantata-scont cantata-hide-scrollbar px-5'>
        <div className='cantata-success-hero'>
          {heroDrink?.image && <img src={heroDrink.image} alt='' />}
          <div className='cantata-success-hero__overlay'>
            <span className='cantata-success-hero__status'>
              <IconCup size={14} />
              Готовится · ~4 мин
            </span>
            <strong>Заказ принят</strong>
          </div>
        </div>

        <div className='cantata-success-copy'>
          Мы уже готовим ваш латте.
          <br />
          Заберите в галерее на Тульской Б., 13
        </div>

        <div className='cantata-progress-card'>
          <div className='cantata-progress-steps'>
            {steps.map((step, index) => (
              <div
                key={step}
                className={`cantata-progress-step ${index <= 1 ? 'cantata-progress-step--on' : ''}`}
              >
                <span>{index === 0 ? '✓' : index === 1 ? <IconCup size={14} /> : ''}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <div className='cantata-progress-line'>
            <span />
          </div>
          <div className='cantata-progress-note'>Обновляется каждые 60 секунд</div>
        </div>

        <div className='cantata-success-order-head'>
          Заказ <span>#48291</span>
        </div>

        <div className='cantata-success-order-card'>
          {items.slice(0, 3).map((item) => {
            const drink = getDrinkById(item.drinkId);

            return (
              <div key={item.id} className='cantata-success-item'>
                <span className='cantata-success-item__img'>
                  {drink?.image ? <img src={drink.image} alt={drink.displayName} /> : '🍫'}
                </span>
                <span className='cantata-success-item__body'>
                  <strong>{drink ? drink.displayName : item.title}</strong>
                  <em>{drink ? getCartItemLabel(item) : 'К напитку'}</em>
                </span>
                <b>{item.unitPrice * item.quantity} ₽</b>
              </div>
            );
          })}
          {discount > 0 && (
            <div className='cantata-success-total-row cantata-success-total-row--discount'>
              <span>Скидка</span>
              <strong>−{discount} ₽</strong>
            </div>
          )}
          <div className='cantata-success-total-row'>
            <span>К оплате</span>
            <strong>{total} ₽</strong>
          </div>
        </div>
      </div>

      <div className='cantata-ctabar'>
        <CtaButton onClick={onHome}>
          <IconCheckout />
          На главную
        </CtaButton>
      </div>
    </div>
  );
};
