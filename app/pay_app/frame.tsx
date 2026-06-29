import { PhoneFrame } from '~/components/phone-frame';

import { HomeScreen } from '~/pay_app/screens/HomeScreen';
import { InternalTransferScreen } from '~/pay_app/screens/InternalTransferScreen';
import { MobileTopUpScreen } from '~/pay_app/screens/MobileTopUpScreen';
import { TransferScreen } from '~/pay_app/screens/TransferScreen';

import './pay.css';

export const PayFrame = () => (
  <div className='pay-root pay-showcase grid grid-cols-2 gap-10'>
    <PhoneFrame label='Главная'>
      <HomeScreen />
    </PhoneFrame>
    <PhoneFrame label='Перевод'>
      <TransferScreen />
    </PhoneFrame>
    <PhoneFrame label='Контакты'>
      <TransferScreen contactSheetOpen contactSearchQuery='Анна' />
    </PhoneFrame>
    <PhoneFrame label='Между счетами'>
      <InternalTransferScreen />
    </PhoneFrame>
    <PhoneFrame label='Пополнить телефон'>
      <MobileTopUpScreen />
    </PhoneFrame>
  </div>
);
