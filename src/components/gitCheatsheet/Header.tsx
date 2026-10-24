import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { COMMANDS, GROUPS } from '../../data/gitCommands';
import s from './GitCheatsheet.module.css';

const LINES = ['git add .', 'git commit -m "first commit"', 'git push -u origin main'];

/** The card at the top of the page: title, intro and a terminal that types three commands once. */
export default function CheatsheetHeader() {
  const { metadata } = useDoc();
  return (
    <header className={s.header}>
      <div className={s.hCopy}>
        <div className={s.hTop}>
          <span className={s.hPill}>Cheatsheet</span>
          <span className={s.hMeta}>{COMMANDS.length} commands</span>
          <span className={s.hMeta}>{GROUPS.length} groups</span>
          <span className={s.hMeta}>Click to copy</span>
        </div>
        <h1 className={s.hTitle}>{metadata.title}</h1>
        <p className={s.hIntro}>
          The Git commands you will use every day, grouped by what they do. Copy any command with one click, and see where it moves your files.
        </p>
      </div>
      <div className={s.term} aria-hidden="true">
        <div className={s.termBar}><i /><i /><i /><span>terminal</span></div>
        <div className={s.termBody}>
          {LINES.map((l, i) => (
            <div key={l} className={s.termLine}>
              <span className={s.termPrompt}>$</span>
              <span className={s.termTyped} style={{ ['--chars' as string]: l.length, animationDelay: `${0.4 + i * 1.5}s` }}>{l}</span>
            </div>
          ))}
          <div className={s.termOk}>✓ main → origin/main</div>
        </div>
      </div>
    </header>
  );
}
