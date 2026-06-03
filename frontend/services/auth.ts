import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  error: string | null;
}

let currentToken: string | null = null;

async function initToken() {
  if (!currentToken) {
    currentToken = await AsyncStorage.getItem('authToken');
  }
}

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { user: null, error: error.error || 'Falha no registro' };
    }

    const data = await response.json();
    await AsyncStorage.setItem('authToken', data.token);
    currentToken = data.token;

    return {
      user: { id: data.id, email: data.email, username: data.username },
      error: null,
    };
  } catch (error: any) {
    return { user: null, error: error.message || 'Erro de conexão' };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { user: null, error: error.error || 'Falha no login' };
    }

    const data = await response.json();
    await AsyncStorage.setItem('authToken', data.token);
    currentToken = data.token;

    return {
      user: { id: data.id, email: data.email, username: data.username },
      error: null,
    };
  } catch (error: any) {
    return { user: null, error: error.message || 'Erro de conexão' };
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    await initToken();
    if (!currentToken) return null;

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return { id: data.id, email: data.email, username: data.username };
  } catch {
    return null;
  }
}

export async function checkAuthStatus(): Promise<boolean> {
  try {
    await initToken();
    if (!currentToken) return false;

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${currentToken}` },
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function logoutUser(): Promise<{ error: string | null }> {
  try {
    await initToken();
    if (currentToken) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${currentToken}` },
      });
    }

    await AsyncStorage.removeItem('authToken');
    currentToken = null;
    return { error: null };
  } catch (error: any) {
    return { error: error.message || 'Erro no logout' };
  }
}
