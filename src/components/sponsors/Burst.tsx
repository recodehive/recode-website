import React, { useCallback, useState } from 'react';
import styles from './sponsors.module.css';

const COLORS = ['#ec4899', '#a855f7', '#3b82f6', '#22c55e', '#eab308', '#f97316'];

/** Small confetti burst at the current spot. Call fire() to trigger one. */
export function useBurst() {
  const [bursts, setBursts] = useState<number[]>([]);
  const fire = useCallback(() => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setBursts((b) => [...b, id]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1000);
  }, []);
  const node = (
    <>
      {bursts.map((id) => (
        <span key={id} className={styles.burst} aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const d = 46 + (i % 3) * 16;
            return (
              <i
                key={i}
                style={{ ['--dx' as string]: `${Math.cos(a) * d}px`, ['--dy' as string]: `${Math.sin(a) * d}px`, background: COLORS[i % COLORS.length] }}
              />
            );
          })}
        </span>
      ))}
    </>
  );
  return { fire, node };
}
