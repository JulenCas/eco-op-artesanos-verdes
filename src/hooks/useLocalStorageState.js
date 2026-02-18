import { useEffect, useState } from 'react';

function resolveInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export default function useLocalStorageState(storageKey, initialValue) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') {
      return resolveInitialValue(initialValue);
    }

    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      return resolveInitialValue(initialValue);
    }

    try {
      return JSON.parse(storedValue);
    } catch {
      return resolveInitialValue(initialValue);
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return [state, setState];
}
