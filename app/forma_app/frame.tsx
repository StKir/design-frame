import { PhoneFrame } from '~/components/phone-frame';

import { getReadyModel } from '~/forma_app/data/models';
import { CaptureScreen } from '~/forma_app/screens/CaptureScreen';
import { LibraryScreen } from '~/forma_app/screens/LibraryScreen';
import { PreviewScreen } from '~/forma_app/screens/PreviewScreen';
import { WelcomeScreen } from '~/forma_app/screens/WelcomeScreen';

import './forma.css';

export const FormaFrame = () => {
  const previewModel = getReadyModel();

  return (
    <div className="forma-root forma-showcase grid grid-cols-2 gap-10">
      <PhoneFrame label="Вход">
        <WelcomeScreen />
      </PhoneFrame>
      <PhoneFrame label="Мои модели">
        <LibraryScreen />
      </PhoneFrame>
      <PhoneFrame label="Превью">
        <PreviewScreen model={previewModel} />
      </PhoneFrame>
      <PhoneFrame label="Сканирование">
        <CaptureScreen />
      </PhoneFrame>
    </div>
  );
};
