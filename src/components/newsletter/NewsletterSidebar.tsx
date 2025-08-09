import React, { ReactNode, useState } from "react";
import { Post } from "@site/src/data/posts";
import { FaBookmark ,FaClock,FaFire,FaHourglassStart} from "react-icons/fa";
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

  const sortIcons: { [key: string]: ReactNode } = {
    Latest: <FaClock className="text-sm mr-1" />,
    Popular: <FaFire className="text-sm mr-1" />,
    Oldest: <FaHourglassStart className="text-sm mr-1" />,
  };

  return (
    <aside className="w-full md:w-64 p-4 sticky top-0 backdrop-blur-lg bg-white/70 shadow-xl borderborder-gray-200 min-h-screen transition-all duration-300">
        <div className="w-full mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 pl-1 tracking-wide">Sort By</h3>
          {/* Sort by */}
          <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-2 rounded-xl shadow-inner border border-gray-200">
            {["Latest", "Popular", "Oldest"].map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option as "Latest" | "Popular" | "Oldest")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200 font-medium shadow-sm border whitespace-nowrap ${
                  sortBy === option ? "bg-gradient-to-r from-black to-gray-800 text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {sortIcons[option]}
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
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 relative z-10"
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
                      className="backdrop-blur-md bg-white/80 border border-gray-300 shadow-lg rounded-lg text-gray-800 text-sm p-2 z-50 transition-all duration-300"
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
              <FaBookmark className={`transition-transform duration-200 ${showSavedOnly ? 'scale-110 text-green-600' : 'text-gray-500 hover:text-black'}`} 
              />
            {showSavedOnly ? "Viewing Saved" : "View Saved"}
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
              className="text-red-500 text-sm  hover:text-red-700 transition animate-shake hover:animate-shake"
            >
               Clear Filters
            </button>
          )}
        </div>
      
    </aside>
  );
};

export default NewsletterSidebar;
