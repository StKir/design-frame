type AmountInputProps = {
  value: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export const AmountInput = ({
  value,
  label = 'Сумма перевода',
  placeholder = '0 ₽',
  readOnly = false,
}: AmountInputProps) => (
  <div className='pay-field'>
    <label className='pay-field__label'>{label}</label>
    <input
      type='text'
      inputMode='numeric'
      className='pay-field__input'
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </div>
);
