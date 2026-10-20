import React from 'react';
import { WALL_HANDLES } from './storyData';
import { useInView, useRunning } from './hooks';
import styles from './docsStory.module.css';

function Pill({ handle, hidden }: { handle: string; hidden?: boolean }) {
  return (
    <a
      className={styles.pill}
      href={`https://github.com/${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
    >
      <img
        src={`https://github.com/${handle}.png?size=52`}
        alt=""
        width={26}
        height={26}
        loading="lazy"
        className={styles.pillAvatar}
      />
      <span>@{handle}</span>
      {!hidden && <span className={styles.srOnly}> (opens in a new tab)</span>}
    </a>
  );
}

function Lane({ handles, reverse }: { handles: string[]; reverse?: boolean }) {
  return (
    <div className={styles.lane}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ''}`}>
        {handles.map((h) => <Pill key={h} handle={h} />)}
        {/* Duplicate set makes the loop seamless; hidden from assistive tech and the tab order */}
        {handles.map((h) => <Pill key={`${h}-copy`} handle={h} hidden />)}
      </div>
    </div>
  );
}

export default function ContributorWall() {
  const [ref, inView] = useInView<HTMLElement>(0.1);
  const running = useRunning(inView);
  if (WALL_HANDLES.length === 0) return null;
  const mid = Math.ceil(WALL_HANDLES.length / 2);
  return (
    <section ref={ref} className={`${styles.section} ${running ? styles.running : ''}`}>
      <p className={styles.eyebrow}>{'✦'} THE HIVE</p>
      <h2 className={styles.h2}>Built by these people, and you next</h2>
      <div className={styles.wall}>
        <Lane handles={WALL_HANDLES.slice(0, mid)} />
        <Lane handles={WALL_HANDLES.slice(mid)} reverse />
      </div>
    </section>
  );
}
