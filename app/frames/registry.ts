import type { ComponentType } from 'react';

import { CantataFrame } from '~/cantata_app/frame';
import { CoachFrame } from '~/coach_app/frame';
import { FormaFrame } from '~/forma_app/frame';
import { PayFrame } from '~/pay_app/frame';
import { VaultFrame } from '~/vault_app/frame';

export type FrameLayout = 'single' | 'showcase';

export type FrameEntry = {
  id: string;
  name: string;
  description?: string;
  layout?: FrameLayout;
  component: ComponentType;
};

export const frames: FrameEntry[] = [
  {
    id: 'cantata-app',
    name: 'Cantata',
    description: 'Мобильное приложение Cantata',
    layout: 'showcase',
    component: CantataFrame,
  },
  {
    id: 'forma-app',
    name: 'Forma',
    description: 'AI-приложение: фото → 3D-модель GLB',
    layout: 'showcase',
    component: FormaFrame,
  },
  {
    id: 'coach-app',
    name: 'Coach',
    description: 'Курсы каллиграфии с AI-разбором работ',
    layout: 'showcase',
    component: CoachFrame,
  },
  {
    id: 'pay-app',
    name: 'Pay SMS',
    description: 'SMS-переводы и QR для приёма платежей',
    layout: 'showcase',
    component: PayFrame,
  },
  {
    id: 'vault-app',
    name: 'Vault',
    description: 'База знаний с ИИ и RAG-контейнерами',
    layout: 'showcase',
    component: VaultFrame,
  },
];

export const getFrameById = (id: string) => frames.find((frame) => frame.id === id);
