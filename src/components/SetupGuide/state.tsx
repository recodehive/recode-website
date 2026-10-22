import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type OS = 'win' | 'mac' | 'linux';
export const OS_LIST: readonly OS[] = ['win', 'mac', 'linux'];
export const TOTAL = 10;
export const PLACEHOLDER = '{{user}}';
const KEY = 'recodehive.setupGuide.v1';

type Persisted = { os: OS | null; username: string; done: number[] };
type Gtag = (command: 'event', name: string, params?: Record<string, string | number>) => void;

/** GA4 events. The username is never sent. */
function track(name: string, params?: Record<string, string | number>) {
  try {
    (window as unknown as { gtag?: Gtag }).gtag?.('event', name, params);
  } catch {
    // analytics must never break the guide
  }
}

export function cleanUsername(value: string): string {
  return value.replace(/[^A-Za-z0-9-]/g, '').slice(0, 39);
}

function detectOs(): OS {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const p = `${nav.userAgentData?.platform ?? ''} ${navigator.userAgent}`.toLowerCase();
  if (p.includes('mac') || p.includes('iphone') || p.includes('ipad')) return 'mac';
  if (p.includes('win')) return 'win';
  return 'linux';
}

export function reducedMotion(): boolean {
  return typeof window !== 'undefined' && Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

/** Smooth-scrolls to a step card. */
export function jumpToStep(n: number) {
  document.getElementById(`step-${n}`)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

interface Ctx {
  os: OS;
  setOs: (o: OS) => void;
  username: string;
  setUsername: (v: string) => void;
  done: ReadonlySet<number>;
  toggle: (n: number) => void;
  reset: () => void;
  hydrated: boolean;
}

const SetupContext = createContext<Ctx | null>(null);

export function SetupProvider({ children }: { children: React.ReactNode }) {
  // Server and first client render use these defaults; the saved state is read after mount.
  const [os, setOsState] = useState<OS>('win');
  const [username, setUsernameState] = useState('');
  const [doneList, setDoneList] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const prevDone = useRef<number[] | null>(null);

  useEffect(() => {
    let saved: Partial<Persisted> = {};
    try {
      saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Persisted>;
    } catch {
      // storage blocked or corrupt: start fresh
    }
    const q = new URLSearchParams(window.location.search).get('os');
    setOsState(OS_LIST.find((o) => o === q) ?? OS_LIST.find((o) => o === saved.os) ?? detectOs());
    if (typeof saved.username === 'string') setUsernameState(cleanUsername(saved.username));
    if (Array.isArray(saved.done)) {
      const ok = saved.done.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= TOTAL);
      setDoneList(Array.from(new Set(ok)).sort((a, b) => a - b));
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ os, username, done: doneList }));
    } catch {
      // storage blocked: progress just will not be remembered
    }
  }, [hydrated, os, username, doneList]);

  const setOs = useCallback((o: OS) => {
    setOsState(o);
    track('setup_os_selected', { os: o });
  }, []);

  const setUsername = useCallback((v: string) => setUsernameState(cleanUsername(v)), []);

  const toggle = useCallback((n: number) => {
    setDoneList((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n].sort((a, b) => a - b)));
  }, []);

  // Analytics for steps ticked during this visit. The first run after hydration only records the saved state.
  useEffect(() => {
    if (!hydrated) return;
    const before = prevDone.current;
    prevDone.current = doneList;
    if (before === null) return;
    doneList.filter((n) => !before.includes(n)).forEach((n) => track('setup_step_done', { step: n }));
    if (before.length < TOTAL && doneList.length === TOTAL) track('setup_complete');
  }, [hydrated, doneList]);

  const reset = useCallback(() => setDoneList([]), []);
  const done = useMemo(() => new Set(doneList), [doneList]);

  const value = useMemo<Ctx>(
    () => ({ os, setOs, username, setUsername, done, toggle, reset, hydrated }),
    [os, setOs, username, setUsername, done, toggle, reset, hydrated],
  );
  return <SetupContext.Provider value={value}>{children}</SetupContext.Provider>;
}

export function useSetup(): Ctx {
  const ctx = useContext(SetupContext);
  if (!ctx) throw new Error('useSetup must be used inside <SetupProvider>');
  return ctx;
}
