import { IconSend } from '~/vault_app/components/icons';

export const ChatComposer = () => (
  <div className='vault-chat-composer'>
    <input
      type='text'
      readOnly
      placeholder='Спросите по базе знаний...'
      className='vault-chat-composer__input'
    />
    <button type='button' className='vault-chat-composer__send' aria-label='Отправить'>
      <IconSend />
    </button>
  </div>
);
