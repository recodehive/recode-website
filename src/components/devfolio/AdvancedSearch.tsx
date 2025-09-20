import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  X,
  Tag,
  Calendar,
  Users,
  GitBranch,
} from "lucide-react";

interface AdvancedSearchProps {
  onSearchChange: (filters: SearchFilters) => void;
  totalResults: number;
}

interface SearchFilters {
  searchTerm: string;
  sortBy: "name" | "followers" | "repos" | "likes" | "date";
  sortOrder: "asc" | "desc";
  minFollowers: number;
  minRepos: number;
  tags: string[];
  featured: boolean | null;
}

const POPULAR_TAGS = [
  "react",
  "typescript",
  "javascript",
  "python",
  "node.js",
  "vue",
  "angular",
  "nextjs",
  "docker",
  "kubernetes",
  "aws",
  "machine-learning",
  "ai",
  "blockchain",
  "mobile",
  "ios",
  "android",
  "flutter",
  "react-native",
  "web3",
  "game-dev",
];

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearchChange,
  totalResults,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    sortBy: "followers",
    sortOrder: "desc",
    minFollowers: 0,
    minRepos: 0,
    tags: [],
    featured: null,
  });

  useEffect(() => {
    onSearchChange(filters);
  }, [filters, onSearchChange]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      sortBy: "followers",
      sortOrder: "desc",
      minFollowers: 0,
      minRepos: 0,
      tags: [],
      featured: null,
    });
  };

  const hasActiveFilters =
    filters.minFollowers > 0 ||
    filters.minRepos > 0 ||
    filters.tags.length > 0 ||
    filters.featured !== null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      {/* Basic Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or bio..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter("sortBy", e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="followers">Sort by Followers</option>
            <option value="repos">Sort by Repositories</option>
            <option value="likes">Sort by Likes</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date Added</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() =>
              updateFilter(
                "sortOrder",
                filters.sortOrder === "asc" ? "desc" : "asc"
              )
            }
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700"
          >
            {filters.sortOrder === "asc" ? (
              <SortAsc className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <SortDesc className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-3 border rounded-lg transition-all ${
              isExpanded || hasActiveFilters
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalResults} {totalResults === 1 ? "profile" : "profiles"} found
        </p>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Follower Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Followers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      value={filters.minFollowers}
                      onChange={(e) =>
                        updateFilter(
                          "minFollowers",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Repository Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Repositories
                  </label>
                  <div className="relative">
                    <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      min="0"
                      value={filters.minRepos}
                      onChange={(e) =>
                        updateFilter("minRepos", parseInt(e.target.value) || 0)
                      }
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile Type
                  </label>
                  <select
                    value={
                      filters.featured === null
                        ? "all"
                        : filters.featured
                        ? "featured"
                        : "regular"
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      updateFilter(
                        "featured",
                        value === "all" ? null : value === "featured"
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Profiles</option>
                    <option value="featured">Featured Only</option>
                    <option value="regular">Regular Only</option>
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Technologies & Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        filters.tags.includes(tag)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Active Filters:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {filters.minFollowers > 0 && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        Min followers: {filters.minFollowers}+
                      </span>
                    )}
                    {filters.minRepos > 0 && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        Min repos: {filters.minRepos}+
                      </span>
                    )}
                    {filters.featured !== null && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {filters.featured ? "Featured" : "Regular"} profiles
                      </span>
                    )}
                    {filters.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full flex items-center space-x-1"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                        <button
                          onClick={() => toggleTag(tag)}
                          className="ml-1 hover:text-green-900 dark:hover:text-green-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
