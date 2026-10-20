import React from 'react';
import { certifications, earnable, highlights, retired } from '../../../data/githubBadges';
import styles from '../github-badges.module.css';

const quickdraw = earnable.find((b) => b.id === 'quickdraw');
const starstruck = earnable.find((b) => b.id === 'starstruck');

function Pill({ label, src, className }: { label: string; src: string; className: string }) {
  return (
    <a className={`${styles.pill} ${className}`} href="#earnable" aria-hidden="true" tabIndex={-1}>
      <img src={src} alt="" width={28} height={28} />
      {label}
    </a>
  );
}

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const covered = earnable.length + highlights.length + retired.length;
  const stats = [
    { value: covered, label: 'Badges covered' },
    { value: earnable.length, label: 'Earnable today' },
    { value: certifications.length, label: 'Certifications' },
  ];

  return (
    <section className={styles.hero} aria-labelledby="badges-heading">
      <div className={styles.heroGlowA} aria-hidden="true" />
      <div className={styles.heroGlowB} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />

      {quickdraw && <Pill label="Quickdraw" src={quickdraw.image} className={styles.pillLeft} />}
      {starstruck && <Pill label="Starstruck" src={starstruck.image} className={styles.pillRight} />}
      {starstruck && (
        <>
          <img className={`${styles.coin} ${styles.coinA}`} src={starstruck.tierImages[1]} alt="" aria-hidden="true" width={32} height={32} />
          <img className={`${styles.coin} ${styles.coinB}`} src={starstruck.tierImages[2]} alt="" aria-hidden="true" width={30} height={30} />
          <img className={`${styles.coin} ${styles.coinC}`} src={starstruck.tierImages[3]} alt="" aria-hidden="true" width={34} height={34} />
        </>
      )}

      <div className={styles.heroInner}>
        <span className={styles.heroPill}>✨ OPEN SOURCE MILESTONES &amp; ACHIEVEMENTS</span>
        <h1 id="badges-heading" className={styles.heroTitle}>
          GitHub Achievement <span className={styles.heroAccent}>Badges</span>
        </h1>
        <p className={styles.heroSub}>
          What each badge asks for, the count for every tier, and a practice repo where your first merged PR counts. A community guide to levelling up your open source profile.
        </p>
        <button type="button" className={styles.heroBtn} onClick={onExplore}>
          Explore all badges <span aria-hidden="true">↓</span>
        </button>
        <div className={styles.heroStats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.heroStat}>
              <span className={styles.heroStatValue}>{s.value}</span>
              <span className={styles.heroStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
