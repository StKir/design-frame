import { PhoneFrame } from '~/components/phone-frame';

import { ContainerChatScreen } from '~/vault_app/screens/ContainerChatScreen';
import { ContainerDataScreen } from '~/vault_app/screens/ContainerDataScreen';
import { ContainerSettingsScreen } from '~/vault_app/screens/ContainerSettingsScreen';
import { ContainersScreen } from '~/vault_app/screens/ContainersScreen';
import { FilePreviewScreen } from '~/vault_app/screens/FilePreviewScreen';

import './vault.css';

export const VaultFrame = () => (
  <div className='vault-root vault-showcase grid grid-cols-2 gap-10'>
    <PhoneFrame label='Мои контейнер'>
      <ContainersScreen />
    </PhoneFrame>
    <PhoneFrame label='Контейнер · Данные'>
      <ContainerDataScreen />
    </PhoneFrame>
    <PhoneFrame label='Предпросмотр файла'>
      <FilePreviewScreen />
    </PhoneFrame>
    <PhoneFrame label='Контейнер · ИИ Чат'>
      <ContainerChatScreen />
    </PhoneFrame>
    <PhoneFrame label='Контейнер · Настройки'>
      <ContainerSettingsScreen />
    </PhoneFrame>
  </div>
);
