import React, { useEffect, useState } from 'react';
import { IMPACT } from './storyData';
import { useInView, useReducedMotion } from './hooks';
import styles from './docsStory.module.css';

const fmt = (n: number, k: boolean) => {
  if (k && n >= 1000) return `${(n / 1000).toFixed(2).replace(/0$/, '')}K`;
  return Math.round(n).toLocaleString('en-US');
};

function Counter({ value, suffix, k, play }: { value: number; suffix: string; k: boolean; play: boolean }) {
  const [shown, setShown] = useState(value); // final value for server render and reduced motion
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setShown(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setShown(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);
  return <>{fmt(shown, k)}{suffix}</>;
}

export default function ImpactCounters() {
  const [ref, seen] = useInView<HTMLElement>(0.4, true);
  const reduced = useReducedMotion();
  if (IMPACT.length === 0) return null;
  return (
    <section ref={ref} className={styles.section}>
      <p className={styles.eyebrow}>{'✦'} IMPACT SO FAR</p>
      <h2 className={styles.h2}>Small contributions, added up</h2>
      <div className={styles.tiles}>
        {IMPACT.map((t) => (
          <div key={t.id} className={`${styles.tile} ${t.featured ? styles.tileFeatured : ''}`}>
            <span className={styles.tileValue}>
              <Counter value={t.value} suffix={t.suffix} k={t.k} play={seen && !reduced} />
            </span>
            <span className={styles.tileLabel}>{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
