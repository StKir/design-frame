export type ModelStatus = 'ready' | 'loading';

export type Model = {
  id: string;
  name: string;
  status: ModelStatus;
  description?: string;
  createdAt?: string;
  progress?: number;
};
