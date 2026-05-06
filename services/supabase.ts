import 'react-native-url-polyfill/auto';

import { createClient } from '@supabase/supabase-js';
import { appStorage } from './safeStorage';

/**
 * Cliente Supabase inicializado
 * Usa as credenciais do ambiente (.env.local)
 */

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️ Variáveis de ambiente Supabase não configuradas corretamente');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: appStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
