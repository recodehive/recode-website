import React from 'react';
import { GIVEAWAY } from '../../../data/giveaway';
import styles from './closed.module.css';

/** The default (light, green) design shown after the giveaway ends. No redeploy is needed on the day. */
export default function ClosedView() {
  return (
    <div className={styles.page}>
      <p className={styles.eyebrow}>{'✦'} GIVEAWAY</p>
      <h1 className={styles.h1}>The Halloween giveaway has ended</h1>
      <p className={styles.banner} role="status">
        {GIVEAWAY.winnersAnnounced.length > 0 ? 'Giveaway closed. Thank you to everyone who took part.' : 'Giveaway closed. Winners will be announced soon.'}
      </p>
      {GIVEAWAY.winnersAnnounced.length > 0 && (
        <section aria-labelledby="winners-title">
          <h2 id="winners-title" className={styles.h2}>Winners</h2>
          <ul className={styles.winners}>
            {GIVEAWAY.winnersAnnounced.map((login) => (
              <li key={login}>
                <a href={`https://github.com/${login}`} target="_blank" rel="noopener noreferrer">
                  <img src={`https://github.com/${login}.png?size=96`} alt="" width={48} height={48} loading="lazy" />
                  @{login}
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className={styles.text}>Winners are announced on Discord and LinkedIn, and contacted through GitHub. Keep contributing to the hive to be ready for the next one.</p>
      <div className={styles.btns}>
        <a className={styles.btnGreen} href="https://discord.gg/dh3TA8U55Q" target="_blank" rel="noopener noreferrer">Join the Discord<span className={styles.srOnly}> (opens in a new tab)</span></a>
        <a className={styles.btnOutline} href="https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22" target="_blank" rel="noopener noreferrer">Good first issues<span className={styles.srOnly}> (opens in a new tab)</span></a>
      </div>
    </div>
  );
}
