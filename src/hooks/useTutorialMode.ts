import { useState } from 'react';
import {
  completeTutorial,
  isTutorialActive,
  skipTutorial,
} from '../utils/onboardingState';

export const useTutorialMode = () => {
  const [isTutorial, setIsTutorial] = useState(() => isTutorialActive());

  const skip = () => {
    skipTutorial();
    setIsTutorial(false);
  };

  const complete = () => {
    completeTutorial();
    setIsTutorial(false);
  };

  return { isTutorial, skip, complete };
};
