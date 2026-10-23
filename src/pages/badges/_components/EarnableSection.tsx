import React, { useEffect, useMemo, useState } from "react";
import {
  APPEARANCE_URL,
  SKIN_TONE_EMOJI,
  TIER_NAMES,
  earnable,
  skinTones,
  type Earnable,
} from "../../../data/githubBadges";
import styles from "../github-badges.module.css";

type Filter = "all" | "multi" | "single";
const STORAGE_KEY = "rh-badges-earned";

function useEarned() {
  const [earned, setEarned] = useState<string[]>([]);

  // Read after mount so the server and client render the same HTML
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(parsed))
        setEarned(parsed.filter((x): x is string => typeof x === "string"));
    } catch {
      // storage blocked or corrupt: start empty
    }
  }, []);

  const toggle = (id: string) =>
    setEarned((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage full or blocked: the toggle still works for this visit
      }
      return next;
    });

  return { earned, toggle };
}

/** Each level with the count it needs. */
function Tiers({ b }: { b: Earnable }) {
  return (
    <ul
      className={styles.tiers}
      aria-label={`${b.name} levels and counts needed`}
    >
      {b.tierImages.map((src, i) => {
        const name = TIER_NAMES[i] ?? "Default";
        return (
          <li
            key={`${src}-${i}`}
            className={styles.tier}
            title={`${name} (${b.tiers[i]})`}
          >
            <span className={styles.tierTile}>
              <img
                src={src}
                alt={`${b.name}, ${name} tier`}
                width={32}
                height={32}
                loading="lazy"
              />
            </span>
            <span className={styles.tierCount}>{b.tiers[i]}</span>
            <span className={styles.tierName}>{name}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function EarnableSection() {
  const { earned, toggle } = useEarned();
  const [filter, setFilter] = useState<Filter>("all");

  const rows = useMemo(
    () =>
      earnable.filter((b) =>
        filter === "all"
          ? true
          : filter === "multi"
            ? b.tiers.length > 1
            : b.tiers.length === 1,
      ),
    [filter],
  );
  const count = earned.filter((id) => earnable.some((b) => b.id === id)).length;
  const pct = Math.round((count / earnable.length) * 100);

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "multi", label: "Multi-tier" },
    { key: "single", label: "One-time" },
  ];

  return (
    <section
      id="earnable"
      className={`${styles.container} ${styles.section}`}
      aria-labelledby="earnable-heading"
    >
      <div className={styles.headRow}>
        <div className={styles.head}>
          <h2 id="earnable-heading" className={styles.h2}>
            Badges you can earn today
          </h2>
          <p className={styles.sub}>
            Tick off the ones you already have. Multi-tier badges level up from
            Default to Gold as your count grows.
          </p>
        </div>
        <div role="group" aria-label="Filter badges" className={styles.chips}>
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={filter === c.key}
              className={`${styles.chip} ${filter === c.key ? styles.chipOn : ""}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.progress}>
        <span className={styles.progressLabel}>Your progress</span>
        <span
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={earnable.length}
          aria-valuenow={count}
          aria-label="Badges earned"
        >
          <span className={styles.progressFill} style={{ width: `${pct}%` }} />
        </span>
        <span className={styles.progressCount}>
          {count} of {earnable.length} earned
        </span>
      </div>

      <ul className={styles.list}>
        {rows.map((b) => {
          const have = earned.includes(b.id);
          return (
            <li
              key={b.id}
              className={`${styles.row} ${have ? styles.rowEarned : ""}`}
            >
              <img
                className={styles.badgeImg}
                src={b.image}
                alt={`${b.name} badge`}
                width={64}
                height={64}
                loading="lazy"
              />
              <div className={styles.rowMain}>
                <div className={styles.rowTitle}>
                  <h3 className={styles.badgeName}>{b.name}</h3>
                  <button
                    type="button"
                    aria-pressed={have}
                    className={`${styles.have} ${have ? styles.haveOn : ""}`}
                    onClick={() => toggle(b.id)}
                  >
                    {have ? "✓ Earned" : "I have this"}
                  </button>
                </div>
                <p className={styles.how}>{b.how}</p>
                <p className={styles.tip}>{b.tip}</p>
                {(b.ctaUrl || b.tutorialUrl) && (
                  <p className={styles.links}>
                    {b.ctaUrl && (
                      <a
                        href={b.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {b.ctaLabel}
                      </a>
                    )}
                    {b.tutorialUrl && (
                      <a
                        href={b.tutorialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch the video tutorial
                      </a>
                    )}
                  </p>
                )}
              </div>
              <Tiers b={b} />
            </li>
          );
        })}
      </ul>

      <div className={styles.skinBlock}>
        <h3 className={styles.h3}>Skin tone variants</h3>
        <p className={styles.skinSub}>
          Some achievements change with your emoji skin tone preference. You can
          pick yours in{" "}
          <a href={APPEARANCE_URL} target="_blank" rel="noopener noreferrer">
            GitHub appearance settings
          </a>
          .
        </p>
        <ul className={styles.list}>
          {skinTones.map((row) => (
            <li key={row.name} className={`${styles.row} ${styles.rowSkin}`}>
              <img
                className={styles.badgeImg}
                src={row.image}
                alt={`${row.name} badge`}
                width={64}
                height={64}
                loading="lazy"
              />
              <span className={styles.badgeName}>{row.name}</span>
              <div className={styles.toneRow}>
                {row.variants.map((src, i) => (
                  <span key={`${src}-${i}`} className={styles.toneTile}>
                    <img
                      src={src}
                      alt={`${row.name}, skin tone ${i + 1}`}
                      width={36}
                      height={36}
                      loading="lazy"
                    />
                    <span className={styles.toneEmoji} aria-hidden="true">
                      {SKIN_TONE_EMOJI[i]}
                    </span>
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
