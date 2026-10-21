import React from 'react';
import { ChevronRight } from 'lucide-react';
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

/**
 * Table cell: the contributor's three best badges, the total on the right and, when there are more
 * than three, an arrow that opens the full list.
 */
export function BadgesCell({ badges, login }: { badges: Badge[]; login: string }) {
  const { openBadge } = useBadges();
  if (badges.length === 0) return <span className={styles.noBadges}>None yet</span>;
  // Up to four badges; more than that opens the full list from the arrow.
  const top = badges.slice(0, 4);
  const more = badges.length > 4;

  return (
    <div className={styles.badgesCell}>
      <ul className={styles.topBadges} aria-label="Top badges">
        {top.map((b) => (
          <li key={b.id}>
            <button type="button" className={styles.topBadgeBtn} onClick={() => openBadge(b.id, login)} aria-label={`${b.name}. Open badge details`} title={b.name}>
              <BadgeImage badge={b} size={30} locked={false} showLock={false} />
            </button>
          </li>
        ))}
      </ul>
      {more && (
        <button type="button" className={styles.moreBtn} aria-haspopup="dialog" aria-label={`Show all ${badges.length} badges`} onClick={() => openBadge(badges[0].id, login)}>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
