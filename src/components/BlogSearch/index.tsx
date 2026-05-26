import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "@docusaurus/Link";
import { useHistory } from "@docusaurus/router";
import blogs from "../../database/blogs/index";
import "./BlogSearch.css";

interface BlogSearchProps {
  initialSearchTerm?: string;
  onSearchSubmit: (term: string) => void;
}

export default function BlogSearch({ initialSearchTerm = "", onSearchSubmit }: BlogSearchProps) {
  const [query, setQuery] = useState(initialSearchTerm);
  const [debouncedQuery, setDebouncedQuery] = useState(initialSearchTerm);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    let q = debouncedQuery.toLowerCase().trim();
    const isTagSearch = q.startsWith("#");

    if (isTagSearch) {
      q = q.slice(1);
    }

    if (!q) return { articles: [], tutorials: [], tags: [] };

    const articles: typeof blogs = [];
    const tutorials: typeof blogs = [];
    const matchedTags = new Set<string>();

    blogs.forEach((blog) => {
      let isMatch = false;

      if (!isTagSearch) {
        if (blog.title.toLowerCase().includes(q)) isMatch = true;
        if (blog.description.toLowerCase().includes(q)) isMatch = true;
      }

      if (blog.category.toLowerCase().includes(q)) {
        isMatch = true;
        matchedTags.add(blog.category);
      }
      blog.tags?.forEach((tag) => {
        if (tag.toLowerCase().includes(q)) {
          isMatch = true;
          matchedTags.add(tag);
        }
      });

      if (isMatch) {
        const isTutorial =
          blog.category.toLowerCase().includes("tutorial") ||
          blog.title.toLowerCase().includes("tutorial") ||
          blog.title.toLowerCase().includes("how to") ||
          blog.title.toLowerCase().includes("guide") ||
          blog.tags?.some((t) => t.toLowerCase().includes("tutorial"));

        if (isTutorial) {
          tutorials.push(blog);
        } else {
          articles.push(blog);
        }
      }
    });

    return {
      articles: articles.slice(0, 3),
      tutorials: tutorials.slice(0, 3),
      tags: Array.from(matchedTags).slice(0, 5),
    };
  }, [debouncedQuery]);

  const totalResults = searchResults.articles.length + searchResults.tutorials.length;
  // Flatten items for keyboard navigation
  const selectableItems = useMemo(() => {
    const items: Array<{ type: string; url?: string; label: string }> = [];
    searchResults.articles.forEach((a) => items.push({ type: "article", url: `/blog/${a.slug}`, label: a.title }));
    searchResults.tutorials.forEach((t) => items.push({ type: "tutorial", url: `/blog/${t.slug}`, label: t.title }));
    searchResults.tags.forEach((t) => items.push({ type: "tag", label: t }));
    return items;
  }, [searchResults]);

  useEffect(() => {
    // Reset focus when query or items change
    setFocusedIndex(-1);
  }, [debouncedQuery, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < selectableItems.length) {
        const item = selectableItems[focusedIndex];
        if (item.url) {
          history.push(item.url);
          setIsOpen(false);
        } else if (item.type === "tag") {
          setQuery(item.label);
          onSearchSubmit(item.label);
          setIsOpen(false);
        }
      } else {
        onSearchSubmit(query.trim());
        setIsOpen(false);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex((prev) => (prev < selectableItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
    onSearchSubmit("");
    inputRef.current?.focus();
  };

  return (
    <div className="blog-search-wrapper" ref={wrapperRef}>
      <div className={`blog-search-input-container ${isOpen && totalResults > 0 ? "dropdown-open" : ""}`}>
        <svg className="blog-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="blog-search-input"
          placeholder="Search tutorials, tools, or technologies"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          role="combobox"
          aria-controls="blog-search-dropdown"
          aria-autocomplete="list"
        />
        {query && (
          <button className="blog-search-clear" onClick={handleClear} aria-label="Clear search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {isOpen && query.trim() && (
        <div id="blog-search-dropdown" className="blog-search-dropdown">
          {totalResults === 0 && searchResults.tags.length === 0 ? (
            <div className="blog-search-no-results">No results found for "{debouncedQuery}"</div>
          ) : (
            <>
              {searchResults.articles.length > 0 && (
                <div className="blog-search-section">
                  <h4 className="blog-search-section-title">MATCHING ARTICLES</h4>
                  <div className="blog-search-articles">
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    {searchResults.articles.map((article, idx) => {
                      const itemIndex = selectableItems.findIndex((item) => item.label === article.title);
                      return (
                        <Link 
                          to={`/blog/${article.slug}`} 
                          key={article.id}
                          className={`blog-search-article-card ${focusedIndex === itemIndex ? "focused" : ""}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="blog-search-article-img">
                            <img src={article.image} alt={article.title} />
                          </div>
                          <div className="blog-search-article-info">
                            <h5>{article.title}</h5>
                            <span className="blog-search-read-time">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                              5 min read
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="blog-search-bottom-sections">
                {searchResults.tutorials.length > 0 && (
                  <div className="blog-search-section flex-1">
                    <h4 className="blog-search-section-title">MATCHING TUTORIALS</h4>
                    <div className="blog-search-tutorials">
                      {searchResults.tutorials.map((tutorial) => {
                        const itemIndex = selectableItems.findIndex((item) => item.label === tutorial.title);
                        return (
                          <Link 
                            to={`/blog/${tutorial.slug}`} 
                            key={tutorial.id}
                            className={`blog-search-tutorial-item ${focusedIndex === itemIndex ? "focused" : ""}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="blog-search-tutorial-icon">
                              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                            </div>
                            <div className="blog-search-tutorial-info">
                              <h5>{tutorial.title}</h5>
                              <span className="blog-search-read-time">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                5 min read
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {searchResults.tags.length > 0 && (
                  <div className="blog-search-section flex-1">
                    <h4 className="blog-search-section-title">MATCHING TAGS</h4>
                    <div className="blog-search-tags">
                      {searchResults.tags.map((tag) => {
                        const itemIndex = selectableItems.findIndex((item) => item.label === tag);
                        return (
                          <button
                            key={tag}
                            className={`blog-search-tag-pill ${focusedIndex === itemIndex ? "focused" : ""}`}
                            onClick={() => {
                              setQuery(tag);
                              onSearchSubmit(tag);
                              setIsOpen(false);
                            }}
                          >
                            #{tag.replace(/\s+/g, "")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
