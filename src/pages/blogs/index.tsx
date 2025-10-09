import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import blogs from "../../database/blogs/index";
import Head from "@docusaurus/Head";

import "./blogs-new.css";

// Author mapping based on actual blog posts
const authorMapping = {
  "streamline-ux-ui": ["Sowmiya Venketashan", "Sanjay Viswanthan"],
  "ux-ui-design-job": ["Sowmiya Venketashan", "Sanjay Viswanthan"],
  "ux-designers-ai": ["Sowmiya Venketashan", "Sanjay Viswanthan"],
  "google-deepmind": ["Sowmiya Venketashan", "Sanjay Viswanthan"],
  "google-backlinks": ["Sanjay Viswanthan"],
  "git-coding-agent": ["Sanjay Viswanthan"],
  "spark-architecture": ["Aditya Singh Rathore", "Sanjay Viswanthan"],
  "n8n-workflow-automation": ["Aditya Singh Rathore"],
};

export default function Blogs(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Filter blogs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
                Welcome to <span className="gradient-text">recode hive</span>{" "}
                Blogs
              </h1>
              <p className="blog-main-subtitle">
                Discover comprehensive web development articles, tutorials, and
                insights covering everything from HTML & CSS fundamentals to
                advanced JavaScript, React, Node.js, Data Structures &
                Algorithms, and cutting-edge technologies.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="latest-articles-section">
          <div className="articles-container">
            <div className="section-header">
              {/* Search Bar */}
              <div className="search-container">
                <div className="search-wrapper">
                  <svg
                    className="search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search article by title, topic"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchTerm && (
                    <button
                      className="clear-search-icon"
                      onClick={() => setSearchTerm("")}
                      aria-label="Clear search"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search Results Counter */}
            {searchTerm && (
              <div className="search-results-info">
                <p>
                  {filteredBlogs.length > 0
                    ? `Found ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? "s" : ""} for "${searchTerm}"`
                    : `No articles found for "${searchTerm}"`}
                </p>
              </div>
            )}

            <div className="articles-grid">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
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
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const BlogCard = ({ blog, index }) => {
  // Get category from blog title or description for demo purposes
  const getCategory = (title) => {
    if (
      title.toLowerCase().includes("design") ||
      title.toLowerCase().includes("ux")
    )
      return "Design";
    if (
      title.toLowerCase().includes("ai") ||
      title.toLowerCase().includes("deepmind")
    )
      return "AI & Tech";
    if (
      title.toLowerCase().includes("github") ||
      title.toLowerCase().includes("git")
    )
      return "Development";
    return "Resources";
  };

  // Get authors for this blog post
  const getAuthors = (slug) => {
    const authors = authorMapping[slug] || ["recode hive Team"];
    return authors.length > 1 ? authors.join(" & ") : authors[0];
  };

  const category = getCategory(blog.title);
  const authorName = getAuthors(blog.slug);

  return (
    <div className="article-card">
      <div className="card-category">{category}</div>
      <div className="card-image">
        <img src={blog.image} alt={blog.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{blog.title}</h3>
        <p className="card-description">{blog.description}</p>
        <div className="card-meta">
          <div className="card-author">
            <span className="author-avatar">👤</span>
            <span className="author-name" data-full-name={authorName}>
              {authorName}
            </span>
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
