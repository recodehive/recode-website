import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import SlotCounter from "react-slot-counter";
import NavbarIcon from "../../../components/navbar/NavbarIcon";
import { useHistory } from "@docusaurus/router";
import {
  Home,
  MessageCircle,
  Gift,
  Trophy,
  Crown,
  Star,
  Award,
  Clock,
  Users,
  TrendingUp,
  Medal,
  ArrowLeft,
} from "lucide-react";
import "../dashboard.css";

// Giveaway-specific styles
const giveawayStyles = `
.dashboard-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.giveaway-stats-banner {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.stat-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px var(--ifm-color-emphasis-200);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--ifm-color-emphasis-300);
}

.timer-icon {
  background: linear-gradient(135deg, #ff6b6b, #ffa726) !important;
}

.entries-icon {
  background: linear-gradient(135deg, #4ecdc4, #44a08d) !important;
}

.score-icon {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
}

.winners-icon {
  background: linear-gradient(135deg, #f093fb, #f5576c) !important;
}

.stat-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-content {
  min-width: 0;
}

.stat-content h3 {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--ifm-color-emphasis-700);
  margin: 0 0 0.15rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ifm-color-emphasis-900);
  display: flex;
  align-items: baseline;
  gap: 0.15rem;
  margin-bottom: 0.15rem;
}

.stat-value span {
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--ifm-color-emphasis-600);
}

.stat-content p {
  font-size: 0.55rem;
  color: var(--ifm-color-emphasis-500);
  margin: 0;
}

[data-theme='dark'] .stat-item {
  background: var(--ifm-color-emphasis-100);
  border-color: var(--ifm-color-emphasis-300);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

[data-theme='dark'] .stat-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.giveaway-leaderboard-section {
  margin: 3rem 0;
  padding: 0 1rem;
}

.giveaway-leaderboard-header {
  text-align: center;
  margin-bottom: 2rem;
}

.giveaway-leaderboard-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--ifm-color-emphasis-900);
}

.giveaway-leaderboard-subtitle {
  font-size: 1.1rem;
  color: var(--ifm-color-emphasis-700);
  margin: 0;
}

.giveaway-loading {
  text-align: center;
  padding: 3rem;
  color: var(--ifm-color-emphasis-700);
}

.giveaway-leaderboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.giveaway-leaderboard-card {
  background: var(--ifm-background-color);
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--ifm-color-emphasis-200);
}

.giveaway-leaderboard-card:hover {
  box-shadow: 0 8px 25px var(--ifm-color-emphasis-300);
  border-color: var(--ifm-color-primary);
  transform: translateY(-2px);
}

.giveaway-leaderboard-card.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  border-color: #ffd700;
}

.giveaway-leaderboard-card.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  border-color: #c0c0c0;
}

.giveaway-leaderboard-card.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #daa520);
  border-color: #cd7f32;
}

[data-theme='dark'] .giveaway-leaderboard-card {
  background: var(--ifm-color-emphasis-100);
  border-color: var(--ifm-color-emphasis-400);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

[data-theme='dark'] .giveaway-leaderboard-card:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

[data-theme='dark'] .giveaway-leaderboard-card.rank-1 {
  background: linear-gradient(135deg, #b8860b, #daa520);
}

[data-theme='dark'] .giveaway-leaderboard-card.rank-2 {
  background: linear-gradient(135deg, #708090, #a9a9a9);
}

[data-theme='dark'] .giveaway-leaderboard-card.rank-3 {
  background: linear-gradient(135deg, #8b4513, #cd853f);
}

.giveaway-rank-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  background: var(--ifm-color-primary);
  color: var(--ifm-color-primary-contrast-background);
}

.giveaway-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
}

.giveaway-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--ifm-color-primary);
}

.giveaway-badge {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ifm-color-primary);
  color: var(--ifm-color-primary-contrast-background);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.giveaway-info {
  text-align: center;
  margin-bottom: 1rem;
}

.giveaway-name {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--ifm-color-emphasis-900);
}

.giveaway-leaderboard-card.rank-1 .giveaway-name,
.giveaway-leaderboard-card.rank-2 .giveaway-name,
.giveaway-leaderboard-card.rank-3 .giveaway-name {
  color: var(--ifm-color-emphasis-1000);
}

.giveaway-stats {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.giveaway-stat {
  text-align: center;
}

.giveaway-stat .stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ifm-color-primary);
}

.giveaway-leaderboard-card.rank-1 .stat-value,
.giveaway-leaderboard-card.rank-2 .stat-value,
.giveaway-leaderboard-card.rank-3 .stat-value {
  color: var(--ifm-color-emphasis-1000);
}

.giveaway-stat .stat-label {
  font-size: 0.8rem;
  color: var(--ifm-color-emphasis-600);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.giveaway-leaderboard-card.rank-1 .stat-label,
.giveaway-leaderboard-card.rank-2 .stat-label,
.giveaway-leaderboard-card.rank-3 .stat-label {
  color: var(--ifm-color-emphasis-800);
}

.giveaway-profile-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: var(--ifm-color-primary);
  color: var(--ifm-color-primary-contrast-background);
  text-decoration: none;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
}

.giveaway-profile-btn:hover {
  background: var(--ifm-color-primary-dark);
  color: var(--ifm-color-primary-contrast-background);
  text-decoration: none;
  transform: translateY(-2px);
}

.giveaway-leaderboard-card.rank-1 .giveaway-profile-btn,
.giveaway-leaderboard-card.rank-2 .giveaway-profile-btn,
.giveaway-leaderboard-card.rank-3 .giveaway-profile-btn {
  background: var(--ifm-color-emphasis-800);
  color: var(--ifm-color-emphasis-0);
}

.giveaway-leaderboard-card.rank-1 .giveaway-profile-btn:hover,
.giveaway-leaderboard-card.rank-2 .giveaway-profile-btn:hover,
.giveaway-leaderboard-card.rank-3 .giveaway-profile-btn:hover {
  background: var(--ifm-color-emphasis-900);
  color: var(--ifm-color-emphasis-0);
}

@media (max-width: 768px) {
  .giveaway-stats-banner {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .stat-item {
    padding: 0.4rem;
  }
  
  .stat-icon {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
  
  .stat-value {
    font-size: 1rem;
  }
  
  .stat-content h3 {
    font-size: 0.6rem;
  }
  
  .stat-content p {
    font-size: 0.5rem;
  }
  
  .giveaway-leaderboard-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .giveaway-leaderboard-title {
    font-size: 2rem;
  }
}

/* Dashboard styles for consistency */
.dashboard-stats-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: var(--ifm-color-content);
}

.dashboard-stat-card {
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.dashboard-stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: inherit;
  color: var(--ifm-color-primary);
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 996px) {
  .dashboard-main-content {
    padding: 80px 20px 40px;
  }
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("giveaway-styles");
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "giveaway-styles";
    styleSheet.textContent = giveawayStyles;
    document.head.appendChild(styleSheet);
  }
}

interface GiveawayEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  contributions: number;
  github_url: string;
  badge?: string;
}

const GiveawayPage: React.FC = () => {
  const history = useHistory();
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const [leaderboard, setLeaderboard] = useState<GiveawayEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "home" | "discuss" | "contributors" | "giveaway"
  >("giveaway");

  // Close dashboard menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Close menu when clicking on overlay or anywhere outside the menu
      if (
        showDashboardMenu &&
        ((!target.closest(".dashboard-mobile-menu > div:last-child") &&
          !target.closest(".dashboard-menu-btn")) ||
          target.closest(".dashboard-menu-overlay"))
      ) {
        setShowDashboardMenu(false);
      }
    };

    if (showDashboardMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDashboardMenu]);

  // Ensure active tab is set correctly when page loads
  useEffect(() => {
    // We're on the giveaway page, so the active tab should be "giveaway"
    setActiveTab("giveaway");
  }, []);

  useEffect(() => {
    // Simulate fetching leaderboard data
    const fetchLeaderboard = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: GiveawayEntry[] = [
        {
          rank: 1,
          name: "sanjay-kv",
          avatar: "https://avatars.githubusercontent.com/u/30715153?v=4",
          points: 2500,
          contributions: 45,
          github_url: "https://github.com/sanjay-kv",
          badge: "🏆 Champion",
        },
        {
          rank: 2,
          name: "vansh-codes",
          avatar: "https://avatars.githubusercontent.com/u/114163734?v=4",
          points: 2100,
          contributions: 38,
          github_url: "https://github.com/vansh-codes",
          badge: "🥈 Runner-up",
        },
        {
          rank: 3,
          name: "Hemu21",
          avatar: "https://avatars.githubusercontent.com/u/106808387?v=4",
          points: 1850,
          contributions: 32,
          github_url: "https://github.com/Hemu21",
          badge: "🥉 Third Place",
        },
      ];

      setLeaderboard(mockData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const handleTabChange = (
    tab: "home" | "discuss" | "contributors" | "giveaway",
  ) => {
    setActiveTab(tab);
    setShowDashboardMenu(false);
    // When navigating from giveaway page to other tabs, we need to
    // ensure we're using consistent paths with the dashboard page
    if (tab === "discuss") {
      // Navigate to main dashboard page with discuss hash
      history.push("/dashboard#discuss");
    } else if (tab === "contributors") {
      // Navigate to main dashboard page with leaderboard hash
      history.push("/dashboard#leaderboard");
    } else if (tab === "home") {
      // Navigate to main dashboard page
      history.push("/dashboard");
    } else if (tab === "giveaway") {
      // Already on giveaway page, just scroll to top
      window.scrollTo(0, 0);
    }
  };

  const StatCard: React.FC<{
    icon: string;
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
          <SlotCounter
            value={valueText}
            autoAnimationStart={true}
            duration={1}
          />
        </div>
        <p className="dashboard-stat-description">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <Layout title="Giveaway" description="recode hive Giveaway" noFooter>
      <Head>
        <title>🎁 recode hive Giveaway</title>
      </Head>
      <div className="dashboard-layout">
        {/* Dashboard Menu Button - Only visible on mobile */}
        <button
          className={`dashboard-menu-btn ${showDashboardMenu ? "open" : ""}`}
          onClick={() => setShowDashboardMenu(!showDashboardMenu)}
          aria-label="Toggle dashboard menu"
        >
          {showDashboardMenu ? (
            <span aria-hidden="true">✕</span>
          ) : (
            <span aria-hidden="true">☰</span>
          )}
        </button>

        {/* Dashboard Mobile Menu */}
        <div
          className={`dashboard-mobile-menu ${showDashboardMenu ? "show" : ""}`}
        >
          {/* Overlay - always present but opacity controlled by CSS */}
          <div
            className="dashboard-menu-overlay"
            onClick={() => setShowDashboardMenu(false)}
          />
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
                <span className="menu-icon">
                  <Home size={18} />
                </span>{" "}
                Home
              </div>
              <div
                className={`menu-item ${activeTab === "discuss" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("discuss");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon">
                  <MessageCircle size={18} />
                </span>{" "}
                Discussions
              </div>
              <div
                className={`menu-item ${activeTab === "contributors" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("contributors");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon">
                  <Trophy size={18} />
                </span>{" "}
                LeaderBoard
              </div>
              <div
                className={`menu-item ${activeTab === "giveaway" ? "active" : ""}`}
                onClick={() => {
                  handleTabChange("giveaway");
                  setShowDashboardMenu(false);
                }}
              >
                <span className="menu-icon">
                  <Gift size={18} />
                </span>{" "}
                Giveaways
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="sidebar-header">
            <button
              className="back-button"
              onClick={() => {
                // If we came from the dashboard, go back, otherwise go to dashboard
                if (history.length > 2) {
                  history.goBack();
                } else {
                  history.push("/dashboard");
                }
              }}
              aria-label="Go back to dashboard"
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
              icon={<Trophy size={20} />}
              text="LeaderBoard"
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
          <motion.section
            className="dashboard-hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-content">
              <h1 className="dashboard-title">
                🎁 <span className="highlight">Giveaway</span>
              </h1>
              <p className="dashboard-subtitle">
                Participate in exclusive giveaways and win exciting prizes!
              </p>
            </div>
          </motion.section>

          {/* Giveaway Stats Grid */}
          <motion.section
            className="dashboard-stats-section"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="dashboard-stats-grid">
              <StatCard
                icon="⏳"
                title="Next Giveaway"
                value={5}
                valueText="5 Days"
                description="Time remaining"
              />
              <StatCard
                icon="🎫"
                title="Entries"
                value={leaderboard.length}
                valueText={leaderboard.length.toString()}
                description="Total participants"
              />
              <StatCard
                icon="🏅"
                title="Total Winners"
                value={3}
                valueText="3"
                description="Winners per giveaway"
              />
            </div>
          </motion.section>

          {/* Giveaway Leaderboard */}
          <motion.section
            className="giveaway-leaderboard-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="giveaway-leaderboard-header">
              <h2 className="giveaway-leaderboard-title">
                🎁 Giveaway <span className="highlight">Leaderboard</span>
              </h2>
              <p className="giveaway-leaderboard-subtitle">
                Top contributors competing for amazing prizes!
              </p>
            </div>

            {loading ? (
              <div className="giveaway-loading">
                <div className="loading-spinner">Loading...</div>
                <p>Fetching leaderboard data...</p>
              </div>
            ) : (
              <div className="giveaway-leaderboard-grid">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    className={`giveaway-leaderboard-card rank-${entry.rank <= 3 ? entry.rank : "other"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="giveaway-rank-badge">
                      {entry.rank <= 3 ? (
                        entry.rank === 1 ? (
                          <Crown size={20} />
                        ) : entry.rank === 2 ? (
                          <Award size={20} />
                        ) : (
                          <Star size={20} />
                        )
                      ) : (
                        `#${entry.rank}`
                      )}
                    </div>

                    <div className="giveaway-avatar">
                      <img src={entry.avatar} alt={entry.name} />
                      {entry.badge && (
                        <div className="giveaway-badge">{entry.badge}</div>
                      )}
                    </div>

                    <div className="giveaway-info">
                      <h3 className="giveaway-name">{entry.name}</h3>
                      <div className="giveaway-stats">
                        <div className="giveaway-stat">
                          <span className="stat-value">{entry.points}</span>
                          <span className="stat-label">Points</span>
                        </div>
                        <div className="giveaway-stat">
                          <span className="stat-value">
                            {entry.contributions}
                          </span>
                          <span className="stat-label">Contributions</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={entry.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="giveaway-profile-btn"
                    >
                      View Profile
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Kingsumo Giveaway Script */}
          <script src="https://kingsumo.com/js/embed.js"></script>
        </div>
      </div>
    </Layout>
  );
};

export default GiveawayPage;
