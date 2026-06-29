import { IconChevronDown } from '~/vault_app/components/icons';
import type { AiModel } from '~/vault_app/types';

type ModelSelectorProps = {
  models: AiModel[];
  selectedId: string;
};

export const ModelSelector = ({ models, selectedId }: ModelSelectorProps) => {
  const selected = models.find((m) => m.id === selectedId) ?? models[0];

  return (
    <button type='button' className='vault-settings-select'>
      <div className='vault-settings-select__info'>
        <span className='vault-settings-select__label'>Модель</span>
        <span className='vault-settings-select__value'>{selected.name}</span>
        <span className='vault-settings-select__provider'>{selected.provider}</span>
      </div>
      <IconChevronDown />
    </button>
  );
};
