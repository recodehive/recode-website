import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import blogs from "../../database/blogs/index";
import Head from "@docusaurus/Head";
import { getAuthorProfiles } from "../../utils/authors";
import { filterBlogsBySearchTerm } from "../../utils/blogFilters";
import BlogSearch from "../../components/BlogSearch";

import "./blogs-new.css";

const POSTS_PER_PAGE = 12;

// Stable color per tag label (cycles through palette)
const TAG_COLORS = [
  { dot: "#f59e0b", border: "#fde68a", bg: "#fffbeb", text: "#92400e" },
  { dot: "#6366f1", border: "#c7d2fe", bg: "#eef2ff", text: "#3730a3" },
  { dot: "#ec4899", border: "#fbcfe8", bg: "#fdf2f8", text: "#9d174d" },
  { dot: "#10b981", border: "#a7f3d0", bg: "#ecfdf5", text: "#065f46" },
  { dot: "#3b82f6", border: "#bfdbfe", bg: "#eff6ff", text: "#1e40af" },
  { dot: "#8b5cf6", border: "#ddd6fe", bg: "#f5f3ff", text: "#5b21b6" },
  { dot: "#f97316", border: "#fed7aa", bg: "#fff7ed", text: "#9a3412" },
  { dot: "#14b8a6", border: "#99f6e4", bg: "#f0fdfa", text: "#134e4a" },
];

function tagColor(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++)
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function Blogs() {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const filteredBlogs = React.useMemo(() => {
    const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);
    return filterBlogsBySearchTerm(sortedBlogs, searchTerm);
  }, [searchTerm, blogs]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE));
  const showingStart = filteredBlogs.length === 0 ? 0 : (currentPage - 1) * POSTS_PER_PAGE + 1;
  const showingEnd = Math.min(currentPage * POSTS_PER_PAGE, filteredBlogs.length);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const visiblePages = (() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  })();

  const showLastPage = visiblePages[visiblePages.length - 1] < totalPages;

  const handleClearFilters = () => {
    setSearchTerm("");
  };

  return (
    <Layout
      title={`Blogs from ${siteConfig.title}`}
      description="Welcome to recode hive Blogs. Learn the basics to advanced concepts of web development including HTML, CSS, JavaScript, React, Node.js, DSA, and more."
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="blog-page">
        {/* Background Geometric Shapes */}
        <div className="bg-shapes">
          <div className="bg-shape bg-shape-1"></div>
          <div className="bg-shape bg-shape-2"></div>
          <div className="bg-shape bg-shape-3"></div>
          <div className="bg-shape bg-shape-4"></div>
          <div className="bg-shape bg-shape-5"></div>
        </div>

        {/* Hero Section */}
        <section className="blog-hero-section">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
          <div className="blog-hero-container">
            <div className="hero-content">
              <h1 className="blog-main-title">
                Engineering <span className="gradient-text">uptime</span>{" "}
              </h1>
              <p className="blog-main-subtitle">blog by recode community.</p>
              <div style={{ width: "100%", marginTop: "24px" }}>
                <BlogSearch initialSearchTerm={searchTerm} onSearchSubmit={setSearchTerm} />
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="latest-articles-section">
          <div className="articles-container-wrapper">
            <div className="articles-main-content">
              <div className="blog-search-panel" style={{ padding: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                <p className="blog-search-eyebrow">Explore articles</p>
              </div>

              {searchTerm && (
                <div className="search-results-info">
                  <p>
                    {filteredBlogs.length > 0
                      ? `Found ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? "s" : ""}`
                      : `No articles found`}
                    {` for "${searchTerm}"`}
                  </p>
                </div>
              )}

              <div className="articles-grid">
                {paginatedBlogs.length > 0 ? (
                  paginatedBlogs.map((blog) => (
                    <React.Fragment key={blog.id ?? blog.slug}>
                      <BlogCard blog={blog} />
                    </React.Fragment>
                  ))
                ) : (
                  <div className="no-results">
                    <div className="no-results-content">
                      <div className="no-results-icon">🔍</div>
                      <h3>No articles found</h3>
                      <p>Try adjusting your search terms or browse all articles.</p>
                      <button className="clear-search-btn" onClick={handleClearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {filteredBlogs.length > POSTS_PER_PAGE && (
                <div className="pagination-wrapper">
                  <div className="pagination-container">
                    <button
                      className="pagination-btn"
                      disabled={currentPage === 1}
                      aria-label="Go to previous page"
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </button>

                    <div className="pagination-pages">
                      {visiblePages.map((page) => (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? "active-page" : ""}`}
                          aria-label={`Go to page ${page}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                      {showLastPage && (
                        <>
                          <span className="pagination-ellipsis">...</span>
                          <button
                            className={`pagination-number ${currentPage === totalPages ? "active-page" : ""}`}
                            aria-label={`Go to page ${totalPages}`}
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      className="pagination-btn"
                      disabled={currentPage === totalPages}
                      aria-label="Go to next page"
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </button>
                  </div>
                  <p className="pagination-summary">
                    Showing {showingStart} - {showingEnd} of {filteredBlogs.length} posts
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

// ─── BlogCard ────────────────────────────────────────────────────────────────

const BlogCard = ({ blog }: { blog: (typeof blogs)[number] }) => {
  const authors = getAuthorProfiles(blog.authors || []);

  // Tags — use blog.tags if present, fallback to blog.category as single tag
  const tags: string[] =
    Array.isArray(blog.tags) && blog.tags.length > 0
      ? blog.tags
      : blog.category
        ? [blog.category]
        : [];

  return (
    <div className="article-card">
      {/* ── Image ── */}
      <div className="card-image">
        <img src={blog.image} alt={blog.title} loading="lazy" />
      </div>

      {/* ── Content ── */}
      <div className="card-content">
        {/* Title */}
        <h3 className="card-title">
          <Link to={`/blog/${blog.slug}`} className="card-title-link">
            {blog.title}
          </Link>
        </h3>

        {/* Description */}
        {blog.description && (
          <p className="card-description">{blog.description}</p>
        )}

        {/* Tag pills */}
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.slice(0, 6).map((tag) => {
              const c = tagColor(tag);
              return (
                <span
                  key={tag}
                  className="card-tag"
                  style={{
                    "--tag-dot": c.dot,
                    "--tag-border": c.border,
                    "--tag-bg": c.bg,
                    "--tag-text": c.text,
                  } as React.CSSProperties}
                >
                  <span className="card-tag-dot" />
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Bottom row: avatar stack + author names + date  ···  Read → */}
        <div className="card-footer">
          <div className="card-author-row">
            {/* Avatar stack */}
            {authors.length > 0 && (
              <div className="card-avatar-stack">
                {authors.slice(0, 3).map((author, idx) => (
                  <Link
                    key={author.id}
                    href={author.githubUrl}
                    className="card-avatar"
                    style={{ zIndex: authors.length - idx } as React.CSSProperties}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={author.name}
                  >
                    {author.imageUrl ? (
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="card-avatar-img"
                        onError={(e) => {
                          const t = e.currentTarget;
                          t.style.display = "none";
                          const fb = t.nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <span
                      className="card-avatar-fallback"
                      style={{ display: author.imageUrl ? "none" : "flex" }}
                    >
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Author names + date stacked */}
            <div className="card-author-info">
              {authors.length > 0 && (
                <span className="card-author-names">
                  {authors.map((author, idx) => (
                    <React.Fragment key={author.id}>
                      {idx > 0 && <span className="card-author-sep">, </span>}
                      <Link
                        href={author.githubUrl}
                        className="card-author-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={author.name}
                      >
                        {author.name}
                      </Link>
                    </React.Fragment>
                  ))}
                </span>
              )}
              {blog.date && (
                <span className="card-date">{formatDate(blog.date)}</span>
              )}
            </div>
          </div>

          {/* Read link */}
          <Link to={`/blog/${blog.slug}`} className="card-read-link">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
};
