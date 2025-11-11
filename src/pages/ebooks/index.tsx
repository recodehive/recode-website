import React, { useState } from "react";
import Layout from "@theme/Layout";
import type { ReactElement } from "react";
import { useHistory } from "@docusaurus/router";
import books from "../../database/ebooks/index";
import "./index.css";

interface EbookData {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
  category?: string;
}

// Extract categories from books
const getCategory = (title: string): string => {
  if (title.toLowerCase().includes("python")) return "Programming";
  if (title.toLowerCase().includes("java")) return "Programming";
  if (
    title.toLowerCase().includes("c++") ||
    title.toLowerCase().includes("cpp")
  )
    return "Programming";
  if (title.toLowerCase().includes("c ")) return "Programming";
  return "Programming";
};

const ebooksData: EbookData[] = books.map((book) => ({
  ...book,
  category: getCategory(book.title),
}));

const EbookTitle: React.FC<{
  title: string;
  category: string;
}> = ({ title, category }) => (
  <div className="ebook-title-wrapper">
    <div className="ebook-type-badge">
      <span className="type-icon">📚</span>
      {category}
    </div>
    <h3 className="ebook-title-text">{title}</h3>
  </div>
);

export default function Ebooks(): ReactElement {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "Programming" | "Web Development" | "Data Science"
  >("all");
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ebook-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [ebooks] = useState<EbookData[]>(ebooksData);
  const ebooksPerPage = 9;

  const filteredEbooks = ebooks.filter((ebook) => {
    const matchesFilter =
      selectedFilter === "all" || ebook.category === selectedFilter;
    const matchesSearch =
      searchTerm === "" ||
      (ebook.title &&
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ebook.description &&
        ebook.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const indexOfLastEbook = currentPage * ebooksPerPage;
  const indexOfFirstEbook = indexOfLastEbook - ebooksPerPage;
  const currentEbooks = filteredEbooks.slice(
    indexOfFirstEbook,
    indexOfLastEbook,
  );
  const totalPages = Math.ceil(filteredEbooks.length / ebooksPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = async (ebook: EbookData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this ebook: ${ebook.title}`,
          url: ebook.link,
        });
      } catch {
        navigator.clipboard.writeText(ebook.link);
      }
    } else {
      navigator.clipboard.writeText(ebook.link);
    }
  };

  const handleFavorite = (ebook: EbookData, event: React.MouseEvent) => {
    event.stopPropagation();

    setFavorites((prev) => {
      const isFavorited = prev.includes(ebook.id);
      const newFavorites = isFavorited
        ? prev.filter((id) => id !== ebook.id)
        : [...prev, ebook.id];
      if (typeof window !== "undefined") {
        localStorage.setItem("ebook-favorites", JSON.stringify(newFavorites));
      }
      return newFavorites;
    });
  };

  const handleEbookClick = (
    ebook: EbookData,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => {
    const target = event.target as HTMLElement;

    if (
      target.closest(".ebook-image-wrapper") ||
      target.closest(".action-btn") ||
      target.closest(".card-actions") ||
      target.classList.contains("action-btn") ||
      target.classList.contains("favorite") ||
      target.classList.contains("share") ||
      target.closest(".ebook-read-button")
    ) {
      return;
    }

    if (ebook.link.startsWith("http")) {
      window.open(ebook.link, "_blank");
    } else {
      history.push(ebook.link);
    }
  };

  const handleReadNow = (ebook: EbookData, event: React.MouseEvent) => {
    event.stopPropagation();
    if (ebook.link.startsWith("http")) {
      window.open(ebook.link, "_blank");
    } else {
      history.push(ebook.link);
    }
  };

  // Get unique categories
  const categories = Array.from(
    new Set(ebooks.map((ebook) => ebook.category || "Programming")),
  );

  return (
    <Layout>
      <div className="enhanced-ebook-container">
        <div className="ebook-hero">
          <div className="ebook-hero-content">
            <div className="hero-badge">
              <span className="badge-icon">📚</span>
              <span className="badge-text">Premium Learning Resources</span>
            </div>
            <h1 className="ebook-hero-title">Explore Ebooks</h1>
            <p className="ebook-hero-description">
              Read high-quality ebooks on programming, tools, and development.
              Dive into comprehensive guides that inspire, educate, and help you
              master new skills.
            </p>
            <div className="ebook-stats">
              <div className="stat-item">
                <div className="stat-number">{ebooks.length}+</div>
                <div className="stat-label">Ebooks</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{categories.length}+</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Free</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ebook-filters">
          <div className="filter-search">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              placeholder="Search ebooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${selectedFilter === "all" ? "active" : ""}`}
              onClick={() => setSelectedFilter("all")}
            >
              <span className="tab-icon">📊</span>
              All ({ebooks.length})
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${selectedFilter === category ? "active" : ""}`}
                onClick={() => setSelectedFilter(category as any)}
              >
                <span className="tab-icon">📚</span>
                {category} (
                {ebooks.filter((e) => e.category === category).length})
              </button>
            ))}
          </div>
        </div>

        <div className="ebook-content-section">
          {currentEbooks.length > 0 ? (
            <>
              <div className="ebook-grid">
                {currentEbooks.map((ebook, index) => (
                  <div
                    key={ebook.id}
                    className="enhanced-ebook-card"
                    onClick={(e) => handleEbookClick(ebook, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleEbookClick(ebook, e);
                      }
                    }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="ebook-card-header">
                      <EbookTitle
                        title={ebook.title}
                        category={ebook.category || "Programming"}
                      />
                      <div
                        className="card-actions"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <button
                          className={`action-btn favorite unfavorited ${
                            favorites.includes(ebook.id) ? "favorited" : ""
                          }`}
                          title={
                            favorites.includes(ebook.id)
                              ? "Remove from favorites"
                              : "Add to favorites"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            handleFavorite(ebook, e);
                          }}
                        >
                          {favorites.includes(ebook.id) ? "🤍" : "❤️"}
                        </button>
                        <button
                          className="action-btn share"
                          title="Share ebook"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(ebook);
                          }}
                        >
                          🔗
                        </button>
                      </div>
                    </div>

                    <div
                      className="ebook-image-wrapper"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={ebook.image}
                        alt={ebook.title}
                        className="ebook-image"
                        loading="lazy"
                      />
                    </div>

                    <div className="ebook-card-content">
                      <p className="ebook-description">{ebook.description}</p>
                      <button
                        className="ebook-read-button"
                        onClick={(e) => handleReadNow(ebook, e)}
                      >
                        <span className="read-icon">📖</span>
                        Read Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="enhanced-pagination">
                  <button
                    className="pagination-nav"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    ← Previous
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (number) => (
                        <button
                          key={number}
                          className={`pagination-number ${currentPage === number ? "active" : ""}`}
                          onClick={() => handlePageChange(number)}
                        >
                          {number}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    className="pagination-nav"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No ebooks found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
