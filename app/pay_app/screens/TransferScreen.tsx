import { BackButton } from '~/pay_app/components/BackButton';
import { BankSelector } from '~/pay_app/components/BankSelector';
import { ContactBottomSheet } from '~/pay_app/components/ContactBottomSheet';
import { PrimaryButton } from '~/pay_app/components/PrimaryButton';
import { ScreenShell } from '~/pay_app/components/ScreenShell';
import { SecondaryButton } from '~/pay_app/components/SecondaryButton';
import { SourceAccountBar } from '~/pay_app/components/SourceAccountBar';
import { TransferForm } from '~/pay_app/components/TransferForm';
import { getBankById } from '~/pay_app/data/banks';
import type { BankId } from '~/pay_app/types';

type TransferScreenProps = {
  defaultBankId?: BankId;
  activeCardId?: string;
  contactSheetOpen?: boolean;
  contactSearchQuery?: string;
};

export const TransferScreen = ({
  defaultBankId = 'sber',
  activeCardId = 'card-1',
  contactSheetOpen = false,
  contactSearchQuery = '',
}: TransferScreenProps) => {
  const bank = getBankById(defaultBankId);

  return (
    <ScreenShell
      bank={bank}
      overlay={
        <ContactBottomSheet
          open={contactSheetOpen}
          searchQuery={contactSearchQuery}
        />
      }
    >
      <div className='pay-header'>
        <BackButton />
        <span className='pay-header__title'>Перевод</span>
      </div>
      <BankSelector activeBankId={defaultBankId} />
      <div className='pay-form-stack' style={{ paddingBottom: 0 }}>
        <SourceAccountBar cardId={activeCardId} />
      </div>
      <TransferForm
        data={{
          phone: contactSheetOpen ? '' : '+7 (916) 234-56-78',
          amount: '1 500 ₽',
        }}
        showContactButton
      />
      <div className='pay-btn-stack'>
        <PrimaryButton>Сформировать SMS</PrimaryButton>
        <SecondaryButton>Скопировать SMS</SecondaryButton>
      </div>
    </ScreenShell>
  );
};
