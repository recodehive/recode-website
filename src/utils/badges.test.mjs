// Run with: npm run test:badges
import test from 'node:test';
import assert from 'node:assert/strict';
import { BADGES } from '../data/badges.ts';
import { getEarnedByPrestige, getNextBadge, getProgress, getTopMilestone, getUserBadges, isUnlocked } from './badges.ts';

const badge = (id) => BADGES.find((b) => b.id === id);
const stats = (prs, points = 0, rank = null) => ({ prs, points, rank });

test('has 13 badges with unique ids', () => {
  assert.equal(BADGES.length, 13);
  assert.equal(new Set(BADGES.map((b) => b.id)).size, 13);
});

test('0 PRs unlocks nothing', () => {
  const r = getUserBadges(stats(0));
  assert.equal(r.count, 0);
  assert.equal(r.total, 13);
});

test('exactly on a threshold unlocks, one below does not', () => {
  assert.equal(isUnlocked(badge('bronze'), stats(5)), true);
  assert.equal(isUnlocked(badge('bronze'), stats(4)), false);
  assert.equal(isUnlocked(badge('points-master'), stats(0, 500)), true);
  assert.equal(isUnlocked(badge('points-master'), stats(0, 499)), false);
});

test('Hall of Fame unlocks on points alone or on PRs alone', () => {
  assert.equal(isUnlocked(badge('hall-of-fame'), stats(10, 5000)), true);
  assert.equal(isUnlocked(badge('hall-of-fame'), stats(1000, 0)), true);
  assert.equal(isUnlocked(badge('hall-of-fame'), stats(999, 4999)), false);
});

test('Hall of Fame progress follows whichever path is closer', () => {
  const byPoints = getProgress(badge('hall-of-fame'), stats(10, 4000));
  assert.equal(byPoints.label, '4,000 of 5,000 points');
  assert.equal(byPoints.pct, 80);
  const byPrs = getProgress(badge('hall-of-fame'), stats(900, 10));
  assert.equal(byPrs.label, '900 of 1,000 merged PRs');
});

test('rank badges match the exact rank only', () => {
  for (const [rank, id] of [[1, 'rank-1'], [2, 'rank-2'], [3, 'rank-3']]) {
    assert.equal(isUnlocked(badge(id), stats(0, 0, rank)), true);
  }
  assert.equal(isUnlocked(badge('rank-1'), stats(0, 0, 4)), false);
  assert.equal(isUnlocked(badge('rank-3'), stats(0, 0, 2)), false);
});

test('rank progress labels', () => {
  assert.equal(getProgress(badge('rank-1'), stats(0, 0, 12)).label, 'Currently #12');
  assert.equal(getProgress(badge('rank-1'), stats(0, 0, null)).label, 'Not ranked yet');
  assert.equal(isUnlocked(badge('rank-1'), stats(5, 50, null)), false);
});

test('progress label and clamping', () => {
  const p = getProgress(badge('silver'), stats(3));
  assert.equal(p.label, '3 of 10 merged PRs');
  assert.equal(p.pct, 30);
  assert.equal(getProgress(badge('silver'), stats(500)).pct, 100);
  assert.equal(getProgress(badge('points-master'), stats(0, 120)).label, '120 of 500 points');
});

test('next badge is the next locked PR milestone', () => {
  assert.equal(getNextBadge(stats(0)).id, 'first-contribution');
  assert.equal(getNextBadge(stats(5)).id, 'silver');
  assert.equal(getNextBadge(stats(1000)), null);
});

test('top milestone is the highest unlocked milestone', () => {
  assert.equal(getTopMilestone(stats(0)), null);
  assert.equal(getTopMilestone(stats(30)).id, 'gold');
});

test('earned badges are ordered by prestige', () => {
  assert.deepEqual(getEarnedByPrestige(stats(0)).map((b) => b.id), []);
  assert.deepEqual(getEarnedByPrestige(stats(30)).map((b) => b.id), ['gold', 'silver', 'bronze', 'first-contribution']);
  // Rank badges lead, and rank #1 comes before rank #3
  const ids = getEarnedByPrestige(stats(30, 0, 1)).map((b) => b.id);
  assert.equal(ids[0], 'rank-1');
  assert.equal(ids[1], 'gold');
});
