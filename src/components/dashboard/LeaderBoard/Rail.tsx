import React from 'react';
import { SignInButton } from '@clerk/react';
import { BADGE_CONFIG } from './badgeConfig';
import { MIN_BOARD_POINTS, NO_LEVEL_POINTS, POINT_LEVELS, REQUIRED_LABEL } from './pointsConfig';
import { avatarSrc, describeBadge } from './leaderboardUtils';
import { GOOD_FIRST_ISSUES, type Row } from './Podium';
import styles from './leaderboard.module.css';

export type Viewer = { login: string; imageUrl: string } | null;

type YourRankProps = {
  viewer: Viewer;
  canSignIn: boolean;
  rows: Row[];
  periodWord: string;
  viewerBadges: number;
};

export function YourRank({ viewer, canSignIn, rows, periodWord, viewerBadges }: YourRankProps) {
  if (!viewer) {
    return (
      <section className={`${styles.railDark} ${styles.darkGrid}`}>
        <h2 className={styles.railDarkTitle}>Your rank</h2>
        <p className={styles.darkText}>Sign in with GitHub to see your rank, your points and your badges.</p>
        {canSignIn ? (
          <SignInButton mode="modal">
            <button type="button" className={styles.railBtn}>Sign in with GitHub</button>
          </SignInButton>
        ) : (
          <a className={styles.railBtn} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
            Find your first recode issue {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        )}
      </section>
    );
  }

  const idx = rows.findIndex((r) => r.username.toLowerCase() === viewer.login.toLowerCase());
  const me = idx >= 0 ? rows[idx] : null;
  const next = idx > 0 ? rows[idx - 1] : null;
  const pts = me?.points ?? 0;

  let progressText: string;
  let progress: number;
  if (!me) {
    progressText = `${MIN_BOARD_POINTS} pts to join the board`;
    progress = 0;
  } else if (next) {
    progressText = `${next.points - me.points} pts to pass @${next.username}`;
    progress = next.points > 0 ? me.points / next.points : 0;
  } else {
    progressText = 'You lead the board';
    progress = 1;
  }

  return (
    <section className={`${styles.railDark} ${styles.darkGrid}`}>
      <h2 className={styles.railDarkTitle}>Your rank</h2>
      <div className={styles.meRow}>
        <img className={styles.meAvatar} src={avatarSrc(viewer.imageUrl)} alt="" width={44} height={44} loading="lazy" />
        <div>
          <p className={styles.meName}>@{viewer.login}</p>
          <p className={styles.meRank}>{me ? `Rank #${idx + 1} ${periodWord}` : 'Not ranked yet'}</p>
        </div>
      </div>
      <div className={styles.meProgress}>
        <span>{pts} pts</span>
        <span>{progressText}</span>
      </div>
      <div className={styles.meBar} aria-hidden="true"><span style={{ width: `${Math.max(2, Math.min(100, progress * 100))}%` }} /></div>
      <p className={styles.meStats}>
        <span>{'\u{1F3C5}'} Badges <strong>{viewerBadges}</strong></span>
      </p>
      <a className={styles.railBtn} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
        {me ? 'Find your next issue' : 'Find your first recode issue'} {'→'}
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    </section>
  );
}

export function HowToEarn() {
  return (
    <section id="how-points-work" className={styles.railCard}>
      <h2 className={styles.railTitle}>How to earn points</h2>
      <p className={styles.railText}>
        A merged PR counts when it carries the <strong>{REQUIRED_LABEL}</strong> label and one level label.
      </p>
      <ul className={styles.levels}>
        {POINT_LEVELS.map((l) => (
          <li key={l.label}>
            <span className={`${styles.levelChip} ${styles[l.tone]}`}>{l.label}</span>
            <span className={styles.levelDesc}>{l.description}</span>
            <span className={styles.levelPts}>+{l.points}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>PRs without a level label earn {NO_LEVEL_POINTS} points.</p>
      <h3 className={styles.subTitle}>Badges</h3>
      <ul className={styles.badgeList}>
        {BADGE_CONFIG.map((b) => (
          <li key={b.name}>
            <span>{b.name}</span>
            <span className={styles.mono}>{describeBadge(b)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HiveActivity({ chip, contributors, prs, points }: { chip: string; contributors: number; prs: number; points: number }) {
  return (
    <section className={styles.railCard}>
      <div className={styles.activityHead}>
        <h2 className={styles.railTitle}>Hive activity</h2>
        <span className={styles.periodChip}>{chip}</span>
      </div>
      <div className={styles.activityGrid}>
        <div><strong>{contributors.toLocaleString('en-US')}</strong><span>Contributors</span></div>
        <div><strong>{prs.toLocaleString('en-US')}</strong><span>Merged PRs</span></div>
        <div><strong>{points.toLocaleString('en-US')}</strong><span>Total points</span></div>
      </div>
    </section>
  );
}
