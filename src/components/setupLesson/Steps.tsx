import React from 'react';
import { Check } from 'lucide-react';
import { useProgress } from './progress';
import s from './SetupLesson.module.css';

type Kids = { children?: React.ReactNode };

/** The dashed rail that joins the numbered steps. */
export function StepTimeline({ children }: Kids) {
  return <div className={s.timeline}>{children}</div>;
}

/** A "Mark step as done" button that ticks the given checklist steps together. */
export function MarkDone({ marks, label = 'Mark step as done' }: { marks: number[]; label?: string }) {
  const { done, toggleMany } = useProgress();
  const on = marks.every((n) => done[n - 1]);
  return (
    <button type="button" className={s.markBtn} aria-pressed={on} onClick={() => toggleMany(marks)}>
      <Check size={14} aria-hidden="true" /> {on ? 'Step done' : label}
    </button>
  );
}

/**
 * One step: a numbered circle that sticks while you read, the step's content, and a "Mark step as done" button.
 * `marks` is the list of checklist steps it ticks, and is just this step's own number when left out.
 */
export function Step({ n, marks, children }: Kids & { n: number; marks?: number[] }) {
  const { done, toggleMany } = useProgress();
  const ticks = marks ?? [n];
  const on = ticks.every((t) => done[t - 1]);
  return (
    <section className={`${s.step} ${on ? s.stepDone : ''}`}>
      <div className={s.stepRail}>
        <button type="button" className={s.stepNum} aria-pressed={on} aria-label={`Step ${n}, mark as ${on ? 'not done' : 'done'}`} onClick={() => toggleMany(ticks)}>
          {on ? <Check size={20} strokeWidth={3} aria-hidden="true" /> : n}
        </button>
      </div>
      <div className={s.stepBody}>
        {children}
        <MarkDone marks={ticks} />
      </div>
    </section>
  );
}
