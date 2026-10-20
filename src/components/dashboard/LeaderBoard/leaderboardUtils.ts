export type Period = 'week' | 'month' | 'all';

export const PERIOD_LABEL: Record<Period, string> = {
  week: 'This week',
  month: 'This month',
  all: 'All time',
};

const MS_HOUR = 3600000;
export const STALE_AFTER_MS = 6 * MS_HOUR;
// The backend cron fires every 2 hours, at even UTC hours.
export const REFRESH_EVERY_HOURS = 2;

export function nextScheduledRun(now: Date): Date {
  const next = new Date(now);
  next.setUTCMinutes(0, 0, 0);
  next.setUTCHours(next.getUTCHours() + 1);
  while (next.getUTCHours() % REFRESH_EVERY_HOURS !== 0) next.setUTCHours(next.getUTCHours() + 1);
  return next;
}

export const avatarSrc = (url: string): string =>
  `${url}${url.includes('?') ? '&' : '?'}s=96`;

export const shortDate = (d: Date): string => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
export const timeOfDay = (d: Date): string => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
export const updatedStamp = (d: Date): string => `${shortDate(d)}, ${timeOfDay(d)}`;

/** Date range label for a period. Mirrors the rolling windows used by statsProvider. */
export function rangeLabel(period: Period, fallback: boolean, earliest: Date | null, now: Date): string {
  const day = 86400000;
  if (period === 'week') {
    if (fallback) return `${shortDate(new Date(now.getTime() - 14 * day))} to ${shortDate(new Date(now.getTime() - 7 * day))}`;
    return `${shortDate(new Date(now.getTime() - 7 * day))} to ${shortDate(now)}`;
  }
  if (period === 'month') {
    const start = new Date(now);
    start.setMonth(now.getMonth() - 1);
    return `${shortDate(start)} to ${shortDate(now)}`;
  }
  return earliest ? `Since ${shortDate(earliest)}, ${earliest.getFullYear()}` : 'All time';
}
