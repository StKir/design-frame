import { ContainerHeader } from '~/vault_app/components/ContainerHeader';
import { ContainerTabBar } from '~/vault_app/components/ContainerTabBar';
import { DriveSourceRow } from '~/vault_app/components/DriveSourceRow';
import { DriveToolbar } from '~/vault_app/components/DriveToolbar';
import { ScreenShell } from '~/vault_app/components/ScreenShell';
import { StatusBar } from '~/vault_app/components/StatusBar';
import { UploadFab } from '~/vault_app/components/UploadFab';
import { activeContainer } from '~/vault_app/data/containers';
import { sources } from '~/vault_app/data/sources';

export const ContainerDataScreen = () => (
  <ScreenShell footer={<ContainerTabBar activeTab='data' />} fab={<UploadFab />}>
    <StatusBar />

    <ContainerHeader
      title={activeContainer.name}
      subtitle={`${sources.length} файлов`}
    />

    <div className='vault-drive-search'>
      <input
        type='text'
        readOnly
        placeholder='Поиск в контейнере'
        className='vault-drive-search__input'
      />
    </div>

    <DriveToolbar count={sources.length} />

    <div className='vault-drive-list'>
      {sources.map((source) => (
        <DriveSourceRow key={source.id} source={source} />
      ))}
    </div>
  </ScreenShell>
);
