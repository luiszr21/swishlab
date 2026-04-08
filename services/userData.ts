import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data.json';

type User = {
  username: string;
  email: string;
  password: string;
};

const normalize = (value: string) => value.trim().toLowerCase();
const CURRENT_USER_KEY = 'currentUser';
const IS_LOGGED_KEY = 'isLogged';
const REGISTERED_USERS_KEY = 'registeredUsers';

const initialUsers: User[] = data.users ?? [];

const loadStoredUsers = async (): Promise<User[]> => {
  const usersJson = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
  if (usersJson) {
    try {
      const storedUsers = JSON.parse(usersJson) as User[];
      return storedUsers;
    } catch {
      return initialUsers;
    }
  }
  return initialUsers;
};

const saveUsers = async (users: User[]) => {
  await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
};

export const registerUser = async (user: User) => {
  const users = await loadStoredUsers();
  const username = normalize(user.username);
  const email = normalize(user.email);

  if (users.some((item) => normalize(item.username) === username)) {
    throw new Error('Nome de usuário já está em uso.');
  }

  if (users.some((item) => normalize(item.email) === email)) {
    throw new Error('Email já está em uso.');
  }

  const newUser = { ...user, username: user.username.trim(), email: user.email.trim() };
  const updatedUsers = [...users, newUser];
  await saveUsers(updatedUsers);
  return newUser;
};

export const loginUser = async (identifier: string, password: string) => {
  const users = await loadStoredUsers();
  const normalized = normalize(identifier);
  const user = users.find(
    (item) => normalize(item.email) === normalized || normalize(item.username) === normalized
  );

  if (!user) {
    throw new Error('Usuário ou email não encontrado.');
  }

  if (user.password !== password) {
    throw new Error('Senha incorreta.');
  }

  await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  await AsyncStorage.setItem(IS_LOGGED_KEY, 'true');
  return user;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const getIsLogged = async (): Promise<boolean> => {
  const isLogged = await AsyncStorage.getItem(IS_LOGGED_KEY);
  return isLogged === 'true';
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
  await AsyncStorage.removeItem(IS_LOGGED_KEY);
};

export type { User };

