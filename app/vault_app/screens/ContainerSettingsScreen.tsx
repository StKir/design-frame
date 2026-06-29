import { ContainerHeader } from '~/vault_app/components/ContainerHeader';
import { ContainerTabBar } from '~/vault_app/components/ContainerTabBar';
import { ModelSelector } from '~/vault_app/components/ModelSelector';
import { ScreenShell } from '~/vault_app/components/ScreenShell';
import { SettingsSlider, SettingsTextarea, SettingsToggle } from '~/vault_app/components/SettingsFields';
import { StatusBar } from '~/vault_app/components/StatusBar';
import { activeContainer } from '~/vault_app/data/containers';
import { aiModels, containerSettings } from '~/vault_app/data/settings';

export const ContainerSettingsScreen = () => {
  const s = containerSettings;

  return (
    <ScreenShell footer={<ContainerTabBar activeTab='settings' />}>
      <StatusBar />
      <ContainerHeader title={activeContainer.name} subtitle='Настройки' />

      <div className='vault-settings px-5 pb-6'>
        <section className='vault-settings-section'>
          <h2 className='vault-settings-section__title'>ИИ</h2>
          <ModelSelector models={aiModels} selectedId={s.modelId} />
          <SettingsTextarea
            label='Системный промпт'
            value={s.systemPrompt}
            hint='Инструкция для модели при ответах по этому контейнеру'
          />
        </section>

        <section className='vault-settings-section'>
          <h2 className='vault-settings-section__title'>Параметры</h2>
          <SettingsSlider label='Temperature' value={s.temperature} min={0} max={1} format={(v) => v.toFixed(1)} />
          <SettingsSlider label='Max tokens' value={s.maxTokens} min={256} max={4096} format={(v) => String(v)} />
          <SettingsSlider label='Top K результатов' value={s.topK} min={1} max={10} />
        </section>

        <section className='vault-settings-section'>
          <h2 className='vault-settings-section__title'>RAG</h2>
          <SettingsToggle
            label='Цитировать источники'
            description='Показывать ссылки на документы в ответах'
            enabled={s.citeSources}
          />
          <SettingsToggle
            label='Автоиндексация'
            description='Индексировать новые файлы сразу после загрузки'
            enabled={s.autoIndex}
          />
        </section>
      </div>
    </ScreenShell>
  );
};
