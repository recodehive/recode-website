import React from 'react';
import { BADGES } from '../../data/badges';
import { getNextBadge, getUserBadges, isUnlocked, type BadgeStats } from '../../utils/badges';
import BadgeImage from './BadgeImage';
import { useBadges } from './BadgeContext';
import styles from './badges.module.css';

const SHORT: Record<string, string> = {
  'first-contribution': 'First',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
};
const RAIL_IDS = ['first-contribution', 'bronze', 'silver', 'gold'];
const NO_STATS: BadgeStats = { prs: 0, points: 0, rank: null };

export default function BadgeRail() {
  const { signedIn, viewerStats, openBadge } = useBadges();
  const stats = viewerStats ?? NO_STATS;
  const { count, total } = getUserBadges(stats);
  const railBadges = RAIL_IDS.map((id) => BADGES.find((b) => b.id === id)!).filter(Boolean);
  const startId = signedIn ? (getNextBadge(stats) ?? BADGES[0]).id : BADGES[0].id;

  return (
    <section className={styles.rail} aria-labelledby="badge-rail-title">
      <div className={styles.railHead}>
        <h2 id="badge-rail-title" className={styles.railTitle}>Badges</h2>
        <span className={styles.railCount}>{signedIn ? `${count} of ${total} unlocked` : `${total} to earn`}</span>
      </div>
      <div
        className={styles.railBar}
        role="progressbar"
        aria-label="Badges unlocked"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={signedIn ? count : 0}
      >
        <span style={{ width: `${signedIn ? (count / total) * 100 : 0}%` }} />
      </div>
      {!signedIn && <p className={styles.railHint}>Sign in with GitHub to track your badges.</p>}
      <ul className={styles.railRow}>
        {railBadges.map((b) => {
          const unlocked = signedIn && isUnlocked(b, stats);
          return (
            <li key={b.id}>
              <button
                type="button"
                className={styles.railBadge}
                onClick={() => openBadge(b.id)}
                aria-label={`${b.name}, ${unlocked ? 'unlocked' : 'locked'}. Criteria: ${b.criteria}`}
              >
                <BadgeImage badge={b} size={56} locked={!unlocked} />
                <span className={styles.railName}>{SHORT[b.id] ?? b.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className={styles.railLink} onClick={() => openBadge(startId)}>
        See all {total} badges and how to earn them {'→'}
      </button>
    </section>
  );
}
