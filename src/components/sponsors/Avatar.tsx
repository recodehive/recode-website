import React, { useEffect, useRef, useState } from 'react';
import { avatarSources, type Person } from '../../data/sponsors';
import styles from './sponsors.module.css';

const initials = (name: string): string =>
  name.trim().split(/\s+/).map((w) => w[0] ?? '').join('').slice(0, 2).toUpperCase();

/** Round avatar. Tries each photo source in turn and ends on soft initials if none load. */
export default function Avatar({ person, size, className = '' }: { person: Person; size: number; className?: string }) {
  const sources = avatarSources(person);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    // An image that failed before hydration never fires onError on the client.
    if (img && img.complete && img.naturalWidth === 0) setIndex((i) => i + 1);
  }, [index]);

  if (index >= sources.length) {
    return (
      <span className={`${styles.avatarFallback} ${className}`} style={{ width: size, height: size, fontSize: size * 0.34 }} aria-hidden="true">
        {initials(person.name)}
      </span>
    );
  }
  return (
    <img
      ref={ref}
      key={sources[index]}
      className={`${styles.avatarImg} ${className}`}
      src={sources[index]}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
