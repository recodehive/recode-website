import React, { useState } from 'react';
import styles from './ContributorAvatar.module.css';

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const initialsOf = (handle: string) => handle.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase() || '?';

type Props = {
  handle: string;
  size: number;
  className?: string;
};

/** GitHub avatar that falls back to coloured initials if the image fails to load. */
export default function ContributorAvatar({ handle, size, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const tone = hash(handle.toLowerCase()) % 8;

  if (failed) {
    return (
      <span
        className={`${styles.initials} ${styles[`tone${tone}`]} ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(9, Math.round(size * 0.36)) }}
        aria-hidden="true"
      >
        {initialsOf(handle)}
      </span>
    );
  }
  return (
    <img
      className={`${styles.img} ${className}`}
      src={`https://github.com/${handle}.png?size=120`}
      width={size}
      height={size}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
