import type { ReactNode } from 'react';

import { PrimaryButton } from '~/forma_app/components/PrimaryButton';
import { StatusBar } from '~/forma_app/components/StatusBar';

const FeatureItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <div className="flex items-center gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E5E5]">
      {icon}
    </div>
    <span className="text-[15px] text-[#737373]">{text}</span>
  </div>
);

export const WelcomeScreen = () => (
  <div className="forma-screen-enter flex h-[844px] flex-col bg-white px-6">
    <StatusBar />

    <div className="flex flex-1 flex-col justify-between pb-10 pt-8">
      <div>
        <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-[#737373]">
          Forma
        </p>

        <h1 className="mt-10 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#0A0A0A]">
          Фото → 3D
          <br />
          за минуты
        </h1>

        <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-[#737373]">
          Нейросеть строит GLB-модель из нескольких ракурсов вашего объекта
        </p>
      </div>

      <div className="space-y-5">
        <FeatureItem
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="14" height="11" rx="2" stroke="#0A0A0A" strokeWidth="1.2" />
              <circle cx="9" cy="9.5" r="2.5" stroke="#0A0A0A" strokeWidth="1.2" />
            </svg>
          }
          text="Сканируй объект"
        />
        <FeatureItem
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3 14L9 4L15 14H3Z"
                stroke="#0A0A0A"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path d="M3 14H15" stroke="#0A0A0A" strokeWidth="1.2" />
            </svg>
          }
          text="Получи GLB"
        />
        <FeatureItem
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M13 10V14C13 14.55 12.55 15 12 15H4C3.45 15 3 14.55 3 14V6C3 5.45 3.45 5 4 5H8"
                stroke="#0A0A0A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M11 3H15V7M15 3L7 11"
                stroke="#0A0A0A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          text="Делись моделью"
        />
      </div>

      <PrimaryButton>Начать</PrimaryButton>
    </div>
  </div>
);
