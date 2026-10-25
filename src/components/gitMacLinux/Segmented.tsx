import React, { useRef } from 'react';
import s from './GitMacLinux.module.css';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  /** id of the panel these options switch, if there is one. */
  panelId?: string;
};

/** A small switch between a few options. It is a tablist, so arrow keys move through it. */
export default function Segmented<T extends string>({ label, options, value, onChange, panelId }: Props<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent) => {
    const i = options.findIndex((o) => o.value === value);
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + options.length) % options.length;
    onChange(options[n].value);
    refs.current[n]?.focus();
  };
  return (
    <div className={s.seg} role="tablist" aria-label={label} onKeyDown={onKey}>
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => { refs.current[i] = el; }}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          aria-controls={panelId}
          tabIndex={o.value === value ? 0 : -1}
          className={`${s.segBtn} ${o.value === value ? s.segOn : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
