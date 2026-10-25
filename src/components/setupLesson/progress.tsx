import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import s from './SetupLesson.module.css';

type Kids = { children?: React.ReactNode };

type Progress = {
  steps: string[];
  done: boolean[];
  doneMessage: string;
  storageKey: string;
  toggle: (n: number) => void;
};

const Ctx = createContext<Progress | null>(null);

/** The checklist and every step on a page read and write the same ticked-off state through this. */
export function useProgress(): Progress {
  const value = useContext(Ctx);
  if (!value) throw new Error('Setup lesson blocks must sit inside <SetupLesson>.');
  return value;
}

function readSaved(key: string, count: number): boolean[] {
  const out = Array.from({ length: count }, () => false);
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
    if (Array.isArray(saved)) saved.forEach((n) => { if (typeof n === 'number' && n >= 1 && n <= count) out[n - 1] = true; });
  } catch {
    // Storage can be blocked or hold something else. The page still works, it just does not remember.
  }
  return out;
}

type Props = Kids & {
  /** Short names of the steps, in order. They label the checklist tiles. */
  steps: string[];
  /** localStorage key that remembers which steps this reader has ticked. */
  storageKey: string;
  /** Shown once every step is ticked. */
  doneMessage: string;
  /** The page's own root class, so its styles stay scoped to this one page. */
  className?: string;
};

/** The root of a setup lesson. Holds the ticked-off steps and the shared type, colours and spacing. */
export default function SetupLesson({ steps, storageKey, doneMessage, className = '', children }: Props) {
  const { metadata } = useDoc();
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));

  // Read after mount so the server render and the first client render match
  useEffect(() => setDone(readSaved(storageKey, steps.length)), [storageKey, steps.length]);

  const toggle = useCallback((n: number) => {
    setDone((prev) => {
      const next = prev.map((v, i) => (i === n - 1 ? !v : v));
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next.flatMap((v, i) => (v ? [i + 1] : []))));
      } catch {
        // Not remembered, still ticked for this visit
      }
      if (next[n - 1]) {
        const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
        gtag?.('event', 'setup_step_done', { slug: metadata.permalink, step: n });
      }
      return next;
    });
  }, [storageKey, metadata.permalink]);

  const value = useMemo(() => ({ steps, done, doneMessage, storageKey, toggle }), [steps, done, doneMessage, storageKey, toggle]);
  return (
    <Ctx.Provider value={value}>
      <div className={`${s.setupLesson} ${className}`}>{children}</div>
    </Ctx.Provider>
  );
}
