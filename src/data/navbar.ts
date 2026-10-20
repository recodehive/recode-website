// Menu content for the site navbar (desktop mega menu and mobile sheet). Edit links here.
// Labels and descriptions must not contain em dashes.

export interface MenuLink {
  title: string;
  desc: string;
  href: string;
  /** Opens in a new tab with rel="noopener". */
  external?: boolean;
  /** Logo image from /static (used instead of an emoji). */
  img?: string;
  emoji?: string;
}

export const LEARN_ROWS: { label: string; links: MenuLink[] }[] = [
  {
    label: 'Tutorials',
    links: [
      { title: 'GitHub tutorials', desc: 'From your first repo to your first PR', href: '/docs/GitHub/intro-github', img: '/icons/github.svg' },
      { title: 'recode hive docs', desc: 'Guides for Git, SQL, Python and more', href: '/docs', img: '/icons/Logo-512X512.png' },
    ],
  },
  {
    label: 'Courses',
    links: [
      {
        title: 'Git course',
        desc: 'YouTube playlist',
        href: 'https://www.youtube.com/watch?v=GrTV59Y84S8&list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63',
        external: true,
        img: '/icons/git.svg',
      },
      {
        title: 'Postman course',
        desc: 'YouTube playlist',
        href: 'https://www.youtube.com/watch?v=O1ahDsq8DU0&list=PLrLTYhoDFx-k62rLLajSB-jeqKwLkDrkF',
        external: true,
        img: '/icons/postman.svg',
      },
    ],
  },
];

export const START_CARD = {
  eyebrow: 'START HERE',
  title: 'Your first PR in about 10 minutes',
  text: 'Set up the repo locally, then pick a good first issue.',
  cta: 'First-time setup',
  href: '/docs/first-time-setup',
};

export const SHOWCASE_LINKS: MenuLink[] = [
  { title: 'GitHub profiles', desc: 'Developer portfolios from the community', href: 'https://dev.recodehive.com/devfolio', external: true, emoji: '\u{1F4BB}' },
  { title: 'GitHub badges', desc: 'Every GitHub achievement and how to earn it', href: '/badges/github-badges/', emoji: '\u{1F396}️' },
  { title: 'Hire developers', desc: 'Work with recode hive contributors', href: '/hire-developers', emoji: '\u{1F9D1}‍\u{1F4BB}' },
];

export const MORE_LINKS: MenuLink[] = [
  { title: 'E-books', desc: 'Data scientist cheatsheet and interview guide', href: '/ebooks', emoji: '\u{1F4DA}' },
  { title: 'Roadmap', desc: 'What we are building next, on GitHub', href: 'https://github.com/orgs/recodehive/projects/9', external: true, emoji: '\u{1F5FA}️' },
  { title: 'Community', desc: 'Discussions and people building together', href: '/community', emoji: '\u{1F91D}' },
  { title: 'Broadcast', desc: 'Tutorials and past live sessions', href: '/broadcasts/', emoji: '\u{1F4FA}' },
  { title: 'Podcast', desc: 'Conversations with builders', href: '/podcasts/', emoji: '\u{1F399}️' },
  { title: 'Changelog', desc: 'Every release and who shipped it', href: '/changelog', emoji: '\u{1F4DD}' },
  { title: 'Merch store', desc: 'Tees, mugs and stickers', href: '/merch', emoji: '\u{1F6CD}️' },
];

export type TopItem =
  | { kind: 'menu'; id: 'learn' | 'showcase' | 'more'; emoji: string; label: string; to?: string; prefixes: string[] }
  | { kind: 'link'; id: string; emoji: string; label: string; to: string; prefixes: string[] };

/** The top level order, used by both the desktop bar and the mobile sheet. */
export const TOP_ITEMS: TopItem[] = [
  { kind: 'menu', id: 'learn', emoji: '\u{1F4DA}', label: 'Learn', prefixes: ['/learn', '/docs', '/courses'] },
  { kind: 'menu', id: 'showcase', emoji: '\u{1F30D}', label: 'Showcase', to: '/showcase', prefixes: ['/showcase', '/badges', '/hire-developers'] },
  { kind: 'link', id: 'dashboard', emoji: '\u{1F4CA}', label: 'Dashboard', to: '/dashboard', prefixes: ['/dashboard'] },
  { kind: 'link', id: 'donate', emoji: '\u{1F4B0}', label: 'Donate', to: '/our-sponsors/', prefixes: ['/our-sponsors'] },
  { kind: 'link', id: 'blogs', emoji: '\u{1F4F0}', label: 'Blogs', to: '/blogs', prefixes: ['/blogs', '/blog'] },
  { kind: 'menu', id: 'more', emoji: '\u{1F517}', label: 'More', prefixes: ['/ebooks', '/community', '/broadcasts', '/podcasts', '/changelog', '/merch', '/updates'] },
];

export const GITHUB_URL = 'https://github.com/recodehive';
export const DISCORD_URL = 'https://discord.gg/dh3TA8U55Q';
