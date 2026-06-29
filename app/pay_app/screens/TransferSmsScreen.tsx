import { BackButton } from '~/pay_app/components/BackButton';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { SmsPreviewCard } from '~/pay_app/components/SmsPreviewCard';
import { SourceAccountBar } from '~/pay_app/components/SourceAccountBar';
import { TransferForm } from '~/pay_app/components/TransferForm';
import { getBankById } from '~/pay_app/data/banks';
import { getCardById, paymentCards } from '~/pay_app/data/cards';
import type { BankId } from '~/pay_app/types';

type TransferSmsScreenProps = {
  defaultBankId?: BankId;
  activeCardId?: string;
};

export const TransferSmsScreen = ({
  defaultBankId = 'sber',
  activeCardId = 'card-1',
}: TransferSmsScreenProps) => {
  const bank = getBankById(defaultBankId);
  const card = getCardById(activeCardId) ?? paymentCards[0];
  const smsText = bank.buildSmsText({
    phone: '+7 (916) 234-56-78',
    amount: 1500,
    cardLast4: card.last4,
  });

  return (
    <ScreenShell bank={bank}>
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>Отправка SMS</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div className='pay-form-stack' style={{ paddingBottom: 0 }}>
        <SourceAccountBar cardId={activeCardId} />
      </div>
      <TransferForm
        data={{
          phone: '+7 (916) 234-56-78',
          amount: '1 500 ₽',
        }}
        readOnly
      />
      <SmsPreviewCard bank={bank} smsText={smsText} showSendActions />
    </ScreenShell>
  );
};
