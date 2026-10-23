// Content for docs/how-the-leaderboard-works.mdx. Badge names, criteria and colours come from src/data/badges.ts
// and point values from the leaderboard's pointsConfig.ts, so the guide cannot drift from the leaderboard.
import { DISCORD_URL } from './navbar';

/** The backend (sanjay-kv/leaderboard) rebuilds the board on this schedule. */
export const REFRESH_HOURS = 2;
/** The site keeps a copy of the board in the browser for this long. */
export const CACHE_MINUTES = 10;

export const SHORT_STEPS: { title: string; text: string }[] = [
  { title: 'Pick an issue', text: 'Get assigned an issue labelled recode and a level.' },
  { title: 'Get it merged', text: 'A maintainer merges your pull request.' },
  { title: 'Earn points', text: '10, 30 or 50 points, by level.' },
  { title: 'Climb and unlock', text: 'Move up the leaderboard and earn badges.' },
];

/** What each label means, keyed by the label name in pointsConfig.ts. */
export const LEVEL_COPY: Record<string, string> = {
  'level 1': 'Small fixes, docs, content updates',
  'level 2': 'Features and medium changes',
  'level 3': 'Large or complex work',
};

/** Badge ids from src/data/badges.ts, grouped for the explorer. */
export const BADGE_GROUPS: { title: string; ids: string[] }[] = [
  { title: 'Every journey starts somewhere', ids: ['first-contribution', 'bronze'] },
  { title: 'Progress earned through consistency', ids: ['silver', 'gold'] },
  { title: 'Commitment creates impact', ids: ['platinum', 'diamond'] },
  { title: 'Rewarding quality contributions', ids: ['points-master', 'elite'] },
  { title: 'Reserved for the most dedicated', ids: ['legendary', 'hall-of-fame'] },
];

export const RANK_TITLES: Record<string, string> = {
  'rank-1': 'Top contributor',
  'rank-2': 'Second place',
  'rank-3': 'Third place',
};

export const HERO_BADGES = ['diamond', 'rank-1', 'legendary', 'first-contribution', 'points-master'];

export const BADGE_CREDIT = { name: 'Sowmiya V', role: 'Brand Designer' };

export const WEEKLY_MVP = {
  title: 'Weekly MVP',
  text: 'Top of the weekly dashboard, scored on PR volume, code quality and helping others.',
  reward: '₹500',
  via: 'through GitHub Sponsors',
};

export type RewardIcon = 'phone' | 'star' | 'key' | 'commit' | 'briefcase' | 'rocket' | 'gift' | 'share';

export interface Reward {
  icon: RewardIcon;
  title: string;
  text: string;
  href?: string;
  isNew?: boolean;
}

export interface Tier {
  name: string;
  /** The requirement, split so the key number can be bold. */
  key: string;
  rest: string;
  color: string;
  rewards: Reward[];
}

export const TIERS: Tier[] = [
  {
    name: 'Bronze Contributor',
    key: '5 merged PRs',
    rest: 'on backend or core repos',
    color: '#c2652a',
    rewards: [{ icon: 'phone', title: 'Free mentorship', text: '1:1 calls, reviews and guides from the founder. See below.' }],
  },
  {
    name: 'Core Maintainer',
    key: '50 merged PRs',
    rest: 'plus an interview with the founder',
    color: '#15803d',
    rewards: [
      {
        icon: 'star',
        title: 'Featured on the Hire Developers page',
        text: 'Clients can find and hire you',
        href: 'https://www.recodehive.com/hire-developers',
        isNew: true,
      },
      { icon: 'key', title: 'Maintainer role', text: 'Merge rights on the repo' },
      { icon: 'commit', title: 'Co-author credit', text: 'Your name on Git commits' },
    ],
  },
  {
    name: 'Senior Maintainer',
    key: '180 days',
    rest: 'active as a maintainer',
    color: '#0369a1',
    rewards: [
      { icon: 'briefcase', title: 'Paid client projects', text: 'Real work, paid' },
      { icon: 'rocket', title: '$100 profile boost', text: 'A boosted ad slot on the Hire page', isNew: true },
    ],
  },
  {
    name: 'recode hive Fellow',
    key: '365 days',
    rest: 'of active contributions',
    color: '#a16207',
    rewards: [
      { icon: 'gift', title: '₹2,500 bonus', text: 'Paid out on reaching Fellow' },
      { icon: 'share', title: 'Network referrals', text: 'Introductions to people hiring' },
    ],
  },
];

export type OfferingIcon = 'message' | 'book' | 'video';

export interface Offering {
  icon: OfferingIcon;
  type: string;
  title: string;
  text: string;
  /** Contributors ask for a free code here. Never the public paid page. */
  claimUrl: string;
}

export const MENTORSHIP_CLAIM = 'Reached Tier 1? Ask in Discord for your contributor code to claim any of these for free.';

export const OFFERINGS: Offering[] = [
  { icon: 'message', type: 'Priority DM', title: 'Job Seeker Crash Course', text: 'Kickstart your job search and land your dream role.', claimUrl: DISCORD_URL },
  { icon: 'message', type: 'Priority DM · 7 days reply', title: 'Resume Bundle and ATS Scoring', text: 'Optimise your resume with ATS scoring.', claimUrl: DISCORD_URL },
  { icon: 'message', type: 'Priority DM', title: 'Open source mentorship and GitHub profile review', text: 'Mentorship plus a hands-on guide to your GitHub profile.', claimUrl: DISCORD_URL },
  { icon: 'book', type: 'Digital product', title: 'Data Scientist Cheat Sheet and Interview Guide', text: 'The book covers data science topics and interview questions.', claimUrl: DISCORD_URL },
  { icon: 'video', type: 'Video meeting · 45 mins', title: '1:1 Mentorship', text: 'A live session on your career, projects and next steps.', claimUrl: DISCORD_URL },
  { icon: 'video', type: 'Video meeting · 30 mins', title: 'Resume review', text: 'Line-by-line feedback on your resume.', claimUrl: DISCORD_URL },
];

/** Add new recipients at the end. */
export const SPONSOR_RECIPIENTS: { handle: string; date: string }[] = [
  { handle: 'Ayushgupta2408', date: 'Oct 8, 2026' },
  { handle: 'steam-bell-92', date: 'Oct 17, 2026' },
];

export const SPONSOR_POST_URL = 'https://github.com/recodehive/recode-website/issues/2181';

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is the difference between badges and perks?',
    a: 'Badges are earned automatically from your merged pull requests and points, and show on the leaderboard and your profile. Perks, like free mentorship or the maintainer role, are rewards the founder grants as you progress.',
  },
  {
    q: 'Do pull requests that are not merged count?',
    a: 'No. Only merged pull requests with the recode label and a level label count.',
  },
  {
    q: 'What if a pull request has more than one level label?',
    a: 'Only the lowest level counts. A PR labelled level 1 and level 3 scores 10 points, so ask a maintainer to keep just the right level.',
  },
  {
    q: 'How do I become Weekly MVP?',
    a: 'Finish the week at the top of the dashboard. It looks at the volume of your merged PRs, their quality, and how much you help others in reviews and discussions.',
  },
  {
    q: 'Where does the sponsorship money come from?',
    a: 'recode hive is funded by the founder, and sponsor money follows a 100% redistribution model: it goes to active contributors.',
  },
  {
    q: 'Where can I see my badges?',
    a: 'On the leaderboard in the dashboard. Your badges show next to your name, and when you are signed in the badge rail shows your progress and the next one to unlock. Tap any badge to see what it means.',
  },
];
