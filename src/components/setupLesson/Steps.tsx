import React from 'react';
import { Check } from 'lucide-react';
import { useProgress } from './progress';
import s from './SetupLesson.module.css';

type Kids = { children?: React.ReactNode };

/** The dashed rail that joins the numbered steps. */
export function StepTimeline({ children }: Kids) {
  return <div className={s.timeline}>{children}</div>;
}

/** One step: a numbered circle that sticks while you read, the step's content, and a "Mark step as done" button. */
export function Step({ n, children }: Kids & { n: number }) {
  const { done, toggle } = useProgress();
  const on = Boolean(done[n - 1]);
  return (
    <section className={`${s.step} ${on ? s.stepDone : ''}`}>
      <div className={s.stepRail}>
        <button type="button" className={s.stepNum} aria-pressed={on} aria-label={`Step ${n}, mark as ${on ? 'not done' : 'done'}`} onClick={() => toggle(n)}>
          {on ? <Check size={20} strokeWidth={3} aria-hidden="true" /> : n}
        </button>
      </div>
      <div className={s.stepBody}>
        {children}
        <button type="button" className={s.markBtn} aria-pressed={on} onClick={() => toggle(n)}>
          <Check size={14} aria-hidden="true" /> {on ? 'Step done' : 'Mark step as done'}
        </button>
      </div>
    </section>
  );
}
