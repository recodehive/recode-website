import React, { useState } from "react";
import NewsletterSidebar from "@site/src/components/newsletter/NewsletterSidebar";
import NewsletterCard from "@site/src/components/newsletter/NewsletterCard";
import posts from "@site/src/data/posts";
import { useLocalStorage } from "@site/src/utils/useLocalStorage";

const ITEMS_PER_LOAD = 6;

const NewsletterPage: React.FC = () => {
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_LOAD);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"Latest" | "Popular" | "Oldest">("Latest");
  const [likedIds, setLikedIds] = useLocalStorage<number[]>("likedPosts", []);
  const [savedIds, setSavedIds] = useLocalStorage<number[]>("savedPosts", []);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = posts
    .filter((p) =>
      selectedTags.length
        ? selectedTags.every((tg) => p.tags.includes(tg))
        : true
    )
    .filter((p) => (showSavedOnly ? savedIds.includes(p.id) : true))
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "Popular") return b.likes - a.likes;
      if (sortBy === "Oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Latest
    });

  const visible = filtered.slice(0, displayCount);

  const toggleLike = (id: number) =>
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSave = (id: number) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    const tagCounts = posts.reduce((acc: { [tag: string]: number }, post) => {
  post.tags.forEach((tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
  });
  return acc;
}, {});


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white transition-all duration-300">
      {/* Sidebar Section */}
      <div
        className={`${
          isSidebarVisible ? "w-full md:w-64" : "w-0 overflow-hidden"
        } transition-all duration-300`}
      >
      {isSidebarVisible && (
      <NewsletterSidebar
        posts={posts}
        tagCounts={tagCounts}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sortBy={sortBy}
        setSortBy={setSortBy}
        savedIds={savedIds}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
        clearFilters={() => {
          setSelectedTags([]);
          setSortBy("Latest");
          setSearchTerm("");
          setShowSavedOnly(false);
        }}
        onHideSidebar={() => setIsSidebarVisible(false)}
      />
      )}
    </div>
      {/* Main Content Section */}
      <div className={`flex-1 transition-all duration-300 px-4 py-6 md:px-6`}>
      {!isSidebarVisible && (
        <div className="absolute top-4 left-4 z-20">
          <button
            className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-white shadow-lg border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-100 transition duration-300"
            onClick={() => setIsSidebarVisible(true)}
          >
           🔍 Show Filter
          </button>
        </div>
      )}

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">📰 RecodeHive Newsletter</h1>
        <p className="text-[#666] text-[1.2rem] mb-8 text-center">
          Discover insightful updates, tech stories, and community highlights — all in one place.
        </p>
        {showSavedOnly && (
  <p className="text-center text-green-600 font-medium mt-[-16px] mb-6 animate-pulse">
    Showing only saved newsletters 💾
  </p>
)}


        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by title, tag, or author..."
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
           </div>
          

        {/* Newsletter Crads */}
        {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-12 text-lg">
          <p className="mb-2">😕 No newsletters match your search or filters.</p>
          <p className="text-sm text-gray-400">
            Try changing the search term or clearing filters.
          </p>
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <NewsletterCard
              key={p.id}
              post={p}
              isLiked={likedIds.includes(p.id)}
              isSaved={savedIds.includes(p.id)}
              onLikeToggle={() => toggleLike(p.id)}
              onSaveToggle={() => toggleSave(p.id)}
            />
          ))}
        </div>
      )}

        {displayCount < filtered.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setDisplayCount((prev) => prev + ITEMS_PER_LOAD)}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition flex items-center gap-2 mx-auto"
            >
              Load More <span className="animate-bounce">⬇️</span>

            </button>
          </div>
        )}
      </main>
    </div>
    </div>
  );
};

export default NewsletterPage;
