import { useState } from 'react';

import { GalleryScreen } from '~/origami_app/screens/GalleryScreen';
import { GuideScreen } from '~/origami_app/screens/GuideScreen';

import './origami.css';

export const OrigamiFrame = () => {
  const [tutorialId, setTutorialId] = useState<string | null>(null);

  if (tutorialId) {
    return (
      <GuideScreen
        key={tutorialId}
        tutorialId={tutorialId}
        onBack={() => setTutorialId(null)}
      />
    );
  }

  return <GalleryScreen onOpen={setTutorialId} />;
};
