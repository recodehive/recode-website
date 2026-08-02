// src/components/dashboard/LeaderBoard/StreakCard.tsx
import React from "react";
import type { Contributor } from "./leaderboard";
import {
  getWeekBuckets,
  getCurrentStreak,
  getBestStreak,
  type StreakPR,
} from "@site/src/lib/streakUtils";

const MIN_GRID_WEEKS = 20;
const GRID_COLUMNS = 10;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

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

// The grid's shape stays constant regardless of the leaderboard's ranking
// time filter — it always spans back to the viewer's earliest merged PR
// (or MIN_GRID_WEEKS, whichever is larger) so switching filters never
// shrinks or reflows the card.
function getGridWeekCount(prDetails: StreakPR[]): number {
  if (prDetails.length === 0) return MIN_GRID_WEEKS;
  const earliest = Math.min(
    ...prDetails.map((pr) => new Date(pr.mergedAt).getTime()),
  );
  const weeksSince = Math.ceil((Date.now() - earliest) / WEEK_MS) + 1;
  return Math.max(MIN_GRID_WEEKS, weeksSince);
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

  const prDetails = viewer.prDetails ?? [];
  const numWeeks = getGridWeekCount(prDetails);
  const buckets = getWeekBuckets(prDetails, numWeeks);
  const currentStreak = getCurrentStreak(buckets);
  const bestStreak = getBestStreak(buckets);

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">Contribution streak</div>
      <div
        className="streak-grid-cells"
        style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)` }}
      >
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
        Last {numWeeks} week{numWeeks === 1 ? "" : "s"}
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
