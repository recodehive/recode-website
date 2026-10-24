import React from 'react';
import { Clock } from 'lucide-react';
import { HEADER, LESSON_COPY_WORDS } from './lessonData';
import { useInView, useLessonPosition } from './hooks';
import s from './GithubLesson.module.css';

const WORDS_PER_MINUTE = 200;

/** Commit graph: a main line, a feature branch that draws itself, and a merge. 200 x 120. */
function CommitGraph({ play }: { play: boolean }) {
  return (
    <svg className={`${s.graph} ${play ? s.play : ''}`} viewBox="0 0 200 120" width="200" height="120" aria-hidden="true" focusable="false">
      <path className={s.gMain} d="M20 84 H178" pathLength={1} />
      <path className={s.gBranch} d="M62 84 C74 84 78 40 94 40 H128 C144 40 148 84 160 84" pathLength={1} />
      <circle className={`${s.gDot} ${s.gd1}`} cx="20" cy="84" r="5" />
      <circle className={`${s.gDot} ${s.gd2}`} cx="62" cy="84" r="5" />
      <circle className={`${s.gDot} ${s.gd3}`} cx="94" cy="40" r="5" />
      <circle className={`${s.gDot} ${s.gd4}`} cx="128" cy="40" r="5" />
      <circle className={`${s.gDot} ${s.gd5}`} cx="160" cy="84" r="5" />
      <circle className={`${s.gDot} ${s.gMerged}`} cx="180" cy="84" r="7" />
      <text className={s.gLabel} x="20" y="104" textAnchor="middle">start</text>
      <text className={s.gLabel} x="111" y="26" textAnchor="middle">feature branch</text>
      <text className={s.gLabel} x="180" y="106" textAnchor="middle">merged</text>
    </svg>
  );
}

/** The card at the top of the lesson. Lesson number, count and reading time are computed, never typed in. */
export default function LessonHeader({ proseWords = '0' }: { proseWords?: string }) {
  const { number, total } = useLessonPosition();
  const minutes = Math.max(1, Math.ceil((Number(proseWords) + LESSON_COPY_WORDS) / WORDS_PER_MINUTE));
  const [ref, seen] = useInView<HTMLElement>(0.2);
  return (
    <header className={s.header} ref={ref}>
      <div className={s.hTop}>
        <span className={s.hPill}>Lesson {number} · {HEADER.track}</span>
        <span className={s.hMeta}><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
        <span className={s.hMeta}>{HEADER.level}</span>
      </div>
      <div className={s.hMain}>
        <div className={s.hCopy}>
          <h1 className={s.hTitle}>Introduction of GitHub</h1>
          <p className={s.hIntro}>{HEADER.introA} {minutes} {HEADER.introB}</p>
        </div>
        <CommitGraph play={seen} />
      </div>
      <div className={s.track}>
        <div className={s.segs} aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <span key={i} className={i + 1 === number ? s.segOn : s.seg} />)}
        </div>
        <div className={s.trackLabels}>
          <span>{HEADER.here}</span>
          <span>{total} lessons in the {HEADER.track}</span>
        </div>
      </div>
    </header>
  );
}
