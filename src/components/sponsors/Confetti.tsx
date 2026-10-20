import React from 'react';
import styles from './sponsors.module.css';

const COLORS = ['#ec4899', '#a855f7', '#3b82f6', '#22c55e', '#eab308', '#f97316'];

// Deterministic spread (no Math.random) so server and client render the same markup.
const PIECES = Array.from({ length: 44 }, (_, i) => {
  const f = (n: number) => Math.abs(Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1;
  return {
    left: f(1) * 100,
    fall: 18 + f(2) * 10,
    sway: 1.4 + f(3) * 1.6,
    delay: -f(4) * 28,
    color: COLORS[i % COLORS.length],
    heart: i % 11 === 0,
    rot: f(5) * 360,
  };
});

/** Pure CSS falling confetti. It sits behind content and never receives pointer events. */
export default function Confetti() {
  return (
    <div className={styles.confetti} aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className={styles.fall}
          style={{ left: `${p.left}%`, animationDuration: `${p.fall}s`, animationDelay: `${p.delay}s` }}
        >
          <span
            className={p.heart ? styles.heartPiece : styles.piece}
            style={{ background: p.heart ? 'transparent' : p.color, color: p.color, animationDuration: `${p.sway}s`, transform: `rotate(${p.rot}deg)` }}
          >
            {p.heart ? '♡' : null}
          </span>
        </span>
      ))}
    </div>
  );
}
