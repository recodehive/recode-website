import { useEffect, useState } from 'react';

// Halloween window: Oct 18 00:00 to Oct 31 23:59:59, visitor's local time.
// Off from Nov 1. Repeats each year unless the code is removed.
// Testing: ?halloween=1 forces on, ?halloween=0 forces off.
// Runs in useEffect so server and client HTML match (no hydration warnings).
const START = { month: 9, day: 18 }; // month is 0-based: 9 = October
const END = { month: 9, day: 31 };

export function useHalloween(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('halloween');
    if (q === '1') { setOn(true); return; }
    if (q === '0') { setOn(false); return; }
    const now = new Date();
    const y = now.getFullYear();
    const start = new Date(y, START.month, START.day, 0, 0, 0);
    const end = new Date(y, END.month, END.day, 23, 59, 59);
    setOn(now >= start && now <= end);
  }, []);
  return on;
}
