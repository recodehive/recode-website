import React from 'react';
import { useInView } from '../githubLesson/hooks';
import s from './GitMacLinux.module.css';

// The ids are the anchors of the four old "1. Install Via Homebrew" style headings
const WAYS = [
  { id: '1-install-via-homebrew', icon: '🍺', name: 'Install via Homebrew', text: 'A package manager for Mac. One command installs Git and keeps it updated.', used: true },
  { id: '2-xcode-approach', icon: '🛠️', name: 'Xcode approach', text: <>Install Apple’s Command Line Tools, which include Git: <code>xcode-select --install</code></> },
  { id: '3-binary-installer', icon: '📦', name: 'Binary installer', text: 'Download an installer package and click through it.' },
  { id: '4-building-from-source', icon: '⚙️', name: 'Building from source', text: 'Compile Git yourself. For advanced users.' },
];

/** The four ways to install Git on a Mac. The cards fade up one after another the first time they scroll into view. */
export default function InstallWays() {
  const [ref, seen] = useInView<HTMLDivElement>(0.25);
  return (
    <div className={`${s.ways} ${seen ? s.play : ''}`} ref={ref}>
      {WAYS.map((w, n) => (
        <div key={w.id} className={`${s.way} ${w.used ? s.wayUsed : ''}`} style={{ animationDelay: `${n * 110}ms` }}>
          {w.used && <em className={s.usedTag}>Used in this guide</em>}
          <span className={s.wayIcon} aria-hidden="true">{w.icon}</span>
          <h4 id={w.id} className={s.wayName}><span className={s.wayNum}>{n + 1}.</span> {w.name}</h4>
          <div className={s.wayText}>{w.text}</div>
        </div>
      ))}
    </div>
  );
}
