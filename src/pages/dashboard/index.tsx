import React, { JSX, useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { motion } from "framer-motion";
import {
  useCommunityStatsContext,
  CommunityStatsProvider,
} from "@site/src/lib/statsProvider";
import SlotCounter from "react-slot-counter";
import { useLocation, useHistory } from "@docusaurus/router";
import {
  githubService,
  GitHubDiscussion,
} from "@site/src/services/githubService";
import DiscussionCard from "@site/src/components/discussions/DiscussionCard";
import {
  Megaphone,
  Lightbulb,
  HelpCircle,
  Star,
  MessageCircle,
  Search,
  TrendingUp,
  Home,
  Trophy,
  Users,
  Gift,
  Calendar,
  BarChart3,
  ArrowLeft,
  GitFork,
} from "lucide-react";
import NavbarIcon from "@site/src/components/navbar/NavbarIcon";
import "@site/src/components/discussions/discussions.css";
import "./dashboard.css";
import LeaderBoard from "./LeaderBoard/leaderboard";

type DiscussionTab = "discussions" | "trending" | "unanswered";
type SortOption = "most_popular" | "latest" | "oldest";
type Category =
  | "all"
  | "announcements"
  | "ideas"
  | "q-a"
  | "show-and-tell"
  | "general";

interface DashboardStats {
  totalContributors: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
}

const categories: Category[] = [
  "all",
  "announcements",
  "ideas",
  "q-a",
  "show-and-tell",
  "general",
];

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<
    "home" | "discuss" | "giveaway" | "contributors"
  >("home");

  // Discussion state management
  const [activeDiscussionTab, setActiveDiscussionTab] =
    useState<DiscussionTab>("discussions");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("most_popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [discussions, setDiscussions] = useState<GitHubDiscussion[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(true);
  const [discussionsError, setDiscussionsError] = useState<string | null>(null);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);

  // Close dashboard menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDashboardMenu && 
          !target.closest('.dashboard-mobile-menu') && 
          !target.closest('.dashboard-menu-btn')) {
        setShowDashboardMenu(false);
      }
    };

    if (showDashboardMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDashboardMenu]);

  useEffect(() => {
    // Set active tab based on URL hash
    if (location.hash === "#discuss") {
      setActiveTab("discuss");
    } else if (location.hash === "#contributors") {
      setActiveTab("contributors");
    } else if (location.hash === "#giveaway") {
      setActiveTab("giveaway");
    } else {
      setActiveTab("home");
    }
  }, [location]);

  // Fetch discussions when discuss tab is active
  useEffect(() => {
    if (activeTab === "discuss") {
      fetchDiscussions();
    }
  }, [activeTab]);

  const fetchDiscussions = async () => {
    try {
      setDiscussionsLoading(true);
      setDiscussionsError(null);
      const discussionsData = await githubService.fetchDiscussions(20);
      setDiscussions(discussionsData);
    } catch (error) {
      console.error("Failed to fetch discussions:", error);
      setDiscussionsError(
        error instanceof Error ? error.message : "Failed to load discussions"
      );
    } finally {
      setDiscussionsLoading(false);
    }
  };

  // Discussion handlers
  const handleDiscussionTabChange = (tab: DiscussionTab) => {
    setActiveDiscussionTab(tab);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      all: null,
      announcements: <Megaphone size={14} />,
      ideas: <Lightbulb size={14} />,
      "q-a": <HelpCircle size={14} />,
      "show-and-tell": <Star size={14} />,
      general: <MessageCircle size={14} />,
    };
    return iconMap[category] || null;
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap = {
      all: "All",
      announcements: "Announcements",
      ideas: "Ideas",
      "q-a": "Q&A",
      "show-and-tell": "Show & Tell",
      general: "General",
    };
    return categoryMap[category] || category;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNewDiscussion = () => {
    window.open(
      "https://github.com/recodehive/recode-website/discussions/new",
      "_blank"
    );
  };

  // Filter discussions based on current state and tab
  const getFilteredDiscussions = (discussions: GitHubDiscussion[]) => {
    return discussions
      .filter((discussion) => {
        // First apply tab filter
        switch (activeDiscussionTab) {
          case "trending":
            return discussion.reactions.total_count > 5;
          case "unanswered":
            return discussion.comments === 0;
          default:
            return true;
        }
      })
      .filter((discussion) => {
        // Then apply category filter
        if (selectedCategory !== "all") {
          const categoryName = discussion.category.name.toLowerCase();
          const selectedCat = selectedCategory.toLowerCase();

          // Map GitHub discussion categories to our filter categories
          if (
            selectedCat === "q-a" &&
            (categoryName.includes("q&a") || categoryName.includes("question"))
          ) {
            return true;
          }
          if (
            selectedCat === "show-and-tell" &&
            categoryName.includes("show")
          ) {
            return true;
          }
          if (
            selectedCat === "announcements" &&
            categoryName.includes("announcement")
          ) {
            return true;
          }
          if (selectedCat === "ideas" && categoryName.includes("idea")) {
            return true;
          }
          if (
            selectedCat === "general" &&
            (categoryName.includes("general") ||
              categoryName.includes("discussion"))
          ) {
            return true;
          }

          return categoryName.includes(selectedCat);
        }
        return true;
      })
      .filter((discussion) => {
        // Then apply search filter
        if (searchQuery) {
          return (
            discussion.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            discussion.body.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return true;
      })
      .sort((a, b) => {
        // Finally sort the results
        switch (sortBy) {
          case "latest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "oldest":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          default:
            return b.reactions.total_count - a.reactions.total_count;
        }
      });
  };

  const filteredDiscussions = React.useMemo(
    () => getFilteredDiscussions(discussions),
    [discussions, activeDiscussionTab, selectedCategory, searchQuery, sortBy]
  );

  const handleTabChange = (
    tab: "home" | "discuss" | "giveaway" | "contributors"
  ) => {
    setActiveTab(tab);
    setShowDashboardMenu(false);
    if (tab === "discuss") {
      history.push("#discuss");
      window.scrollTo(0, 0);
    } else if (tab === "giveaway") {
      history.push("/dashboard/giveaway");
    } else if (tab === "contributors") {
      history.push("#contributors");
      window.scrollTo(0, 0);
    } else {
      history.push("#");
    }
  };

  const {
    githubStarCount,
    githubContributorsCount,
    githubForksCount,
    githubReposCount,
    loading,
    error,
  } = useCommunityStatsContext();

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalContributors: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
  });

  useEffect(() => {
    setDashboardStats({
      totalContributors: githubContributorsCount,
      totalRepositories: githubReposCount,
      totalStars: githubStarCount,
      totalForks: githubForksCount,
    });
  }, [
    githubContributorsCount,
    githubReposCount,
    githubStarCount,
    githubForksCount,
  ]);

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: number;
    valueText: string;
    description: string;
  }> = ({ icon, title, value, valueText, description }) => (
    <motion.div
      className="dashboard-stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="dashboard-stat-icon">{icon}</div>
      <div className="dashboard-stat-content">
        <h3 className="dashboard-stat-title">{title}</h3>
        <div className="dashboard-stat-value">
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <SlotCounter
              value={valueText}
              autoAnimationStart={true}
              duration={1}
            />
          )}
        </div>
        <p className="dashboard-stat-description">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="dashboard-layout">
        {/* Dashboard Menu Button - Only visible on mobile */}
        <button
          className={`dashboard-menu-btn ${showDashboardMenu ? "open" : ""}`}
          onClick={() => setShowDashboardMenu(!showDashboardMenu)}
          aria-label="Toggle dashboard menu"
        >
          {showDashboardMenu ? "✕" : "☰"}
        </button>
        
        {/* Dashboard Mobile Menu */}
        <div className={`dashboard-mobile-menu ${showDashboardMenu ? "show" : ""}`}>
          {/* Overlay */}
          {showDashboardMenu && (
            <div 
              className="dashboard-menu-overlay"
              onClick={() => setShowDashboardMenu(false)}
            />
          )}
          <div>
            <div className="dashboard-menu-header">
              <h3>Dashboard Menu</h3>
              <button
                className="close-menu-btn"
                onClick={() => setShowDashboardMenu(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            
            {/* Dashboard navigation items */}
            <div className="dashboard-menu-items">
              <div
                className={`menu-item ${activeTab === "home" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("home");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon"><Home size={18} /></span> Home
              </div>
              <div
                className={`menu-item ${activeTab === "discuss" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("discuss");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon"><MessageCircle size={18} /></span> Discussions
              </div>
              <div
                className={`menu-item ${activeTab === "contributors" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("contributors");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon"><Users size={18} /></span> LeaderBoard
              </div>
              <div
                className={`menu-item ${activeTab === "giveaway" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("giveaway");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon"><Gift size={18} /></span> Giveaways
              </div>
            </div>
          </div>
        </div>

      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <button
            className="back-button"
            onClick={() => history.goBack()}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="sidebar-nav">
          <NavbarIcon
            icon={<Home size={20} />}
            text="Home"
            active={activeTab === "home"}
            onClick={() => handleTabChange("home")}
          />
          <NavbarIcon
            icon={<MessageCircle size={20} />}
            text="Discussions"
            active={activeTab === "discuss"}
            onClick={() => handleTabChange("discuss")}
          />
          <NavbarIcon
            icon={<Users size={20} />}
            text="LeaderBoard
"
            active={activeTab === "contributors"}
            onClick={() => handleTabChange("contributors")}
          />
          <NavbarIcon
            icon={<Gift size={20} />}
            text="Giveaways"
            active={activeTab === "giveaway"}
            onClick={() => handleTabChange("giveaway")}
          />
        </div>
      </div>

      <div className="dashboard-main-content">
        <Head>
          <title>Dashboard | Recode Hive</title>
        </Head>

        {activeTab === "home" && (
          <motion.div
            className="dashboard-home-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="dashboard-main-title">Recode Hive Community Dashboard</h1>
            <p className="dashboard-description">
              Welcome to the Recode Hive community hub! Explore our stats, engage in discussions, and connect with fellow contributors.
            </p>

            <section className="dashboard-stats-section">
              <h2 className="section-title">Community At a Glance</h2>
              <div className="stat-cards-container">
                <StatCard
                  icon={<Star size={24} />}
                  title="Total Stars"
                  value={dashboardStats.totalStars}
                  valueText={
                    useCommunityStatsContext().githubStarCountText || "937"
                  }
                  description="Stars across all our public repositories"
                />
                <StatCard
                  icon={<Users size={24} />}
                  title="Contributors"
                  value={dashboardStats.totalContributors}
                  valueText={
                    useCommunityStatsContext().githubContributorsCountText || "444"
                  }
                  description="Amazing community members"
                />
                <StatCard
                  icon={<BarChart3 size={24} />}
                  title="Repositories"
                  value={dashboardStats.totalRepositories}
                  valueText={
                    useCommunityStatsContext().githubReposCountText || "10"
                  }
                  description="Open source projects"
                />
                <StatCard
                  icon={<GitFork size={24} />}
                  title="Forks"
                  value={dashboardStats.totalForks}
                  valueText={
                    useCommunityStatsContext().githubForksCountText || "1.03K"
                  }
                  description="Community contributions"
                />
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "discuss" && (
          <motion.div
            className="dashboard-discussions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="discussions-header">
              <h1>Community Discussions</h1>
              <p>
                Engage with the community, ask questions, and share your projects.
              </p>
            </div>
            <div className="discussions-controls">
              <div className="discussion-tabs">
                <button
                  onClick={() => handleDiscussionTabChange("discussions")}
                  className={`tab-button ${activeDiscussionTab === "discussions" ? "active" : ""
                    }`}
                >
                  <MessageCircle size={18} /> All Discussions
                </button>
                <button
                  onClick={() => handleDiscussionTabChange("trending")}
                  className={`tab-button ${activeDiscussionTab === "trending" ? "active" : ""
                    }`}
                >
                  <TrendingUp size={18} /> Trending
                </button>
                <button
                  onClick={() => handleDiscussionTabChange("unanswered")}
                  className={`tab-button ${activeDiscussionTab === "unanswered" ? "active" : ""
                    }`}
                >
                  <HelpCircle size={18} /> Unanswered
                </button>
              </div>
              <div className="search-and-sort">
                <div className="search-bar">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <select onChange={handleSortChange} value={sortBy}>
                  <option value="most_popular">Most Popular</option>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <button
                  className="new-discussion-btn"
                  onClick={handleNewDiscussion}
                >
                  New Discussion
                </button>
              </div>
            </div>
            <div className="discussions-main-content">
              <div className="category-sidebar">
                <h3>Categories</h3>
                <ul>
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={selectedCategory === cat ? "active" : ""}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {getCategoryIcon(cat)} {getCategoryDisplayName(cat)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="discussion-list">
                {discussionsLoading && (
                  <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                )}
                {discussionsError && (
                  <div className="discussions-error-message">
                    <p>{discussionsError}</p>
                  </div>
                )}
                {!discussionsLoading &&
                  !discussionsError &&
                  filteredDiscussions.length === 0 && (
                    <div className="no-discussions-found">
                      <p>No discussions found matching your criteria.</p>
                    </div>
                  )}
                {!discussionsLoading &&
                  !discussionsError &&
                  filteredDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Contributors section with new LeaderBoard component */}
        {activeTab === "contributors" && (
          <motion.div
            className="dashboard-contributors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LeaderBoard />
          </motion.div>
        )}

        {activeTab === "giveaway" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="giveaway-section"
          >
            <h1>Giveaways</h1>
            <p>
              Participate in our exciting giveaways for a chance to win awesome prizes!
            </p>
            <div className="giveaway-content">
              <p>
                Stay tuned for our next giveaway. Follow our social media channels for updates!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <BrowserOnly fallback={<div>Loading Dashboard...</div>}>
        {() => (
          <CommunityStatsProvider>
            <DashboardContent />
          </CommunityStatsProvider>
        )}
      </BrowserOnly>
    </Layout>
  );
};

export default Dashboard;