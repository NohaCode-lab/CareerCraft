const isStorageAvailable = (): boolean => {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
};

const getStorage = (): Storage | null => {
  if (!isStorageAvailable()) {
    return null;
  }

  return window.localStorage;
};

export const hasItem = (key: string): boolean => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    return storage.getItem(key) !== null;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error(`Error checking localStorage key "${key}":`, error);
    }
    return false;
  }
};

export const getItem = <T,>(key: string, fallback: T | null = null): T | null => {
  try {
    const storage = getStorage();
    if (!storage) {
      return fallback;
    }

    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error(`Error getting localStorage key "${key}":`, error);
    }
    return fallback;
  }
};

export const setItem = <T,>(key: string, value: T): boolean => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
    return false;
  }
};

export const removeItem = (key: string): boolean => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.removeItem(key);
    return true;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
    return false;
  }
};

export const clearStorage = (): boolean => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.clear();
    return true;
  } catch (error) {
    if (import.meta.env?.DEV) {
      console.error("Error clearing localStorage:", error);
    }
    return false;
  }
};
