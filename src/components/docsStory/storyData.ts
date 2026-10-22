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
export const LEARNERS = 4500;

export type Era = 'idea' | 'early' | 'apr' | 'recodenow' | 'feedbuffer' | 'oct' | 'recode-v1-2-2' | 'recode-v1-2' | 'next';

export type Milestone = {
  id: string;
  era: Era;
  date: string;
  title: string;
  text: string;
  /** Path under /static. If the file is missing a tinted skeleton is shown instead. */
  screenshot?: string;
  caption?: string;
  url?: string;
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
    url: 'recodehive.com',
  },
  {
    id: 'apr',
    era: 'apr',
    date: 'OCT 2010',
    title: 'The first Blog for the School',
    text: 'The IT club after school time kicked off blogging passion, we started with 10 people updating Tech news.',
    screenshot: '/img/journey/school-blog.png',
    caption: 'The first blog at school, where it all began',
    url: 'bethanykkm.blogspot.com',
  },
  {
    id: 'early',
    era: 'early',
    date: 'DEC 2012',
    title: 'My 1st Independent Blog',
    text: 'Started first independent blog, it was known as factnscience.blogger.com, then changed name to tutorialnow24.',
    screenshot: '/img/journey/tutorialnow24.png',
    caption: 'The beginning of tutorialnow24, sharing tech knowledge',
    url: 'tutorialnow24.blogspot.com',
  },
  {
    id: 'recodenow',
    era: 'recodenow',
    date: ' JAN 2016',
    title: 'V1.1.0 1st version of recodehive',
    text: 'This is the 1st version of named recodenow, running on blogger.com. Inspired from Silicon Valley series :P',
    screenshot: '/img/journey/recodenow.png',
    caption: 'The first version of recodehive,',
    url: 'recodenow.com',
  },
  {
    id: 'feedbuffer',
    era: 'feedbuffer',
    date: 'FEB 2021',
    title: 'Crypto and Tech Blog',
    text: 'Started Feedbuffer.blogspot.com, wanted to do it in side along with recodenow that point of time, it got shelved when my masters kicked in.',
    screenshot: '/img/journey/feedbuffer.png',
    caption: 'FeedBuffer: exploring crypto and tech',
    url: 'feedbuffer.blogspot.com',
  },
  {
    id: 'recode-v1-2-2',
    era: 'recode-v1-2-2',
    date: 'DEC 2023',
    title: 'V1.2.2 Revamped recodehive',
    text: 'It ran on blogger 1st, Wanted to do beyond writing content, but blogger made my hands tied.',
    screenshot: '/img/journey/recode-v1-2-2.png',
    caption: 'Revamped recodehive platform',
    url: 'recodehive.com',
  },
  {
    id: 'recode-v1-2',
    era: 'recode-v1-2',
    date: 'FEB 2025',
    title: 'V2.2.0 and 120 contributors',
    text: 'The current recodehive.com went live, shifted codebase to github and made opensource, so now its more than a blog. I call the recode community.',
    screenshot: '/img/journey/recode-v1-2.png',
    caption: 'The new recodehive launches on GitHub',
    url: 'recodehive.com',
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
