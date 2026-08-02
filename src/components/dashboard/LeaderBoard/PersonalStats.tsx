// src/components/dashboard/LeaderBoard/PersonalStats.tsx
import React from "react";
import type { Contributor } from "./leaderboard";
import { getWeekBuckets, getCurrentStreak } from "@site/src/lib/streakUtils";

const TIERS = [
  { name: "Scout", min: 0, max: 1 },
  { name: "Challenger", min: 2, max: 4 },
  { name: "Knight", min: 5, max: 19 },
  { name: "Sovereign", min: 20, max: Infinity },
];

function getTier(prs: number) {
  return TIERS.find((tier) => prs >= tier.min && prs <= tier.max) ?? TIERS[0];
}

function getNextTier(prs: number) {
  const currentIndex = TIERS.findIndex(
    (tier) => prs >= tier.min && prs <= tier.max,
  );
  return TIERS[currentIndex + 1] ?? null;
}

export default function PersonalStats({
  contributors,
  viewerLogin,
  isDark,
}: {
  contributors: Contributor[];
  viewerLogin: string | null;
  isDark: boolean;
}): React.JSX.Element | null {
  if (!viewerLogin) {
    return (
      <div
        className={`personal-stats-connect ${isDark ? "dark" : "light"}`}
      >
        Connect your GitHub account to see your personal rank, streak, and
        progress.
      </div>
    );
  }

  const viewerIndex = contributors.findIndex(
    (c) => c.username.toLowerCase() === viewerLogin.toLowerCase(),
  );

  if (viewerIndex === -1) {
    return (
      <div
        className={`personal-stats-connect ${isDark ? "dark" : "light"}`}
      >
        You haven't merged any recode-labeled PRs yet. Contribute to appear on
        the leaderboard!
      </div>
    );
  }

  const viewer = contributors[viewerIndex];
  const rank = viewerIndex + 1;
  const streak = getCurrentStreak(getWeekBuckets(viewer.prDetails ?? []));
  const tier = getTier(viewer.prs);
  const nextTier = getNextTier(viewer.prs);
  const prsToNext = nextTier ? nextTier.min - viewer.prs : 0;

  return (
    <div className="personal-stats-strip">
      <div className="personal-stat-card">
        <div className="personal-stat-label">Your Rank</div>
        <div className="personal-stat-value">#{rank}</div>
      </div>
      <div className="personal-stat-card">
        <div className="personal-stat-label">Total Points</div>
        <div className="personal-stat-value">{viewer.points}</div>
      </div>
      <div className="personal-stat-card">
        <div className="personal-stat-label">Current Streak</div>
        <div className="personal-stat-value">{streak} wks</div>
      </div>
      <div className="personal-stat-card">
        <div className="personal-stat-label">Tier: {tier.name}</div>
        <div className="personal-stat-value">{viewer.prs} PRs</div>
        {nextTier && (
          <div className="personal-stat-sub">
            {prsToNext} more PR{prsToNext === 1 ? "" : "s"} to {nextTier.name}
          </div>
        )}
      </div>
    </div>
  );
}
