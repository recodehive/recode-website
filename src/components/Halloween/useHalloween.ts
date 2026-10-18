import { useEffect, useState } from 'react';

// Active Oct 18 to Nov 1 in the visitor's local time.
// Testing: add ?halloween=1 to force on, ?halloween=0 to force off.
// Decided in useEffect so server and client render the same HTML (no hydration mismatch).
export function useHalloween(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('halloween');
    if (q === '1') { setOn(true); return; }
    if (q === '0') { setOn(false); return; }
    const now = new Date();
    const y = now.getFullYear();
    const start = new Date(y, 9, 18, 0, 0, 0);
    const end = new Date(y, 10, 1, 23, 59, 59);
    setOn(now >= start && now <= end);
  }, []);
  return on;
}
