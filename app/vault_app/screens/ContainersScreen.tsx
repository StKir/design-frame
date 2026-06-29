import { ContainerCard } from '~/vault_app/components/ContainerCard';
import { PrimaryButton } from '~/vault_app/components/PrimaryButton';
import { ScreenShell } from '~/vault_app/components/ScreenShell';
import { StatusBar } from '~/vault_app/components/StatusBar';
import { containers } from '~/vault_app/data/containers';

export const ContainersScreen = () => (
  <ScreenShell>
    <div className='px-5 pb-24'>
      <StatusBar />

      <h1 className='vault-display-title mt-1'>Мои контейнеры</h1>
      <p className='mt-2 text-[14px] vault-text-muted vault-tabular'>
        {containers.length} контейнера
      </p>

      <div className='mt-7 space-y-3'>
        {containers.map((container) => (
          <ContainerCard key={container.id} container={container} />
        ))}
      </div>
    </div>

    <div className='vault-containers-footer'>
      <PrimaryButton>Создать контейнер</PrimaryButton>
    </div>
  </ScreenShell>
);
