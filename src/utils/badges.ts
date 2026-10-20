// Pure badge logic. No React, no side effects, so it can be unit tested with node:test.
import { BADGES, type Badge } from '../data/badges.ts';

export interface BadgeStats {
  prs: number;
  points: number;
  /** Position on the ranking chosen by RANK_PERIOD, or null when not ranked. */
  rank: number | null;
}

export interface BadgeProgress {
  current: number;
  target: number;
  pct: number;
  label: string;
}

const clampPct = (n: number): number => Math.max(0, Math.min(100, n));
const plural = (n: number, one: string, many: string): string => (n === 1 ? one : many);
const fmt = (n: number): string => n.toLocaleString('en-US');

export function isUnlocked(badge: Badge, stats: BadgeStats): boolean {
  if (badge.metric === 'rank') return stats.rank === badge.threshold;
  const main = badge.metric === 'prs' ? stats.prs >= badge.threshold : stats.points >= badge.threshold;
  if (main) return true;
  return badge.altThreshold ? stats.points >= badge.altThreshold.value : false;
}

export function getProgress(badge: Badge, stats: BadgeStats): BadgeProgress {
  if (badge.metric === 'rank') {
    const label = stats.rank === null ? 'Not ranked yet' : `Currently #${stats.rank}`;
    const unlocked = stats.rank === badge.threshold;
    return { current: unlocked ? 1 : 0, target: 1, pct: unlocked ? 100 : 0, label };
  }

  const primaryCurrent = badge.metric === 'prs' ? stats.prs : stats.points;
  const primaryPct = clampPct((primaryCurrent / badge.threshold) * 100);
  const unit = (n: number, metric: 'prs' | 'points') =>
    metric === 'prs' ? plural(n, 'merged PR', 'merged PRs') : plural(n, 'point', 'points');

  if (badge.altThreshold) {
    const altPct = clampPct((stats.points / badge.altThreshold.value) * 100);
    if (altPct > primaryPct) {
      return {
        current: stats.points,
        target: badge.altThreshold.value,
        pct: altPct,
        label: `${fmt(stats.points)} of ${fmt(badge.altThreshold.value)} points`,
      };
    }
  }

  return {
    current: primaryCurrent,
    target: badge.threshold,
    pct: primaryPct,
    label: `${fmt(primaryCurrent)} of ${fmt(badge.threshold)} ${unit(badge.threshold, badge.metric)}`,
  };
}

export function getUserBadges(
  stats: BadgeStats,
  badges: Badge[] = BADGES,
): { unlocked: Badge[]; locked: Badge[]; count: number; total: number } {
  const unlocked: Badge[] = [];
  const locked: Badge[] = [];
  for (const b of badges) (isUnlocked(b, stats) ? unlocked : locked).push(b);
  return { unlocked, locked, count: unlocked.length, total: badges.length };
}

/** The next locked badge on the merged PR path (milestones and PR based mastery badges). */
export function getNextBadge(stats: BadgeStats, badges: Badge[] = BADGES): Badge | null {
  const path = badges
    .filter((b) => b.metric === 'prs' && !isUnlocked(b, stats))
    .sort((a, b) => a.threshold - b.threshold);
  return path[0] ?? null;
}

/** The highest unlocked PR milestone badge, used for the chip on the podium. */
export function getTopMilestone(stats: BadgeStats, badges: Badge[] = BADGES): Badge | null {
  const earned = badges
    .filter((b) => b.group === 'milestone' && isUnlocked(b, stats))
    .sort((a, b) => b.threshold - a.threshold);
  return earned[0] ?? null;
}
