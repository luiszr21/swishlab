    import { supabase } from './supabase';
import { appStorage } from './safeStorage';

/**
 * Tipos de usuário
 */
export interface AuthUser {
  id: string;
  authId: string;
  email: string;
  username: string;
  createdAt: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

/**
 * Registra um novo usuário no Supabase
 * @param email - Email do usuário
 * @param password - Senha (mínimo 6 caracteres)
 * @param username - Nome de usuário único
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> => {
  try {
    // Validação básica
    email = email.trim().toLowerCase();
    username = username.trim();

    if (!email || !password || !username) {
      return { user: null, error: 'Email, senha e nome de usuário são obrigatórios.' };
    }

    if (password.length < 6) {
      return { user: null, error: 'Senha deve ter no mínimo 6 caracteres.' };
    }

    const cooldownKey = `signup_cooldown:${email}`;
    const cooldownRaw = await appStorage.getItem(cooldownKey);
    const cooldownUntil = cooldownRaw ? Number(cooldownRaw) : 0;

    if (cooldownUntil && cooldownUntil > Date.now()) {
      return {
        user: null,
        error: 'Muitas tentativas de cadastro em pouco tempo. Aguarde alguns minutos e tente novamente.',
      };
    }

    const [existingEmail, existingUsername] = await Promise.all([
      supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .maybeSingle(),
      supabase
        .from('usuarios')
        .select('id')
        .ilike('nome_completo', username)
        .maybeSingle(),
    ]);

    if (existingEmail.data) {
      return { user: null, error: 'Esse email já está cadastrado.' };
    }

    if (existingUsername.data) {
      return { user: null, error: 'Esse nome de usuário já está em uso.' };
    }

    // Registra no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (authError) {
      await appStorage.setItem(cooldownKey, String(Date.now() + 3 * 60 * 1000));

      if (authError.status === 429 || authError.message.toLowerCase().includes('rate limit')) {
        return {
          user: null,
          error: 'Muitas tentativas de cadastro. Aguarde alguns minutos e tente novamente.',
        };
      }

      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'Erro ao criar usuário.' };
    }

    // Cria registro do usuário na tabela `usuarios`
    const { data: insertedUser, error: dbError } = await supabase
      .from('usuarios')
      .insert({
        id_autenticacao: authData.user.id,
        email,
        nome_completo: username,
        criado_em: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (dbError || !insertedUser) {
      return { user: null, error: `Erro ao salvar dados: ${dbError?.message ?? 'Sem dados.'}` };
    }

    const user: AuthUser = {
      id: insertedUser.id,
      authId: authData.user.id,
      email,
      username,
      createdAt: insertedUser.criado_em,
    };

    // Salva sessão localmente
    await appStorage.setItem('auth_user', JSON.stringify(user));

    return { user, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { user: null, error: message };
  }
};

/**
 * Faz login de um usuário
 * @param email - Email ou nome de usuário
 * @param password - Senha
 */
export const loginUser = async (
  emailOrUsername: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const identifier = emailOrUsername.trim().toLowerCase();

    if (!identifier || !password) {
      return { user: null, error: 'Email/nome de usuário e senha são obrigatórios.' };
    }

    // Verifica se é email ou username e busca o email correspondente
    let email = identifier;

    if (!identifier.includes('@')) {
      // É username, precisa buscar o email
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('email')
        .ilike('nome_completo', identifier)
        .limit(1)
        .maybeSingle();

      if (userError || !userData) {
        return { user: null, error: 'Usuário não encontrado.' };
      }

      email = userData.email;
    }

    // Faz login com Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return { user: null, error: authError.message };
    }

    if (!authData.user) {
      return { user: null, error: 'Erro ao fazer login.' };
    }

    // Busca dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id_autenticacao', authData.user.id)
      .single();

    if (userError || !userData) {
      return { user: null, error: 'Erro ao buscar dados do usuário.' };
    }

    const user: AuthUser = {
      id: userData.id,
      authId: userData.id_autenticacao,
      email: userData.email,
      username: userData.nome_completo,
      createdAt: userData.criado_em,
    };

    // Salva sessão localmente
    await appStorage.setItem('auth_user', JSON.stringify(user));
    await appStorage.setItem('auth_session', JSON.stringify(authData.session));

    return { user, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { user: null, error: message };
  }
};

/**
 * Faz logout do usuário
 */
export const logoutUser = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { error: error.message };
    }

    // Limpa dados locais
    await appStorage.removeItem('auth_user');
    await appStorage.removeItem('auth_session');

    return { error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { error: message };
  }
};

/**
 * Obtém o usuário atualmente logado
 */
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const userJson = await appStorage.getItem('auth_user');
    return userJson ? JSON.parse(userJson) : null;
  } catch {
    return null;
  }
};

/**
 * Verifica se existe uma sessão ativa
 */
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session !== null) {
      return true;
    }

    const storedUser = await appStorage.getItem('auth_user');
    return storedUser !== null;
  } catch {
    return false;
  }
};

/**
 * Atualiza o perfil do usuário
 */
export const updateUserProfile = async (
  username?: string,
  data?: Record<string, unknown>
): Promise<AuthResponse> => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { user: null, error: 'Usuário não autenticado.' };
    }

    const updateData: Record<string, unknown> = { ...data };

    if (username) {
      // Verifica se o novo username já existe
      const { data: existingUser } = await supabase
        .from('usuarios')
        .select('id')
        .eq('nome_completo', username)
        .neq('id', user.id)
        .single();

      if (existingUser) {
        return { user: null, error: 'Nome de usuário já está em uso.' };
      }

      updateData.nome_completo = username;
    }

    const { error } = await supabase
      .from('usuarios')
      .update(updateData)
      .eq('id', user.id);

    if (error) {
      return { user: null, error: error.message };
    }

    const updatedUser: AuthUser = {
      ...user,
      username: (updateData.nome_completo as string | undefined) ?? user.username,
    };
    await appStorage.setItem('auth_user', JSON.stringify(updatedUser));

    return { user: updatedUser, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return { user: null, error: message };
  }
};
