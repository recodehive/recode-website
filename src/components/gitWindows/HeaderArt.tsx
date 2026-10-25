import React from 'react';
import { useInView } from '../githubLesson/hooks';
import s from './GitWindows.module.css';

/** A small Windows-style installer that fills its bar, then shows the three apps and "Git installed". Decorative. */
export function InstallerArt() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div className={`${s.art} ${seen ? s.play : ''}`} ref={ref}>
      <div className={s.artWin}>
        <div className={s.artBar}>
          <span className={s.artIcon} />
          <span>Git Setup</span>
          <span className={s.artX}>✕</span>
        </div>
        <div className={s.artBody}>
          <div className={s.artHead}>Installing</div>
          <div className={s.artSub}>Please wait while Setup installs Git</div>
          <div className={s.artTrack}><span className={s.artFill} /></div>
          <div className={s.artChips}>
            <span>Git Bash</span>
            <span>Git GUI</span>
            <span>Git CMD</span>
          </div>
        </div>
      </div>
      <span className={s.artDone}>✓ Git installed</span>
    </div>
  );
}

/** The choice the intro describes: GitHub Desktop, or the command line this lesson teaches. */
export function ApproachCards() {
  return (
    <div className={s.approach}>
      <div className={`${s.apCard} ${s.apOff}`}>
        <span className={s.apIcon} aria-hidden="true">🖱️</span>
        <span>
          <strong>GitHub Desktop</strong>
          <span className={s.apSub}>Point and click app</span>
        </span>
      </div>
      <div className={`${s.apCard} ${s.apOn}`}>
        <em className={s.apTag}>Recommended</em>
        <span className={`${s.apIcon} ${s.apDark}`} aria-hidden="true">$_</span>
        <span>
          <strong>Command line (Git)</strong>
          <span className={s.apSub}>This tutorial</span>
        </span>
      </div>
    </div>
  );
}
