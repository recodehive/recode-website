// Run with: npm run test:contributors
import test from 'node:test';
import assert from 'node:assert/strict';
import { getContributors, getBotCount } from './releaseContributors.ts';

const url = (n) => `https://github.com/recodehive/recode-website/pull/${n}`;

test('counts a normal line for its author', () => {
  const body = `* feat: add sidebar by @sanjay-kv in ${url(2046)}`;
  assert.deepEqual(getContributors(body), [{ handle: 'sanjay-kv', prs: 1 }]);
  assert.equal(getBotCount(body), 0);
});

test('credits "by @X with @Copilot" to X only', () => {
  const body = `* fix: tidy styles by @Adez017 with @Copilot in ${url(2100)}`;
  assert.deepEqual(getContributors(body), [{ handle: 'Adez017', prs: 1 }]);
  assert.equal(getBotCount(body), 0);
});

test('excludes dependabot and counts its PRs as bot PRs', () => {
  const body = [
    `* chore: bump a from 1 to 2 by @dependabot[bot] in ${url(2058)}`,
    `* chore: bump b from 1 to 2 by @dependabot[bot] in ${url(2059)}`,
    `* feat: real work by @steam-bell-92 in ${url(2060)}`,
  ].join('\n');
  assert.deepEqual(getContributors(body), [{ handle: 'steam-bell-92', prs: 1 }]);
  assert.equal(getBotCount(body), 2);
});

test('never double counts the same PR number', () => {
  const body = [
    `* feat: one by @anujsharma8d in ${url(2070)}`,
    `* feat: one again by @anujsharma8d in ${url(2070)}`,
    `* feat: two by @anujsharma8d in ${url(2071)}`,
  ].join('\n');
  assert.deepEqual(getContributors(body), [{ handle: 'anujsharma8d', prs: 2 }]);
});

test('sorts by PR count then handle', () => {
  const body = [
    `* a by @zed in ${url(1)}`,
    `* b by @amy in ${url(2)}`,
    `* c by @amy in ${url(3)}`,
    `* d by @bob in ${url(4)}`,
  ].join('\n');
  assert.deepEqual(getContributors(body), [
    { handle: 'amy', prs: 2 },
    { handle: 'bob', prs: 1 },
    { handle: 'zed', prs: 1 },
  ]);
});
