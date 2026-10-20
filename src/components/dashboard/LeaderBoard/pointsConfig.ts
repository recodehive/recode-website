// Single source of truth for the points rules shown in the UI and used by statsProvider.
// The backend (sanjay-kv/leaderboard) scores PRs with the same rules in its own repo,
// so keep the two in sync when these change.

/** A merged PR only scores when it carries this label. */
export const REQUIRED_LABEL = 'recode';

export type PointLevel = {
  /** Exact GitHub label name, lowercase. */
  label: string;
  points: number;
  description: string;
  tone: 'l1' | 'l2' | 'l3';
};

export const POINT_LEVELS: PointLevel[] = [
  { label: 'level 1', points: 10, description: 'Good first issue', tone: 'l1' },
  { label: 'level 2', points: 30, description: 'Feature or fix', tone: 'l2' },
  { label: 'level 3', points: 50, description: 'Major contribution', tone: 'l3' },
];

/** Points for a PR with the recode label but no level label. */
export const NO_LEVEL_POINTS = 0;

export const POINTS_BY_LEVEL: Record<string, number> = Object.fromEntries(
  POINT_LEVELS.map((l) => [l.label, l.points]),
);

/** The smallest score that gets someone onto the board. */
export const MIN_BOARD_POINTS = Math.min(...POINT_LEVELS.map((l) => l.points));
