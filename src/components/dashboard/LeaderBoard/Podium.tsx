import React, { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from './leaderboardHooks';
import { avatarSrc } from './leaderboardUtils';
import type { Badge } from '../../../data/badges';
import { NameChip } from '../../leaderboard/BadgeChip';
import styles from './leaderboard.module.css';

export type Row = {
  username: string;
  avatar: string;
  profile: string;
  points: number;
  prs: number;
  badgeCount: number;
  topBadge: Badge | null;
};

export const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';

function CountUp({ value, play }: { value: number; play: boolean }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / 1200));
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);
  return <>{shown.toLocaleString('en-US')}</>;
}

function Crown() {
  return (
    <svg className={styles.crown} viewBox="0 0 28 18" width="28" height="18" aria-hidden="true" focusable="false">
      <path d="M2 16 L0 4 L8 9 L14 0 L20 9 L28 4 L26 16 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function Spot({ row, rank, play }: { row: Row | undefined; rank: 1 | 2 | 3; play: boolean }) {
  const cls = rank === 1 ? styles.first : rank === 2 ? styles.second : styles.third;
  const size = rank === 1 ? 92 : 72;
  if (!row) {
    return (
      <div className={`${styles.spot} ${cls}`}>
        <div className={styles.emptyAvatar} style={{ width: size, height: size }} aria-hidden="true">{'\u{1F41D}'}</div>
        <p className={styles.emptyTitle}>This spot is open</p>
        <p className={styles.emptyText}>One level 1 PR gets you here</p>
        <a className={styles.emptyBtn} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
          Find a good first issue<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
        <div className={`${styles.block} ${styles.blockEmpty}`}><span>{rank}</span></div>
      </div>
    );
  }
  return (
    <div className={`${styles.spot} ${cls}`}>
      {rank === 1 && <Crown />}
      <img className={styles.podiumAvatar} src={avatarSrc(row.avatar)} alt="" width={size} height={size} loading="lazy" style={{ width: size, height: size }} />
      <a className={styles.podiumName} href={row.profile} target="_blank" rel="noopener noreferrer">
        @{row.username}<span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
      <p className={styles.podiumPts}><CountUp value={row.points} play={play} /> pts</p>
      <p className={styles.podiumMeta}>
        {row.prs} merged {row.prs === 1 ? 'PR' : 'PRs'}
        {row.topBadge && (
          <> {'\u00B7'} <NameChip badge={row.topBadge} /></>
        )}
      </p>
      <div className={styles.block}><span>{rank}</span></div>
    </div>
  );
}

export default function Podium({ rows, title, range }: { rows: Row[]; title: string; range: string }) {
  const [ref, seen] = useInView<HTMLElement>(0.3, true);
  const reduced = useReducedMotion();
  return (
    <section ref={ref} className={`${styles.podiumCard} ${seen && !reduced ? styles.rise : ''}`} aria-label={`${title} podium`}>
      <header className={styles.cardHead}>
        <h2 className={styles.h2}>{title}</h2>
        <span className={styles.mono}>{range}</span>
      </header>
      <div className={styles.podium}>
        <Spot row={rows[1]} rank={2} play={seen && !reduced} />
        <Spot row={rows[0]} rank={1} play={seen && !reduced} />
        <Spot row={rows[2]} rank={3} play={seen && !reduced} />
      </div>
    </section>
  );
}
