import React, { useState } from "react";
import { Post } from "@site/src/data/posts";
import { FaBookmark } from "react-icons/fa";
import { HiOutlineAdjustments } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

interface SidebarProps {
  posts: Post[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  sortBy: "Latest" | "Popular" | "Oldest";
  setSortBy: React.Dispatch<React.SetStateAction<"Latest" | "Popular" | "Oldest">>;
  clearFilters: () => void;
  showSavedOnly: boolean;
  setShowSavedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  savedIds: number[];
  onHideSidebar: () => void;
  tagCounts: { [tag: string]: number };
}

const MAX_VISIBLE_TAGS = 5;

const NewsletterSidebar: React.FC<SidebarProps> = ({
  posts,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  clearFilters,
  showSavedOnly,
  setShowSavedOnly,
  savedIds,
  onHideSidebar,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const visibleTags = allTags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = allTags.slice(MAX_VISIBLE_TAGS);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const tagCounts = posts.reduce((acc: { [tag: string]: number }, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <aside className="w-full md:w-64 p-4 sticky top-0 bg-white border-r border-gray-200 min-h-screen transition-all duration-300">
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md shadow hover:opacity-90 transition mb-4"
      >
        <span>{collapsed ? "Show Filters" : "Hide Filters"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${
            collapsed ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="space-y-5">
          {/* Sort by */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200">
            {["Latest", "Popular", "Oldest"].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option as "Latest" | "Popular" | "Oldest")}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  sortBy === option ? "bg-black text-white shadow" : "text-gray-600 hover:bg-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div>
            <label className="font-semibold mb-1 block text-gray-800">Tags</label>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <button
                  key={tag}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition ${
                    selectedTags.includes(tag) ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  <span>{tag}</span>
                  <span className="text-xs text-gray-500 ml-2">({tagCounts[tag]})</span>
                </button>
              ))}

              {hiddenTags.length > 0 && (
                <>
                  <div className="relative group">
                    <button
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700"
                      data-tooltip-id="tag-tooltip"
                      data-tooltip-html={hiddenTags
                        .map(
                          (tag) =>
                            `<div style="cursor:pointer; margin:4px 0;" onclick="document.getElementById('tag-${tag}').click()">
                              ${tag} (${tagCounts[tag]})
                            </div>`
                        )
                        .join("")}
                    >
                      +{hiddenTags.length} more
                    </button>
                    <Tooltip
                      id="tag-tooltip"
                      place="top"
                      className="whitespace-pre-line z-50 max-w-xs text-sm"
                      clickable
                    />
                  </div>

                  {/* Hidden buttons (to trigger via onclick in tooltip) */}
                  {hiddenTags.map((tag) => (
                    <button
                      key={tag}
                      id={`tag-${tag}`}
                      className="hidden"
                      onClick={() => toggleTag(tag)}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Show Saved Only Toggle */}
          <div className="pt-2">
            <button
              onClick={() => setShowSavedOnly(!showSavedOnly)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border shadow-sm transition-all w-full justify-center ${
                showSavedOnly
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <FaBookmark className={showSavedOnly ? "text-green-600" : "text-gray-500"} />
              {showSavedOnly ? "Showing Saved" : "Show Saved Only"}
            </button>
          </div>

          {/* Hide Sidebar */}
          <div className="pt-2">
            <button
              onClick={onHideSidebar}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 bg-pink-100 text-pink-700 border border-pink-300 rounded-full shadow-sm hover:bg-pink-200 transition-all"
            >
              <HiOutlineAdjustments className="text-pink-500" />
              Hide Sidebar (Full Screen)
            </button>
          </div>

          {/* Clear Filters */}
          {(selectedTags.length > 0 || sortBy !== "Latest" || showSavedOnly) && (
            <button
              onClick={clearFilters}
              className="text-red-500 text-sm hover:underline hover:text-red-700 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </aside>
  );
};

export default NewsletterSidebar;
