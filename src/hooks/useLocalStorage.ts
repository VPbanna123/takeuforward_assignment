'use client';

import { useEffect, useState } from 'react';
import { useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => initialValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialRef = useRef(initialValue);

  useEffect(() => {
    try {
      const cached = window.localStorage.getItem(key);
      if (cached !== null) {
        try {
          setValue(JSON.parse(cached) as T);
        } catch {
          window.localStorage.removeItem(key);
          setValue(initialRef.current);
        }
      }
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [isHydrated, key, value]);

  return [value, setValue, isHydrated] as const;
}
