import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import s from './SetupLesson.module.css';

type Kids = { children?: React.ReactNode };

export type Progress = {
  steps: string[];
  done: boolean[];
  doneMessage: string;
  storageKey: string;
  /** Flips one step. */
  toggle: (n: number) => void;
  /** Flips several steps together: all on, or all off if they were all on. */
  toggleMany: (ns: number[]) => void;
};

const Ctx = createContext<Progress | null>(null);

/** Lets a page that keeps its own state (for example one checklist per operating system) feed the shared blocks. */
export const ProgressProvider = Ctx.Provider;

/** The checklist and every step on a page read and write the same ticked-off state through this. */
export function useProgress(): Progress {
  const value = useContext(Ctx);
  if (!value) throw new Error('Setup lesson blocks must sit inside <SetupLesson>.');
  return value;
}

/** Tells analytics a step was ticked. The site already loads Google Analytics, so this is a no-op if it is missing. */
export function trackStepDone(slug: string, step: number) {
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  gtag?.('event', 'setup_step_done', { slug, step });
}

/** Applies a tick or untick of several steps to a done list. */
export function applyToggle(prev: boolean[], ns: number[]): boolean[] {
  const allOn = ns.every((n) => prev[n - 1]);
  return prev.map((v, i) => (ns.includes(i + 1) ? !allOn : v));
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

/** The shared type, colours and spacing of a setup lesson. Everything on the page sits inside this. */
export function LessonRoot({ className = '', children }: Kids & { className?: string }) {
  return <div className={`${s.setupLesson} ${className}`}>{children}</div>;
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

  const toggleMany = useCallback((ns: number[]) => {
    setDone((prev) => {
      const next = applyToggle(prev, ns);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next.flatMap((v, i) => (v ? [i + 1] : []))));
      } catch {
        // Not remembered, still ticked for this visit
      }
      ns.forEach((n) => { if (next[n - 1] && !prev[n - 1]) trackStepDone(metadata.permalink, n); });
      return next;
    });
  }, [storageKey, metadata.permalink]);

  const toggle = useCallback((n: number) => toggleMany([n]), [toggleMany]);

  const value = useMemo(
    () => ({ steps, done, doneMessage, storageKey, toggle, toggleMany }),
    [steps, done, doneMessage, storageKey, toggle, toggleMany],
  );
  return (
    <ProgressProvider value={value}>
      <LessonRoot className={className}>{children}</LessonRoot>
    </ProgressProvider>
  );
}
