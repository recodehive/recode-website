// Curated Broadcasts content. Publish dates are added at build time by plugins/broadcasts-feed
// from YouTube's public RSS feeds (no API key). Never add durations or view counts here.

export type Topic = 'GitHub basics' | 'Achievements' | 'Open source' | 'Tools and AI';

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  topic: Topic;
  description: string;
  publishedAt?: string;
  lessonUrl?: string;
  seriesOrder?: number;
  /** Short name for the series shelf. */
  shortName?: string;
};

export type LiveSession = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  publishedAt?: string;
};

export const CHANNEL_URL = 'https://www.youtube.com/@RecodeHive';
export const TOPICS: Topic[] = ['GitHub basics', 'Achievements', 'Open source', 'Tools and AI'];

// TODO(sanjay): review every description below. They are first drafts written from the titles.
export const VIDEOS: Video[] = [
  {
    id: 'readme-profile',
    youtubeId: '3dnQ2lDNeGI',
    title: 'How to make a special README profile',
    topic: 'GitHub basics',
    description: 'Create the special repository that turns your GitHub profile page into a small portfolio, step by step.',
    lessonUrl: '/learn/github-for-beginners/profile-readme',
  },
  {
    id: 'first-repository',
    youtubeId: 'XWjx-RjmhRM',
    title: 'How to create your first GitHub repository',
    topic: 'GitHub basics',
    description: 'Make a repository from scratch, add your first files and save your first commit.',
    lessonUrl: '/learn/github-for-beginners/first-repository',
  },
  {
    id: 'first-open-source',
    youtubeId: 'R7NReLBCT_8',
    title: 'How to do your first open source contribution on GitHub',
    topic: 'Open source',
    description: 'Fork a project, make a small change and open a pull request, the same flow you use on recode hive.',
    lessonUrl: '/learn/github-for-beginners/first-recode-hive-pr',
  },
  {
    id: 'achievements',
    youtubeId: 'sbyXpflAXkQ',
    title: 'How to unlock GitHub achievements',
    topic: 'Achievements',
    description: 'A tour of the badges that appear on your profile and what it takes to earn each one.',
    lessonUrl: '/learn/github-for-beginners/achievements',
    seriesOrder: 1,
    shortName: 'All achievements',
  },
  {
    id: 'pull-shark',
    youtubeId: '7uKMWBFN2jQ',
    title: 'How to get the Pull Shark badge',
    topic: 'Achievements',
    description: 'Learn how merged pull requests earn the Pull Shark badge and how the tiers work.',
    seriesOrder: 2,
    shortName: 'Pull Shark',
  },
  {
    id: 'galaxy-brain',
    youtubeId: 'v2Pai1TY_Lg',
    title: 'How to get the Galaxy Brain badge',
    topic: 'Achievements',
    description: 'See how accepted answers in GitHub Discussions unlock the Galaxy Brain badge.',
    seriesOrder: 3,
    shortName: 'Galaxy Brain',
  },
  {
    id: 'starstruck',
    youtubeId: 'P-P3L7YzlyE',
    title: 'How to get the Starstruck badge',
    topic: 'Achievements',
    description: 'Find out how stars on your repositories add up to the Starstruck badge.',
    seriesOrder: 4,
    shortName: 'Starstruck',
  },
  {
    id: 'quickdraw',
    youtubeId: 'BNKSlT8jLQ0',
    title: 'How to get the Quickdraw badge',
    topic: 'Achievements',
    description: 'The fastest badge to earn: close an issue or pull request within five minutes of opening it.',
    seriesOrder: 5,
    shortName: 'Quickdraw',
  },
  {
    id: 'yolo',
    youtubeId: 'GnHNScuGKrg',
    title: 'How to get the YOLO badge',
    topic: 'Achievements',
    description: 'Merge a pull request without a review to unlock the YOLO badge, and why you should do it only on practice repos.',
    seriesOrder: 6,
    shortName: 'YOLO',
  },
  {
    id: 'sponsors',
    youtubeId: 'RSR5E1bhu5Y',
    title: 'How to get sponsored on GitHub: a step-by-step guide',
    topic: 'Open source',
    description: 'Set up GitHub Sponsors for your open source work and learn what supporters see on your profile.',
  },
  {
    id: 'student-pack',
    youtubeId: 'knr5gBv-c9c',
    title: 'How to enable the GitHub Student Developer Pack',
    topic: 'Tools and AI',
    description: 'Apply for the Student Developer Pack and unlock the free tools and credits that come with it.',
  },
  {
    id: 'copilot',
    youtubeId: '4JX-SIkM3uk',
    title: 'Hands on GitHub Copilot: AI assistant on GitHub',
    topic: 'Tools and AI',
    description: 'Try Copilot on a real repository and see where an AI assistant helps and where you still need to think.',
  },
];

// TODO(sanjay): review these descriptions too. More past sessions can be added to this list.
export const LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'profile-review-4',
    youtubeId: 'rbi6XhWp2TU',
    title: 'GitHub profile review session 4',
    description: 'A live walkthrough where community profiles get reviewed and improved on the spot.',
  },
  {
    id: 'code-reviews',
    youtubeId: 'aGyfIrxx1H8',
    title: 'Mastering GitHub code reviews',
    description: 'A live session on giving and receiving code reviews in pull requests.',
  },
  {
    id: 'hacktoberfest-2021',
    youtubeId: 'vFS6ZU1WAPA',
    title: 'Hacktoberfest 2021: a complete guide to getting started with open source',
    description: 'A live guide to taking part in Hacktoberfest and making your first contributions.',
  },
  {
    id: 'interview-arjun',
    youtubeId: 'DWxyEl-t48g',
    title: 'How to crack an interview with Arjun Vijayvargiya',
    description: 'A live conversation about preparing for technical interviews.',
  },
];

export const thumbnail = (youtubeId: string): string => `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
export const embedUrl = (youtubeId: string): string => `https://www.youtube-nocookie.com/embed/${youtubeId}`;
