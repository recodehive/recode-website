import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Lock } from 'lucide-react';
import type { Badge } from '../../data/badges';
import styles from './badges.module.css';

interface Props {
  badge: Badge;
  size: number;
  locked: boolean;
  /** Skip lazy loading, for the large badge in the open modal. */
  eager?: boolean;
  showLock?: boolean;
  /** Glow, float, shine and sparkles for an unlocked badge. The artwork itself is not changed. */
  fx?: boolean;
  className?: string;
}

/** Badge artwork with a drawn hexagon fallback while the image file is missing. */
export default function BadgeImage({ badge, size, locked, eager = false, showLock = true, fx = false, className = '' }: Props) {
  const src = useBaseUrl(badge.image);
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const effects = fx && !locked && !failed;

  useEffect(() => {
    const img = ref.current;
    // The image may have failed before hydration attached the handler.
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <span className={`${styles.badgeImg} ${locked ? styles.locked : ''} ${effects ? styles.fxOn : ''} ${className}`} style={{ width: size, height: size }}>
      {failed ? (
        <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={badge.name} focusable="false" className={styles.fallbackHex}>
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ) : (
        <img
          ref={ref}
          src={src}
          alt={badge.name}
          width={size}
          height={size}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
        />
      )}
      {effects && (
        <>
          {/* The clip is static and uses the badge image as its mask, so only the inner gradient moves. */}
          <span
            className={styles.shineClip}
            aria-hidden="true"
            style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
          >
            <span className={styles.shineSweep} />
          </span>
          <span className={`${styles.spark} ${styles.sparkA}`} aria-hidden="true">{'\u2726'}</span>
          <span className={`${styles.spark} ${styles.sparkB}`} aria-hidden="true">{'\u2726'}</span>
          <span className={`${styles.spark} ${styles.sparkC}`} aria-hidden="true">{'\u2726'}</span>
        </>
      )}
      {locked && showLock && (
        <span className={styles.lockDot} aria-hidden="true"><Lock size={Math.max(11, Math.round(size * 0.24))} strokeWidth={2.5} /></span>
      )}
    </span>
  );
}
