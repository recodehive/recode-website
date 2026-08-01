import React, { useState, useMemo } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion, AnimatePresence } from "framer-motion";
import {
  coursesData,
  courseCategories,
  type Course,
  type Difficulty,
} from "../../data/coursesData";
import "../courses/courses.css";
import "./explore.css";

const difficultyColors: Record<Difficulty, string> = {
  Beginner: "explore-badge-beginner",
  Intermediate: "explore-badge-intermediate",
  Advanced: "explore-badge-advanced",
};

const difficultyOrder: Record<Difficulty, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

type SortOption = "default" | "difficulty-asc" | "difficulty-desc" | "duration-asc";

function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="explore-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="explore-card-header">
        <div className="explore-card-meta">
          <span className={`explore-badge ${difficultyColors[course.difficulty]}`}>
            {course.difficulty}
          </span>
          <span className="explore-duration">
            <svg
              className="explore-duration-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {course.duration}
          </span>
        </div>

        <h3 className="explore-card-title">{course.title}</h3>
        <p className="explore-card-desc">{course.description}</p>
      </div>

      {/* Tags */}
      <div className="explore-tags">
        {course.tags.map((tag) => (
          <span key={tag} className="explore-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Free Platforms */}
      <div className="explore-platforms-section">
        <button
          className="explore-platforms-toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <svg
            className={`explore-chevron ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <span>Free Platforms ({course.freePlatforms.length})</span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              key="platforms"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="explore-platforms-list"
            >
              {course.freePlatforms.map((platform) => (
                <li key={platform.name} className="explore-platform-item">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-platform-link"
                  >
                    <span>{platform.name}</span>
                    <svg
                      className="explore-external-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  {platform.certificateAvailable && (
                    <span className="explore-cert-badge">🏆 Certificate</span>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ExploreCourses() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("default");
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | "All">("All");

  const filtered = useMemo(() => {
    let result = coursesData;

    if (activeCategory !== "all") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (activeDifficulty !== "All") {
      result = result.filter((c) => c.difficulty === activeDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (sortOption === "difficulty-asc") {
      result = [...result].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
      );
    } else if (sortOption === "difficulty-desc") {
      result = [...result].sort(
        (a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty],
      );
    } else if (sortOption === "duration-asc") {
      result = [...result].sort(
        (a, b) => parseInt(a.duration, 10) - parseInt(b.duration, 10),
      );
    }

    return result;
  }, [activeCategory, searchQuery, sortOption, activeDifficulty]);

  return (
    <Layout
      title="Explore Courses"
      description="Browse categorized free courses with structured cards, difficulty levels, duration, tags, and links to trusted free platforms."
    >
      <Head>
        <meta
          name="description"
          content="Explore free courses across Data Engineering, Data Science, Web Development, Cloud, Databases, and Programming."
        />
      </Head>

      <main className="courses-page explore-page min-h-screen">
        {/* Hero */}
        <motion.section
          className="explore-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="explore-hero-inner">
            <h1 className="explore-hero-title">
              Explore{" "}
              <span className="courses-text-gradient">Free Courses</span>
            </h1>
            <p className="explore-hero-sub">
              Browse {coursesData.length}+ curated courses across multiple
              disciplines. Every course links directly to free platforms where
              you can learn and earn a certificate.
            </p>

            {/* Search */}
            <div className="explore-search-wrapper">
              <svg
                className="explore-search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by title, tag, or keyword…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="explore-search-input"
              />
              {searchQuery && (
                <button
                  className="explore-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </motion.section>

        {/* Filters */}
        <section className="explore-filters-section">
          <div className="explore-container">
            {/* Category Tabs */}
            <div className="explore-category-tabs" role="tablist">
              {courseCategories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`explore-category-tab ${activeCategory === cat.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="explore-cat-icon">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Difficulty + Sort Row */}
            <div className="explore-filter-row">
              {/* Difficulty Pills */}
              <div className="explore-difficulty-pills">
                {(["All", "Beginner", "Intermediate", "Advanced"] as const).map(
                  (d) => (
                    <button
                      key={d}
                      className={`explore-difficulty-pill ${activeDifficulty === d ? "active" : ""}`}
                      onClick={() => setActiveDifficulty(d)}
                    >
                      {d}
                    </button>
                  ),
                )}
              </div>

              {/* Sort */}
              <div className="explore-sort">
                <label htmlFor="explore-sort-select" className="explore-sort-label">
                  Sort by:
                </label>
                <select
                  id="explore-sort-select"
                  className="explore-sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="default">Default</option>
                  <option value="difficulty-asc">Difficulty ↑</option>
                  <option value="difficulty-desc">Difficulty ↓</option>
                  <option value="duration-asc">Duration ↑</option>
                </select>
              </div>
            </div>

            {/* Result count */}
            <p className="explore-result-count">
              {filtered.length === 0
                ? "No courses found."
                : `Showing ${filtered.length} course${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </section>

        {/* Course Grid */}
        <section className="explore-grid-section">
          <div className="explore-container">
            {filtered.length === 0 ? (
              <div className="explore-empty">
                <p>😔 No courses match your filters.</p>
                <button
                  className="courses-button-secondary mt-4 rounded-xl px-6 py-2"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setActiveDifficulty("All");
                  }}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <motion.div layout className="explore-grid">
                <AnimatePresence>
                  {filtered.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
