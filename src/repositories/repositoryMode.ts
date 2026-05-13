export type RepositoryMode = 'local' | 'backend';

export const getRepositoryMode = (): RepositoryMode => {
  const mode = (import.meta as any).env?.VITE_REPOSITORY_MODE;

  if (mode === 'backend') {
    return 'backend';
  }

  return 'local';
};
