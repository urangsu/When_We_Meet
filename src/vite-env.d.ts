/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPOSITORY_MODE?: 'local' | 'backend';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
