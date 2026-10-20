import { useCallback, useEffect, useState } from 'react';

const KEY = 'rh-learn-progress';

/** Completed lessons, stored in the browser only. Read after mount so server and client HTML match. */
export function useProgress() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(parsed)) setDone(parsed.filter((x): x is string => typeof x === 'string'));
    } catch {
      // storage blocked or corrupt: start empty
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setDone((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // storage full or blocked: the toggle still works for this visit
      }
      return next;
    });
  }, []);

  return { done, toggle };
}
