import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SlotCounter from "react-slot-counter";
import { useHistory } from "@docusaurus/router";
import {
  Crown,
  Star,
  Award,
} from "lucide-react";
import "../../../pages/dashboard/dashboard.css";
import "./giveaway.css"


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

  const StatCard: React.FC<{
    icon: string;
    title: string;
    valueText: string;
    description: string;
  }> = ({ icon, title, valueText, description }) => (
    <motion.div
      className="dashboard-stat-card"
      whileHover={{ scale: 1.02 }}
    >
      <div className="dashboard-stat-icon">{icon}</div>
      <div className="dashboard-stat-content">
        <h3 className="dashboard-stat-title">{title}</h3>
        <div className="dashboard-stat-value">
          <SlotCounter value={valueText} duration={1} />
        </div>
        <p className="dashboard-stat-description">{description}</p>
      </div>
    </motion.div>
  );

  return (

      <div className="dashboard-layout">


        <div className="dashboard-main-content">
          <section className="dashboard-hero">
            <div className="hero-content">
              <h1 className="dashboard-title">
                🎁 <span className="highlight">Giveaway</span>
              </h1>
              <p className="dashboard-subtitle">
                Participate in exclusive giveaways and win exciting prizes!
              </p>
            </div>
          </section>

          {/* Giveaway Stats Grid */}
          <section className="dashboard-stats-section grid grid-cols-1 md:grid-cols-3 gap-4 flex-wrap">
            <StatCard
              icon="⏳"
              title="Next Giveaway"
              valueText="5 Days"
              description="Time remaining"
            />
            <StatCard
              icon="🎫"
              title="Entries"
              valueText={leaderboard.length.toString()}
              description="Total participants"
            />
            <StatCard
              icon="🏅"
              title="Total Winners"
              valueText="3"
              description="Winners per giveaway"
            />
          </section>

          {/* Giveaway Leaderboard */}
          <section className="giveaway-leaderboard-section">
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
                <p>Fetching leaderboard data...</p>
              </div>
            ) : (
              <div className="giveaway-leaderboard-grid">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    className={`giveaway-leaderboard-card rank-${entry.rank <= 3 ? entry.rank : "other"}`}
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
          </section>
        </div>
      </div>
  );
};

export default GiveawayPage;
