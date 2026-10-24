import React from 'react';
import { Cloud, Laptop } from 'lucide-react';
import { GIT_VS_GITHUB as D } from './lessonData';
import { useInView } from './hooks';
import s from './GithubLesson.module.css';

/** Git (tool) versus GitHub (website), with push and pull blocks travelling between them. */
export default function GitVsGitHub() {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div className={`${s.vs} ${s.reveal} ${seen ? s.in : ''}`} ref={ref}>
      <div className={s.label}>{D.label}</div>
      <div className={s.vsRow}>
        <div className={s.vsCard}>
          <span className={`${s.vsIcon} ${s.vsOrange}`} aria-hidden="true"><Laptop size={26} /></span>
          <h4>{D.git.name}</h4>
          <span className={s.vsWhere}>{D.git.where}</span>
          <p>{D.git.text}</p>
        </div>
        <div className={s.lane} aria-hidden="true">
          <span className={s.laneUp}>{D.push} ↑</span>
          <div className={s.laneTrack}>
            <span className={s.laneBlock} />
            <span className={`${s.laneBlock} ${s.laneBlock2}`} />
            <span className={s.laneBack} />
          </div>
          <span className={s.laneDown}>↓ {D.pull}</span>
        </div>
        <div className={s.vsCard}>
          <span className={`${s.vsIcon} ${s.vsGreen}`} aria-hidden="true"><Cloud size={26} /></span>
          <h4>{D.github.name}</h4>
          <span className={s.vsWhere}>{D.github.where}</span>
          <p>{D.github.text}</p>
        </div>
      </div>
      <div className={s.remember}><strong>{D.remember}</strong> {D.rememberText}</div>
    </div>
  );
}
