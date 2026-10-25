import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { LessonRoot, ProgressProvider, SetupChecklist, applyToggle, trackStepDone } from '../setupLesson';
import type { Progress } from '../setupLesson';
import { detectOs } from './os';
import type { DetectedOs, Os } from './os';
import Segmented from './Segmented';
import styles from './GitMacLinux.module.css';

const STORAGE_KEY = 'recodehive:setup-git-mac-linux:done';

const GROUPS: Record<Os, { steps: string[]; doneMessage: string }> = {
  mac: {
    steps: ['Install Homebrew', 'Run next steps', 'Install Git', 'Check Git works'],
    doneMessage: '🎉 All done. Git is installed on your Mac.',
  },
  linux: {
    steps: ['Install Git', 'Check Git works', 'Set name and email'],
    doneMessage: '🎉 All done. Git is installed and set up on Linux.',
  },
};

type Saved = Record<Os, boolean[]>;
const empty = (): Saved => ({ mac: GROUPS.mac.steps.map(() => false), linux: GROUPS.linux.steps.map(() => false) });

function readSaved(): Saved {
  const out = empty();
  try {
    const raw: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
    if (raw && typeof raw === 'object') {
      (['mac', 'linux'] as Os[]).forEach((os) => {
        const list = (raw as Record<string, unknown>)[os];
        if (Array.isArray(list)) list.forEach((n) => { if (typeof n === 'number' && n >= 1 && n <= out[os].length) out[os][n - 1] = true; });
      });
    }
  } catch {
    // Storage can be blocked or hold something else. The page still works, it just does not remember.
  }
  return out;
}

type OsState = { os: Os; setOs: (os: Os) => void; detected: DetectedOs };
const OsContext = createContext<OsState>({ os: 'mac', setOs: () => undefined, detected: 'mac' });
const GroupsContext = createContext<Record<Os, Progress> | null>(null);

/** The visitor's system, and the system the checklist is showing. */
export const useOs = () => useContext(OsContext);

/** The root of the page. It keeps one ticked-off list for macOS and one for Linux, and shares them with the blocks below. */
export default function MacLinuxLesson({ children }: { children?: React.ReactNode }) {
  const { metadata } = useDoc();
  const [done, setDone] = useState<Saved>(empty);
  const [os, setOs] = useState<Os>('mac');
  const [detected, setDetected] = useState<DetectedOs>('mac');
  const [announce, setAnnounce] = useState('');
  const timer = useRef<number | undefined>(undefined);

  // Read after mount so the server render and the first client render match
  useEffect(() => {
    const found = detectOs();
    setDetected(found);
    setOs(found === 'linux' ? 'linux' : 'mac');
    setDone(readSaved());
  }, []);

  const toggleMany = useCallback((group: Os, ns: number[]) => {
    setDone((prev) => {
      const next = { ...prev, [group]: applyToggle(prev[group], ns) };
      try {
        const saved = Object.fromEntries((['mac', 'linux'] as Os[]).map((g) => [g, next[g].flatMap((v, i) => (v ? [i + 1] : []))]));
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      } catch {
        // Not remembered, still ticked for this visit
      }
      ns.forEach((n) => { if (next[group][n - 1] && !prev[group][n - 1]) trackStepDone(`${metadata.permalink}#${group}`, n); });
      return next;
    });
  }, [metadata.permalink]);

  const groups = useMemo<Record<Os, Progress>>(() => {
    const make = (group: Os): Progress => ({
      ...GROUPS[group],
      done: done[group],
      storageKey: STORAGE_KEY,
      toggle: (n) => toggleMany(group, [n]),
      toggleMany: (ns) => toggleMany(group, ns),
    });
    return { mac: make('mac'), linux: make('linux') };
  }, [done, toggleMany]);

  // Docusaurus changes its copy buttons' label but does not announce it, so this does
  const onCopy = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('[class*="copyButton"]')) return;
    setAnnounce('Copied');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAnnounce(''), 1500);
  };

  return (
    <OsContext.Provider value={{ os, setOs, detected }}>
      <GroupsContext.Provider value={groups}>
        <LessonRoot className={styles.gitMacLinux}>
          <div onClickCapture={onCopy}>{children}</div>
          <div className={styles.srOnly} aria-live="polite">{announce}</div>
        </LessonRoot>
      </GroupsContext.Provider>
    </OsContext.Provider>
  );
}

/** Gives the steps inside it the ticked-off list of one system. */
export function ProgressGroup({ id, children }: { id: Os; children?: React.ReactNode }) {
  const groups = useContext(GroupsContext);
  if (!groups) throw new Error('<ProgressGroup> must sit inside <MacLinuxLesson>.');
  return <ProgressProvider value={groups[id]}>{children}</ProgressProvider>;
}

/** The install checklist, with a switch between the macOS list and the Linux list. */
export function InstallChecklist() {
  const groups = useContext(GroupsContext);
  const { os, setOs } = useOs();
  if (!groups) throw new Error('<InstallChecklist> must sit inside <MacLinuxLesson>.');
  return (
    <ProgressProvider value={groups[os]}>
      <SetupChecklist
        title="Your install checklist"
        hint="Pick your system, then tick each step as you finish it."
        extra={
          <div className={styles.osSwitch}>
            <Segmented<Os>
              label="Your system"
              value={os}
              onChange={setOs}
              options={[{ value: 'mac', label: '🍎 macOS' }, { value: 'linux', label: '🐧 Linux' }]}
            />
          </div>
        }
      />
    </ProgressProvider>
  );
}
