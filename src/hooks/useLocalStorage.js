import { useEffect, useState } from 'react';

const getInitialValue = (initialValue) => {
  return initialValue instanceof Function ? initialValue() : initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const fallbackValue = getInitialValue(initialValue);

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return fallbackValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue((currentValue) => {
        const valueToStore =
          newValue instanceof Function ? newValue(currentValue) : newValue;

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
    const handleStorageChange = (event) => {
      if (event.key !== key) return;

      try {
        const fallbackValue = getInitialValue(initialValue);
        setValue(event.newValue ? JSON.parse(event.newValue) : fallbackValue);
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