import React, { useState } from 'react';
import s from './GitWindows.module.css';

const PATH = ['🖥️ This PC', 'right click', 'Properties', 'look for', 'System type'];
const CHOICES = [
  { id: 'x64', label: '64-bit (x64)', link: 'Git for Windows/x64 Setup' },
  { id: 'arm64', label: 'ARM64', link: 'Git for Windows/ARM64 Setup' },
] as const;

/** Helps the reader find their Windows system type, then shows which download link on the Git page to click. */
export default function InstallerPicker() {
  const [pick, setPick] = useState<(typeof CHOICES)[number]['id']>('x64');
  const choice = CHOICES.find((c) => c.id === pick) ?? CHOICES[0];
  return (
    <div className={s.picker}>
      <div className={s.pkTop}>
        <span className={s.pkLabel}>WHICH INSTALLER DO I NEED?</span>
        <span className={s.pkHint}>Check it on your PC, then pick it here</span>
      </div>
      <ul className={s.pkPath} aria-label="How to find your system type">
        {PATH.map((p, n) => (
          <li key={p} className={n % 2 === 0 ? s.pkChip : s.pkArrow}>{n % 2 === 0 ? p : `→ ${p}`}</li>
        ))}
      </ul>
      <div className={s.pkToggle} role="group" aria-label="Your system type">
        {CHOICES.map((c) => (
          <button key={c.id} type="button" className={c.id === pick ? s.pkOn : ''} aria-pressed={c.id === pick} onClick={() => setPick(c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className={s.pkResult} aria-live="polite">
        <span>⬇️ {choice.link}</span>
        <span className={s.pkWhere}>under Standalone Installer on the download page</span>
      </div>
    </div>
  );
}
