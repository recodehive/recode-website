// src/components/dashboard/LeaderBoard/StreakCard.tsx
import React from "react";
import type { Contributor } from "./leaderboard";
import {
  getWeekBuckets,
  getCurrentStreak,
  getBestStreak,
} from "@site/src/lib/streakUtils";

const GRID_WEEKS = 20;

function getIntensityLevel(count: number): 0 | 1 | 2 | 3 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  return 3;
}

function formatWeekOf(weekStartIso: string): string {
  return new Date(weekStartIso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function StreakCard({
  contributors,
  viewerLogin,
}: {
  contributors: Contributor[];
  viewerLogin: string | null;
}): React.JSX.Element {
  if (!viewerLogin) {
    return (
      <div className="sidebar-card">
        <div className="sidebar-card-title">Contribution streak</div>
        <div className="sidebar-badges-empty">
          Connect your GitHub account to see your streak.
        </div>
      </div>
    );
  }

  const viewer = contributors.find(
    (c) => c.username.toLowerCase() === viewerLogin.toLowerCase(),
  );

  if (!viewer) {
    return (
      <div className="sidebar-card">
        <div className="sidebar-card-title">Contribution streak</div>
        <div className="sidebar-badges-empty">
          No merged PRs yet — your streak starts with your first one.
        </div>
      </div>
    );
  }

  // Always computed from raw, unfiltered PR history so the grid doesn't
  // collapse when the leaderboard's own time filter changes.
  const buckets = getWeekBuckets(viewer.prDetails ?? [], GRID_WEEKS);
  const currentStreak = getCurrentStreak(buckets);
  const bestStreak = getBestStreak(buckets);

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">Contribution streak</div>
      <div className="streak-grid-cells">
        {buckets.map((bucket) => (
          <div
            key={bucket.weekStart}
            className={`streak-grid-cell level-${getIntensityLevel(bucket.count)}`}
            title={`Week of ${formatWeekOf(bucket.weekStart)} · ${bucket.count} merged PR${
              bucket.count === 1 ? "" : "s"
            }`}
          />
        ))}
      </div>
      <div className="streak-grid-caption">
        Last {GRID_WEEKS} weeks
        {currentStreak > 0 && <> · 🔥 {currentStreak}-week streak active</>}
      </div>
      {bestStreak > 0 && (
        <div className="streak-grid-caption">
          Personal best: {bestStreak} week{bestStreak === 1 ? "" : "s"}
        </div>
      )}
    </div>
  );
}
