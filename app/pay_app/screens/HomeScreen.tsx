import { ActionTile } from '~/pay_app/components/ActionTile';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { CardCarousel } from '~/pay_app/components/CardCarousel';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import {
  IconBalance,
  IconInternal,
  IconMobile,
  IconTransfer,
} from '~/pay_app/components/icons';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type HomeScreenProps = {
  defaultBankId?: BankId;
  activeCardId?: string;
};

export const HomeScreen = ({ defaultBankId = 'sber', activeCardId = 'card-1' }: HomeScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell bank={bank}>
      <BankSelector activeBankId={defaultBankId} />
      <CardCarousel activeCardId={activeCardId} />
      <h1 className='pay-section-title'>Платежи</h1>
      <div className='pay-action-grid'>
        <ActionTile icon={<IconTransfer />} label='Перевести' hint='По номеру телефона через SMS' />
        <ActionTile icon={<IconBalance />} label='Узнать баланс' hint='Запрос SMS на короткий номер' />
        <ActionTile icon={<IconInternal />} label='Между счетами' hint='Перевод между своими картами' />
        <ActionTile icon={<IconMobile />} label='Пополнить телефон' hint='Мобильная связь' />
      </div>
    </ScreenShell>
  );
};
