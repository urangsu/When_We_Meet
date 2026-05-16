export const ONBOARDING_STORAGE_KEYS = {
  welcomeCompleted: 'wwm:onboarding:v1:welcome-completed',
  welcomeSkipped: 'wwm:onboarding:v1:welcome-skipped',
  tutorialActive: 'wwm:onboarding:v1:tutorial-active',
  tutorialCompleted: 'wwm:onboarding:v1:tutorial-completed',
} as const;

const canUseStorage = () =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const hasCompletedWelcome = () => {
  if (!canUseStorage()) return true;

  return (
    localStorage.getItem(ONBOARDING_STORAGE_KEYS.welcomeCompleted) === 'true' ||
    localStorage.getItem(ONBOARDING_STORAGE_KEYS.welcomeSkipped) === 'true'
  );
};

export const markWelcomeCompleted = () => {
  if (!canUseStorage()) return;
  localStorage.setItem(ONBOARDING_STORAGE_KEYS.welcomeCompleted, 'true');
};

export const markWelcomeSkipped = () => {
  if (!canUseStorage()) return;
  localStorage.setItem(ONBOARDING_STORAGE_KEYS.welcomeSkipped, 'true');
};

export const startTutorial = () => {
  if (!canUseStorage()) return;
  localStorage.setItem(ONBOARDING_STORAGE_KEYS.tutorialActive, 'true');
};

export const completeTutorial = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(ONBOARDING_STORAGE_KEYS.tutorialActive);
  localStorage.setItem(ONBOARDING_STORAGE_KEYS.tutorialCompleted, 'true');
};

export const isTutorialActive = () => {
  if (!canUseStorage()) return false;
  return localStorage.getItem(ONBOARDING_STORAGE_KEYS.tutorialActive) === 'true';
};

export const skipTutorial = () => {
  if (!canUseStorage()) return;
  localStorage.removeItem(ONBOARDING_STORAGE_KEYS.tutorialActive);
};
