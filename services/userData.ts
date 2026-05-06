import {
  AuthUser,
  getCurrentUser as getCurrentAuthUser,
  checkAuthStatus,
  loginUser as loginWithSupabase,
  logoutUser as logoutFromSupabase,
  registerUser as registerWithSupabase,
} from './auth';

export type User = {
  username: string;
  email: string;
  password: string;
};

export const registerUser = async (user: User): Promise<AuthUser> => {
  const response = await registerWithSupabase(user.email, user.password, user.username);

  if (response.error || !response.user) {
    throw new Error(response.error ?? 'Não foi possível criar a conta.');
  }

  return response.user;
};

export const loginUser = async (identifier: string, password: string): Promise<AuthUser> => {
  const response = await loginWithSupabase(identifier, password);

  if (response.error || !response.user) {
    throw new Error(response.error ?? 'Não foi possível fazer login.');
  }

  return response.user;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => getCurrentAuthUser();

export const getIsLogged = async (): Promise<boolean> => checkAuthStatus();

export const logoutUser = async (): Promise<void> => {
  const response = await logoutFromSupabase();

  if (response.error) {
    throw new Error(response.error);
  }
};
