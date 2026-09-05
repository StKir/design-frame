import { PhoneFrame } from '~/components/phone-frame';

import { GameScreen } from '~/tempkey_app/screens/GameScreen';
import { HomeScreen } from '~/tempkey_app/screens/HomeScreen';

import './tempkey.css';

export const TempkeyFrame = () => (
  <div className="tempkey-root tempkey-showcase grid grid-cols-2 gap-10">
    <PhoneFrame label="Главная">
      <HomeScreen />
    </PhoneFrame>
    <PhoneFrame label="Игра">
      <GameScreen />
    </PhoneFrame>
  </div>
);
