// src/components/dashboard/LeaderBoard/badgeConfig.ts
// Single source of truth for badge thresholds — names match the text baked
// into each badge's artwork (see static/badges/*.png).

export interface BadgeRequirement {
  type: "prs" | "points";
  value: number;
  // Hive Master can also be unlocked purely on points (prs >= 1000 || points >= 5000)
  altPointsValue?: number;
}

export interface BadgeDef {
  image: string;
  name: string;
  requirement: BadgeRequirement;
  criteria: (prs: number, points: number) => boolean;
}

function meetsRequirement(
  requirement: BadgeRequirement,
  prs: number,
  points: number,
): boolean {
  if (requirement.type === "points") {
    return points >= requirement.value;
  }
  const prsOk = prs >= requirement.value;
  const altOk =
    requirement.altPointsValue !== undefined &&
    points >= requirement.altPointsValue;
  return prsOk || altOk;
}

const BADGE_DEFS: Array<Omit<BadgeDef, "criteria">> = [
  {
    image: "/badges/new-badges/1.png",
    name: "Open Source Explorer",
    requirement: { type: "prs", value: 1 },
  },
  {
    image: "/badges/new-badges/2.png",
    name: "re:code Hero",
    requirement: { type: "prs", value: 5 },
  },
  {
    image: "/badges/new-badges/3.png",
    name: "Doc Dynamo",
    requirement: { type: "prs", value: 10 },
  },
  {
    image: "/badges/new-badges/4.png",
    name: "Merge Marvel",
    requirement: { type: "prs", value: 25 },
  },
  {
    image: "/badges/new-badges/5.png",
    name: "BUG masher",
    requirement: { type: "prs", value: 50 },
  },
  {
    image: "/badges/new-badges/6.png",
    name: "Issue Insider",
    requirement: { type: "prs", value: 100 },
  },
  {
    image: "/badges/new-badges/7.png",
    name: "IDEA GENIUS",
    requirement: { type: "points", value: 500 },
  },
  {
    image: "/badges/new-badges/8.png",
    name: "Community Builder",
    requirement: { type: "prs", value: 200 },
  },
  {
    image: "/badges/new-badges/9.png",
    name: "Hive Hero",
    requirement: { type: "prs", value: 500 },
  },
  {
    image: "/badges/new-badges/10.png",
    name: "Hive Master",
    requirement: { type: "prs", value: 1000, altPointsValue: 5000 },
  },
];

export const BADGE_CONFIG: BadgeDef[] = BADGE_DEFS.map((def) => ({
  ...def,
  criteria: (prs: number, points: number) =>
    meetsRequirement(def.requirement, prs, points),
}));

/** Highest badge earned so far, and the next locked badge in line (or null at max). */
export function getCurrentAndNextBadge(
  prs: number,
  points: number,
): { current: BadgeDef | null; next: BadgeDef | null } {
  let currentIndex = -1;
  for (let i = 0; i < BADGE_CONFIG.length; i++) {
    if (BADGE_CONFIG[i].criteria(prs, points)) currentIndex = i;
  }
  return {
    current: currentIndex >= 0 ? BADGE_CONFIG[currentIndex] : null,
    next: BADGE_CONFIG[currentIndex + 1] ?? null,
  };
}

/** How much more is needed to unlock `badge`, and whether that's measured in PRs or points. */
export function getRemainingToBadge(
  badge: BadgeDef,
  prs: number,
  points: number,
): { amount: number; unit: "PR" | "point" } {
  const { requirement } = badge;
  if (requirement.type === "points") {
    return { amount: Math.max(0, requirement.value - points), unit: "point" };
  }

  const prsRemaining = Math.max(0, requirement.value - prs);
  if (requirement.altPointsValue !== undefined) {
    const pointsRemaining = Math.max(0, requirement.altPointsValue - points);
    if (pointsRemaining < prsRemaining) {
      return { amount: pointsRemaining, unit: "point" };
    }
  }
  return { amount: prsRemaining, unit: "PR" };
}
