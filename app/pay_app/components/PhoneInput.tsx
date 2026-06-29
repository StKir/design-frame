type PhoneInputProps = {
  value: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export const PhoneInput = ({
  value,
  label = 'Номер получателя',
  placeholder = '+7 (___) ___-__-__',
  readOnly = false,
}: PhoneInputProps) => (
  <div className='pay-field'>
    <label className='pay-field__label'>{label}</label>
    <input
      type='tel'
      className='pay-field__input pay-field__input--phone'
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </div>
);
