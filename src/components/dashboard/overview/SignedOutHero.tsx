import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { SignInButton } from '@clerk/react';
import FloatingContributors from '../../FloatingContributors';
import { useHalloween } from '../../Halloween/useHalloween';
import styles from './overview.module.css';

export const GithubMark = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export default function SignedOutHero() {
  const halloween = useHalloween();
  const [showCard, setShowCard] = useState(true);

  return (
    <section className={`${styles.card} ${styles.hero}`} aria-labelledby="dash-heading">
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>✦ COMMUNITY DASHBOARD</p>
        <h1 id="dash-heading" className={styles.h1}>
          Track your open source journey with <span className={styles.accent}>the hive</span>
        </h1>
        <p className={styles.lead}>
          Sign in with GitHub to see your merged PRs, contribution streak and leaderboard rank. Community stats below are public.
        </p>
        <div className={styles.actions}>
          <SignInButton mode="modal">
            <button type="button" className={styles.btnPrimary}>
              <GithubMark /> Sign in with GitHub
            </button>
          </SignInButton>
          <Link className={styles.btnOutline} to="/dashboard#leaderboard">Browse the leaderboard</Link>
        </div>
      </div>
      {showCard && (
        <div className={styles.heroCard}>
          <FloatingContributors headerEmbedded halloween={halloween} onClose={() => setShowCard(false)} />
        </div>
      )}
    </section>
  );
}
