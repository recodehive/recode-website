import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
export function BadgesCell({ badges }: { badges: Badge[] }) {
  const { openBadge } = useBadges();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // The list is fixed to the viewport, so the table card's scrolling and clipping cannot cut it off.
  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const r = btnRef.current?.getBoundingClientRect();
    if (r) {
      const height = Math.min(280, 44 + badges.length * 40);
      const below = r.bottom + 6 + height <= window.innerHeight - 8;
      setPos({ top: below ? r.bottom + 6 : Math.max(8, r.top - 6 - height), left: Math.max(8, Math.min(r.right - 250, window.innerWidth - 258)) });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open]);

  if (badges.length === 0) return <span className={styles.noBadges}>None yet</span>;
  const top = badges.slice(0, 3);
  const more = badges.length > 3;

  return (
    <div ref={ref} className={styles.badgesCell}>
      <ul className={styles.topBadges} aria-label="Top badges">
        {top.map((b) => (
          <li key={b.id}>
            <button type="button" className={styles.topBadgeBtn} onClick={() => openBadge(b.id)} aria-label={`${b.name}. Open badge details`} title={b.name}>
              <BadgeImage badge={b} size={30} locked={false} showLock={false} />
            </button>
          </li>
        ))}
      </ul>
      <span className={styles.badgeTotal} aria-label={`${badges.length} badges in total`}>{badges.length}</span>
      {more && (
        <button ref={btnRef} type="button" className={styles.moreBtn} aria-expanded={open} aria-label={`Show all ${badges.length} badges`} onClick={toggle}>
          <ChevronDown size={16} aria-hidden="true" className={open ? styles.moreOpen : ''} />
        </button>
      )}
      {open && pos && (
        <ul className={styles.badgePopover} style={{ top: pos.top, left: pos.left }} aria-label="All badges">
          {badges.map((b) => (
            <li key={b.id}>
              <button type="button" onClick={() => { setOpen(false); openBadge(b.id); }}>
                <BadgeImage badge={b} size={28} locked={false} showLock={false} />
                <span>{b.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
