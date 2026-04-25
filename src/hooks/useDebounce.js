import { useEffect, useState } from 'react';

const useDebounce = (value, delay = 500) => {
  const safeDelay = Number.isFinite(delay) && delay >= 0 ? delay : 500;

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, safeDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, safeDelay]);

  return debouncedValue;
};

export default useDebounce;