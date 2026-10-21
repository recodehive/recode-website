// Contribution streak maths. Pure functions with no React, so they can be unit tested with node:test.

export interface CalendarDay {
  /** YYYY-MM-DD */
  date: string;
  count: number;
}

export interface StreakStats {
  /** Days in a row ending today, or ending yesterday while today is still empty. */
  current: number;
  /** First day of the current streak, or null when there is none. */
  currentSince: string | null;
  longest: number;
  longestFrom: string | null;
  longestTo: string | null;
  last12Months: number;
  last7Days: number;
  /** "Today" in the profile owner's time zone. */
  todayKey: string;
}

const DAY_MS = 86_400_000;

function toUtcMs(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtcMs(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export function shiftDay(key: string, days: number): string {
  return fromUtcMs(toUtcMs(key) + days * DAY_MS);
}

/** The calendar date of `now` in an IANA time zone. An unknown zone falls back to UTC. */
export function dateKeyInZone(now: Date, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  } catch {
    return now.toISOString().slice(0, 10);
  }
}

export function computeStreak(days: CalendarDay[], now: Date, timeZone = 'UTC'): StreakStats {
  const todayKey = dateKeyInZone(now, timeZone);
  const counts = new Map<string, number>();
  for (const d of days) if (d.date <= todayKey) counts.set(d.date, d.count);

  // Current streak: today counts when it has contributions, otherwise the streak may still be alive from yesterday.
  let cursor = (counts.get(todayKey) ?? 0) > 0 ? todayKey : shiftDay(todayKey, -1);
  let current = 0;
  let currentSince: string | null = null;
  while ((counts.get(cursor) ?? 0) > 0) {
    current += 1;
    currentSince = cursor;
    cursor = shiftDay(cursor, -1);
  }

  // Longest streak over the whole calendar, in date order.
  const sorted = [...counts.entries()].filter(([, c]) => c > 0).map(([k]) => k).sort();
  let longest = 0;
  let longestFrom: string | null = null;
  let longestTo: string | null = null;
  let runStart: string | null = null;
  let runLen = 0;
  let prev: string | null = null;
  for (const key of sorted) {
    if (prev !== null && shiftDay(prev, 1) === key) {
      runLen += 1;
    } else {
      runStart = key;
      runLen = 1;
    }
    if (runLen > longest) {
      longest = runLen;
      longestFrom = runStart;
      longestTo = key;
    }
    prev = key;
  }

  const yearStart = shiftDay(todayKey, -364);
  const weekStart = shiftDay(todayKey, -6);
  let last12Months = 0;
  let last7Days = 0;
  for (const [k, c] of counts) {
    if (k >= yearStart) last12Months += c;
    if (k >= weekStart) last7Days += c;
  }

  return { current, currentSince, longest, longestFrom, longestTo, last12Months, last7Days, todayKey };
}
