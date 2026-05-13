import { createClient, type SupabaseClient } from '@supabase/supabase-js';

interface SupabaseEnv {
  url?: string;
  anonKey?: string;
}

const getSupabaseEnv = (): SupabaseEnv => ({
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
});

export const hasSupabaseEnv = () => {
  const { url, anonKey } = getSupabaseEnv();
  return Boolean(url && anonKey);
};

let cachedClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (cachedClient) return cachedClient;

  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    throw new Error(
      '[supabaseClient] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set env values before using backend repository mode.'
    );
  }

  cachedClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return cachedClient;
};
