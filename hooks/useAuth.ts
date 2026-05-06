import { useEffect, useState } from 'react';
import * as AuthService from '@/services/auth';

/**
 * Hook customizado para gerenciar estado de autenticação
 * Fornece acesso a métodos de auth e estado do usuário
 */

export interface UseAuthReturn {
  user: AuthService.AuthUser | null;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthService.AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Verifica autenticação ao inicializar o hook
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await AuthService.getCurrentUser();
        setUser(currentUser);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao verificar autenticação');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Registra um novo usuário
   */
  const register = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.registerUser(email, password, username);

      if (response.error) {
        setError(response.error);
        return false;
      }

      if (response.user) {
        setUser(response.user);
        return true;
      }

      return false;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Faz login de um usuário
   */
  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.loginUser(emailOrUsername, password);

      if (response.error) {
        setError(response.error);
        return false;
      }

      if (response.user) {
        setUser(response.user);
        return true;
      }

      return false;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Faz logout do usuário
   */
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await AuthService.logoutUser();

      if (response.error) {
        setError(response.error);
        return;
      }

      setUser(null);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    isAuthenticated: user !== null,
  };
};
