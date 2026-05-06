const memoryStore = new Map<string, string>();

const hasWindow = typeof window !== 'undefined';

const readItem = async (key: string): Promise<string | null> => {
  if (hasWindow && typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }

  return memoryStore.get(key) ?? null;
};

const writeItem = async (key: string, value: string): Promise<void> => {
  if (hasWindow && typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
    return;
  }

  memoryStore.set(key, value);
};

const removeItem = async (key: string): Promise<void> => {
  if (hasWindow && typeof localStorage !== 'undefined') {
    localStorage.removeItem(key);
    return;
  }

  memoryStore.delete(key);
};

export const appStorage = {
  getItem: readItem,
  setItem: writeItem,
  removeItem,
};
