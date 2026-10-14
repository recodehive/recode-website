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

type Blog = (typeof blogs)[number];

const POSTS_PER_PAGE = 12;
const FEATURED_COUNT = 5;
const RECENT_COUNT = 8;
const QUICK_READ_MAX_MINUTES = 5;

// Soft green-family tints for the "Quick reads" tiles
const TONES = ["#dcfce7", "#ecfccb", "#ccfbf1", "#fef9c3", "#d1fae5"];

const blogPath = (blog: Blog) => `/blog/${blog.slug}`;

const prettyCategory = (category?: string) =>
  category ? category.replace(/\b\w/g, (m) => m.toUpperCase()) : "Blog";

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

// ─── Card (one component, four layouts) ──────────────────────────────────────

type CardVariant = "big" | "list" | "grid" | "scroll";

function Card({
  blog,
  variant,
  tone,
}: {
  blog: Blog;
  variant: CardVariant;
  tone?: string;
}) {
  const authors = getAuthorProfiles(blog.authors || []);

  return (
    <article
      className={`q-card q-card--${variant}`}
      style={tone ? ({ "--tone": tone } as React.CSSProperties) : undefined}
    >
      {variant !== "list" && (
        <div className="q-card-media">
          <img src={blog.image} alt="" loading="lazy" />
        </div>
      )}

      <div className="q-eyebrow">
        <span>{prettyCategory(blog.category)}</span>
        <span>{blog.readingTime ?? 1} mins</span>
      </div>

      <h3 className="q-card-title">
        <Link to={blogPath(blog)} className="q-card-link">
          {blog.title}
        </Link>
      </h3>

      {variant === "grid" && blog.description && (
        <p className="q-card-desc">{blog.description}</p>
      )}

      <p className="q-meta">
        <span>{formatDate(blog.date)}</span>
        {authors.length > 0 && (
          <>
            <i className="q-dot" aria-hidden="true" />
            <span>
              By{" "}
              {authors.map((author, idx) => (
                <React.Fragment key={author.id}>
                  {idx > 0 && ", "}
                  <Link
                    href={author.githubUrl}
                    className="q-author"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author.name}
                  </Link>
                </React.Fragment>
              ))}
            </span>
          </>
        )}
      </p>
    </article>
  );
}

// ─── Featured carousel ───────────────────────────────────────────────────────

function FeaturedCarousel({ items }: { items: Blog[] }) {
  const [index, setIndex] = React.useState(0);
  const blog = items[index];
  if (!blog) return null;

  const go = (step: number) =>
    setIndex((i) => (i + step + items.length) % items.length);

  return (
    <section
      className="q-featured"
      aria-roledescription="carousel"
      aria-label="Featured articles"
    >
      <div className="q-featured-text" key={blog.id}>
        <span className="q-pill">
          {prettyCategory(blog.category)} | {blog.readingTime ?? 1} min
        </span>
        <h2 className="q-featured-title">{blog.title}</h2>
        <p className="q-featured-desc">{blog.description}</p>
        <Link to={blogPath(blog)} className="q-link">
          Read article <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <Link
        to={blogPath(blog)}
        className="q-featured-media"
        key={`media-${blog.id}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img src={blog.image} alt="" />
      </Link>

      <div className="q-arrows">
        <button type="button" onClick={() => go(-1)} aria-label="Previous featured article">
          ←
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next featured article">
          →
        </button>
      </div>
    </section>
  );
}

// ─── Most recent articles ────────────────────────────────────────────────────

function RecentSection({ items }: { items: Blog[] }) {
  if (items.length === 0) return null;
  return (
    <section className="q-recent">
      <div className="q-recent-intro">
        <h2 className="q-h2">Our most recent articles</h2>
        <p className="q-muted">
          Here&apos;s our latest selection of articles on engineering, data and
          building software effectively.
        </p>
        <p className="q-small">Last update: {formatDate(items[0].date)}</p>
      </div>

      <div className="q-recent-big">
        {items.slice(0, 2).map((blog) => (
          <Card key={blog.id} blog={blog} variant="big" />
        ))}
      </div>

      <div className="q-recent-list">
        {items.slice(2).map((blog) => (
          <Card key={blog.id} blog={blog} variant="list" />
        ))}
        <a href="#all-articles" className="q-link q-viewmore">
          View more <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

// ─── Quick reads (horizontal scroller) ───────────────────────────────────────

function QuickReads({ items }: { items: Blog[] }) {
  if (items.length < 2) return null;
  return (
    <section className="q-band">
      <div className="q-container">
        <h2 className="q-h2 q-center">Quick reads</h2>
        <p className="q-muted q-center">
          Short on time? These take {QUICK_READ_MAX_MINUTES} minutes or less.
        </p>
        <div className="q-scroll">
          {items.map((blog, i) => (
            <Card key={blog.id} blog={blog} variant="scroll" tone={TONES[i % TONES.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Articles by category ────────────────────────────────────────────────────

function CategorySection({ items }: { items: Blog[] }) {
  const categories = React.useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((b) => {
      const key = (b.category || "").toLowerCase();
      if (key) counts.set(key, (counts.get(key) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([key]) => key);
  }, [items]);

  const [active, setActive] = React.useState(categories[0]);
  const picks = items
    .filter((b) => (b.category || "").toLowerCase() === active)
    .slice(0, 3);

  if (categories.length === 0) return null;

  return (
    <section className="q-container q-cat">
      <div className="q-cat-tabs">
        <h2 className="q-h2">Articles by category</h2>
        {categories.map((key) => (
          <button
            key={key}
            type="button"
            className={`q-cat-tab ${key === active ? "is-active" : ""}`}
            onClick={() => setActive(key)}
          >
            {prettyCategory(key)}
            <span aria-hidden="true">→</span>
          </button>
        ))}
      </div>

      <div>
        <div className="q-cat-panel">
          {picks[0] && (
            <div className="q-cat-photo">
              <img src={picks[0].image} alt="" loading="lazy" />
            </div>
          )}
          <div className="q-cat-items">
            {picks.map((blog) => (
              <Card key={blog.id} blog={blog} variant="list" />
            ))}
          </div>
        </div>
        <a href="#all-articles" className="q-link q-cat-more">
          See articles <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Blogs() {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortedBlogs = React.useMemo(
    () => [...blogs].sort((a, b) => b.id - a.id),
    []
  );

  const filteredBlogs = React.useMemo(
    () => filterBlogsBySearchTerm(sortedBlogs, searchTerm),
    [sortedBlogs, searchTerm]
  );

  const quickReads = React.useMemo(
    () => sortedBlogs.filter((b) => (b.readingTime ?? 99) <= QUICK_READ_MAX_MINUTES).slice(0, 8),
    [sortedBlogs]
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const isSearching = searchTerm.trim().length > 0;
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

  return (
    <Layout
      title={`Blogs from ${siteConfig.title}`}
      description="Welcome to recode hive Blogs. Learn the basics to advanced concepts of web development including HTML, CSS, JavaScript, React, Node.js, DSA, and more."
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="blog-page">
        {/* Hero */}
        <header className="blog-hero">
          <h1 className="blog-main-title">
            Engineering <span className="blog-title-accent">uptime</span>
          </h1>
          <p className="blog-main-subtitle">blog by recode community.</p>
          <div className="blog-hero-search">
            <BlogSearch initialSearchTerm={searchTerm} onSearchSubmit={setSearchTerm} />
          </div>
        </header>

        {/* Editorial sections (hidden while searching) */}
        {!isSearching && (
          <>
            <div className="q-container">
              <FeaturedCarousel items={sortedBlogs.slice(0, FEATURED_COUNT)} />
              <RecentSection items={sortedBlogs.slice(0, RECENT_COUNT)} />
            </div>
            <QuickReads items={quickReads} />
            <CategorySection items={sortedBlogs} />
          </>
        )}

        {/* All articles / search results */}
        <section id="all-articles" className="q-container q-all">
          <h2 className="q-h2">{isSearching ? "Search results" : "All articles"}</h2>

          {isSearching && (
            <p className="q-results-info">
              {filteredBlogs.length > 0
                ? `Found ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? "s" : ""}`
                : "No articles found"}
              {` for "${searchTerm}"`}
            </p>
          )}

          {paginatedBlogs.length > 0 ? (
            <div className="q-grid">
              {paginatedBlogs.map((blog) => (
                <Card key={blog.id ?? blog.slug} blog={blog} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="q-empty">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or browse all articles.</p>
              <button type="button" className="q-btn" onClick={() => setSearchTerm("")}>
                Clear Filters
              </button>
            </div>
          )}

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
        </section>
      </div>
    </Layout>
  );
}