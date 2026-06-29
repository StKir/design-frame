import { CropOverlay } from '~/forma_app/components/CropOverlay';
import { PrimaryButton } from '~/forma_app/components/PrimaryButton';
import { StatusBar } from '~/forma_app/components/StatusBar';

type CheckItemProps = {
  status: 'ok' | 'warning';
  text: string;
};

const CheckItem = ({ status, text }: CheckItemProps) => (
  <div className="flex items-center gap-3">
    <div
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        status === 'ok' ? 'bg-[#0A0A0A]' : 'border border-[#D97706]'
      }`}
    >
      {status === 'ok' ? (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path
            d="M1 4L3.5 6.5L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div className="h-1.5 w-1.5 rounded-full bg-[#D97706]" />
      )}
    </div>
    <span
      className={`text-[14px] ${
        status === 'ok' ? 'text-[#737373]' : 'text-[#D97706]'
      }`}
    >
      {text}
    </span>
  </div>
);

export const CaptureScreen = () => (
  <div className="forma-screen-enter flex h-[844px] flex-col bg-white px-5">
    <StatusBar />

    <h1 className="pt-2 text-[28px] font-bold tracking-[-0.02em] text-[#0A0A0A]">
      Сканирование
    </h1>

    <div className="forma-photo-bg relative mx-auto mt-5 h-[320px] w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <div className="h-[180px] w-[120px] rounded-t-full bg-gradient-to-b from-[#C4A882] to-[#A08060] opacity-80" />
      </div>
      <CropOverlay />
    </div>

    <div className="mt-6 space-y-3">
      <CheckItem status="ok" text="Объект в центре" />
      <CheckItem status="ok" text="Хорошее освещение" />
      <CheckItem status="warning" text="Нужен ещё ракурс" />
    </div>

    <div className="mt-auto flex flex-col gap-3 pb-8 pt-6">
      <button
        type="button"
        className="flex h-14 w-full items-center justify-center text-[15px] font-medium text-[#737373] transition active:opacity-70"
      >
        Переснять
      </button>
      <PrimaryButton>Создать модель</PrimaryButton>
    </div>
  </div>
);
