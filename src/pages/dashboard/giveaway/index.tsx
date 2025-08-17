import React, { useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import SlotCounter from "react-slot-counter";
import NavbarIcon from "../../../components/navbar/NavbarIcon";
import { useHistory } from "@docusaurus/router";
import "../dashboard.css";

const GiveawayPage: React.FC = () => {
  const history = useHistory();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleTabChange = (
    tab: "home" | "discuss" | "leaderboard" | "contributors" | "giveaway"
  ) => {
    setIsMobileSidebarOpen(false);
    if (tab === "discuss") {
      history.push("/dashboard#discuss");
    } else if (tab === "leaderboard") {
      history.push("/dashboard#leaderboard");
    } else if (tab === "contributors") {
      history.push("/dashboard#contributors");
    } else if (tab === "home") {
      history.push("/dashboard");
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
    <Layout title="Giveaway" description="RecodeHive Giveaway">
      <Head>
        <title>🎁 RecodeHive Giveaway</title>
      </Head>
      <div
        className={`dashboard-layout ${
          isMobileSidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-btn ${isMobileSidebarOpen ? "open" : ""}`}
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle mobile menu"
        />

        {/* Sidebar Navigation */}
        <nav
          className={`dashboard-sidebar ${
            isSidebarCollapsed ? "collapsed" : ""
          } ${isMobileSidebarOpen ? "show" : ""}`}
        >
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <h2>RecodeHive</h2>
            </div>
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? "→" : "←"}
            </button>
          </div>
          <ul className="sidebar-nav">
            <li className="nav-item" onClick={() => handleTabChange("home")}>
              <span className="nav-icon">
                <NavbarIcon name="Dashboard" />
              </span>
              <span className="nav-text">Home</span>
            </li>
            <li className="nav-item" onClick={() => handleTabChange("discuss")}>
              <span className="nav-icon">
                <NavbarIcon name="Broadcast" />
              </span>
              <span className="nav-text">Discuss</span>
            </li>
            <li
              className="nav-item"
              onClick={() => handleTabChange("leaderboard")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Badges" />
              </span>
              <span className="nav-text">Leaderboard</span>
            </li>
            <li className="nav-item active">
              <span className="nav-icon">
                <NavbarIcon name="Donate" />
              </span>
              <span className="nav-text">Giveaway</span>
            </li>
            <li
              className="nav-item"
              onClick={() => handleTabChange("contributors")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Community" />
              </span>
              <span className="nav-text">Contributors</span>
            </li>
          </ul>
          <div className="sidebar-footer">
            <button
              className="sidebar-toggle bottom-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? "→" : "←"}
            </button>
          </div>
        </nav>

        <main
          className={`dashboard-main ${
            isSidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
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
                value={1420}
                valueText="1,420"
                description="Total participants"
              />
              <StatCard
                icon="📈"
                title="Your Rank"
                value={32}
                valueText="32"
                description="Based on your contribution"
              />
              <StatCard
                icon="🏅"
                title="Total Winners"
                value={10}
                valueText="10"
                description="Winners per giveaway"
              />
            </div>
          </motion.section>
        </main>
      </div>
    </Layout>
  );
};

export default GiveawayPage;
