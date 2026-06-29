import { ModelCard } from '~/forma_app/components/ModelCard';
import { StatusBar } from '~/forma_app/components/StatusBar';
import { models } from '~/forma_app/data/models';

export const LibraryScreen = () => (
  <div className="forma-screen-enter flex h-[844px] flex-col bg-white px-5">
    <StatusBar />

    <header className="mb-6 flex items-center justify-between pt-2">
      <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
        Мои модели
      </h1>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] transition active:scale-95"
        aria-label="Новая модель"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3V13M3 8H13" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </header>

    <div className="flex flex-col gap-3">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  </div>
);
