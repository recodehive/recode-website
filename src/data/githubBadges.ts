// All content for the GitHub Badges page. Edit copy, links and images here.
// Badge artwork is GitHub's own; it is hot-linked, not copied into this repo.

const GH = 'https://github.githubassets.com/images/modules/profile/achievements/';
const RAW = 'https://raw.githubusercontent.com/recodehive/awesome-github-profiles/main/assets/Badges/';

export const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';

export const TIER_NAMES = ['Default', 'Bronze', 'Silver', 'Gold'] as const;

export type Earnable = {
  id: string;
  name: string;
  image: string;
  /** One image per tier, Default first. Single tier badges have one entry. */
  tierImages: string[];
  /** Count needed for each tier, Default first. */
  tiers: number[];
  how: string;
  tip: string;
  ctaLabel?: string;
  ctaUrl?: string;
  tutorialUrl?: string;
};

export const earnable: Earnable[] = [
  {
    id: 'starstruck',
    name: 'Starstruck',
    image: `${GH}starstruck-default.png`,
    tierImages: [`${GH}starstruck-default.png`, `${GH}starstruck-bronze.png`, `${GH}starstruck-silver.png`, `${GH}starstruck-gold.png`],
    tiers: [16, 128, 512, 4096],
    how: 'Own a repository that earns stars from other users.',
    tip: 'Build something useful and document it well. Asking for star swaps can get flagged as spam.',
    ctaLabel: 'Example repo',
    ctaUrl: 'https://github.com/sanjay-kv/Open-source-Practice',
    tutorialUrl: 'https://youtu.be/v2Pai1TY_Lg',
  },
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    image: `${GH}quickdraw-default.png`,
    tierImages: [`${GH}quickdraw-default.png`],
    tiers: [1],
    how: 'Close an issue or pull request within 5 minutes of opening it.',
    tip: 'Open an issue in your own repo for a small to-do, fix it, and close it in the same sitting.',
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    image: `${GH}pair-extraordinaire-default.png`,
    tierImages: [
      `${RAW}Pair-Extraordinaire/PNG/PairExtraordinaire.png`,
      `${RAW}Pair-Extraordinaire/PNG/PairExtraordinaire_Bronze.png`,
      `${RAW}Pair-Extraordinaire/PNG/PairExtraordinaire_Silver.png`,
      `${RAW}Pair-Extraordinaire/PNG/PairExtraordinaire_Gold.png`,
    ],
    tiers: [1, 10, 24, 48],
    how: 'Coauthor commits on a merged pull request.',
    tip: 'Add a Co-authored-by: Name <email> line at the end of the commit message. Works from any editor.',
    ctaLabel: 'Tutorial',
    ctaUrl: 'https://github.com/recodehive/Opensource-practice',
    tutorialUrl: 'https://youtu.be/BNKSlT8jLQ0',
  },
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    image: `${GH}pull-shark-default.png`,
    tierImages: [
      `${RAW}Pull-Shark/PNG/PullShark.png`,
      `${RAW}Pull-Shark/PNG/PullShark_Bronze.png`,
      `${RAW}Pull-Shark/PNG/PullShark_Silver.png`,
      `${RAW}Pull-Shark/PNG/PullShark_Gold.png`,
    ],
    tiers: [2, 16, 128, 1024],
    how: 'Open pull requests that get merged.',
    tip: 'Start with a good first issue on recode hive. A reviewed, merged PR also counts toward your contribution graph.',
    ctaLabel: 'Practice repo',
    ctaUrl: GOOD_FIRST_ISSUES,
    tutorialUrl: 'https://youtu.be/7uKMWBFN2jQ',
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    image: `${GH}galaxy-brain-default.png`,
    tierImages: [
      `${RAW}Galaxy-Brain/PNG/GalaxyBrain.png`,
      `${RAW}Galaxy-Brain/PNG/GalaxyBrain_Bronze.png`,
      `${RAW}Galaxy-Brain/PNG/GalaxyBrain_Silver.png`,
      `${RAW}Galaxy-Brain/PNG/GalaxyBrain_Gold.png`,
    ],
    tiers: [2, 8, 16, 32],
    how: 'Answer a GitHub Discussion and have your answer marked as accepted.',
    tip: 'Answer questions in the recode hive Discussions tab. Clear, tested answers get accepted.',
    ctaLabel: 'Open discussions',
    ctaUrl: 'https://github.com/orgs/recodehive/discussions',
    tutorialUrl: 'https://youtu.be/v2Pai1TY_Lg',
  },
  {
    id: 'yolo',
    name: 'YOLO',
    image: `${GH}yolo-default.png`,
    tierImages: [`${RAW}YOLO/PNG/YOLO_Badge.png`],
    tiers: [1],
    how: 'Merge a pull request without a code review.',
    tip: 'Use a repository you own. On shared projects, always ask for a review instead.',
    tutorialUrl: 'https://youtu.be/GnHNScuGKrg',
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    image: `${GH}public-sponsor-default.png`,
    tierImages: [`${RAW}GitHub-Sponsor/PNG/GitHubSponsorBadge.png`],
    tiers: [1],
    how: 'Sponsor an open source maintainer through GitHub Sponsors.',
    tip: 'Any public sponsorship counts. Pick a maintainer whose project you actually use.',
    ctaLabel: 'GitHub Sponsors',
    ctaUrl: 'https://github.com/sponsors',
    tutorialUrl: 'https://youtu.be/dcdpkD7lYDg',
  },
];

export const SKIN_TONE_EMOJI = ['👋', '👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿'];

export type SkinToneRow = { name: string; image: string; variants: string[] };

export const skinTones: SkinToneRow[] = [
  {
    name: 'Starstruck',
    image: `${GH}starstruck-default.png`,
    variants: [
      `${GH}starstruck-default.png`,
      ...[2, 3, 4, 5, 6].map((n) => `${RAW}Star-Struck/PNG/Skin-Tones/StarStruck_SkinTone${n}.png`),
    ],
  },
  {
    name: 'Quickdraw',
    image: `${GH}quickdraw-default.png`,
    variants: [
      `${GH}quickdraw-default.png`,
      ...[2, 3, 4, 5, 6].map((n) => `${RAW}Quick-Draw/PNG/Skin-Tones/QuickDraw_SkinTone${n}.png`),
    ],
  },
];

export type HighlightIcon = 'star' | 'code' | 'bug' | 'cap' | 'shield';

// No official artwork is bundled for highlights, so each one uses an icon tile
export type Highlight = {
  name: string;
  icon: HighlightIcon;
  how: string;
  ctaLabel: string;
  url: string;
};

export const highlights: Highlight[] = [
  { name: 'Pro', icon: 'star', how: 'Subscribe to GitHub Pro, or get it free with the GitHub Student Developer Pack.', ctaLabel: 'Student Pack', url: 'https://education.github.com/pack' },
  { name: 'Developer Program Member', icon: 'code', how: 'Register for the GitHub Developer Program.', ctaLabel: 'Join', url: 'https://github.com/developers' },
  { name: 'Security Bug Bounty Hunter', icon: 'bug', how: 'Report a valid vulnerability through the GitHub Security Bug Bounty.', ctaLabel: 'Bug bounty', url: 'https://bounty.github.com/' },
  { name: 'GitHub Campus Expert', icon: 'cap', how: 'Get accepted into and complete the GitHub Campus Expert program.', ctaLabel: 'Campus program', url: 'https://education.github.com/experts' },
  { name: 'Security advisory credit', icon: 'shield', how: 'Be credited on a security advisory accepted into the GitHub Advisory Database.', ctaLabel: 'Advisory database', url: 'https://github.com/advisories' },
];

export type Retired = {
  name: string;
  image: string;
  how: string;
  linkLabel: string;
  url: string;
};

export const retired: Retired[] = [
  {
    name: 'Mars 2020 Contributor',
    image: `${RAW}Mars-2020-Contributor/PNG/Mars2020ContributorBadge.png`,
    how: 'Had code in a repository used by the',
    linkLabel: 'Mars 2020 Helicopter Mission',
    url: 'https://github.com/readme/featured/nasa-ingenuity-helicopter',
  },
  {
    name: 'Arctic Code Vault Contributor',
    image: `${RAW}2020-Arctic-Code-Vault-Contributor/PNG/2020ArcticCodeVaultBadge.png`,
    how: 'Had code in a repository saved by the',
    linkLabel: '2020 GitHub Archive Program',
    url: 'https://archiveprogram.github.com/',
  },
];

const CTF = 'https://images.ctfassets.net/wfutmusr1t3h/';

export type Certification = {
  name: string;
  code: string;
  /** Omit when there is no correct artwork yet: a placeholder tile is shown instead. */
  image?: string;
  description: string;
  prepUrl: string;
  isNew?: boolean;
  founderHolds?: boolean;
};

export const certifications: Certification[] = [
  {
    name: 'Foundations',
    code: 'GH-900',
    image: `${CTF}1GLjOPbAzxSyIZy7Cvu2Do/4220986cedca60a0cb3eaa1ed21ca5fc/foundations-river-image__1_.png?w=1280&q=75`,
    description: 'The basics: repositories, pull requests, issues, collaboration and the GitHub product family. The best first exam.',
    prepUrl: 'https://learn.github.com/waitlist/foundations', // TODO(sanjay): confirm the exam page URL
    founderHolds: true,
  },
  {
    name: 'Actions',
    code: 'GH-200',
    image: `${CTF}7xYtTWmQ24xRlS68Do9qiG/a785c50083a579f2530863c230198e98/actions-river-image__1_.png?w=1280&q=75`,
    description: 'Building, debugging and securing CI/CD workflows with GitHub Actions.',
    prepUrl: 'https://learn.github.com/waitlist/actions', // TODO(sanjay): confirm the exam page URL
  },
  {
    name: 'Advanced Security',
    code: 'GH-500',
    // TODO(sanjay): add the official GH-500 badge image
    description: 'Code scanning, secret scanning and dependency review across a codebase.',
    prepUrl: 'https://learn.github.com/waitlist/security', // TODO(sanjay): confirm the exam page URL
  },
  {
    name: 'Administration',
    code: 'GH-100',
    image: `${CTF}KdVTNopvz0GZy60xzXCq0/86148a36ddf27ea1d22226f0113b8711/admin-river-image__1_.png?w=1280&q=75`,
    description: 'Managing organizations, permissions, policies and enterprise settings.',
    prepUrl: 'https://learn.github.com/waitlist/admin', // TODO(sanjay): confirm the exam page URL
  },
  {
    name: 'Copilot',
    code: 'GH-300',
    // TODO(sanjay): add the official GH-300 badge image
    description: 'Using GitHub Copilot responsibly across the development workflow, from prompting to review.',
    prepUrl: 'https://learn.github.com/waitlist/copilot', // TODO(sanjay): confirm the exam page URL
    founderHolds: true,
  },
  {
    name: 'Agentic AI Developer',
    code: 'GH-600',
    image: '/img/agentic-badge.png',
    description: 'Designing and shipping AI agents and agent-driven workflows on GitHub.',
    prepUrl: 'https://learn.github.com/certification/AGENTIC',
    isNew: true,
  },
];

export const CREDITS_URL = 'https://github.com/drknzz/GitHub-Achievements';
export const APPEARANCE_URL = 'https://github.com/settings/appearance';
