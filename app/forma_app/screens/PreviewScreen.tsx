import { PrimaryButton } from '~/forma_app/components/PrimaryButton';
import { SecondaryButton } from '~/forma_app/components/SecondaryButton';
import { StatusBar } from '~/forma_app/components/StatusBar';
import type { Model } from '~/forma_app/types';

type PreviewScreenProps = {
  model: Model;
};

const WireframeCube = () => (
  <div className="forma-cube">
    <div className="forma-cube-face forma-cube-face-front" />
    <div className="forma-cube-face forma-cube-face-back" />
    <div className="forma-cube-face forma-cube-face-right" />
    <div className="forma-cube-face forma-cube-face-left" />
    <div className="forma-cube-face forma-cube-face-top" />
    <div className="forma-cube-face forma-cube-face-bottom" />
  </div>
);

export const PreviewScreen = ({ model }: PreviewScreenProps) => (
  <div className="forma-screen-enter flex h-[844px] flex-col bg-white">
    <StatusBar />

    <div className="relative px-5 pt-1">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5]"
        aria-label="Назад"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path
            d="M7 1L1 7L7 13"
            stroke="#0A0A0A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>

    <div className="forma-wireframe-grid mx-5 mt-3 flex h-[380px] items-center justify-center rounded-2xl">
      <WireframeCube />
    </div>

    <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-6">
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
          {model.name}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#737373]">
          {model.description}
        </p>
      </div>

      <div className="space-y-3">
        <PrimaryButton>Скачать GLB</PrimaryButton>
        <SecondaryButton>Поделиться</SecondaryButton>
      </div>
    </div>
  </div>
);
