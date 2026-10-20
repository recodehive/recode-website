import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useAuth } from "@clerk/react";
import { motion } from "framer-motion";
import { CommunityStatsProvider } from "@site/src/lib/statsProvider";
import { useLocation, useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  Home,
  Users,
  Gift,
  MessageCircle,
} from "lucide-react";
import DiscussionsView from "@site/src/components/discussions/DiscussionsView";
import DashboardSidebar from "@site/src/components/dashboard/Sidebar/DashboardSidebar";
import "./dashboard.css";
import LeaderBoard from "@site/src/components/dashboard/LeaderBoard/leaderboard";
import Overview from "@site/src/components/dashboard/overview/Overview";

import GiveawayPage from "@site/src/components/dashboard/giveaway";

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState<
    "home" | "discuss" | "giveaway" | "contributors"
  >("home");

  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  // Close dashboard menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        showDashboardMenu &&
        !target.closest(".dashboard-mobile-menu") &&
        !target.closest(".dashboard-menu-btn")
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
    // Set active tab based on URL hash
    if (location.hash === "#discuss") {
      setActiveTab("discuss");
    } else if (location.hash === "#leaderboard" || location.hash.startsWith("#badge=")) {
      setActiveTab("contributors");
    } else if (location.hash === "#giveaway") {
      setActiveTab("giveaway");
    } else {
      setActiveTab("home");
    }
  }, [location]);

  const handleTabChange = (
    tab: "home" | "discuss" | "giveaway" | "contributors",
  ) => {
    setActiveTab(tab);
    setShowDashboardMenu(false);
    if (tab === "discuss") {
      history.push("#discuss");
      window.scrollTo(0, 0);
    } else if (tab === "giveaway") {
      history.push("#giveaway");
      window.scrollTo(0, 0);
    } else if (tab === "contributors") {
      history.push("#leaderboard");
      window.scrollTo(0, 0);
    } else {
      history.push("#");
    }
  };

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
      <div
        className={`dashboard-mobile-menu ${showDashboardMenu ? "show" : ""}`}
      >
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
              <span className="menu-icon">
                <Home size={18} />
              </span>{" "}
              Overview
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
                <Users size={18} />
              </span>{" "}
              Leaderboard
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

      <DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />

      <div className={`dashboard-main-content${activeTab === "home" ? " dashboard-main-content--home" : ""}${activeTab === "discuss" ? " dashboard-main-content--discuss" : ""}${activeTab === "giveaway" ? " dashboard-main-content--giveaway" : ""}`}>
        <Head>
          <title>Dashboard | recode hive</title>
        </Head>

        {activeTab === "home" && <Overview />}

        {activeTab === "discuss" && <DiscussionsView />}

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
            <GiveawayPage/>
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
