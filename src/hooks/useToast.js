import { useCallback, useEffect, useRef, useState } from 'react';

let toastId = 0;

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));

    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const addToast = useCallback(
    (message, type = 'info', duration = 3000) => {
      const id = ++toastId;

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type,
        },
      ]);

      if (duration > 0) {
        timersRef.current[id] = setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const clearToasts = useCallback(() => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
    setToasts([]);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
    };
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
};

export default useToast;