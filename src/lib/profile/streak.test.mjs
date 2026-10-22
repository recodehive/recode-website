import test from 'node:test';
import assert from 'node:assert/strict';
import { computeStreak, dateKeyInZone, shiftDay } from './streak.ts';

const run = (from, n, count = 1) => Array.from({ length: n }, (_, i) => ({ date: shiftDay(from, i), count }));
const noon = (key) => new Date(`${key}T12:00:00Z`);

test('a streak that includes today counts today', () => {
  const s = computeStreak(run('2026-10-18', 4), noon('2026-10-21'));
  assert.equal(s.current, 4);
  assert.equal(s.currentSince, '2026-10-18');
});

test('today with no contributions yet keeps the streak alive from yesterday', () => {
  const days = [...run('2026-10-17', 4), { date: '2026-10-21', count: 0 }];
  const s = computeStreak(days, noon('2026-10-21'));
  assert.equal(s.current, 4);
});

test('two empty days in a row end the streak', () => {
  const s = computeStreak(run('2026-10-10', 5), noon('2026-10-21'));
  assert.equal(s.current, 0);
  assert.equal(s.longest, 5);
});

test('a gap splits the runs and the longest wins, with its date range', () => {
  const days = [...run('2026-05-15', 17), ...run('2026-06-10', 3), ...run('2026-10-08', 14)];
  const s = computeStreak(days, noon('2026-10-21'));
  assert.equal(s.longest, 17);
  assert.equal(s.longestFrom, '2026-05-15');
  assert.equal(s.longestTo, '2026-05-31');
  assert.equal(s.current, 14);
});

test('the streak runs across a year boundary', () => {
  const s = computeStreak(run('2025-12-30', 4), noon('2026-01-02'));
  assert.equal(s.current, 4);
  assert.equal(s.longest, 4);
  assert.equal(s.currentSince, '2025-12-30');
});

test('"today" follows the owner time zone, not UTC', () => {
  // 20:00 UTC on Oct 21 is already Oct 22 in Sydney (UTC+11)
  const now = new Date('2026-10-21T20:00:00Z');
  assert.equal(dateKeyInZone(now, 'UTC'), '2026-10-21');
  assert.equal(dateKeyInZone(now, 'Australia/Sydney'), '2026-10-22');
  const days = run('2026-10-19', 3); // Oct 19, 20, 21
  assert.equal(computeStreak(days, now, 'UTC').current, 3);
  // In Sydney today (Oct 22) is empty so the streak is carried from Oct 21
  assert.equal(computeStreak(days, now, 'Australia/Sydney').current, 3);
});

test('an unknown time zone falls back to UTC', () => {
  assert.equal(dateKeyInZone(new Date('2026-10-21T20:00:00Z'), 'Not/AZone'), '2026-10-21');
});

test('totals for the last 12 months and the last 7 days', () => {
  const days = [
    { date: '2025-10-01', count: 9 }, // older than 365 days, ignored
    { date: '2026-03-01', count: 5 },
    { date: '2026-10-15', count: 2 },
    { date: '2026-10-21', count: 3 },
  ];
  const s = computeStreak(days, noon('2026-10-21'));
  assert.equal(s.last12Months, 10);
  assert.equal(s.last7Days, 5);
});

test('no contributions at all', () => {
  const s = computeStreak([], noon('2026-10-21'));
  assert.equal(s.current, 0);
  assert.equal(s.longest, 0);
  assert.equal(s.longestFrom, null);
});
