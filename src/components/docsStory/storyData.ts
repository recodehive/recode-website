import releases from '../../data/releases.json';
import { formatVersion } from '../dashboard/overview/releaseData';
import { getContributors } from '../../utils/releaseContributors';

// All copy, numbers and milestones for the docs "Our story" intro live here.
// Any field left empty is not rendered. Never ship bracket placeholders.

type RawRelease = { tagName: string; publishedAt: string; body: string };
const list = releases as RawRelease[];

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const monthYear = (iso: string) => {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};

// Release facts come from the build-time snapshot in src/data/releases.json.
const byDate = [...list].sort((a, b) => +new Date(a.publishedAt) - +new Date(b.publishedAt));
const first = byDate[0];
const latest = byDate[byDate.length - 1];
const year = latest ? new Date(latest.publishedAt).getUTCFullYear() : new Date().getFullYear();
// The same version can be published twice with different tag casing, so count unique versions.
const releasesThisYear = new Set(
  list.filter((r) => new Date(r.publishedAt).getUTCFullYear() === year).map((r) => formatVersion(r.tagName)),
).size;

// Numbers that have no build-time source yet.
// TODO(sanjay): keep in sync with the dashboard Contributors tile (106 at the time of writing).
export const CONTRIBUTORS = 106;
// TODO(sanjay): total stars across the public repos (1.15K at the time of writing).
export const STARS = 1150;
// TODO(sanjay): learners reached by tutorials and sessions (your figure, 12,000+).
export const LEARNERS = 12000;

export type Era = 'idea' | 'early' | 'apr' | 'oct' | 'next';

export type Milestone = {
  id: string;
  era: Era;
  date: string;
  title: string;
  text: string;
  /** Path under /static. If the file is missing a tinted skeleton is shown instead. */
  screenshot?: string;
  caption?: string;
};

const ALL_MILESTONES: Milestone[] = [
  {
    id: 'idea',
    era: 'idea',
    date: '', // TODO(sanjay): year the idea started
    title: 'The idea',
    text: '', // TODO(sanjay): one or two sentences about the moment you decided to start recode hive
    screenshot: '/img/journey/idea.webp',
    caption: '', // TODO(sanjay)
  },
  {
    id: 'early',
    era: 'early',
    date: '', // TODO(sanjay): year of the first workshops
    title: 'First workshops and learners',
    text: '', // TODO(sanjay): a sentence about the first workshops. Keep the "12,000+ learners" claim only if it is accurate.
    screenshot: '/img/journey/early.webp',
    caption: '', // TODO(sanjay)
  },
  {
    id: 'apr',
    era: 'apr',
    date: first ? monthYear(first.publishedAt) : '',
    title: first ? `${formatVersion(first.tagName)}: the website goes open source` : '',
    text: first
      ? `The first tagged release ships with ${getContributors(first.body).length} contributors in its changelog.`
      : '',
    screenshot: '/img/journey/apr-2026.webp',
    caption: 'The blue theme, at the first tagged release',
  },
  {
    id: 'oct',
    era: 'oct',
    date: latest ? `${monthYear(latest.publishedAt)} · NOW` : '',
    title: latest ? `${formatVersion(latest.tagName)} and ${CONTRIBUTORS} contributors` : '',
    text: `${WORDS[releasesThisYear] ?? releasesThisYear} releases in ${year} and a contributor community that keeps growing with every merged PR.`,
    screenshot: '/img/journey/oct-2026.webp',
    caption: 'Today: the green theme since V1.0.7',
  },
  {
    id: 'next',
    era: 'next',
    date: 'NEXT',
    title: 'Your first PR',
    text: 'The next milestone on this timeline could be yours.',
  },
];

/** Milestones with an empty date, title or text are hidden. */
export const MILESTONES = ALL_MILESTONES.filter((m) => m.date.trim() && m.title.trim() && m.text.trim());

export const IMPACT = [
  { id: 'learners', value: LEARNERS, suffix: '+', label: 'learners reached', featured: true, k: false },
  { id: 'contributors', value: CONTRIBUTORS, suffix: '', label: 'contributors on GitHub', featured: false, k: false },
  { id: 'stars', value: STARS, suffix: '', label: 'stars across repos', featured: false, k: true },
  { id: 'releases', value: releasesThisYear, suffix: '', label: `releases in ${year}`, featured: false, k: false },
].filter((t) => t.value > 0);

export const FOUNDER = {
  // TODO(sanjay): 3 to 5 sentences in your own words. Leave empty to hide the whole section.
  quote: '',
  name: 'Sanjay Viswanathan',
  role: 'Founder, recode hive · GitHub Campus Expert',
  photo: '/img/founder/sanjay.jpg',
};

// Top contributors by merged PRs named in the release notes (bots and Copilot excluded).
const tally = new Map<string, { handle: string; prs: number }>();
for (const r of list) {
  for (const c of getContributors(r.body)) {
    const key = c.handle.toLowerCase();
    const cur = tally.get(key) ?? { handle: c.handle, prs: 0 };
    cur.prs += c.prs;
    tally.set(key, cur);
  }
}
export const WALL_HANDLES: string[] = [...tally.values()]
  .sort((a, b) => b.prs - a.prs || a.handle.localeCompare(b.handle))
  .slice(0, 20)
  .map((c) => c.handle);

export const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';
export const SETUP_ANCHOR = '#set-up-the-repository-locally';
