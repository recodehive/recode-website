import React from 'react'
import { Flame, Calendar, Trophy, Activity, Share2, Check, Play } from 'lucide-react'
import { useUser } from '@clerk/react'
import { useCommunityStatsContext } from "@site/src/lib/statsProvider"
import { getWeekBuckets, getCurrentStreak } from "@site/src/lib/streakUtils"
import '../../styles/globals.css'

export default function SignInDashboard(): JSX.Element {
  const { user } = useUser()
  const displayName = user?.firstName

  const {
    getAllTimePRsForContributor,
    getAllTimeContributor
  } = useCommunityStatsContext()

  const viewerLogin =
    user?.externalAccounts?.find(
      (account) => account.provider === "github"
    )?.username ?? null

  const viewerPRs = viewerLogin
    ? getAllTimePRsForContributor(viewerLogin)
    : []

  const weekBuckets = getWeekBuckets(viewerPRs)
  const streak = getCurrentStreak(weekBuckets)

  const activeWeeks = weekBuckets.filter(
    (week) => week.count > 0
  ).length

  const activity = weekBuckets.slice(-7)

  const viewer = viewerLogin
    ? getAllTimeContributor(viewerLogin)
    : undefined

  const totalPRs = viewer?.prs ?? 0
  const totalPoints = viewer?.points ?? 0

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 font-space">
      <section className="flex w-full flex-col gap-4 rounded-2xl border border-gray-300 bg-white px-4 py-4 text-gray-900 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5 dark:border-gray-700 dark:bg-slate-900 dark:text-white">
        <div className="flex min-w-0 flex-col">
          <span className="font-bold">
            Recode hive
          </span>

          <span className="text-[15px] font-semibold">
            Take a Quick Tour
          </span>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            New here? Explore the platform and discover everything you can do.
          </span>
        </div>

        <button className="flex w-full shrink-0 items-center justify-center gap-1 rounded-xl bg-[#16a34a] px-5 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto">
          <Play size={16}/>
          Watch the tour
        </button>
      </section>

      <h2 className="text-start text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Welcome Back, {displayName}
      </h2>

      <section className="mb-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:mb-10 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-gray-900 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-sm">
                Current streak
              </span>

              <p className="mt-1 text-2xl font-semibold">
                {streak} {streak === 1 ? "Week" : "Weeks"}
              </p>
            </div>

            <Flame
              size={30}
              className="shrink-0 text-[#16a34a]"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Keep your weekly streak going
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-gray-900 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-sm">
                Total points
              </span>

              <p className="mt-1 text-2xl font-semibold">
                {totalPoints} points
              </p>
            </div>

            <Trophy
              size={30}
              className="shrink-0 text-[#16a34a]"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Total points earned
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-gray-900 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-sm">
                Active weeks
              </span>

              <p className="mt-1 text-2xl font-semibold">
                {activeWeeks}
              </p>
            </div>

            <Calendar
              size={30}
              className="shrink-0 text-[#16a34a]"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Weeks with merged PRs
          </p>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white px-5 py-4 text-gray-900 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-sm">
                PRs merged
              </span>

              <p className="mt-1 text-2xl font-semibold">
                {totalPRs} {totalPRs === 1 ? "PR" : "PRs"}
              </p>
            </div>

            <Activity
              size={30}
              className="shrink-0 text-[#16a34a]"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Total pull requests merged
          </p>
        </div>
      </section>

      <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-green-800/60 bg-green-950">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-5 sm:mb-6">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-green-400 sm:text-[11px]">
              BUILD IN PUBLIC
            </p>
            <h2 className="text-xl font-semibold tracking-tight !text-white sm:text-2xl lg:text-3xl">
              Turn consistency into proof
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-5 text-green-100/70 sm:text-sm sm:leading-6">
              Complete meaningful learning actions each week, build your consistency, and share each win.
            </p>
          </div>
          <div className="mb-5 inline-flex items-center justify-center gap-3 rounded-xl border border-green-800/70 bg-green-900/50 px-4 py-3 sm:mb-6">
            <Flame className="h-4 w-4 shrink-0 text-green-400" />
            <div className="flex flex-col justify-center">
              <span className="text-lg font-semibold leading-none text-white">
                {streak}
              </span>
              <span className="mt-1 text-[9px] font-medium uppercase tracking-wider text-green-300/60">
                Week Streak
              </span>
            </div>
          </div>
          <div className="w-full rounded-xl border border-green-800/70 bg-green-900/40 p-4 sm:p-5">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-green-100">
                Your last 7 weeks
              </p>
              <p className="text-[10px] text-green-400">
                {streak} {streak === 1 ? "week" : "weeks"} streak
              </p>
            </div>
            <div className="-mx-1 overflow-x-auto px-1 pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-800">
              <div className="relative min-w-[520px]">
                <div className="absolute left-3 right-3 top-[13px] h-px bg-green-800" />
                <div className="relative flex items-start justify-between">
                  {activity.map((week, index) => {
                    const hasActivity = week.count > 0
                    const weekLabel =
                      index === activity.length - 1
                        ? "Now"
                        : `W-${activity.length - 1 - index}`
                    return (
                      <div
                        key={week.weekStart}
                        className="flex min-w-[48px] flex-col items-center"
                      >
                        <div
                          className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-medium ${hasActivity
                              ? "border-green-300 bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.35)]"
                              : "border-green-800 bg-green-950 text-green-500"
                            }`}
                        >
                          {hasActivity ? (
                            <Check
                              className="h-3.5 w-3.5"
                              strokeWidth={2.5}
                            />
                          ) : (
                            "0"
                          )}
                        </div>
                        <span
                          className={`mt-3 whitespace-nowrap text-[9px] font-medium ${index === activity.length - 1
                              ? "text-white"
                              : "text-green-300/60"
                            }`}
                        >
                          {weekLabel}
                        </span>
                        <span className="mt-1 whitespace-nowrap text-[8px] text-green-300/40">
                          {week.count}{" "}
                          {week.count === 1 ? "PR" : "PRs"}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-green-300/50">
                NEXT ACHIEVEMENT
              </p>
              <p className="text-sm font-semibold text-white">
                {streak + 1}-week consistency streak
              </p>
            </div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-xs font-semibold text-white shadow-lg shadow-green-900/30 transition-all duration-200 hover:bg-green-500 hover:shadow-green-500/20 active:scale-[0.98] sm:w-auto"
              onClick={() => window.open("https://github.com/recodehive/recode-website/issues", "_blank")}
            >
              <Share2 className="h-4 w-4 shrink-0" />
              Complete an action to start
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}