import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  duration?: number; // animation duration in ms
  suffix?: string;   // optional suffix like %, K+, etc.
}

const Counter: React.FC<CounterProps> = ({ value, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of element is visible
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
};

export default Counter;
