import React from "react";
import {
  TIER_NAMES,
  certifications,
  earnable,
  highlights,
  retired,
} from "../../../data/githubBadges";
import styles from "../github-badges.module.css";

const starstruck = earnable.find((b) => b.id === "starstruck");

export default function Hero({ onExplore }: { onExplore: () => void }) {
  const covered = earnable.length + highlights.length + retired.length;

  return (
    <section className={styles.hero} aria-labelledby="badges-heading">
      <div className={styles.heroCopy}>
        <h1 id="badges-heading" className={styles.heroTitle}>
          GitHub Achievement Badges
        </h1>
        <p className={styles.heroSub}>
          What each badge asks for, the count for every tier, and a practice
          repo where your first merged PR counts. A community guide to levelling
          up your open source profile.
        </p>
        <div className={styles.heroActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onExplore}
          >
            Explore all badges
          </button>
          <a className={`${styles.btn} ${styles.btnGhost}`} href="#certs">
            See certifications
          </a>
        </div>
        <p className={styles.heroFacts}>
          {covered} badges covered, {earnable.length} earnable today,{" "}
          {certifications.length} certifications.
        </p>
      </div>

      {starstruck && starstruck.tierImages.length > 0 && (
        <aside
          className={styles.ladder}
          aria-label={`${starstruck.name} levels`}
        >
          <p className={styles.ladderTitle}>{starstruck.name}</p>
          <p className={styles.ladderSub}>
            One badge, {starstruck.tierImages.length} levels. The count needed
            for each is shown below.
          </p>
          <ol className={styles.ladderSteps}>
            {starstruck.tierImages.map((src, i) => (
              <li key={`${src}-${i}`} className={styles.ladderStep}>
                <span className={styles.ladderTile}>
                  <img
                    src={src}
                    alt={`${starstruck.name}, ${TIER_NAMES[i] ?? "Default"} tier`}
                    width={44}
                    height={44}
                  />
                </span>
                <span className={styles.ladderCount}>
                  {starstruck.tiers[i]}
                </span>
                <span className={styles.ladderName}>
                  {TIER_NAMES[i] ?? "Default"}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      )}
    </section>
  );
}
