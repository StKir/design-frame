import { contacts, getContactInitials } from '~/pay_app/data/contacts';
import { formatPhoneDisplay } from '~/pay_app/data/banks';
import { IconContacts, IconSearch } from '~/pay_app/components/icons';

type ContactBottomSheetProps = {
  open?: boolean;
  selectedId?: string;
  searchQuery?: string;
};

export const ContactBottomSheet = ({
  open = false,
  selectedId,
  searchQuery = '',
}: ContactBottomSheetProps) => {
  if (!open) {
    return null;
  }

  const query = searchQuery.toLowerCase();
  const filtered = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query) ||
      contact.phone.replace(/\D/g, '').includes(query.replace(/\D/g, '')),
  );

  return (
    <div className='pay-sheet-overlay'>
      <div className='pay-sheet-backdrop' />
      <div className='pay-sheet'>
        <div className='pay-sheet__handle' />
        <div className='pay-sheet__header'>
          <h2 className='pay-sheet__title'>Контакты</h2>
        </div>
        <div className='pay-sheet__search'>
          <IconSearch />
          <input
            type='search'
            className='pay-sheet__search-input'
            placeholder='Поиск по имени или номеру'
            value={searchQuery}
            readOnly
          />
        </div>
        <div className='pay-sheet__list pay-hide-scrollbar'>
          {filtered.map((contact) => (
            <button
              key={contact.id}
              type='button'
              className={`pay-contact-item ${contact.id === selectedId ? 'pay-contact-item--selected' : ''}`}
            >
              <span className='pay-contact-item__avatar'>{getContactInitials(contact.name)}</span>
              <div>
                <div className='pay-contact-item__name'>{contact.name}</div>
                <div className='pay-contact-item__phone'>{formatPhoneDisplay(contact.phone)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContactPickerButton = () => (
  <button type='button' className='pay-btn-contacts'>
    <IconContacts size={20} />
    Выбрать из контактов
  </button>
);
