import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronUp, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { STEPS } from './steps';
import { TOTAL, jumpToStep, useSetup } from './state';
import s from './SetupGuide.module.css';

function useNext() {
  const { done } = useSetup();
  const next = STEPS.find((st) => !done.has(st.n));
  return { count: done.size, next };
}

function Ring({ count, size = 54 }: { count: number; size?: number }) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  return (
    <span className={s.ring} style={{ width: size, height: size }} aria-hidden="true">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className={s.ringTrack} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={s.ringFill}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - count / TOTAL)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {size >= 40 && <b>{count}/{TOTAL}</b>}
    </span>
  );
}

function StepList({ onPick }: { onPick?: () => void }) {
  const { done } = useSetup();
  const next = STEPS.find((st) => !done.has(st.n));
  return (
    <ol className={s.railList}>
      {STEPS.map((st) => {
        const isDone = done.has(st.n);
        const isNext = next?.n === st.n;
        return (
          <li key={st.n}>
            <button
              type="button"
              className={`${s.railItem} ${isDone ? s.railDone : ''} ${isNext ? s.railNext : ''}`}
              aria-current={isNext ? 'step' : undefined}
              onClick={() => {
                onPick?.();
                jumpToStep(st.n);
              }}
            >
              <span className={s.railCheck} aria-hidden="true">
                {isDone && <Check size={12} />}
              </span>
              <span>{st.title}</span>
              {isDone && <span className={s.srOnly}>, done</span>}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function StartOver() {
  const { reset, done } = useSetup();
  const [confirm, setConfirm] = useState(false);
  if (confirm) {
    return (
      <span className={s.confirm} role="group" aria-label="Confirm start over">
        Are you sure?
        <button type="button" className={s.linkBtn} onClick={() => { reset(); setConfirm(false); }}>Yes</button>
        <button type="button" className={s.linkBtn} onClick={() => setConfirm(false)}>No</button>
      </span>
    );
  }
  return (
    <button type="button" className={s.linkBtn} onClick={() => setConfirm(true)} disabled={done.size === 0}>
      Start over
    </button>
  );
}

export function ProgressRail() {
  const { count, next } = useNext();
  return (
    <aside className={s.rail} aria-label="Your progress">
      <div className={s.railCard}>
        <div className={s.railTop}>
          <Ring count={count} />
          <div>
            <strong>Your progress</strong>
            <span>{next ? `Next: ${next.title}` : 'All done. Nice work!'}</span>
          </div>
        </div>
        <StepList />
        <div className={s.railFoot}><StartOver /></div>
        <span className={s.srOnly} role="status" aria-live="polite">{count} of {TOTAL} steps done</span>
      </div>
      <div className={s.hand}>
        <strong>Need a hand?</strong>
        <p>Real people on Discord help first-timers every day.</p>
        <a className={s.discordBtn} href="https://discord.gg/dh3TA8U55Q" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={15} aria-hidden="true" /> Join Discord
        </a>
      </div>
    </aside>
  );
}

/** The slim sticky bar shown instead of the rail when the page is narrow. */
export function MobileBar({ onOpen }: { onOpen: () => void }) {
  const { count, next } = useNext();
  return (
    <div className={s.mobileBar}>
      <button type="button" className={s.mobileBtn} onClick={onOpen} aria-haspopup="dialog">
        <Ring count={count} size={30} />
        <span>{count}/{TOTAL} {'·'} {next ? `Next: ${next.title}` : 'All done'}</span>
        <ChevronUp size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Bottom sheet with the step list, opened from the mobile bar. */
export function ProgressSheet({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { count, next } = useNext();
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <>
      <div className={s.scrim} onClick={onClose} aria-hidden="true" />
      <div className={s.sheet} role="dialog" aria-modal="true" aria-label="Your progress">
        <div className={s.sheetTop}>
          <div className={s.railTop}>
            <Ring count={count} />
            <div>
              <strong>Your progress</strong>
              <span>{next ? `Next: ${next.title}` : 'All done. Nice work!'}</span>
            </div>
          </div>
          <button ref={closeRef} type="button" className={s.sheetClose} onClick={onClose} aria-label="Close progress">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <StepList onPick={onClose} />
        <div className={s.railFoot}><StartOver /></div>
      </div>
    </>
  );
}
