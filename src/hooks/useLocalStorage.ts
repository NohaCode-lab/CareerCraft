import { useEffect, useState } from 'react';

const getInitialValue = <T>(initialValue: T | (() => T)): T => {
  return initialValue instanceof Function ? initialValue() : initialValue;
};

const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
): [T, (newValue: T | ((val: T) => T)) => void, () => void] => {
  const [value, setValue] = useState<T>(() => {
    const fallbackValue = getInitialValue(initialValue);

    try {
      const item = window.localStorage.getItem(key);
      if (!item || item === 'undefined' || item === 'null') {
        return fallbackValue;
      }
      const parsed = JSON.parse(item);
      return parsed !== null && parsed !== undefined ? parsed : fallbackValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return fallbackValue;
    }
  });

  const setStoredValue = (newValue: T | ((val: T) => T)) => {
    try {
      setValue((currentValue) => {
        const valueToStore =
          newValue instanceof Function ? (newValue as (val: T) => T)(currentValue) : newValue;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    const fallbackValue = getInitialValue(initialValue);

    try {
      window.localStorage.removeItem(key);
      setValue(fallbackValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key) return;

      try {
        const fallbackValue = getInitialValue(initialValue);
        const parsed = event.newValue && event.newValue !== 'undefined' ? JSON.parse(event.newValue) : fallbackValue;
        setValue(parsed !== null && parsed !== undefined ? parsed : fallbackValue);
      } catch (error) {
        console.error(`Error syncing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue]);

  return [value, setStoredValue, removeValue];
};

export default useLocalStorage;
