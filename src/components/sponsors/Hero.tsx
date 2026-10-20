import React, { useEffect, useMemo, useState } from 'react';
import { GITHUB_SPONSOR_TOTAL, MONTHLY_GOAL_USD, SPONSORS, SPONSOR_URL, WE_SPONSOR, linkedinUrl } from '../../data/sponsors';
import { useInView, useReducedMotion } from '../docsStory/hooks';
import Avatar from './Avatar';
import { useBurst } from './Burst';
import SponsorBadge from './SponsorBadge';
import styles from './sponsors.module.css';

function CountUp({ value, prefix = '', play }: { value: number; prefix?: string; play: boolean }) {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / 1200));
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);
  return <>{prefix}{shown.toLocaleString('en-US')}</>;
}

function HeartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6 5.5c2 0 3.4 1.2 4 2.4.6-1.2 2-2.4 4-2.4 3 0 4.8 3.1 3.5 6.3C19.5 16.4 12 21 12 21z" fill="#db2777" />
    </svg>
  );
}

export const FEATURED = SPONSORS.filter((p) => p.linkedin && (p.github || p.avatar)).slice(0, 6);

export default function Hero({ onSeeWho }: { onSeeWho: () => void }) {
  const [statsRef, seen] = useInView<HTMLDivElement>(0.4, true);
  const reduced = useReducedMotion();
  const burst = useBurst();
  const strip = useMemo(() => FEATURED, []);

  return (
    <section className={styles.hero} aria-labelledby="sponsors-title">
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>{'✦'} SPONSORS</p>
        <h1 id="sponsors-title" className={styles.h1}>
          Fund the hive.<br />
          <span className={styles.gradientText}>Keep learning free.</span>
        </h1>
        <p className={styles.lede}>
          Every course, guide and video on recode hive is free, with no paywall. Sponsors cover the cost, and we pass it forward: we sponsor {WE_SPONSOR.length} open source developers and projects ourselves.
        </p>
        <div className={styles.heroButtons}>
          <a className={styles.btnWhite} href={SPONSOR_URL} target="_blank" rel="noopener noreferrer">
            <HeartIcon /> Sponsor on GitHub<span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
          <button type="button" className={styles.btnText} onClick={onSeeWho}>See who we sponsor {'→'}</button>
        </div>
        <div ref={statsRef} className={styles.stats}>
          <div><strong><CountUp value={GITHUB_SPONSOR_TOTAL} play={seen && !reduced} /></strong><span>sponsors on GitHub so far</span></div>
          <div><strong><CountUp value={WE_SPONSOR.length} play={seen && !reduced} /></strong><span>people we sponsor</span></div>
          <div><strong><CountUp value={MONTHLY_GOAL_USD} prefix="$" play={seen && !reduced} /></strong><span>monthly goal</span></div>
        </div>
      </div>

      <div className={styles.stage}>
        <span className={styles.stageCard} aria-hidden="true">
          <i style={{ width: '46%' }} /><i style={{ width: '30%' }} /><b />
        </span>

        <div className={styles.stageStrip}>
          <ul className={styles.avatarRow} aria-label="Some of our sponsors">
            {strip.map((p) => (
              <li key={p.name} className={styles.av}>
                <a href={linkedinUrl(p)} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn (opens in a new tab)`}>
                  <Avatar person={p} size={28} />
                </a>
                <span className={styles.tip} role="tooltip">{p.name}</span>
              </li>
            ))}
          </ul>
          <span className={styles.stripText}>{GITHUB_SPONSOR_TOTAL} sponsors on GitHub</span>
        </div>

        <span className={styles.pill} aria-hidden="true"><HeartIcon size={22} /> Sponsoring</span>

        <div className={styles.badgeWrap}>
          <span className={styles.badgeLabel}>every sponsor gets this badge {'♥'}</span>
          <button type="button" className={styles.badgeBtn} onClick={burst.fire} aria-label="Sponsor badge. Press for confetti">
            <SponsorBadge size={170} />
          </button>
          {burst.node}
        </div>
      </div>
    </section>
  );
}
