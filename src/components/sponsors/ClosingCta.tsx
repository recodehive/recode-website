import React from 'react';
import Link from '@docusaurus/Link';
import { SPONSOR_URL } from '../../data/sponsors';
import SponsorBadge from './SponsorBadge';
import styles from './sponsors.module.css';

export default function ClosingCta() {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.ctaBadge}><SponsorBadge size={130} /></div>
      <div className={styles.ctaText}>
        <p className={styles.eyebrowPink}>{'♥'} BACK THE HIVE</p>
        <h2 id="cta-title" className={styles.ctaTitle}>Keep open source learning free for the next developer</h2>
        <p className={styles.sub}>Companies can partner with us for workshops, open source programs and community events.</p>
      </div>
      <div className={styles.ctaButtons}>
        <a className={styles.btnWhite} href={SPONSOR_URL} target="_blank" rel="noopener noreferrer">
          {'♥'} Sponsor on GitHub<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
        <Link className={styles.btnGhost} to="/contact-us">Partner with us {'→'}</Link>
      </div>
    </section>
  );
}
