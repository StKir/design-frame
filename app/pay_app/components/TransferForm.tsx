import type { TransferFormData } from '~/pay_app/types';

import { ContactPickerButton } from '~/pay_app/components/ContactBottomSheet';
import { AmountInput } from '~/pay_app/components/AmountInput';
import { PhoneInput } from '~/pay_app/components/PhoneInput';

type TransferFormProps = {
  data: TransferFormData;
  showContactButton?: boolean;
  readOnly?: boolean;
};

export const TransferForm = ({
  data,
  showContactButton = false,
  readOnly = false,
}: TransferFormProps) => (
  <div className='pay-form-stack'>
    <PhoneInput value={data.phone} readOnly={readOnly} />
    {showContactButton && <ContactPickerButton />}
    <AmountInput value={data.amount} readOnly={readOnly} />
  </div>
);
