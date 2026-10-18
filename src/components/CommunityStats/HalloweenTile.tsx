import React from 'react';
import styles from './styles.module.css';

// Deterministic Halloween grid: 4 rows x 24 columns (same on server and client).
export const HALLOWEEN_CELLS: string[] = (() => {
  const out: string[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 24; c++) {
      const v = Math.abs(Math.sin((r + 2) * 12.9898 + (c + 7) * 78.233) * 43758.5453) % 1;
      const w = Math.abs(Math.sin((r + 5) * 39.346 + (c + 3) * 11.135) * 24634.6345) % 1;
      let cls: string;
      if (w > 0.93) cls = styles.h5;
      else if (v < 0.14) cls = styles.h0;
      else cls = [styles.h1, styles.h2, styles.h3, styles.h4][Math.min(3, Math.floor(v * 4.2))];
      if (w < 0.07 && cls !== styles.h5) cls += ` ${styles.glow} ${[styles.g1, styles.g2, styles.g3][(r + c) % 3]}`;
      out.push(cls);
    }
  }
  return out;
})();

const STAR = 'M6 0 L7.3 4.7 L12 6 L7.3 7.3 L6 12 L4.7 7.3 L0 6 L4.7 4.7 Z';

export function HalloweenTileDecor() {
  return (
    <>
      <div className={styles.hSpider} aria-hidden="true">
        <div className={styles.hThread} />
        <svg viewBox="0 0 60 50" width="46" style={{ marginTop: -4 }} focusable="false">
          <g className={styles.hLegsL} fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
            <path d="M24 22 Q12 12 4 16" /><path d="M24 26 Q10 22 2 28" /><path d="M24 30 Q12 32 4 40" /><path d="M26 33 Q18 40 12 48" />
          </g>
          <g className={styles.hLegsR} fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
            <path d="M36 22 Q48 12 56 16" /><path d="M36 26 Q50 22 58 28" /><path d="M36 30 Q48 32 56 40" /><path d="M34 33 Q42 40 48 48" />
          </g>
          <circle cx="30" cy="29" r="10" fill="#1e293b" />
          <circle cx="30" cy="16" r="7.5" fill="#1e293b" />
          <circle cx="27" cy="15" r="2.6" fill="#fff" /><circle cx="33" cy="15" r="2.6" fill="#fff" />
          <circle cx="27.4" cy="15.6" r="1.2" fill="#0f172a" /><circle cx="33.4" cy="15.6" r="1.2" fill="#0f172a" />
          <path d="M27.5 19.5 Q30 21.5 32.5 19.5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {[
        { d: '-9.75s', w: 10, c: '#f97316', t: '0s' },
        { d: '-9.5s', w: 8, c: '#a78bfa', t: '.3s' },
        { d: '-9.25s', w: 6, c: '#fbbf24', t: '.6s' },
      ].map((s, i) => (
        <div key={i} className={styles.hSpark} style={{ animationDelay: s.d }} aria-hidden="true">
          <svg className={styles.hTwinkle} viewBox="0 0 12 12" width={s.w} style={{ animationDelay: s.t }} focusable="false"><path d={STAR} fill={s.c} /></svg>
        </div>
      ))}

      <div className={styles.hBee} aria-hidden="true">
        <div className={styles.hBob}>
          <svg viewBox="0 0 80 80" width="58" height="58" focusable="false">
            <defs><clipPath id="rhHalloweenBee"><polygon points="40,30 59,41 59,63 40,74 21,63 21,41" /></clipPath></defs>
            <g className={styles.hWing}><ellipse cx="24" cy="36" rx="12" ry="8" transform="rotate(-25 24 36)" fill="rgba(221,214,254,.75)" stroke="#a78bfa" strokeWidth="1.5" /></g>
            <g className={styles.hWing}><ellipse cx="56" cy="36" rx="12" ry="8" transform="rotate(25 56 36)" fill="rgba(221,214,254,.75)" stroke="#a78bfa" strokeWidth="1.5" /></g>
            <polygon points="40,30 59,41 59,63 40,74 21,63 21,41" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
            <g clipPath="url(#rhHalloweenBee)"><rect x="18" y="56" width="44" height="5" fill="#0f172a" opacity=".85" /><rect x="18" y="65" width="44" height="5" fill="#0f172a" opacity=".85" /></g>
            <circle cx="33.5" cy="45" r="5" fill="#fff" /><circle cx="46.5" cy="45" r="5" fill="#fff" />
            <circle cx="34.5" cy="45.5" r="2.4" fill="#0f172a" /><circle cx="47.5" cy="45.5" r="2.4" fill="#0f172a" />
            <path d="M36 51 Q40 54.5 44 51" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
            <ellipse cx="40" cy="31" rx="17" ry="3.6" fill="#6d28d9" />
            <path d="M30 30 Q36 18 42 4 Q45 10 54 11 Q47 14 50 30 Z" fill="#7c3aed" />
            <rect x="31" y="25" width="19" height="3.6" rx="1" fill="#f97316" />
          </svg>
        </div>
      </div>
    </>
  );
}
