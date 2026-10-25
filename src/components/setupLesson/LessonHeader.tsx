import React from 'react';
import { Clock } from 'lucide-react';
import { useInView, useLessonPosition } from '../githubLesson/hooks';
import s from './SetupLesson.module.css';

const WORDS_PER_MINUTE = 200;

type Props = {
  /** The lesson's title. It is the page's only h1. */
  title: string;
  /** Where the lesson applies, for example "🪟 Windows". */
  platform: string;
  /** Words in the page text. The lesson-reading-time plugin fills this in, so the reading time is never typed by hand. */
  proseWords?: string;
  /** Words that live in components instead of the page text. */
  extraWords?: number;
  track?: string;
  /** Decorative animation on the right. It is hidden from assistive technology. */
  art?: React.ReactNode;
  /** A row of cards under the intro, for the choice the intro describes. */
  options?: React.ReactNode;
  /** The intro paragraph. */
  children?: React.ReactNode;
};

/** The card at the top of a setup lesson. The lesson number, the count and the reading time are computed. */
export default function LessonHeader({ title, platform, proseWords = '0', extraWords = 0, track = 'GitHub track', art, options, children }: Props) {
  const { number, total } = useLessonPosition();
  const minutes = Math.max(1, Math.ceil((Number(proseWords) + extraWords) / WORDS_PER_MINUTE));
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  return (
    <div className={s.header} ref={ref} data-seen={seen}>
      <div className={s.hTop}>
        <span className={s.hPill}>Lesson {number} · {track}</span>
        <span className={s.hMeta}><Clock size={14} aria-hidden="true" /> {minutes} min read</span>
        <span className={s.hMeta}>Beginner</span>
        <span className={s.hMeta}>{platform}</span>
      </div>
      <div className={s.hMain}>
        <div className={s.hCopy}>
          <h1 className={s.hTitle}>{title}</h1>
          <div className={s.hIntro}>{children}</div>
        </div>
        {art && <div className={s.hArt} aria-hidden="true">{art}</div>}
      </div>
      {options && <div className={s.hOptions}>{options}</div>}
      <div className={s.track}>
        <div className={s.segs} aria-hidden="true">
          {Array.from({ length: total }, (_, i) => <span key={i} className={i + 1 < number ? s.segPast : i + 1 === number ? s.segOn : s.seg} />)}
        </div>
        <div className={s.trackLabels}>
          <span>You are here</span>
          <span>{total} lessons in the {track}</span>
        </div>
      </div>
    </div>
  );
}
