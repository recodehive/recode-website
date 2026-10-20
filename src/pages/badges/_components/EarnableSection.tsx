import React, { useEffect, useMemo, useState } from 'react';
import {
  APPEARANCE_URL, SKIN_TONE_EMOJI, TIER_NAMES, earnable, skinTones, type Earnable,
} from '../../../data/githubBadges';
import styles from '../github-badges.module.css';

type Filter = 'all' | 'multi' | 'single';
const STORAGE_KEY = 'rh-badges-earned';

function useEarned() {
  const [earned, setEarned] = useState<string[]>([]);

  // Read after mount so the server and client render the same HTML
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      if (Array.isArray(parsed)) setEarned(parsed.filter((x): x is string => typeof x === 'string'));
    } catch {
      // storage blocked or corrupt: start empty
    }
  }, []);

  const toggle = (id: string) =>
    setEarned((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage full or blocked: the toggle still works for this visit
      }
      return next;
    });

  return { earned, toggle };
}

function LevelsCard({ b }: { b: Earnable }) {
  const multi = b.tiers.length > 1;
  const title = multi ? 'LEVELS: DEFAULT, BRONZE, SILVER, GOLD' : 'LEVEL: DEFAULT';
  return (
    <div className={styles.levels}>
      <div className={styles.levelPill}>{title}</div>
      <div className={styles.tierRow}>
        {b.tierImages.map((src, i) => (
          <span key={src} className={styles.tierTile}>
            <img
              src={src}
              alt={`${b.name}, ${TIER_NAMES[i] ?? 'Default'} tier`}
              title={`${TIER_NAMES[i] ?? 'Default'} (${b.tiers[i]})`}
              width={40}
              height={40}
              loading="lazy"
            />
          </span>
        ))}
      </div>
      <div className={styles.needed}>Needed: {b.tiers.join(', ')}</div>
    </div>
  );
}

export default function EarnableSection() {
  const { earned, toggle } = useEarned();
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(
    () =>
      earnable.filter((b) =>
        filter === 'all' ? true : filter === 'multi' ? b.tiers.length > 1 : b.tiers.length === 1,
      ),
    [filter],
  );
  const pct = Math.round((earned.filter((id) => earnable.some((b) => b.id === id)).length / earnable.length) * 100);
  const count = earned.filter((id) => earnable.some((b) => b.id === id)).length;

  const chips: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'multi', label: 'Multi-tier' },
    { key: 'single', label: 'One-time' },
  ];

  return (
    <section id="earnable" className={`${styles.container} ${styles.section}`} aria-labelledby="earnable-heading">
      <div className={styles.headRow}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>✦ EARNABLE ACHIEVEMENTS</p>
          <h2 id="earnable-heading" className={styles.h2}>Badges you can earn today</h2>
          <p className={styles.sub}>
            Tick off the ones you already have. Multi-tier badges level up from Default to Gold as your count grows.
          </p>
        </div>
        <div role="group" aria-label="Filter badges" className={styles.chips}>
          {chips.map((c) => (
            <button key={c.key} type="button" aria-pressed={filter === c.key} className={`${styles.chip} ${filter === c.key ? styles.chipOn : ''}`} onClick={() => setFilter(c.key)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.progress}>
        <span className={styles.progressLabel}>Your progress</span>
        <span className={styles.progressTrack} role="progressbar" aria-valuemin={0} aria-valuemax={earnable.length} aria-valuenow={count} aria-label="Badges earned">
          <span className={styles.progressFill} style={{ width: `${pct}%` }} />
        </span>
        <span className={styles.progressCount}>{count} of {earnable.length} earned</span>
      </div>

      <div className={styles.tableBox}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.thBadge}>Badge</th>
                <th scope="col" className={styles.thName}>Name</th>
                <th scope="col">How to get</th>
                <th scope="col" className={styles.thNeeded}>Needed amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => {
                const have = earned.includes(b.id);
                return (
                  <tr key={b.id} className={have ? styles.rowEarned : undefined}>
                    <td className={styles.cellCenter}>
                      <img className={styles.badgeImg} src={b.image} alt={`${b.name} badge`} width={44} height={44} loading="lazy" />
                    </td>
                    <td className={styles.cellCenter}>
                      <span className={styles.badgeName}>{b.name}</span>
                      <button type="button" aria-pressed={have} className={`${styles.have} ${have ? styles.haveOn : ''}`} onClick={() => toggle(b.id)}>
                        {have ? '✓ Earned' : 'I have this'}
                      </button>
                    </td>
                    <td className={styles.cellCenter}>
                      <p className={styles.how}>{b.how}</p>
                      <p className={styles.tip}>{b.tip}</p>
                      {(b.ctaUrl || b.tutorialUrl) && (
                        <p className={styles.links}>
                          {b.ctaUrl && <a href={b.ctaUrl} target="_blank" rel="noopener noreferrer">{b.ctaLabel}</a>}
                          {b.tutorialUrl && <a href={b.tutorialUrl} target="_blank" rel="noopener noreferrer">Watch the video tutorial</a>}
                        </p>
                      )}
                    </td>
                    <td className={styles.cellNeeded}><LevelsCard b={b} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.skinBlock}>
        <h3 className={styles.h3}>👋 Achievement skin tone 👋</h3>
        <p className={styles.skinSub}>
          Some achievements change with your emoji skin tone preference.<br />
          You can pick yours in <a href={APPEARANCE_URL} target="_blank" rel="noopener noreferrer">GitHub appearance settings</a>.
        </p>
        <div className={`${styles.tableBox} ${styles.skinBox}`}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thBadge}>Badge</th>
                  <th scope="col" className={styles.thName}>Name</th>
                  <th scope="col">Skin tone versions</th>
                </tr>
              </thead>
              <tbody>
                {skinTones.map((row) => (
                  <tr key={row.name}>
                    <td className={styles.cellCenter}>
                      <img className={styles.badgeImg} src={row.image} alt={`${row.name} badge`} width={44} height={44} loading="lazy" />
                    </td>
                    <td className={styles.cellCenter}><span className={styles.badgeName}>{row.name}</span></td>
                    <td className={styles.cellCenter}>
                      <div className={styles.toneRow}>
                        {row.variants.map((src, i) => (
                          <span key={src} className={styles.toneTile}>
                            <img src={src} alt={`${row.name}, skin tone ${i + 1}`} width={40} height={40} loading="lazy" />
                            <span className={styles.toneEmoji} aria-hidden="true">{SKIN_TONE_EMOJI[i]}</span>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
