import { MiniKeyboard } from '~/tempkey_app/components/MiniKeyboard';
import { ScreenShell } from '~/tempkey_app/components/ScreenShell';
import { StatusBar } from '~/tempkey_app/components/StatusBar';
import { TypingPassage } from '~/tempkey_app/components/TypingPassage';
import { gameSession } from '~/tempkey_app/data/session';

export const GameScreen = () => {
  const typed = gameSession.passage.slice(0, gameSession.typedLength);

  return (
    <ScreenShell>
      <StatusBar />

      <div className="tempkey-game-top">
        <button type="button" className="tempkey-icon-btn" aria-label="Назад">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.25 4.5 6.75 10l5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="tempkey-game-top__meta">
          <span className="tempkey-game-top__mode">{gameSession.modeLabel}</span>
          <span className="tempkey-game-top__timer">{gameSession.timeLeft}</span>
        </div>

        <div className="tempkey-game-spacer" aria-hidden="true" />
      </div>

      <div className="tempkey-live-stats">
        <div className="tempkey-live-stat">
          <span className="tempkey-live-stat__value">{gameSession.wpm}</span>
          <span className="tempkey-live-stat__label">wpm</span>
        </div>
        <div className="tempkey-live-stat">
          <span className="tempkey-live-stat__value">{gameSession.accuracy}%</span>
          <span className="tempkey-live-stat__label">точность</span>
        </div>
      </div>

      <div className="tempkey-game-main">
        <TypingPassage text={gameSession.passage} typedLength={gameSession.typedLength} />

        <div className="tempkey-input-line" aria-label="Ввод">
          <span className="tempkey-input-line__typed">{typed}</span>
          <span className="tempkey-input-line__caret" />
        </div>
      </div>

      <MiniKeyboard nextKey={gameSession.nextKey} />
    </ScreenShell>
  );
};
