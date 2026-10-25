import React from 'react';
import { useInView } from '../githubLesson/hooks';
import s from './GithubAccount.module.css';

/** A small sign-up form: a username types itself in, the button fills, then "Account created" pops in. Decorative. */
export default function AccountArt() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div className={`${s.art} ${seen ? s.play : ''}`} ref={ref}>
      <div className={s.win}>
        <div className={s.bar}>
          <i /><i /><i />
          <span>Sign up</span>
        </div>
        <div className={s.body}>
          <span className={s.avatar} />
          <span className={s.label}>Username</span>
          <span className={s.field}>
            <span className={s.typed}>your-username</span>
            <b className={s.cursor} />
          </span>
          <span className={s.label}>Email</span>
          <span className={s.field}><span className={s.ghost} /></span>
          <span className={s.btn}>Create account</span>
        </div>
      </div>
      <span className={s.done}>✓ Account created</span>
    </div>
  );
}
