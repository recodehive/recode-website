import React, { type ChangeEvent } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import blogs from "../../database/blogs/index";
import Head from "@docusaurus/Head";
import { getAuthorProfiles, getAuthorTooltip } from "../../utils/authors";

import "./blogs-new.css";

export default function Blogs() {
  const { siteConfig } = useDocusaurusContext();
  const [searchInput, setSearchInput] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredBlogs, setFilteredBlogs] = React.useState(blogs);

  // Filter blogs after the user submits the blog search form.
  React.useEffect(() => {
    let filtered = blogs;

    if (searchTerm.trim() !== "") {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(normalizedSearch) ||
          blog.description.toLowerCase().includes(normalizedSearch) ||
          blog.tags?.some((tag) =>
            tag.toLowerCase().includes(normalizedSearch),
          ),
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  return (
    <Layout
      title={`Blogs from ${siteConfig.title}`}
      description="Welcome to recode hive Blogs. Learn the basics to advanced concepts of web development including HTML, CSS, JavaScript, React, Node.js, DSA, and more."
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="latest-articles-section">
          <div className="articles-container-wrapper">
            <div className="articles-main-content">
              <div className="blog-search-panel">
                <p className="blog-search-eyebrow">Explore articles</p>
                <h2 className="blog-search-title">Find the right guide</h2>
                <form
                  className="blog-search-form"
                  onSubmit={handleSearchSubmit}
                >
                  <label className="blog-search-field">
                    <span className="blog-search-visually-hidden">
                      Search blog articles
                    </span>
                    <svg
                      className="blog-search-submit-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                      type="search"
                      placeholder="Search tutorials, tools, or technologies"
                      value={searchInput}
                      onChange={handleSearchChange}
                    />
                  </label>
                  <button className="blog-search-button" type="submit">
                    Search
                  </button>
                  {searchTerm && (
                    <button
                      className="blog-search-clear-button"
                      type="button"
                      onClick={handleClearFilters}
                    >
                      Clear
                    </button>
                  )}
                </form>
              </div>

              {/* Search Results Counter */}
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
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <BlogCard key={blog.id ?? blog.slug} blog={blog} />
                  ))
                ) : (
                  <div className="no-results">
                    <div className="no-results-content">
                      <div className="no-results-icon">🔍</div>
                      <h3>No articles found</h3>
                      <p>
                        Try adjusting your search terms or browse all articles.
                      </p>
                      <button
                        className="clear-search-btn"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const BlogCard = ({ blog }: { blog: (typeof blogs)[number] }) => {
  const authors = getAuthorProfiles(blog.authors || []);

  return (
    <div className="article-card">
      <div className="card-category">{blog.category}</div>
      <div className="card-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">
          <Link to={`/blog/${blog.slug}`} className="card-title-link">
            {blog.title}
          </Link>
        </h3>
        <p className="card-description">{blog.description}</p>
        <div className="card-meta">
          <div className="card-author">
            {/* Stacked Author Avatars */}
            {authors.length > 0 &&
              (() => {
                const max = 3;
                const visible = authors.slice(0, max);
                const extra = Math.max(0, authors.length - max);
                return (
                  <div className="author-stack" aria-hidden>
                    {visible.map((a, i) => (
                      <div
                        key={a.id}
                        className="author-stack-item"
                        style={{ zIndex: max - i }}
                      >
                        {a.imageUrl ? (
                          <img
                            src={a.imageUrl}
                            alt={a.name}
                            className="author-stack-avatar"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = "none";
                              const fallback =
                                target.nextElementSibling as HTMLElement | null;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                        ) : (
                          <span className="author-stack-fallback">
                            {a.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    ))}
                    {extra > 0 && (
                      <div className="author-stack-more">+{extra}</div>
                    )}
                  </div>
                );
              })()}

            {/* Author Names */}
            <div className="author-name-group">
              {authors.map((author, authorIndex) => (
                <span key={author.id} className="author-item">
                  {authorIndex > 0 && (
                    <span className="author-separator">,</span>
                  )}
                  <Link
                    href={author.githubUrl}
                    className="author-name author-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-author-tooltip={getAuthorTooltip(author.id)}
                    aria-label={`Open ${author.name} on GitHub`}
                  >
                    {author.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <span className="card-read-time">5 min read</span>
        </div>
        <Link to={`/blog/${blog.slug}`} className="card-read-more">
          Read Article →
        </Link>
      </div>
    </div>
  );
};
