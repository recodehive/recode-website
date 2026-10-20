import React, { useEffect, useMemo, useState } from 'react';
import { useHalloween } from '../Halloween/useHalloween';
import HiveBee from './HiveBee';
import { useInView, useRunning } from './hooks';
import styles from './docsStory.module.css';

const COLS = 10;
const ROWS = 7;
const R = 21;
const W = Math.sqrt(3) * R;
const YOU = 34; // the permanently gold cell
const COMMAND = '$ git commit -m "recode, together"';

function hexPoints(cx: number, cy: number): string {
  const pts: string[] = [];
  for (let k = 0; k < 6; k++) {
    const a = (Math.PI / 180) * (60 * k + 30);
    pts.push(`${(cx + (R - 1.5) * Math.cos(a)).toFixed(2)},${(cy + (R - 1.5) * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Seeded shuffle so server and client always agree.
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const row = Math.floor(i / COLS);
  const col = i % COLS;
  const cx = R + col * W + (row % 2 ? W / 2 : 0);
  const cy = R + row * R * 1.5;
  return { i, points: hexPoints(cx, cy) };
});

const ORDER = (() => {
  const rand = mulberry32(2026);
  const idx = CELLS.map((c) => c.i).filter((i) => i !== YOU);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
})();
const RANK = new Map(ORDER.map((cell, rank) => [cell, rank]));

export default function StoryHero() {
  const hat = useHalloween();
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const running = useRunning(inView);
  const [lit, setLit] = useState(ORDER.length); // final state until the loop starts

  useEffect(() => {
    if (!running) {
      // Off screen, hidden tab or reduced motion: hold the fully lit final state.
      setLit(ORDER.length);
      return;
    }
    setLit(0);
    let n = 0;
    let hold = 0;
    const id = window.setInterval(() => {
      if (n < ORDER.length) {
        n += 1;
        setLit(n);
      } else if (hold < 8) {
        hold += 1; // pause on the full hive for about 1.2s
      } else {
        n = 0;
        hold = 0;
        setLit(0);
      }
    }, 150);
    return () => window.clearInterval(id);
  }, [running]);

  const cells = useMemo(
    () =>
      CELLS.map((c) => {
        if (c.i === YOU) return <polygon key={c.i} points={c.points} className={`${styles.hex} ${styles.hexYou}`} />;
        const on = (RANK.get(c.i) ?? 0) < lit;
        return <polygon key={c.i} points={c.points} className={`${styles.hex} ${on ? styles.hexOn : ''}`} />;
      }),
    [lit],
  );

  return (
    <section ref={ref} className={`${styles.hero} ${running ? styles.running : ''}`}>
      <div className={styles.heroText}>
        <p className={styles.eyebrowLight}>{'✦'} OUR STORY</p>
        <h1 className={styles.heroTitle}>
          Welcome to<br /><span className={styles.heroAccent}>recode hive</span>
        </h1>
        <p className={styles.heroLede}>
          An open source learning community where developers learn by shipping real work, together. Collaboration first, code second.
        </p>
        <p className={styles.command} aria-label={COMMAND}>
          <span className={styles.typed} aria-hidden="true">{COMMAND}</span>
          <span className={styles.caret} aria-hidden="true" />
        </p>
      </div>
      <div className={styles.heroArt}>
        <svg
          viewBox="0 0 394 240"
          className={styles.hive}
          role="img"
          aria-label="Animated hive: each cell lights up like a new contributor joining"
        >
          {cells}
        </svg>
        <div className={styles.bee} aria-hidden="true">
          <div className={styles.bob}><HiveBee hat={hat} /></div>
        </div>
      </div>
    </section>
  );
}
