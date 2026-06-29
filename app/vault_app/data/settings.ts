import type { AiModel, ContainerSettings } from '~/vault_app/types';

export const aiModels: AiModel[] = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'claude-sonnet', name: 'Claude Sonnet', provider: 'Anthropic' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI' },
];

export const containerSettings: ContainerSettings = {
  modelId: 'gpt-4o',
  systemPrompt:
    'Ты — ассистент по базе документов. Отвечай точно, ссылайся на источники. Если информации нет в базе — честно сообщи об этом.',
  temperature: 0.3,
  maxTokens: 2048,
  topK: 5,
  citeSources: true,
  autoIndex: true,
};
