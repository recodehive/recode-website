import React from 'react';
import { GOOD_FIRST_ISSUES, SETUP_ANCHOR } from './storyData';
import styles from './docsStory.module.css';

export default function CtaBand() {
  return (
    <section className={styles.cta}>
      <div>
        <p className={styles.eyebrowCta}>{'✦'} YOUR TURN</p>
        <h2 className={styles.ctaTitle}>Every hexagon in the hive started with one PR.</h2>
        <p className={styles.ctaText}>Set up the repo in 10 minutes, then pick a good first issue.</p>
      </div>
      <div className={styles.ctaButtons}>
        <a className={styles.btnGhost} href={SETUP_ANCHOR}>Set up locally {'↓'}</a>
        <a className={styles.btnWhite} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
          Good first issues {'→'}
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
