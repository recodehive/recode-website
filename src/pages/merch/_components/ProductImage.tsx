import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../styles.module.css';

type Props = {
  src: string;
  alt: string;
  name: string;
  width: number;
  height: number;
  className?: string;
  eager?: boolean;
};

/** Product image that shows a neutral placeholder with the product name if the file is missing. */
export default function ProductImage({ src, alt, name, width, height, className = '', eager = false }: Props) {
  const url = useBaseUrl(src);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The error event can fire before hydration, so also check after mount
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <span className={`${styles.placeholder} ${className}`} role="img" aria-label={alt}>
        {name}
      </span>
    );
  }
  return (
    <img
      ref={ref}
      className={className}
      src={url}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}
