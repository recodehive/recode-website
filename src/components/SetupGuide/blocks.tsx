import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, CircleHelp, Copy } from 'lucide-react';
import { PLACEHOLDER, useSetup, type OS } from './state';
import s from './SetupGuide.module.css';

/** The GitHub username as a highlighted token: yellow while empty, green once typed. */
export function UserToken() {
  const { username } = useSetup();
  return <mark className={`${s.token} ${username ? s.tokenFilled : ''}`}>{username || 'your-username'}</mark>;
}

function renderLine(line: string): React.ReactNode {
  const parts = line.split(PLACEHOLDER);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <UserToken />}
    </React.Fragment>
  ));
}

/** A dark command block with a Copy button. `{{user}}` is replaced by the username everywhere, copy included. */
export function Cmd({ label, code }: { label: string; code: string }) {
  const { username } = useSetup();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    const text = code.split(PLACEHOLDER).join(username || 'your-username');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement('textarea');
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={s.cmd}>
      <div className={s.cmdBar}>
        <span className={s.cmdLabel}>{label}</span>
        <button type="button" className={s.cmdCopy} onClick={() => void copy()} aria-label={`Copy the ${label.toLowerCase()} command`}>
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className={s.srOnly} role="status" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
      </div>
      <div className={s.cmdBody}>
        {code.split('\n').map((line, i) => (
          <div key={i} className={s.cmdLine}>{renderLine(line)}</div>
        ))}
      </div>
    </div>
  );
}

/** Shows its children only for the selected computer. */
export function OsOnly({ os, children }: { os: OS | OS[]; children: React.ReactNode }) {
  const current = useSetup().os;
  const list = Array.isArray(os) ? os : [os];
  return list.includes(current) ? <>{children}</> : null;
}

/** A mini terminal showing what a successful command prints. */
export function CheckIt({ cmd, output, note }: { cmd: string[]; output: string[]; note?: string }) {
  return (
    <figure className={s.check}>
      <div className={s.checkBar}>
        <span className={s.dots} aria-hidden="true"><i /><i /><i /></span>
        <span className={s.checkTitle}>Check it worked</span>
      </div>
      <div className={s.checkBody}>
        {cmd.map((c) => (
          <div key={c} className={s.checkCmd}><span className={s.prompt}>$</span> {c}</div>
        ))}
        {output.map((o) => (
          <div key={o} className={s.checkOut}>{o}</div>
        ))}
      </div>
      {note && <figcaption className={s.checkNote}>{note}</figcaption>}
    </figure>
  );
}

export interface StuckItem {
  problem: React.ReactNode;
  fix: React.ReactNode;
}

/** The amber "Stuck on this step?" toggle with problem and fix pairs. */
export function Stuck({ items }: { items: StuckItem[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={s.stuck}>
      <button type="button" className={s.stuckBtn} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <CircleHelp size={14} aria-hidden="true" /> Stuck on this step?
      </button>
      {open && (
        <div id={id} className={s.stuckPanel}>
          <ul>
            {items.map((it, i) => (
              <li key={i}>
                <strong>{it.problem}</strong>
                <span>{it.fix}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** A glossary word with a dotted underline and a tooltip on hover and focus. Escape closes it. */
export function Term({ word, tip }: { word: string; tip: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <span className={s.term} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <span tabIndex={0} className={s.termWord} aria-describedby={id} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        {word}
      </span>
      <span id={id} role="tooltip" className={`${s.termTip} ${open ? s.termTipOpen : ''}`}>{tip}</span>
    </span>
  );
}

export function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className={s.link} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return <code className={s.ic}>{children}</code>;
}
