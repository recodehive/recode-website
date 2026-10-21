import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { BADGES, GROUP_COPY, GROUP_ORDER, PATH_PRS, type Badge } from '../../data/badges';
import { getClosestLocked, getProgress, getRarestEarned, getUserBadges, isUnlocked, type BadgeStats } from '../../utils/badges';
import BadgeImage from './BadgeImage';
import styles from './badges.module.css';

type Filter = 'all' | 'unlocked' | 'locked';

const EMPTY_STATS: BadgeStats = { prs: 0, points: 0, rank: null };

/** Tier colours and a staggered delay for one card. Only used for glows, borders and tags. */
function tierVars(b: Badge, index: number): React.CSSProperties {
  return {
    '--c': b.tier.light,
    '--d': b.tier.dark,
    '--g': b.tier.rgb,
    '--dl': `${(index * 0.35).toFixed(2)}s`,
  } as React.CSSProperties;
}

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  signedIn: boolean;
  stats: BadgeStats;
  /** GitHub login when the popup shows another contributor's badges. */
  subject?: string | null;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function BadgeModal({ selectedId, onSelect, onClose, signedIn, stats, subject = null }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const selected = BADGES.find((b) => b.id === selectedId) ?? BADGES[0];
  const { count, total } = getUserBadges(stats);
  const unlockedCount = signedIn ? count : 0;
  const unlockedOf = (b: Badge) => signedIn && isUnlocked(b, stats);
  const selectedUnlocked = unlockedOf(selected);
  const progress = getProgress(selected, stats);
  const eff = signedIn ? stats : EMPTY_STATS;
  const rarest = signedIn ? getRarestEarned(stats) : null;
  const nextUp = getClosestLocked(eff);
  const nextProgress = nextUp ? getProgress(nextUp, eff) : null;

  // Focus the dialog, lock page scroll, close on Escape and keep Tab inside.
  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Pause the effects on cards that are scrolled out of view.
  useEffect(() => {
    const root = dialogRef.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).dataset.off = e.isIntersecting ? 'false' : 'true';
    });
    root.querySelectorAll<HTMLElement>('[data-fx="true"]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  const visible = useMemo(
    () => BADGES.filter((b) => (filter === 'all' ? true : filter === 'unlocked' ? unlockedOf(b) : !unlockedOf(b))),
    [filter, signedIn, stats],
  );

  const pathBadges = PATH_PRS.map((n) => BADGES.find((b) => b.metric === 'prs' && b.threshold === n)).filter(
    (b): b is Badge => Boolean(b),
  );
  const showPath = selected.metric === 'prs';

  const modal = (
    <div className={styles.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={styles.panel} role="dialog" aria-modal="true" aria-labelledby="badge-modal-title">
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close badge collection">
          <X size={16} aria-hidden="true" />
        </button>
        <p className={styles.kicker}>{'✦'} ACHIEVEMENT BADGE SYSTEM</p>
        <h2 id="badge-modal-title" className={styles.modalTitle}>
          {subject ? `@${subject} has ${count} of ${total} badges` : signedIn ? `${count} of ${total} badges unlocked` : `${total} badges to earn`}
        </h2>
        <p className={styles.modalSub}>
          From the first merged PR to the top of the leaderboard.
          {!signedIn && ' Sign in with GitHub to track your badges.'}
        </p>

        <div aria-live="polite" aria-atomic="true">
        <section key={selected.id} className={`${styles.detail} ${selectedUnlocked ? styles.detailEarned : ''}`} style={tierVars(selected, 0)} aria-label={`${selected.name} details`}>
          <div className={styles.bigBadge}>
            <BadgeImage badge={selected} size={170} locked={!selectedUnlocked} eager showLock fx={selectedUnlocked} className={styles.bigFx} />
          </div>
          <div className={styles.detailText}>
            <p className={styles.groupLine}>
              <span className={styles.groupName}>{GROUP_COPY[selected.group].title}</span>
              <span className={`${styles.status} ${selectedUnlocked ? styles.statusOn : ''}`}>{selectedUnlocked ? 'Unlocked' : 'Locked'}</span>
            </p>
            <h3 className={styles.detailName}>{selected.name}</h3>
            <p className={styles.detailDesc}>{selected.description}</p>
            <p className={styles.criteria}>Criteria: <strong>{selected.criteria}</strong></p>
            {signedIn ? (
              <div className={styles.progress}>
                <div className={styles.progressRow}>
                  <span>{subject ? 'Progress' : 'Your progress'}</span>
                  <span>{progress.label}</span>
                </div>
                <div className={styles.progressBar} role="progressbar" aria-label="Progress toward this badge" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress.pct)}>
                  <span style={{ '--w': `${progress.pct}%` } as React.CSSProperties} />
                </div>
              </div>
            ) : (
              <p className={styles.progressRow}><span>Sign in to see your progress</span></p>
            )}
          </div>
        </section>
        </div>

        {showPath && (
          <ol className={styles.path} aria-label="Contribution path">
            {pathBadges.map((b, i) => {
              const reached = signedIn && stats.prs >= b.threshold;
              const next = pathBadges[i + 1];
              const lineOn = signedIn && next ? stats.prs >= next.threshold : false;
              return (
                <li key={b.id} className={`${styles.pathNode} ${reached ? styles.pathReached : ''} ${b.id === selected.id ? styles.pathSelected : ''}`}>
                  <button type="button" onClick={() => onSelect(b.id)} aria-label={`${b.name}, ${b.threshold} merged PRs`}>
                    <BadgeImage badge={b} size={48} locked={!reached} showLock={false} />
                  </button>
                  <span className={styles.pathNum}>{b.threshold}</span>
                  {next && <span className={`${styles.pathLine} ${lineOn ? styles.pathLineOn : ''}`} aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
        )}

        <div className={styles.summary}>
          <div className={styles.sumCount}>
            <strong>{unlockedCount}<span> / {total}</span></strong>
            <span className={styles.sumLabel}>BADGES UNLOCKED</span>
          </div>
          <ol className={styles.segments} aria-label={`${unlockedCount} of ${total} badges unlocked`}>
            {BADGES.map((b) => {
              const on = unlockedOf(b);
              return (
                <li
                  key={b.id}
                  className={on ? styles.segOn : styles.seg}
                  style={on ? ({ '--c': b.tier.light, '--d': b.tier.dark, '--g': b.tier.rgb } as React.CSSProperties) : undefined}
                  title={`${b.name}: ${on ? 'earned' : 'locked'}`}
                />
              );
            })}
          </ol>
          <div className={styles.sumNext}>
            <span className={styles.sumLabel}>NEXT UP</span>
            {nextUp ? (
              <p>
                <strong>{nextUp.name}</strong> at {nextUp.criteria}
                {nextProgress && <span> ({nextProgress.label})</span>}
              </p>
            ) : (
              <p><strong>All badges unlocked</strong></p>
            )}
          </div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Filter badges">
          {(['all', 'unlocked', 'locked'] as Filter[]).map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} className={`${styles.tab} ${filter === f ? styles.tabOn : ''}`} onClick={() => setFilter(f)}>
              {f === 'unlocked' && <span className={styles.liveDot} aria-hidden="true" />}
              {f[0].toUpperCase() + f.slice(1)}{' '}
              <span className={styles.tabCount}>{f === 'all' ? total : f === 'unlocked' ? unlockedCount : total - unlockedCount}</span>
            </button>
          ))}
        </div>

        <div className={styles.groups}>
          {filter === 'unlocked' && visible.length === 0 && (
            <p className={styles.emptyState}>No badges unlocked yet. Your first merged recode PR unlocks First Contribution.</p>
          )}
          {GROUP_ORDER.map((g) => {
            const items = visible.filter((b) => b.group === g);
            if (items.length === 0) return null;
            return (
              <section key={g} aria-label={GROUP_COPY[g].title}>
                <div className={styles.groupHead}>
                  <h3 className={styles.groupHeading}>
                    {GROUP_COPY[g].title} <span>{GROUP_COPY[g].subtitle}</span>
                  </h3>
                  <span className={styles.groupCount}>
                    {BADGES.filter((b) => b.group === g && unlockedOf(b)).length} of {BADGES.filter((b) => b.group === g).length} earned
                  </span>
                </div>
                <ul className={styles.tiles}>
                  {items.map((b) => {
                    const on = unlockedOf(b);
                    const isRarest = rarest?.id === b.id;
                    return (
                      <li key={b.id}>
                        <button
                          type="button"
                          className={`${styles.tile} ${on ? styles.tileEarned : styles.tileLocked} ${isRarest ? styles.tileRarest : ''} ${b.id === selected.id ? styles.tileOn : ''}`}
                          style={tierVars(b, BADGES.indexOf(b))}
                          data-fx={on ? 'true' : 'false'}
                          aria-pressed={b.id === selected.id}
                          onClick={() => onSelect(b.id)}
                        >
                          {isRarest && <span className={styles.rareBg} aria-hidden="true" />}
                          <span className={`${styles.tag} ${on ? styles.tagOn : ''}`}>{on ? '\u2713 EARNED' : 'LOCKED'}</span>
                          <BadgeImage badge={b} size={72} locked={!on} fx={on} />
                          <span className={styles.tileName}>{b.name}</span>
                          <span className={styles.tileCrit}>{b.criteria}</span>
                          {isRarest && <span className={styles.rarePill}>RAREST EARNED</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <ul className={styles.legend} aria-label="Legend">
          <li><span className={styles.swEarned} aria-hidden="true" /> Earned: tier colour, glow, shine</li>
          <li><span className={styles.swLocked} aria-hidden="true" /> Locked: grey, dashed, lock</li>
          <li><span className={styles.swRare} aria-hidden="true" /> Rarest earned: animated border</li>
        </ul>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
