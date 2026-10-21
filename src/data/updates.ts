// What's new: the manually written list shown on /updates.
//
// To add an update, copy one block, paste it at the TOP of the list and change the text.
//   date         the day it shipped, written YYYY-MM-DD (required)
//   title        short heading (required)
//   description  one or two sentences (required)
//   isNew        true shows the blue "New" tag. Remove it once the update is no longer fresh.
//   image        optional picture, like "/img/updates/giveaway.png" (put the file in static/img/updates)
//   imageAlt     describe the picture for people using screen readers (needed when image is set)
//   video        optional video link to embed (a YouTube embed URL, like https://www.youtube.com/embed/xxxx)
//   bullets      optional short list of what is new
//   link         optional { label, url } for the blue link at the bottom
//
// Anything you leave out is simply not shown.

export interface SiteUpdate {
  date: string;
  title: string;
  description: string;
  isNew?: boolean;
  image?: string;
  imageAlt?: string;
  video?: string;
  bullets?: string[];
  link?: { label: string; url: string };
}

export const UPDATES: SiteUpdate[] = [
  {
    date: '2026-10-21',
    title: 'Halloween giveaway: the Quest board',
    description: 'Collect entries for a ₹500 Amazon voucher between Oct 21 and Nov 1, Sydney time.',
    isNew: true,
    bullets: [
      'Quests for starring, following and getting a pull request merged, with a live countdown',
      'A personal link to bring a friend and earn extra entries',
      'The rules and how the winner is picked, on the same page',
    ],
    link: { label: 'Open the giveaway', url: '/dashboard#giveaway' },
  },
  {
    date: '2026-10-21',
    title: 'Achievement badges on the leaderboard',
    description: '13 badges, from your first merged PR to the top of the leaderboard.',
    isNew: true,
    bullets: [
      'A badge popup that shows your progress toward each one',
      'The leaderboard lists every contributor\'s three best badges with a total',
      'Locked badges carry a clear lock so they stand apart from the ones you have earned',
    ],
    link: { label: 'See the leaderboard', url: '/dashboard#leaderboard' },
  },
  {
    date: '2026-10-21',
    title: 'Community Discussions, powered by GitHub',
    description: 'Browse the real GitHub Discussions of recodehive without leaving the dashboard.',
    isNew: true,
    bullets: [
      'Read any post in a popup',
      'Search, sort and filter by category',
      'Reply and upvote on GitHub',
    ],
    link: { label: 'Open discussions', url: '/dashboard#discuss' },
  },
  {
    date: '2026-10-20',
    title: 'A new dashboard and sidebar',
    description: 'Your merged PRs, current streak and leaderboard rank in one overview.',
    bullets: [
      'One sidebar for Overview, Discussions, Leaderboard, Giveaways, Learn and Blogs',
      'Notifications, Updates, Community and Help center at the bottom of the sidebar',
    ],
    link: { label: 'Open the dashboard', url: '/dashboard' },
  },
  {
    date: '2026-10-20',
    title: 'A free Learn section',
    description: 'Start with the GitHub for Beginners course, free for everyone.',
    bullets: ['The course is organised into six modules with video lessons and written guides'],
    link: { label: 'Start learning', url: '/learn' },
  },
];
