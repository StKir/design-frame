import { useState } from 'react';

import { ModePicker } from '~/tempkey_app/components/ModePicker';
import { PrimaryButton } from '~/tempkey_app/components/PrimaryButton';
import { ScoreRow } from '~/tempkey_app/components/ScoreRow';
import { ScreenShell } from '~/tempkey_app/components/ScreenShell';
import { SettingsButton } from '~/tempkey_app/components/SettingsButton';
import { StatusBar } from '~/tempkey_app/components/StatusBar';
import { ThemePicker } from '~/tempkey_app/components/ThemePicker';
import { bestScores, modes, type ModeId } from '~/tempkey_app/data/modes';
import { textThemes, type ThemeId } from '~/tempkey_app/data/themes';

export const HomeScreen = () => {
  const [activeMode, setActiveMode] = useState<ModeId>('classic');
  const [activeTheme, setActiveTheme] = useState<ThemeId>('auto');

  return (
    <ScreenShell>
      <StatusBar />

      <div className="tempkey-topbar">
        <SettingsButton />
      </div>

      <div className="tempkey-home">
        <h1 className="tempkey-brand">TempKey</h1>
        <p className="tempkey-tagline">Печать на скорость</p>

        <div className="tempkey-home__cta">
          <PrimaryButton>Играть</PrimaryButton>
        </div>

        <div className="tempkey-home__modes">
          <ModePicker modes={modes} activeId={activeMode} onChange={setActiveMode} />
        </div>

        <section className="tempkey-home__themes" aria-label="Тематика текста">
          <h2 className="tempkey-section__title">Текст</h2>
          <ThemePicker
            themes={textThemes}
            activeId={activeTheme}
            onChange={setActiveTheme}
          />
        </section>

        <section className="tempkey-home__scores" aria-label="Лучшие результаты">
          <h2 className="tempkey-section__title">Рекорды</h2>
          <div className="tempkey-scores">
            {bestScores.map((score) => {
              const mode = modes.find((item) => item.id === score.modeId);

              return (
                <ScoreRow
                  key={score.modeId}
                  modeLabel={mode?.label ?? score.modeId}
                  wpm={score.wpm}
                  accuracy={score.accuracy}
                />
              );
            })}
          </div>
        </section>
      </div>
    </ScreenShell>
  );
};
