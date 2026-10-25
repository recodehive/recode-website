import React from 'react';
import { useInView } from '../githubLesson/hooks';
import s from './GitWindows.module.css';

const APPS = [
  { icon: '$_', name: 'Git Bash', text: 'Command line, used most in this course', use: true },
  { icon: '🪟', name: 'Git GUI', text: 'Graphical interface' },
  { icon: '>_', name: 'Git CMD', text: 'Git in the Windows command prompt' },
];

/** The three apps the installer adds. They fade up one after another the first time they scroll into view. */
export default function AppTiles() {
  const [ref, seen] = useInView<HTMLUListElement>(0.3);
  return (
    <ul className={`${s.apps} ${seen ? s.play : ''}`} ref={ref}>
      {APPS.map((a, n) => (
        <li key={a.name} className={`${s.app} ${a.use ? s.appUse : ''}`} style={{ animationDelay: `${n * 120}ms` }}>
          {a.use && <em className={s.appTag}>We use this</em>}
          <span className={s.appIcon} aria-hidden="true">{a.icon}</span>
          <strong>{a.name}</strong>
          <span className={s.appText}>{a.text}</span>
        </li>
      ))}
    </ul>
  );
}
