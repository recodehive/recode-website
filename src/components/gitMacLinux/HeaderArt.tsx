import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useInView } from '../githubLesson/hooks';
import { useOs } from './Lesson';
import s from './GitMacLinux.module.css';

const LINES = ['brew install git', 'sudo apt-get install git', 'git --version'];

/** A small terminal that types the install commands, then says Git is ready. Decorative. */
export function TerminalArt() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div className={`${s.art} ${seen ? s.play : ''}`} ref={ref}>
      <div className={s.artWin}>
        <div className={s.artBar}>
          <i /><i /><i />
          <span>terminal</span>
        </div>
        <div className={s.artBody}>
          {LINES.map((line, n) => (
            <div key={line} className={`${s.artLine} ${s[`l${n + 1}`]}`}>
              <b>$</b>
              <span className={s.artTyped} style={{ '--ch': `${line.length}ch`, '--steps': line.length } as React.CSSProperties}>{line}</span>
            </div>
          ))}
          <div className={`${s.artLine} ${s.artReady}`}>✓ Git is ready</div>
        </div>
      </div>
      <div className={s.artPills}>
        <span>🍎 macOS</span>
        <span>🐧 Linux</span>
      </div>
    </div>
  );
}

/** Three cards: macOS, Linux and the Windows lesson. The one that matches the visitor's system is highlighted. */
export function SystemPicker() {
  const { detected } = useOs();
  const { metadata } = useDoc();
  const previous = metadata.previous;
  return (
    <nav className={s.picker} aria-label="Choose your system">
      <a className={`${s.sys} ${detected === 'mac' ? s.sysOn : ''}`} href="#mac">
        <span className={s.sysIcon} aria-hidden="true">🍎</span>
        <span><strong>macOS</strong><span className={s.sysSub}>Homebrew, 3 steps</span></span>
      </a>
      <a className={`${s.sys} ${detected === 'linux' ? s.sysOn : ''}`} href="#linux">
        <em className={s.newTag}>New</em>
        <span className={s.sysIcon} aria-hidden="true">🐧</span>
        <span><strong>Linux</strong><span className={s.sysSub}>One command</span></span>
      </a>
      {previous && (
        <Link className={`${s.sys} ${detected === 'windows' ? s.sysOn : ''}`} to={previous.permalink}>
          <span className={s.sysIcon} aria-hidden="true">🪟</span>
          <span><strong>Windows</strong><span className={s.sysSub}>Previous lesson ↗</span></span>
        </Link>
      )}
    </nav>
  );
}
