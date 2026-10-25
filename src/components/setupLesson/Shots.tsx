import React from 'react';
import s from './SetupLesson.module.css';

type Kids = { children?: React.ReactNode };

/** One thing to look at in a screenshot. `n` is the number already drawn on the screenshot. Without it the item gets a dot. */
export type Pin = { n?: number; label: string };

/** The "In the screenshot" strip. The numbers and labels match what is drawn inside the screenshot. */
export function ScreenshotPins({ pins, label = 'IN THE SCREENSHOT', stacked = false }: { pins: Pin[]; label?: string; stacked?: boolean }) {
  return (
    <div className={`${s.pins} ${stacked ? s.pinsStacked : ''}`}>
      <span className={s.pinsLabel}>{label}</span>
      <ul>
        {pins.map((p) => (
          <li key={p.label}>
            <span className={p.n === undefined ? s.pinDot : s.pinNum} aria-hidden="true">{p.n}</span>
            {p.n !== undefined && <span className={s.srOnly}>Marker {p.n}: </span>}
            {p.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A screenshot card. Wrap the page's own <BrowserWindow>, and its pins sit underneath. */
export function Shot({ pins, children }: Kids & { pins?: Pin[] }) {
  return (
    <figure className={s.shot}>
      <div className={s.shotFrame}>{children}</div>
      {pins && <ScreenshotPins pins={pins} />}
    </figure>
  );
}
