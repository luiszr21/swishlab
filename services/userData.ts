import { supabase } from './supabase';

type User = {
  id: string;
  email: string;
  username?: string;
};

export const registerUser = async (user: {
  username: string;
  email: string;
  password: string;
}): Promise<User> => {
  const email = user.email.trim().toLowerCase();
  const username = user.username.trim();

  let data;
  let error;

  try {
    ({ data, error } = await supabase.auth.signUp({
      email,
      password: user.password,
      options: {
        data: {
          username,
        },
      },
    }));
  } catch {
    throw new Error('Falha de conexão com o Supabase. Verifique a URL, a chave e a internet.');
  }

  if (error) {
    if (error.message.toLowerCase().includes('network request failed')) {
      throw new Error('Falha de conexão com o Supabase. Verifique a URL, a chave e a internet.');
    }

    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Não foi possível criar a conta.');
  }

  return {
    id: data.user.id,
    email,
    username,
  };
};

export const loginUser = async (identifier: string, password: string) => {
  const email = identifier.trim().toLowerCase();

  if (!email.includes('@')) {
    throw new Error('Use seu email para entrar.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Não foi possível fazer login.');
  }

  return {
    id: data.user.id,
    email: data.user.email ?? email,
    username: (data.user.user_metadata?.username as string | undefined) ?? undefined,
  };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? '',
    username: (user.user_metadata?.username as string | undefined) ?? undefined,
  };
};

export const getIsLogged = async (): Promise<boolean> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return !!session;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export type { User };

