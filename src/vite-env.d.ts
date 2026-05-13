/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPOSITORY_MODE?: 'local' | 'backend';
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
