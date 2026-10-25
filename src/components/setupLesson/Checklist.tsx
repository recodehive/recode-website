import React from 'react';
import { Check } from 'lucide-react';
import { useProgress } from './progress';
import s from './SetupLesson.module.css';

/** "Your checklist": one tile per step. It shares its ticks with the step timeline below it. */
export default function SetupChecklist({ title }: { title: string }) {
  const { steps, done, doneMessage, toggle } = useProgress();
  const count = done.filter(Boolean).length;
  const all = count === steps.length;
  return (
    <section className={s.checklist} aria-label={title}>
      <div className={s.clTop}>
        <div>
          <h4 className={s.clTitle}>{title}</h4>
          <div className={s.clHint}>Tick each step as you finish it.</div>
        </div>
        <div className={s.clCount} aria-live="polite">{count} of {steps.length} done</div>
      </div>
      <div className={s.clBar} role="progressbar" aria-label="Steps done" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={count}>
        <span style={{ width: `${(count / steps.length) * 100}%` }} />
      </div>
      <ul className={s.clTiles}>
        {steps.map((label, i) => (
          <li key={label}>
            <button type="button" className={`${s.clTile} ${done[i] ? s.clOn : ''}`} aria-pressed={done[i]} onClick={() => toggle(i + 1)}>
              <span className={s.clBox} aria-hidden="true">{done[i] && <Check size={13} strokeWidth={3} />}</span>
              <span className={s.clNum} aria-hidden="true">{i + 1}</span>
              <span className={s.clLabel}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
      {all && <div className={s.clDone} role="status">{doneMessage}</div>}
    </section>
  );
}
