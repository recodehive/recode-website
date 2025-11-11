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
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter blogs based on search term and category
  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => {
        const category = getCategory(blog.title);
        return category === selectedCategory;
      });
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Get category from blog title
  const getCategory = (title: string) => {
    if (
      title.toLowerCase().includes("design") ||
      title.toLowerCase().includes("ux")
    )
      return "Design";
    if (
      title.toLowerCase().includes("ai") ||
      title.toLowerCase().includes("deepmind") ||
      title.toLowerCase().includes("agent")
    )
      return "AI & Tech";
    if (
      title.toLowerCase().includes("github") ||
      title.toLowerCase().includes("git")
    )
      return "Development";
    if (
      title.toLowerCase().includes("spark") ||
      title.toLowerCase().includes("n8n") ||
      title.toLowerCase().includes("automation")
    )
      return "Engineering";
    return "Resources";
  };

  const categories = [
    "All",
    "Design",
    "AI & Tech",
    "Development",
    "Engineering",
    "Resources",
  ];

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

      <div className="github-blog-page">
        {/* Hero Section - GitHub Style */}
        <section className="github-hero">
          <div className="github-hero-content">
            <h1 className="github-hero-title">The recode hive Blog</h1>
            <p className="github-hero-subtitle">
              Insights, updates, and best practices from the recode hive
              community
            </p>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div className="github-blog-container">
          {/* Sidebar - Table of Contents */}
          <aside className="github-sidebar">
            <div className="sidebar-sticky">
              <h3 className="sidebar-title">All articles</h3>

              {/* Search in Sidebar */}
              <div className="sidebar-search">
                <svg
                  className="sidebar-search-icon"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.5 4.5 0 1 0-8.997.001A4.5 4.5 0 0 0 11.5 7Z"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="sidebar-search-input"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Category Filter */}
              <div className="sidebar-categories">
                <h4 className="sidebar-categories-title">Categories</h4>
                <ul className="sidebar-category-list">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className={`sidebar-category-item ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <span className="category-count">
                          {category === "All"
                            ? blogs.length
                            : blogs.filter(
                                (b) => getCategory(b.title) === category,
                              ).length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog Table of Contents */}
              <div className="sidebar-toc">
                <h4 className="sidebar-toc-title">Recent posts</h4>
                <ul className="sidebar-toc-list">
                  {filteredBlogs.slice(0, 8).map((blog) => (
                    <li key={blog.id}>
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="sidebar-toc-link"
                      >
                        {blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="github-main-content">
            {searchTerm && (
              <div className="github-search-results">
                <p>
                  {filteredBlogs.length > 0
                    ? `${filteredBlogs.length} article${filteredBlogs.length !== 1 ? "s" : ""} found`
                    : `No articles found`}
                </p>
              </div>
            )}

            <div className="github-blog-grid">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    getCategory={getCategory}
                  />
                ))
              ) : (
                <div className="github-no-results">
                  <div className="github-no-results-icon">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                      <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.5 4.5 0 1 0-8.997.001A4.5 4.5 0 0 0 11.5 7Z"></path>
                    </svg>
                  </div>
                  <h3>No articles found</h3>
                  <p>Try adjusting your search or filters.</p>
                  <button
                    className="github-clear-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

const BlogCard = ({ blog, getCategory }) => {
  // Get authors for this blog post
  const getAuthors = (slug) => {
    const authors = authorMapping[slug] || ["recode hive Team"];
    return authors.length > 1 ? authors.join(" & ") : authors[0];
  };

  const category = getCategory(blog.title);
  const authorName = getAuthors(blog.slug);

  return (
    <article className="github-blog-card">
      <Link to={`/blog/${blog.slug}`} className="github-card-link">
        <div className="github-card-image">
          <img src={blog.image} alt={blog.title} loading="lazy" />
        </div>
        <div className="github-card-content">
          <div className="github-card-meta">
            <span className="github-card-category">{category}</span>
          </div>
          <h2 className="github-card-title">{blog.title}</h2>
          <p className="github-card-description">{blog.description}</p>
          <div className="github-card-footer">
            <div className="github-card-author">
              <div className="github-author-avatar">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <span className="github-author-name">{authorName}</span>
            </div>
            <span className="github-card-read-time">5 min read</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
