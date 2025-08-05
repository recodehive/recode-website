import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import blogs from "../../database/blogs/index";
import Head from "@docusaurus/Head";
import { FaCode, FaPalette, FaBrain, FaStar } from "react-icons/fa";
import "./blogs-new.css";

export default function Blogs(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Filter blogs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
      description="Welcome to RecodeHive Blogs. Learn the basics to advanced concepts of web development including HTML, CSS, JavaScript, React, Node.js, DSA, and more."
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero-section">
          <div className="blog-hero-container">
            <h1 className="blog-main-title">Welcome to RecodeHive Blogs</h1>
            <p className="blog-main-subtitle">
              Discover web development articles ranging from HTML and CSS to JavaScript, React,<br />
              Node.js, DSA, and much more
            </p>

            {/* Category Icons */}
            <div className="blog-category-icons">
              <div className="category-icon">
                <div className="icon-wrapper development">
                  <FaCode />
                </div>
                <span>Development</span>
              </div>
              <div className="category-icon">
                <div className="icon-wrapper design">
                  <FaPalette />
                </div>
                <span>Design</span>
              </div>
              <div className="category-icon">
                <div className="icon-wrapper ai-tech">
                  <FaBrain />
                </div>
                <span>AI & Tech</span>
              </div>
              <div className="category-icon">
                <div className="icon-wrapper innovation">
                  <FaStar />
                </div>
                <span>Innovation</span>
              </div>
            </div>

            <button className="explore-articles-btn">
              <span>Explore Articles</span>
            </button>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="latest-articles-section">
          <div className="articles-container">
            <div className="section-header">
              <h2 className="section-title">Latest Articles</h2>
              <p className="section-subtitle">
                Stay updated with the latest trends, tutorials, and insights from the world of<br />
                technology and design
              </p>

              {/* Search Bar */}
              <div className="search-container">
                <div className="search-wrapper">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="search-decoration">
                  <div className="search-line"></div>
                  <div className="search-dot"></div>
                  <div className="search-circle"></div>
                </div>
              </div>
            </div>

            {/* Search Results Counter */}
            {searchTerm && (
              <div className="search-results-info">
                <p>
                  {filteredBlogs.length > 0
                    ? `Found ${filteredBlogs.length} article${filteredBlogs.length !== 1 ? 's' : ''} for "${searchTerm}"`
                    : `No articles found for "${searchTerm}"`
                  }
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
                    <p>Try adjusting your search terms or browse all articles.</p>
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
    if (title.toLowerCase().includes('design') || title.toLowerCase().includes('ux')) return 'Design';
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('deepmind')) return 'AI & Tech';
    if (title.toLowerCase().includes('github') || title.toLowerCase().includes('git')) return 'Development';
    return 'Resources';
  };

  const category = getCategory(blog.title);

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
            <span className="author-name">Author Name</span>
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