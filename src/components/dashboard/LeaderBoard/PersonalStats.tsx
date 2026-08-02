// src/components/dashboard/LeaderBoard/PersonalStats.tsx
import React from "react";
import type { Contributor } from "./leaderboard";
import { getWeekBuckets, getCurrentStreak } from "@site/src/lib/streakUtils";
import { getCurrentAndNextBadge, getRemainingToBadge } from "./badgeConfig";

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
  const { current: currentBadge, next: nextBadge } = getCurrentAndNextBadge(
    viewer.prs,
    viewer.points,
  );
  const remaining = nextBadge
    ? getRemainingToBadge(nextBadge, viewer.prs, viewer.points)
    : null;

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
        <div className="personal-stat-label">
          Badge: {currentBadge ? currentBadge.name : "None yet"}
        </div>
        <div className="personal-stat-value">{viewer.prs} PRs</div>
        {nextBadge && remaining && (
          <div className="personal-stat-sub">
            {remaining.amount} more {remaining.unit}
            {remaining.amount === 1 ? "" : "s"} to {nextBadge.name}
          </div>
        )}
      </div>
    </div>
  );
}
