// Single source of truth for the contributor achievement badges.
// Badge artwork lives in static/img/badges/ and is referenced by these paths.

export type BadgeMetric = 'prs' | 'points' | 'rank';
export type BadgeGroup = 'milestone' | 'mastery' | 'leaderboard';

/** Colours used for glows, borders and tags. Never used to recolour the badge artwork. */
export interface BadgeTier {
  light: string;
  dark: string;
  /** "r,g,b" for rgba() */
  rgb: string;
}

export interface Badge {
  id: string;
  name: string;
  group: BadgeGroup;
  image: string;
  description: string;
  /** Human readable, shown in the "Criteria:" chip. */
  criteria: string;
  metric: BadgeMetric;
  /** PRs or points needed, or the rank position for rank badges. */
  threshold: number;
  /** An alternative way to unlock the same badge. */
  altThreshold?: { metric: 'points'; value: number };
  tier: BadgeTier;
  /** Higher is rarer. Decides the "rarest earned" spotlight. */
  rarity: number;
}

/** Which ranking decides the Rank #1, #2 and #3 badges. */
export const RANK_PERIOD: 'all-time' | 'monthly' = 'all-time';

const BASE_BADGES: Omit<Badge, 'tier' | 'rarity'>[] = [
  {
    id: 'first-contribution', name: 'First Contribution', group: 'milestone', image: '/img/badges/first-contribution.png',
    description: "The first milestone in every contributor's journey. Awarded after your first successfully merged pull request.",
    criteria: '1+ merged PR', metric: 'prs', threshold: 1,
  },
  {
    id: 'bronze', name: 'Bronze Contributor', group: 'milestone', image: '/img/badges/bronze.png',
    description: 'Recognises contributors who keep building momentum through consistent participation.',
    criteria: '5+ merged PRs', metric: 'prs', threshold: 5,
  },
  {
    id: 'silver', name: 'Silver Contributor', group: 'milestone', image: '/img/badges/silver.png',
    description: 'Awarded to contributors who keep supporting the project through regular participation.',
    criteria: '10+ merged PRs', metric: 'prs', threshold: 10,
  },
  {
    id: 'gold', name: 'Gold Contributor', group: 'milestone', image: '/img/badges/gold.png',
    description: 'Celebrates contributors whose continued efforts create meaningful impact within the community.',
    criteria: '25+ merged PRs', metric: 'prs', threshold: 25,
  },
  {
    id: 'platinum', name: 'Platinum Contributor', group: 'milestone', image: '/img/badges/platinum.png',
    description: 'Recognises sustained dedication and long-term contribution.',
    criteria: '50+ merged PRs', metric: 'prs', threshold: 50,
  },
  {
    id: 'diamond', name: 'Diamond Contributor', group: 'milestone', image: '/img/badges/diamond.png',
    description: "Awarded to contributors who reach one of the project's highest milestones.",
    criteria: '100+ merged PRs', metric: 'prs', threshold: 100,
  },
  {
    id: 'points-master', name: 'Points Master', group: 'mastery', image: '/img/badges/points-master.png',
    description: 'Recognises contributors whose work consistently earns high contribution points through meaningful pull requests.',
    criteria: '500+ points', metric: 'points', threshold: 500,
  },
  {
    id: 'elite', name: 'Elite Contributor', group: 'mastery', image: '/img/badges/elite.png',
    description: 'Awarded to contributors who show exceptional dedication and long-term commitment to the community.',
    criteria: '200+ merged PRs', metric: 'prs', threshold: 200,
  },
  {
    id: 'legendary', name: 'Legendary Contributor', group: 'mastery', image: '/img/badges/legendary.png',
    description: 'Recognises contributors whose long-term dedication has made a lasting impact on the community.',
    criteria: '500+ merged PRs', metric: 'prs', threshold: 500,
  },
  {
    id: 'hall-of-fame', name: 'Hall of Fame', group: 'mastery', image: '/img/badges/hall-of-fame.png',
    description: 'The highest recognition in the contributor ecosystem, for contributors whose dedication, consistency and impact define the community.',
    criteria: '1000+ merged PRs or 5000+ points', metric: 'prs', threshold: 1000, altThreshold: { metric: 'points', value: 5000 },
  },
  {
    id: 'rank-1', name: 'Rank #1', group: 'leaderboard', image: '/img/badges/rank-1.png',
    description: 'Awarded to the top contributor on the leaderboard.',
    criteria: 'Finish #1 on the leaderboard', metric: 'rank', threshold: 1,
  },
  {
    id: 'rank-2', name: 'Rank #2', group: 'leaderboard', image: '/img/badges/rank-2.png',
    description: 'Second place on the leaderboard.',
    criteria: 'Finish #2 on the leaderboard', metric: 'rank', threshold: 2,
  },
  {
    id: 'rank-3', name: 'Rank #3', group: 'leaderboard', image: '/img/badges/rank-3.png',
    description: 'Third place on the leaderboard.',
    criteria: 'Finish #3 on the leaderboard', metric: 'rank', threshold: 3,
  },
];

const TIERS: Record<string, { tier: BadgeTier; rarity: number }> = {
  'first-contribution': { tier: { light: '#d9f99d', dark: '#4d7c0f', rgb: '163,230,53' }, rarity: 1 },
  bronze: { tier: { light: '#f5c08f', dark: '#8a4b1f', rgb: '224,145,90' }, rarity: 2 },
  silver: { tier: { light: '#f1f5f9', dark: '#64748b', rgb: '203,213,225' }, rarity: 3 },
  gold: { tier: { light: '#fde047', dark: '#a16207', rgb: '250,204,21' }, rarity: 4 },
  platinum: { tier: { light: '#e0e7ff', dark: '#5b5f97', rgb: '165,180,252' }, rarity: 5 },
  'points-master': { tier: { light: '#ddd6fe', dark: '#6d28d9', rgb: '167,139,250' }, rarity: 6 },
  diamond: { tier: { light: '#a5f3fc', dark: '#0e7490', rgb: '103,232,249' }, rarity: 7 },
  'rank-3': { tier: { light: '#f5c08f', dark: '#8a4b1f', rgb: '224,145,90' }, rarity: 8 },
  elite: { tier: { light: '#bbf7d0', dark: '#15803d', rgb: '74,222,128' }, rarity: 9 },
  'rank-2': { tier: { light: '#f1f5f9', dark: '#64748b', rgb: '203,213,225' }, rarity: 10 },
  legendary: { tier: { light: '#fed7aa', dark: '#c2410c', rgb: '251,146,60' }, rarity: 11 },
  'rank-1': { tier: { light: '#fde047', dark: '#a16207', rgb: '250,204,21' }, rarity: 12 },
  'hall-of-fame': { tier: { light: '#fde68a', dark: '#b45309', rgb: '251,191,36' }, rarity: 13 },
};

export const BADGES: Badge[] = BASE_BADGES.map((b) => {
  const t = TIERS[b.id];
  if (!t) throw new Error('Missing tier for badge ' + b.id);
  return { ...b, ...t };
});

export const GROUP_COPY: Record<BadgeGroup, { title: string; subtitle: string }> = {
  milestone: { title: 'Contribution milestones', subtitle: 'Every journey starts somewhere' },
  mastery: { title: 'Mastery', subtitle: 'Reserved for the most dedicated' },
  leaderboard: { title: 'Leaderboard recognition', subtitle: 'For the top three contributors' },
};

export const GROUP_ORDER: BadgeGroup[] = ['milestone', 'mastery', 'leaderboard'];

/** The merged PR counts shown on the contribution path in the modal. */
export const PATH_PRS: number[] = [1, 5, 10, 25, 50, 100, 200, 500, 1000];
