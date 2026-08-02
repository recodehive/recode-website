// src/lib/streakUtils.ts
// Streak math is derived client-side from each contributor's raw prDetails
// (mergedAt timestamps) — no separate API call needed.

export interface StreakPR {
  mergedAt: string;
}

export interface WeekBucket {
  weekStart: string; // ISO date string, Monday 00:00 UTC
  count: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_MS = 7 * DAY_MS;

// Monday 00:00 UTC of the week containing `date`.
function getUTCWeekStart(date: Date): Date {
  const day = date.getUTCDay(); // 0 = Sunday, 1 = Monday, ...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  weekStart.setUTCDate(weekStart.getUTCDate() + diffToMonday);
  return weekStart;
}

/**
 * Buckets PRs into ISO (UTC) weeks, walking back `numWeeks` from the current
 * week. Returned oldest-first so it can be rendered left-to-right.
 */
export function getWeekBuckets(
  prs: StreakPR[] = [],
  numWeeks = 20,
): WeekBucket[] {
  const currentWeekStart = getUTCWeekStart(new Date());

  const buckets: WeekBucket[] = [];
  const indexByWeekMs = new Map<number, number>();
  for (let i = numWeeks - 1; i >= 0; i--) {
    const weekStart = new Date(currentWeekStart.getTime() - i * WEEK_MS);
    indexByWeekMs.set(weekStart.getTime(), buckets.length);
    buckets.push({ weekStart: weekStart.toISOString(), count: 0 });
  }

  for (const pr of prs) {
    const prWeekMs = getUTCWeekStart(new Date(pr.mergedAt)).getTime();
    const idx = indexByWeekMs.get(prWeekMs);
    if (idx !== undefined) {
      buckets[idx].count++;
    }
  }

  return buckets;
}

/**
 * Consecutive weeks with at least one merged PR, walking backwards from the
 * current week. The current (in-progress) week is allowed to be empty
 * without breaking the streak — it just isn't counted itself.
 */
export function getCurrentStreak(buckets: WeekBucket[]): number {
  let i = buckets.length - 1;
  if (i >= 0 && buckets[i].count === 0) {
    i--;
  }

  let streak = 0;
  while (i >= 0 && buckets[i].count > 0) {
    streak++;
    i--;
  }
  return streak;
}

/** Longest run of consecutive weeks with at least one merged PR. */
export function getBestStreak(buckets: WeekBucket[]): number {
  let best = 0;
  let current = 0;
  for (const bucket of buckets) {
    if (bucket.count > 0) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }
  return best;
}
