import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  GitBranch,
  Heart,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Eye,
  ThumbsUp,
  Clock,
} from "lucide-react";
import type { DevfolioProfile, ProfileSubmission } from "../../types/devfolio";

interface AnalyticsDashboardProps {
  profiles: DevfolioProfile[];
  submissions: ProfileSubmission[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  profiles,
  submissions,
}) => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">(
    "30d"
  );

  // Calculate statistics
  const totalProfiles = profiles.length;
  const totalLikes = profiles.reduce(
    (sum, profile) => sum + (profile.likes || 0),
    0
  );
  const totalViews = profiles.reduce((sum, profile) => sum + 100, 0); // Mock views data
  const featuredProfiles = profiles.filter((p) => p.featured).length;
  const pendingSubmissions = submissions.filter(
    (s) => s.status === "pending"
  ).length;

  // Calculate growth metrics
  const now = new Date();
  const getDaysAgo = (days: number) =>
    new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const getFilteredProfiles = (days: number) => {
    const cutoff = getDaysAgo(days);
    return profiles.filter((profile) => {
      const submittedDate = new Date(profile.submittedAt);
      return submittedDate >= cutoff;
    });
  };

  const getGrowthData = () => {
    const periods = {
      "7d": 7,
      "30d": 30,
      "90d": 90,
      all: 365 * 10, // Large number for all time
    };

    const days = periods[timeRange];
    const currentPeriod = getFilteredProfiles(days);
    const previousPeriod = getFilteredProfiles(days * 2).filter((profile) => {
      const submittedDate = new Date(profile.submittedAt);
      return submittedDate < getDaysAgo(days);
    });

    const currentCount = currentPeriod.length;
    const previousCount = previousPeriod.length;
    const growth =
      previousCount > 0
        ? ((currentCount - previousCount) / previousCount) * 100
        : 0;

    return { currentCount, previousCount, growth };
  };

  const growthData = getGrowthData();

  // Top performers
  const topLikedProfiles = [...profiles]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);

  const topViewedProfiles = [...profiles]
    .sort(
      (a, b) => (b.githubData.followers || 0) - (a.githubData.followers || 0)
    )
    .slice(0, 5);

  // Technology distribution (mock data for demonstration)
  const techDistribution = [
    { name: "React", count: Math.floor(totalProfiles * 0.4), color: "#61DAFB" },
    {
      name: "JavaScript",
      count: Math.floor(totalProfiles * 0.6),
      color: "#F7DF1E",
    },
    {
      name: "TypeScript",
      count: Math.floor(totalProfiles * 0.3),
      color: "#3178C6",
    },
    {
      name: "Python",
      count: Math.floor(totalProfiles * 0.5),
      color: "#3776AB",
    },
    {
      name: "Node.js",
      count: Math.floor(totalProfiles * 0.35),
      color: "#339933",
    },
  ];

  // Daily submissions chart data
  const getDailyData = () => {
    const days = 30;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = getDaysAgo(i);
      const dayProfiles = profiles.filter((profile) => {
        const submittedDate = new Date(profile.submittedAt);
        return submittedDate.toDateString() === date.toDateString();
      });

      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        submissions: dayProfiles.length,
        likes: dayProfiles.reduce((sum, p) => sum + (p.likes || 0), 0),
      });
    }

    return data;
  };

  const dailyData = getDailyData();
  const maxSubmissions = Math.max(...dailyData.map((d) => d.submissions), 1);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    trend,
    color = "blue",
  }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {value}
          </p>
          {change !== undefined && (
            <div
              className={`flex items-center mt-2 ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : trend === "down" ? (
                <TrendingDown className="w-4 h-4 mr-1" />
              ) : null}
              <span className="text-sm font-medium">
                {change > 0 ? "+" : ""}
                {change.toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 ml-1">
                vs previous period
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg bg-${color}-100 dark:bg-${color}-900/30`}
        >
          <Icon
            className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h3>
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {(["7d", "30d", "90d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {range === "all" ? "All Time" : range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Profiles"
          value={totalProfiles.toLocaleString()}
          change={growthData.growth}
          trend={
            growthData.growth > 0
              ? "up"
              : growthData.growth < 0
              ? "down"
              : "stable"
          }
          color="blue"
        />
        <StatCard
          icon={Heart}
          title="Total Likes"
          value={totalLikes.toLocaleString()}
          color="red"
        />
        <StatCard
          icon={Eye}
          title="Total Views"
          value={totalViews.toLocaleString()}
          color="green"
        />
        <StatCard
          icon={Clock}
          title="Pending Reviews"
          value={pendingSubmissions}
          color="yellow"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Submissions Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Daily Submissions
            </h4>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {dailyData.slice(-7).map((day, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                  {day.date}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(day.submissions / maxSubmissions) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                  {day.submissions}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Popular Technologies
            </h4>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {techDistribution.map((tech, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {tech.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {tech.count}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({((tech.count / totalProfiles) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Liked Profiles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Most Liked Profiles
            </h4>
            <ThumbsUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topLikedProfiles.map((profile, index) => (
              <div key={profile.id} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : index === 1
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      : index === 2
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {profile.githubData.name || profile.githubData.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    @{profile.githubData.username}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {profile.likes}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Viewed Profiles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Most Viewed Profiles
            </h4>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topViewedProfiles.map((profile, index) => (
              <div key={profile.id} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : index === 1
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      : index === 2
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {profile.githubData.name || profile.githubData.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    @{profile.githubData.username}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {100}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-3">
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {featuredProfiles}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Featured Profiles
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-3">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalProfiles > 0
                ? (totalLikes / totalProfiles).toFixed(1)
                : "0"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg Likes per Profile
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-3">
              <GitBranch className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalProfiles > 0
                ? Math.round(
                    profiles.reduce(
                      (sum, p) => sum + (p.githubData.public_repos || 0),
                      0
                    ) / totalProfiles
                  )
                : "0"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Avg Repositories
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mx-auto mb-3">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {growthData.currentCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              New This Period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
