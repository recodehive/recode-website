import React from 'react';
import styles from './docsStory.module.css';

/** The recode hive bee. The witch hat is added only when `hat` is true (Halloween window). */
export default function HiveBee({ hat }: { hat: boolean }) {
  return (
    <svg viewBox="0 0 80 80" width="58" height="58" focusable="false" aria-hidden="true">
      <defs>
        <clipPath id="rhStoryBee"><polygon points="40,30 59,41 59,63 40,74 21,63 21,41" /></clipPath>
      </defs>
      <g className={styles.wing}><ellipse cx="24" cy="36" rx="12" ry="8" transform="rotate(-25 24 36)" fill="rgba(226,232,240,.8)" stroke="#94a3b8" strokeWidth="1.5" /></g>
      <g className={styles.wing}><ellipse cx="56" cy="36" rx="12" ry="8" transform="rotate(25 56 36)" fill="rgba(226,232,240,.8)" stroke="#94a3b8" strokeWidth="1.5" /></g>
      <polygon points="40,30 59,41 59,63 40,74 21,63 21,41" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
      <g clipPath="url(#rhStoryBee)">
        <rect x="18" y="56" width="44" height="5" fill="#0f172a" opacity=".85" />
        <rect x="18" y="65" width="44" height="5" fill="#0f172a" opacity=".85" />
      </g>
      <circle cx="33.5" cy="45" r="5" fill="#fff" /><circle cx="46.5" cy="45" r="5" fill="#fff" />
      <circle cx="34.5" cy="45.5" r="2.4" fill="#0f172a" /><circle cx="47.5" cy="45.5" r="2.4" fill="#0f172a" />
      <path d="M36 51 Q40 54.5 44 51" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
      {hat && (
        <>
          <ellipse cx="40" cy="31" rx="17" ry="3.6" fill="#6d28d9" />
          <path d="M30 30 Q36 18 42 4 Q45 10 54 11 Q47 14 50 30 Z" fill="#7c3aed" />
          <rect x="31" y="25" width="19" height="3.6" rx="1" fill="#f97316" />
        </>
      )}
    </svg>
  );
}
