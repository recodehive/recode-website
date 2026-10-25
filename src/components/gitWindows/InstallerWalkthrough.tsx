import React, { useRef, useState } from 'react';
import { SCREENS } from './walkthroughData';
import s from './GitWindows.module.css';

const TOTAL = SCREENS.length;

/**
 * The seven installer screens that follow the PATH screen. The list on the left is the page text and is always
 * fully visible. The window on the right draws the screen the selected item describes.
 */
export default function InstallerWalkthrough() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = SCREENS[i];
  const last = i === TOTAL - 1;

  const go = (next: number, focus = false) => {
    const n = Math.min(TOTAL - 1, Math.max(0, next));
    setI(n);
    if (focus) tabs.current[n]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: TOTAL - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  return (
    <div className={s.wt}>
      <div className={s.wtTop}>
        <span className={s.wtTitle}>THE NEXT 7 INSTALLER SCREENS</span>
        <span className={s.wtCount} aria-live="polite">Screen {i + 1} of {TOTAL}</span>
      </div>
      <div className={s.wtGrid}>
        <div className={s.wtList} role="tablist" aria-orientation="vertical" aria-label="Installer screens" onKeyDown={onKey}>
          {SCREENS.map((sc, n) => (
            <button
              key={sc.title}
              ref={(el) => { tabs.current[n] = el; }}
              type="button"
              role="tab"
              id={`wt-tab-${n}`}
              aria-selected={n === i}
              aria-controls="wt-panel"
              tabIndex={n === i ? 0 : -1}
              className={`${s.wtTab} ${n === i ? s.wtActive : ''} ${n < i ? s.wtPast : ''}`}
              onClick={() => go(n)}
            >
              <span className={s.wtNum}>{n + 1}</span>
              <span className={s.wtText}>{sc.text}</span>
            </button>
          ))}
        </div>
        <div className={s.wtSide}>
          <div className={s.win} role="tabpanel" id="wt-panel" aria-labelledby={`wt-tab-${i}`}>
            <div className={s.winBar} aria-hidden="true">
              <span className={s.winIcon} />
              <span className={s.winName}>Git Setup</span>
              <span className={s.winX}>✕</span>
            </div>
            <div className={s.winBody}>
              <div className={s.winTitle}>{screen.title}</div>
              <span className={s.srOnly}>
                Recommended {screen.options.some((o) => o.selected) ? 'option' : 'choice'}:{' '}
                {screen.options.some((o) => o.selected) ? screen.options.filter((o) => o.selected).map((o) => o.label).join(', ') : `leave both boxes unticked and click ${screen.button}`}.
              </span>
              <div className={s.winOptions} aria-hidden="true">
                {screen.options.map((o) => (
                  <div key={o.label} className={`${s.winOpt} ${o.selected ? s.winSel : ''}`}>
                    <input type={screen.kind} checked={Boolean(o.selected)} readOnly tabIndex={-1} />
                    <span>{o.label}</span>
                    {o.selected && <em>Choose this</em>}
                  </div>
                ))}
              </div>
            </div>
            <div className={s.winFoot}>
              <button type="button" className={s.winBtn} disabled={i === 0} onClick={() => go(i - 1)}>Back</button>
              {last ? (
                <span className={`${s.winBtn} ${s.winPrimary}`} aria-hidden="true">{screen.button} &gt;</span>
              ) : (
                <button type="button" className={`${s.winBtn} ${s.winPrimary}`} onClick={() => go(i + 1)}>Next &gt;</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={s.wtNote}>
        Simplified view of each installer screen. Option names follow the Git for Windows installer and may be worded slightly differently in your version.
      </div>
    </div>
  );
}
