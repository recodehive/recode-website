import React from 'react';
import { useAuth } from '@clerk/react';
import SignedOutHero from './SignedOutHero';
import SignedInHeader from './SignedInHeader';
import { GlanceSection, JumpIn, NewHereStrip, Skeleton, TopContributors } from './sections';
import styles from './overview.module.css';

/** Dashboard home view: signed-out hero or signed-in header, then the public community sections. */
export default function Overview() {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <div className={styles.page}>
      {!isLoaded ? (
        <Skeleton width="100%" height={260} />
      ) : isSignedIn ? (
        <SignedInHeader />
      ) : (
        <SignedOutHero />
      )}

      <GlanceSection />

      <div className={styles.cols}>
        <TopContributors />
        <JumpIn />
      </div>

      {isLoaded && !isSignedIn && <NewHereStrip />}
    </div>
  );
}
