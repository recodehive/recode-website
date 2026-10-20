import React from 'react';
import type { Badge } from '../../data/badges';
import BadgeImage from './BadgeImage';
import { useBadges } from './BadgeContext';
import styles from './badges.module.css';

/** Dark pill with the contributor's highest milestone badge. Opens the badge in the modal. */
export function NameChip({ badge }: { badge: Badge | null }) {
  const { openBadge } = useBadges();
  if (!badge) return null;
  return (
    <button type="button" className={styles.chip} onClick={() => openBadge(badge.id)} aria-label={`${badge.name}. Open badge details`}>
      <BadgeImage badge={badge} size={20} locked={false} showLock={false} />
      {badge.name}
    </button>
  );
}

/** Compact pill with the number of badges earned, for the table. */
export function CountChip({ badge, count }: { badge: Badge | null; count: number }) {
  const { openBadge } = useBadges();
  if (!badge || count === 0) return null;
  return (
    <button
      type="button"
      className={`${styles.chip} ${styles.chipCount}`}
      onClick={() => openBadge(badge.id)}
      aria-label={`${count} ${count === 1 ? 'badge' : 'badges'}, highest ${badge.name}. Open badge details`}
    >
      {count}
    </button>
  );
}
