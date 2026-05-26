import React, { useRef, useState, useEffect } from 'react';

export default function ZoomImage({ src, alt }) {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState('center center');
  const containerRef = useRef(null);
  const scaleRef = useRef(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setOrigin(`${x}% ${y}%`);

      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      const newScale = Math.min(Math.max(scaleRef.current + delta, 1), 3);
      scaleRef.current = newScale;
      setScale(newScale);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseLeave = () => {
    scaleRef.current = 1;
    setScale(1);
    setOrigin('center center');
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      style={{
        overflow: 'hidden',
        borderRadius: '8px',
        width: '100%',
        cursor: scale > 1 ? 'zoom-out' : 'zoom-in',
      }}
    >
      <img
        src={src}
        alt={alt || ''}
        style={{
          display: 'block',
          width: '100%',
          transform: `scale(${scale})`,
          transformOrigin: origin,
          transition: scale === 1 ? 'transform 0.35s ease' : 'transform 0.08s ease',
        }}
      />
    </div>
  );
}
