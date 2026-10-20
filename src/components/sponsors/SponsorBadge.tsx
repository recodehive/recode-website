import React, { useId } from 'react';
import styles from './sponsors.module.css';

/** The holographic heart badge, drawn as our own SVG. */
export default function SponsorBadge({ size = 150, animated = true }: { size?: number; animated?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const ring = `ring${uid}`;
  const heart = `heart${uid}`;
  const clip = `clip${uid}`;
  return (
    <svg
      className={`${styles.badge} ${animated ? styles.badgeAnimated : ''}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c7d2fe" />
          <stop offset="0.25" stopColor="#fbcfe8" />
          <stop offset="0.5" stopColor="#fef3c7" />
          <stop offset="0.75" stopColor="#bbf7d0" />
          <stop offset="1" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id={heart} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f9a8c4" />
          <stop offset="1" stopColor="#be185d" />
        </linearGradient>
        <clipPath id={clip}><polygon points="60,6 108,33 108,87 60,114 12,87 12,33" /></clipPath>
      </defs>
      <polygon points="60,6 108,33 108,87 60,114 12,87 12,33" fill={`url(#${ring})`} />
      <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" fill="#ffffff" />
      <polygon points="60,15 100,38 100,82 60,105 20,82 20,38" fill="#f5f3ff" opacity="0.55" />
      <g className={styles.beat}>
        <path d="M60 86 C34 68 30 50 42 42 C50 37 58 41 60 48 C62 41 70 37 78 42 C90 50 86 68 60 86 Z" fill={`url(#${heart})`} />
        <path d="M44 48 C47 44 52 44 55 48" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      <g clipPath={`url(#${clip})`}>
        <rect className={styles.sweep} x="-40" y="0" width="30" height="120" fill="#fff" opacity="0.45" transform="skewX(-20)" />
      </g>
    </svg>
  );
}
