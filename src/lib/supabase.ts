import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const rememberSessionKey = 'bamboo_remember_session';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const authStorage = {
  getItem: (key: string) => {
    return window.sessionStorage.getItem(key) ?? window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    const rememberSession = window.localStorage.getItem(rememberSessionKey) !== 'false';

    if (rememberSession) {
      window.localStorage.setItem(key, value);
      window.sessionStorage.removeItem(key);
      return;
    }

    window.sessionStorage.setItem(key, value);
    window.localStorage.removeItem(key);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
  },
};

export const setRememberSession = (remember: boolean) => {
  window.localStorage.setItem(rememberSessionKey, String(remember));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: authStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
