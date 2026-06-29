export type ContainerRole = 'personal' | 'work' | 'shared';

export type Container = {
  id: string;
  name: string;
  description: string;
  sourcesCount: number;
  createdAt: string;
  role: ContainerRole;
};

export type SourceType = 'photo' | 'text' | 'pdf';

export type Source = {
  id: string;
  containerId: string;
  type: SourceType;
  title: string;
  excerpt?: string;
  meta?: string;
  fileSize?: string;
  date: string;
  thumbnail?: string;
};

export type ContainerTab = 'data' | 'chat' | 'settings';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
  sources?: string[];
};

export type AiModel = {
  id: string;
  name: string;
  provider: string;
};

export type ContainerSettings = {
  modelId: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topK: number;
  citeSources: boolean;
  autoIndex: boolean;
};

export type FilePreview = {
  id: string;
  title: string;
  fileSize: string;
  pages: number;
  date: string;
  content: string;
};
