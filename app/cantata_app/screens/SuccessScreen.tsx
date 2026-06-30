import { getCartDiscount, getCartItemLabel, getCartPayableTotal } from '~/cantata_app/data/cart';
import { getDrinkById } from '~/cantata_app/data/drinks';
import type { CartItem } from '~/cantata_app/types';

import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCheckout } from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type SuccessScreenProps = {
  items: CartItem[];
  onHome: () => void;
};

const steps = ['Принят', 'Готовится', 'Готов', 'Выдан'];

export const SuccessScreen = ({ items, onHome }: SuccessScreenProps) => (
  <div className='cantata-sc cantata-success-sc'>
    <StatusBar />
    <div className='cantata-scont cantata-hide-scrollbar px-5'>
      <div className='cantata-success-hero'>
        <span className='cantata-success-hero__status'>Готовится · ~4 мин</span>
        <strong>Заказ принят</strong>
        <p>Мы уже готовим ваш латте. Заберите в галерее на Тульской Б., 13</p>
      </div>

      <div className='cantata-progress-card'>
        {steps.map((step, index) => (
          <div key={step} className={`cantata-progress-step ${index <= 1 ? 'cantata-progress-step--on' : ''}`}>
            <span />
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className='cantata-progress-note'>Обновляется каждые 60 секунд</div>

      <div className='cantata-success-items'>
        {items.slice(0, 2).map((item) => {
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
      </div>

      <div className='cantata-order-card'>
        <div>
          <span>Заказ</span>
          <strong>#48291</strong>
        </div>
        <div>
          <span>Скидка по карте</span>
          <strong>−{getCartDiscount(items)} ₽</strong>
        </div>
        <div>
          <span>Итого</span>
          <strong>{getCartPayableTotal(items)} ₽</strong>
        </div>
        <p>Тульская Б., 13 · Галерея «Коллекция»</p>
      </div>

      <div className='cantata-notice'>
        <span className='cantata-notice__icon'>🔔</span>
        <strong className='cantata-notice__title'>Push-уведомление придёт, когда заказ будет готов</strong>
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
