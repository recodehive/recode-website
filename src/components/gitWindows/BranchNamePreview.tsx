import React from 'react';
import { useInView } from '../githubLesson/hooks';
import s from './GitWindows.module.css';

/** The two branch-name options, with "main" typing itself into the one to pick. Decorative: the paragraph above says the same. */
export default function BranchNamePreview() {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  return (
    <div className={`${s.branch} ${seen ? s.play : ''}`} ref={ref} aria-hidden="true">
      <div className={`${s.brRow} ${s.brOff}`}>
        <span className={s.brRadio} />
        <span className={s.brName}>Let Git decide</span>
      </div>
      <div className={`${s.brRow} ${s.brOn}`}>
        <span className={`${s.brRadio} ${s.brRadioOn}`} />
        <span className={s.brName}>Override the default branch name</span>
        <span className={s.brInput}>
          <span className={s.brTyped}>main</span>
          <i className={s.brCursor} />
        </span>
        <em className={s.brTag}>Pick this one</em>
      </div>
    </div>
  );
}
