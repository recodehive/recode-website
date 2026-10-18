import React, { useState, useEffect, useRef, useMemo } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import {
  Search,
  LayoutGrid,
  List,
  ArrowRight,
  Bookmark,
  Check,
  X,
  Sparkles,
  BookOpen,
} from "lucide-react";
import books from "../../database/ebooks/index";
import "./index.css";

interface EbookItem {
  id: number;
  title: string;
  image: string;
  description: string;
  link: string;
  category: string;
  author: string;
  level: string;
  order?: number;
  publishedDate?: string;
}

// Map database books preserving all original properties, descriptions, and Google Drive links
// Order strictly matches PDF: 1: C, 2: C++, 3: Java, 4: Python
const ALL_EBOOKS: EbookItem[] = books
  .map((b) => {
    let order = 1;
    let author = "[Author]";
    let level = "[Level]";

    if (b.title.includes("C++") || b.title.includes("CPP")) {
      order = 2;
    } else if (b.title.includes("Java")) {
      order = 3;
    } else if (b.title.includes("Python")) {
      order = 4;
    } else if (b.title.includes("C")) {
      order = 1;
    }

    return {
      ...b,
      order,
      category: "Programming",
      author,
      level,
    };
  })
  .sort((a, b) => a.order - b.order);

/* =========================================================================
   Book Cover Artworks (SVG-based vector covers matching the design mockup)
   ========================================================================= */

// Card 1: Programming in C (Deep navy with neon indigo/purple wave ripples)
const CCoverArtwork: React.FC = () => (
  <svg
    className="ebook-cover-svg"
    viewBox="0 0 260 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="260" height="210" fill="#0c1020" />
    <defs>
      <linearGradient id="c-wave-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.45" />
      </linearGradient>
      <radialGradient id="c-wave-glow" cx="25%" cy="95%" r="70%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
        <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#0c1020" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="260" height="210" fill="url(#c-wave-glow)" />

    {/* Concentric ripple wave curves originating from bottom-left */}
    <g stroke="url(#c-wave-gradient)" fill="none">
      <ellipse cx="65" cy="225" rx="35" ry="22" strokeWidth="1.2" strokeOpacity="0.9" />
      <ellipse cx="65" cy="225" rx="55" ry="36" strokeWidth="1.2" strokeOpacity="0.85" />
      <ellipse cx="65" cy="225" rx="80" ry="52" strokeWidth="1.2" strokeOpacity="0.75" />
      <ellipse cx="65" cy="225" rx="108" ry="70" strokeWidth="1.1" strokeOpacity="0.65" />
      <ellipse cx="65" cy="225" rx="138" ry="90" strokeWidth="1.1" strokeOpacity="0.55" />
      <ellipse cx="65" cy="225" rx="170" ry="112" strokeWidth="1" strokeOpacity="0.45" />
      <ellipse cx="65" cy="225" rx="205" ry="136" strokeWidth="0.9" strokeOpacity="0.35" />
      <ellipse cx="65" cy="225" rx="242" ry="162" strokeWidth="0.8" strokeOpacity="0.25" />
      <ellipse cx="65" cy="225" rx="280" ry="190" strokeWidth="0.7" strokeOpacity="0.15" />
    </g>
  </svg>
);

// Card 2: Programming in C++ (Clean white/off-white with 3D wireframe globe)
const CppCoverArtwork: React.FC = () => (
  <svg
    className="ebook-cover-svg"
    viewBox="0 0 260 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="260" height="210" fill="#ffffff" />
    <g transform="translate(130, 132)">
      {/* Outer circular boundary */}
      <circle cx="0" cy="0" r="54" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.65" />
      {/* Longitude ellipses */}
      <ellipse cx="0" cy="0" rx="44" ry="54" stroke="#cbd5e1" strokeWidth="1" />
      <ellipse cx="0" cy="0" rx="28" ry="54" stroke="#cbd5e1" strokeWidth="1" />
      <ellipse cx="0" cy="0" rx="14" ry="54" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="0" y1="-54" x2="0" y2="54" stroke="#64748b" strokeWidth="1.1" strokeDasharray="3 3" />
      {/* Latitude ellipses */}
      <ellipse cx="0" cy="0" rx="54" ry="14" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.9" />
      <ellipse cx="0" cy="-24" rx="48" ry="12" stroke="#cbd5e1" strokeWidth="0.9" />
      <ellipse cx="0" cy="24" rx="48" ry="12" stroke="#cbd5e1" strokeWidth="0.9" />
      <ellipse cx="0" cy="-40" rx="36" ry="9" stroke="#cbd5e1" strokeWidth="0.8" />
      <ellipse cx="0" cy="40" rx="36" ry="9" stroke="#cbd5e1" strokeWidth="0.8" />
    </g>
  </svg>
);

// Card 3: Programming in Java (Dark purple with 3D isometric purple crystal cubes)
const JavaCoverArtwork: React.FC = () => (
  <svg
    className="ebook-cover-svg"
    viewBox="0 0 260 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="260" height="210" fill="#0d0f22" />
    <defs>
      <radialGradient id="java-cube-glow" cx="62%" cy="66%" r="55%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.45" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0d0f22" stopOpacity="0" />
      </radialGradient>
      {/* Top Faces */}
      <linearGradient id="cube-top-back" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="cube-top-front" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d8b4fe" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>
      {/* Left Faces */}
      <linearGradient id="cube-left-shading" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
      {/* Right Faces */}
      <linearGradient id="cube-right-shading" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
    </defs>
    <rect width="260" height="210" fill="url(#java-cube-glow)" />

    <g transform="translate(155, 126)">
      {/* Back/Top Cube */}
      <g transform="translate(-10, -26)">
        <polygon points="0,-16 26,-2 0,12 -26,-2" fill="url(#cube-top-back)" />
        <polygon points="-26,-2 0,12 0,40 -26,26" fill="url(#cube-left-shading)" />
        <polygon points="0,12 26,-2 26,26 0,40" fill="url(#cube-right-shading)" />
      </g>
      {/* Front Right Cube */}
      <g transform="translate(24, 4)">
        <polygon points="0,-16 26,-2 0,12 -26,-2" fill="url(#cube-top-front)" />
        <polygon points="-26,-2 0,12 0,40 -26,26" fill="url(#cube-left-shading)" />
        <polygon points="0,12 26,-2 26,26 0,40" fill="url(#cube-right-shading)" />
      </g>
      {/* Front Left Cube */}
      <g transform="translate(-34, 14)">
        <polygon points="0,-14 22,-2 0,10 -22,-2" fill="url(#cube-top-front)" />
        <polygon points="-22,-2 0,10 0,35 -22,23" fill="url(#cube-left-shading)" />
        <polygon points="0,10 22,-2 22,23 0,35" fill="url(#cube-right-shading)" />
      </g>
    </g>
  </svg>
);

// Card 4: Programming in Python (Deep slate navy with concentric radar / orbital rings)
const PythonCoverArtwork: React.FC = () => (
  <svg
    className="ebook-cover-svg"
    viewBox="0 0 260 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="260" height="210" fill="#090e1a" />
    <defs>
      <radialGradient id="py-target-glow" cx="72%" cy="68%" r="60%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#090e1a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="260" height="210" fill="url(#py-target-glow)" />

    <g transform="translate(182, 138)">
      {/* Concentric radar rings */}
      <circle cx="0" cy="0" r="16" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.9" fill="none" />
      <circle cx="0" cy="0" r="36" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.75" fill="none" />
      <circle cx="0" cy="0" r="60" stroke="#818cf8" strokeWidth="1.1" strokeOpacity="0.6" strokeDasharray="5 3" fill="none" />
      <circle cx="0" cy="0" r="88" stroke="#a78bfa" strokeWidth="0.9" strokeOpacity="0.4" fill="none" />
      <circle cx="0" cy="0" r="120" stroke="#c084fc" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />

      {/* Target Crosshairs / Axis */}
      <line x1="-150" y1="0" x2="60" y2="0" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="0" y1="-110" x2="0" y2="60" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.35" />

      {/* Center glowing core and orbiting nodes */}
      <circle cx="0" cy="0" r="5" fill="#38bdf8" />
      <circle cx="42" cy="-42" r="3.5" fill="#a855f7" />
      <circle cx="-60" cy="0" r="3" fill="#60a5fa" />
    </g>
  </svg>
);

// Cover component selector
const CoverArtwork: React.FC<{ title: string; isLight?: boolean }> = ({ title }) => {
  const lower = title.toLowerCase();
  if (lower.includes("c++") || lower.includes("cpp")) {
    return <CppCoverArtwork />;
  }
  if (lower.includes("java")) {
    return <JavaCoverArtwork />;
  }
  if (lower.includes("python")) {
    return <PythonCoverArtwork />;
  }
  return <CCoverArtwork />;
};

/* =========================================================================
   Hero 3D Book Presentation Stack (Tilted cards with stylized letter C & globe)
   ========================================================================= */
const HeroBookShowcase: React.FC = () => {
  return (
    <div className="hero-books-container">
      <div className="hero-books-stage">
        {/* Soft purple ambient glow pool under the books */}
        <div className="hero-books-glow" />

        {/* Back Book: Programming in C++ */}
        <div className="hero-book hero-book--back">
          <div className="hero-book-face hero-book-face--cpp">
            <div className="hero-book-header">
              <span className="hero-book-title-dark">
                Programming <br />
                in C++
              </span>
            </div>
            <div className="hero-book-artwork">
              <svg viewBox="0 0 160 160" className="hero-wireframe-globe">
                <circle cx="80" cy="80" r="62" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                <ellipse cx="80" cy="80" rx="50" ry="62" stroke="#cbd5e1" strokeWidth="1" fill="none" />
                <ellipse cx="80" cy="80" rx="30" ry="62" stroke="#94a3b8" strokeWidth="1" fill="none" />
                <line x1="80" y1="18" x2="80" y2="142" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                <ellipse cx="80" cy="80" rx="62" ry="16" stroke="#94a3b8" strokeWidth="1" fill="none" />
                <ellipse cx="80" cy="52" rx="54" ry="13" stroke="#cbd5e1" strokeWidth="0.9" fill="none" />
                <ellipse cx="80" cy="108" rx="54" ry="13" stroke="#cbd5e1" strokeWidth="0.9" fill="none" />
              </svg>
            </div>
          </div>
          <div className="hero-book-depth-edge" />
        </div>

        {/* Front Book: Programming in C */}
        <div className="hero-book hero-book--front">
          <div className="hero-book-face hero-book-face--c">
            <div className="hero-book-spine-strip" />
            <div className="hero-book-header">
              <span className="hero-book-title-white">
                Programming <br />
                in C
              </span>
            </div>
            <div className="hero-book-artwork-c">
              {/* Concentric curved ripple lines behind the C */}
              <svg className="hero-c-bg-waves" viewBox="0 0 180 140" fill="none">
                <ellipse cx="70" cy="135" rx="35" ry="20" stroke="#6366f1" strokeWidth="1.2" strokeOpacity="0.8" />
                <ellipse cx="70" cy="135" rx="60" ry="34" stroke="#8b5cf6" strokeWidth="1.2" strokeOpacity="0.7" />
                <ellipse cx="70" cy="135" rx="90" ry="52" stroke="#a855f7" strokeWidth="1.1" strokeOpacity="0.55" />
                <ellipse cx="70" cy="135" rx="125" ry="72" stroke="#6366f1" strokeWidth="1" strokeOpacity="0.4" />
                <ellipse cx="70" cy="135" rx="165" ry="96" strokeWidth="0.8" stroke="#38bdf8" strokeOpacity="0.25" />
              </svg>
              <span className="hero-c-letter">C</span>
            </div>
          </div>
        </div>

        {/* Floating annotation note with curved arrow indicator (arrow on left, text on right) */}
        <div className="hero-annotation">
          <svg
            className="hero-annotation-arrow"
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <path
              d="M26 6C18 6 10 12 5 22"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M5 22L12 21M5 22L7 15"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="hero-annotation-text">
            <span>Free.</span>
            <span>Practical.</span>
            <span>For developers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   Main Ebooks Page Component
   ========================================================================= */
export default function Ebooks(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"newest" | "title">("newest");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestAuthor, setSuggestAuthor] = useState("");
  const [suggestLink, setSuggestLink] = useState("");
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recode-ebook-favs");
      if (saved) {
        try {
          setFavorites(JSON.parse(saved));
        } catch {
          // ignore parsing error
        }
      }
    }
  }, []);

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("recode-ebook-favs", JSON.stringify(next));
      }
      return next;
    });
  };

  const handleReadNow = (link: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestTitle.trim()) return;
    setSuggestSuccess(true);
    setTimeout(() => {
      setSuggestSuccess(false);
      setShowSuggestModal(false);
      setSuggestTitle("");
      setSuggestAuthor("");
      setSuggestLink("");
    }, 2000);
  };

  // Filter and sort ebooks
  const filteredEbooks = useMemo(() => {
    let list = ALL_EBOOKS.filter((ebook) => {
      const matchesCategory =
        activeCategory === "All" || ebook.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        searchTerm.trim() === "" ||
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return list;
  }, [activeCategory, searchTerm, sortOrder]);

  const categories = [
    { name: "All", count: ALL_EBOOKS.length, soon: false },
    { name: "Programming", count: ALL_EBOOKS.length, soon: false },
    { name: "Web Development", count: 0, soon: true },
    { name: "Tools", count: 0, soon: true },
    { name: "AI/ML", count: 0, soon: true },
  ];

  return (
    <Layout
      title="Open Knowledge for Builders | Recode Hive Ebooks"
      description="A curated collection of free programming ebooks, tools, and guides that inspire, educate, and help you master new skills."
    >
      <Head>
        <title>Open Knowledge for Builders | recode hive</title>
        <meta
          name="description"
          content="A curated collection of free programming ebooks, tools, and guides that inspire, educate, and help you master new skills."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="ebook-exact-page">
        {/* =========================================================================
            1. HERO SECTION
            ========================================================================= */}
        <section className="ebook-exact-hero">
          <div className="ebook-exact-container ebook-hero-grid">
            {/* Left Content */}
            <div className="ebook-hero-left">
              {/* Monospace Path Badge */}
              <div className="ebook-path-badge">
                <span className="path-tilde">~</span>
                <span className="path-text">/resources/ebooks</span>
              </div>

              {/* Headline */}
              <h1 className="ebook-hero-title">
                Open Knowledge <br />
                <span className="hero-subtext-line">
                  for <span className="hero-gradient-word">Builders</span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="ebook-hero-subtitle">
                A curated collection of free programming ebooks, tools, and guides that
                inspire, educate, and help you master new skills.
              </p>

              {/* Action Buttons */}
              <div className="ebook-hero-actions">
                <a href="#ebook-collection" className="hero-btn hero-btn--primary">
                  Explore Ebooks <ArrowRight size={15} />
                </a>
                <a href="#ebook-filters-bar" className="hero-btn hero-btn--secondary">
                  <BookOpen size={16} />
                  View Categories
                </a>
              </div>
            </div>

            {/* Right Visual (3D Book Stack) */}
            <div className="ebook-hero-right">
              <HeroBookShowcase />
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SEARCH AND FILTER TOOLBAR
            ========================================================================= */}
        <section className="ebook-toolbar-section" id="ebook-filters-bar">
          <div className="ebook-exact-container">
            <div className="ebook-filter-bar">
              {/* Search Input */}
              <div className="ebook-search-wrapper">
                <Search size={18} className="ebook-search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  className="ebook-search-input"
                  placeholder="Search ebooks by title, topic, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="ebook-search-shortcut">Ctrl K</span>
              </div>

              {/* Filter Pills */}
              <div className="ebook-filter-pills">
                {categories.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      className={`ebook-filter-pill ${isActive ? "active" : ""} ${
                        cat.soon ? "soon-pill" : ""
                      }`}
                      onClick={() => {
                        if (!cat.soon) {
                          setActiveCategory(cat.name);
                        }
                      }}
                    >
                      <span className="pill-name">{cat.name}</span>
                      {cat.soon ? (
                        <span className="pill-soon">Soon</span>
                      ) : (
                        <span className="pill-count">{cat.count}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* View Switchers */}
              <div className="ebook-view-toggle">
                <button
                  type="button"
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. EBOOK COLLECTION GRID / LIST
            ========================================================================= */}
        <section className="ebook-collection-section" id="ebook-collection">
          <div className="ebook-exact-container">
            {/* Section Header */}
            <div className="ebook-section-header">
              <div className="section-header-left">
                <h2 className="section-title">Ebook Collection</h2>
                <span className="section-resource-count">
                  {filteredEbooks.length} free resources
                </span>
              </div>
              <div className="section-header-right">
                <button
                  type="button"
                  className="sort-toggle-btn"
                  onClick={() => setSortOrder(sortOrder === "newest" ? "title" : "newest")}
                >
                  SORTED BY {sortOrder === "newest" ? "NEWEST" : "TITLE (A-Z)"}
                </button>
              </div>
            </div>

            {/* Books View: Grid or List */}
            {filteredEbooks.length > 0 ? (
              <div
                className={
                  viewMode === "grid" ? "ebook-cards-grid" : "ebook-cards-list"
                }
              >
                {filteredEbooks.map((ebook) => {
                  const isFavorited = favorites.includes(ebook.id);
                  const isCpp =
                    ebook.title.includes("C++") || ebook.title.includes("CPP");

                  return (
                    <article
                      key={ebook.id}
                      className={`ebook-card ${isCpp ? "ebook-card--cpp" : ""}`}
                    >
                      {/* Top Cover Artwork Thumbnail */}
                      <div
                        className="ebook-card-cover"
                        onClick={() => handleReadNow(ebook.link)}
                        role="button"
                        tabIndex={0}
                        title={`Read ${ebook.title}`}
                      >
                        <CoverArtwork title={ebook.title} />
                        {/* Title text overlaid on the cover */}
                        <div
                          className={`cover-overlay-title ${
                            isCpp ? "cover-overlay-title--dark" : ""
                          }`}
                        >
                          <span className="cover-title-text">
                            {ebook.title.startsWith("Programming in ") ? (
                              <>
                                Programming <br />
                                {ebook.title.replace("Programming ", "")}
                              </>
                            ) : (
                              ebook.title
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Card Meta Content */}
                      <div className="ebook-card-body">
                        {/* Category Badge */}
                        <div className="card-category-badge">{ebook.category}</div>

                        {/* Title */}
                        <h3 className="card-title">
                          <a
                            href={ebook.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.preventDefault();
                              handleReadNow(ebook.link);
                            }}
                          >
                            {ebook.title}
                          </a>
                        </h3>

                        {/* Author & Level metadata */}
                        <div className="card-author-level">
                          <span className="meta-author">{ebook.author}</span>
                          <span className="meta-dot">·</span>
                          <span className="meta-level">{ebook.level}</span>
                        </div>

                        {/* Bottom Action Row */}
                        <div className="card-action-row">
                          <button
                            type="button"
                            className="card-read-now-btn"
                            onClick={() => handleReadNow(ebook.link)}
                          >
                            Read Now <ArrowRight size={13} className="btn-arrow" />
                          </button>

                          <div className="card-icon-actions">
                            <button
                              type="button"
                              className={`card-bookmark-btn ${
                                isFavorited ? "bookmarked" : ""
                              }`}
                              title={
                                isFavorited
                                  ? "Remove from bookmarks"
                                  : "Save to bookmarks"
                              }
                              onClick={(e) => toggleFavorite(ebook.id, e)}
                            >
                              <Bookmark
                                size={15}
                                fill={isFavorited ? "#8b5cf6" : "none"}
                                stroke={isFavorited ? "#8b5cf6" : "currentColor"}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="ebook-empty-state">
                <p className="empty-title">No ebooks found</p>
                <p className="empty-text">
                  Try adjusting your search query or select another category filter.
                </p>
                <button
                  type="button"
                  className="hero-btn hero-btn--primary"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("All");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* =========================================================================
                4. ADVERTISEMENT SECTION
                ========================================================================= */}
            <div className="ebook-ad-container">
              <span className="ebook-ad-label">ADVERTISEMENT</span>
              <div className="ebook-ad-slot">
                <span>Reserved AdSense slot, responsive display unit</span>
              </div>
            </div>

            {/* =========================================================================
                5. CONTRIBUTE BANNER
                ========================================================================= */}
            <div className="ebook-contribute-card">
              <div className="contribute-left">
                <span className="contribute-tag">CONTRIBUTE</span>
                <h3 className="contribute-title">Missing a book you need?</h3>
                <p className="contribute-description">
                  Suggest a free, openly licensed resource or write a guide with the
                  community. Every addition is reviewed before it goes live.
                </p>
              </div>
              <div className="contribute-actions">
                <button
                  type="button"
                  className="contribute-btn contribute-btn--dark"
                  onClick={() => setShowSuggestModal(true)}
                >
                  Suggest an ebook
                </button>
                <Link
                  to="/docs/GitHub/intro-github"
                  className="contribute-btn contribute-btn--outline"
                >
                  Contribution guide
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* =========================================================================
            6. MODAL: SUGGEST AN EBOOK
            ========================================================================= */}
        {showSuggestModal && (
          <div className="suggest-modal-backdrop" onClick={() => setShowSuggestModal(false)}>
            <div
              className="suggest-modal-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <button
                type="button"
                className="suggest-modal-close"
                onClick={() => setShowSuggestModal(false)}
              >
                <X size={20} />
              </button>

              <div className="suggest-modal-header">
                <Sparkles size={24} className="suggest-modal-icon" />
                <h3>Suggest an Ebook</h3>
                <p>
                  Help the community learn! Share an openly licensed book, guide, or
                  tutorial.
                </p>
              </div>

              {suggestSuccess ? (
                <div className="suggest-success-message">
                  <Check size={28} className="success-icon" />
                  <h4>Thank you!</h4>
                  <p>Your suggestion has been submitted for review.</p>
                </div>
              ) : (
                <form className="suggest-form" onSubmit={handleSuggestSubmit}>
                  <div className="form-group">
                    <label>Book Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Learning Rust by Example"
                      value={suggestTitle}
                      onChange={(e) => setSuggestTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Author / Publisher</label>
                    <input
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={suggestAuthor}
                      onChange={(e) => setSuggestAuthor(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Resource URL or Link</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={suggestLink}
                      onChange={(e) => setSuggestLink(e.target.value)}
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="modal-cancel-btn"
                      onClick={() => setShowSuggestModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="modal-submit-btn">
                      Submit Ebook
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
