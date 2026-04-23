const isStorageAvailable = () => {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
};

const getStorage = () => {
  if (!isStorageAvailable()) {
    return null;
  }

  return window.localStorage;
};

export const hasItem = (key) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    return storage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error);
    return false;
  }
};

export const getItem = (key, fallback = null) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return fallback;
    }

    const value = storage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    storage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};