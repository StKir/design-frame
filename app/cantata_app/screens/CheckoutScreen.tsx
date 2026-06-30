import { getCartDiscount, getCartPayableTotal, getCartTotal } from '~/cantata_app/data/cart';
import type { CartItem } from '~/cantata_app/types';

import { BackButton } from '~/cantata_app/components/BackButton';
import { CtaButton } from '~/cantata_app/components/CtaButton';
import { IconCheckout, IconPin } from '~/cantata_app/components/icons';
import { StatusBar } from '~/cantata_app/components/StatusBar';

type CheckoutScreenProps = {
  items: CartItem[];
  onBack: () => void;
  onPay: () => void;
};

export const CheckoutScreen = ({ items, onBack, onPay }: CheckoutScreenProps) => {
  const total = getCartPayableTotal(items);
  const subtotal = getCartTotal(items);
  const discount = getCartDiscount(items);
  const drinkCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='cantata-sc'>
      <StatusBar />
      <header className='cantata-shdr'>
        <BackButton onClick={onBack} variant='pill' />
        <span className='cantata-htitle'>Оформление</span>
        <div className='w-[38px]' />
      </header>

      <div className='cantata-scont cantata-hide-scrollbar px-5'>
        <section className='cantata-chsec'>
          <div className='cantata-chlabel'>Самовывоз из галереи</div>
          <div className='cantata-chcard'>
            <div className='cantata-chrow'>
              <span className='cantata-chrow__icon'>
                <IconPin />
              </span>
              <span className='cantata-chrow__body'>
                <strong className='cantata-chrow__title'>Тульская Б., 13</strong>
                <span className='cantata-chrow__sub'>Открыто до 22:00 · 5 мин пешком</span>
              </span>
              <button type='button' className='cantata-chrow__action'>Сменить</button>
            </div>
          </div>
        </section>

        <section className='cantata-chsec'>
          <div className='cantata-chlabel'>Контакты</div>
          <label className='cantata-chinput'>
            <span>Имя</span>
            <input placeholder='Ваше имя' />
          </label>
          <label className='cantata-chinput'>
            <span>Телефон</span>
            <input placeholder='+7 ___ ___-__-__' />
          </label>
        </section>

        <section className='cantata-chsec'>
          <div className='cantata-chlabel'>Способ оплаты</div>
          <div className='cantata-chopt'>
            <span className='cantata-chopt__label'>Картой онлайн</span>
            <span className='cantata-chopt__check'>✓</span>
          </div>
          <div className='cantata-chopt'>
            <span className='cantata-chopt__label'>Сертификатом</span>
            <span className='cantata-chopt__check cantata-chopt__check--muted'>+</span>
          </div>
        </section>

        <div className='cantata-notice'>
          <span className='cantata-notice__icon'>⏱</span>
          <span>
            <strong className='cantata-notice__title'>Готов через ~10 минут</strong>
            <span className='cantata-notice__sub'>При заказе более 5 чашек — дольше</span>
          </span>
        </div>

        <section className='cantata-chsec'>
          <div className='cantata-chlabel'>Итог</div>
          <div className='cantata-chcard cantata-checkout-total'>
            <div className='cantata-trow'>
              <span>Напитки ({drinkCount})</span>
              <span>{subtotal} ₽</span>
            </div>
            <div className='cantata-trow cantata-trow--discount'>
              <span>Скидка 20%</span>
              <span>−{discount} ₽</span>
            </div>
            <div className='cantata-trow cantata-trow--total'>
              <span>К оплате:</span>
              <span>{total} ₽</span>
            </div>
          </div>
        </section>
      </div>

      <div className='cantata-ctabar'>
        <CtaButton onClick={onPay}>
          <IconCheckout />
          Оплатить {total} ₽
        </CtaButton>
      </div>
    </div>
  );
};
