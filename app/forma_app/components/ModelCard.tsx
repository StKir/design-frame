import type { Model } from '~/forma_app/types';

type ModelCardProps = {
  model: Model;
};

const ProgressRing = ({ progress }: { progress: number }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <svg
        className="forma-progress-ring absolute h-12 w-12"
        viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="3"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 22 22)"
        />
      </svg>
      <span className="text-[10px] font-semibold text-[#737373]">{progress}%</span>
    </div>
  );
};

export const ModelCard = ({ model }: ModelCardProps) => {
  if (model.status === 'loading') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
        <div className="forma-skeleton h-12 w-12 shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium text-[#0A0A0A]">{model.name}</p>
          <p className="mt-0.5 text-[13px] text-[#737373]">Генерация…</p>
        </div>
        <ProgressRing progress={model.progress ?? 0} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4">
      <div className="forma-thumbnail-wireframe flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 2L18 7V13L10 18L2 13V7L10 2Z"
            stroke="#A3A3A3"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M10 2V18M2 7L18 13M18 7L2 13"
            stroke="#A3A3A3"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-medium text-[#0A0A0A]">{model.name}</p>
        <p className="mt-0.5 text-[13px] text-[#737373]">{model.createdAt}</p>
      </div>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
        <path
          d="M1 1L7 7L1 13"
          stroke="#A3A3A3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
