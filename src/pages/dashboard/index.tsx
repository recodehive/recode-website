import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import { useCommunityStatsContext, CommunityStatsProvider } from "@site/src/lib/statsProvider";
import SlotCounter from "react-slot-counter";
import Giscus from "@giscus/react";
import { useLocation, useHistory } from "@docusaurus/router";
import "./dashboard.css";

interface LeaderboardEntry {
  rank: number;
  name: string;
  username?: string;
  avatar: string;
  contributions: number;
  repositories: number;
  achievements: string[];
  github_url: string;
  score?: number;
  streak?: number;
  postManTag?: boolean;
  web3hack?: boolean;
}

interface DashboardStats {
  totalContributors: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  topContributors: LeaderboardEntry[];
}

// Helper function to parse CSV data from Google Sheets
const parseCSVToJSON = (csvText: string): any[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // Get headers from first line (remove quotes)
  const headers = lines[0].split(',').map(header => header.replace(/"/g, '').trim());
  console.log('📋 CSV Headers found:', headers);
  
  // Parse data rows
  const data: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(value => value.replace(/"/g, '').trim());
    const row: any = {};
    
    headers.forEach((header, index) => {
      if (values[index]) {
        row[header] = values[index];
      }
    });
    
    // Only add rows that have meaningful data
    if (row[headers[0]] && row[headers[0]] !== '') {
      data.push(row);
    }
  }
  
  console.log('📊 Parsed CSV data:', data);
  return data;
};

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<'home' | 'discuss' | 'leaderboard'|'giveaway'>('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);

  useEffect(() => {
    // Set active tab based on URL hash
    if (location.hash === '#discuss') {
      setActiveTab('discuss');
    } else if (location.hash === '#leaderboard') {
      setActiveTab('leaderboard');
    } else if (location.hash === '#giveaway'){
      setActiveTab('giveaway');
    }
    else {
      setActiveTab('home');
    }
  }, [location]);

  // Fetch leaderboard data when leaderboard tab is active
  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchLeaderboardData();
    }
  }, [activeTab]);

  const fetchLeaderboardData = async () => {
    setIsLoadingLeaderboard(true);
    setLeaderboardError(null);
    
    try {
      console.log('🔄 Fetching leaderboard data from API...');
      
      const response = await fetch('https://gssoc24-leaderboard-backend-production-dfe3.up.railway.app/OSLeaderboard');
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 API Response:', data);
      
      if (!data.leaderboard || !Array.isArray(data.leaderboard)) {
        throw new Error('Invalid API response format');
      }
      
      // Transform API data to match our LeaderboardEntry interface
      const transformedData: LeaderboardEntry[] = data.leaderboard
        .filter(item => item.login && item.score !== undefined) // Filter out entries without login or score
        .map((item, index) => {
          const score = item.score || 0;
          const prCount = item.pr_urls ? item.pr_urls.length : 0;
          const achievements = generateAchievements(score, prCount);
          
          // Add badges for special tags
          if (item.postManTag) achievements.push("📮 Postman Badge");
          if (item.web3hack) achievements.push("🌐 Web3 Hacker");
          
          return {
            rank: index + 1,
            name: item.login, // Using login as name since that's what's available
            username: item.login,
            avatar: item.avatar_url || `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000)}?v=4`,
            contributions: prCount,
            repositories: Math.floor(prCount / 3) || 1, // Estimate repos based on PRs
            score,
            achievements,
            github_url: item.url || `https://github.com/${item.login}`,
            streak: item.streak || 0,
            postManTag: item.postManTag || false,
            web3hack: item.web3hack || false,
          };
        })
        .sort((a, b) => b.score - a.score) // Sort by score descending
        .map((item, index) => ({ ...item, rank: index + 1 })); // Update ranks after sorting
      
      console.log('✅ Successfully processed leaderboard data:', transformedData);
      setLeaderboardData(transformedData);
      
    } catch (error) {
      console.error('❌ Error fetching leaderboard data:', error);
      setLeaderboardError(error.message);
      
      // Fallback demo data with similar structure
      console.log('📝 Loading demo data as fallback...');
      const demoData: LeaderboardEntry[] = [
        {
          rank: 1,
          name: "ShivanshPlays",
          username: "ShivanshPlays",
          avatar: "https://avatars.githubusercontent.com/u/112249407?v=4",
          contributions: 158,
          repositories: 25,
          score: 7900,
          achievements: ["🏆 Top Contributor", "📮 Postman Badge", "🌐 Web3 Hacker"],
          github_url: "https://github.com/ShivanshPlays",
          streak: 9,
          postManTag: true,
          web3hack: true,
        },
        {
          rank: 2,
          name: "IkkiOcean",
          username: "IkkiOcean",
          avatar: "https://avatars.githubusercontent.com/u/76002919?v=4",
          contributions: 145,
          repositories: 22,
          score: 7850,
          achievements: ["🚀 Rising Star", "📮 Postman Badge", "🌐 Web3 Hacker"],
          github_url: "https://github.com/IkkiOcean",
          streak: 8,
          postManTag: true,
          web3hack: true,
        },
        {
          rank: 3,
          name: "Community Member",
          username: "member3",
          avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
          contributions: 120,
          repositories: 18,
          score: 6500,
          achievements: ["💪 Power User", "⭐ Star Contributor"],
          github_url: "https://github.com/member3",
          streak: 5,
        }
      ];
      setLeaderboardData(demoData);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const generateAchievements = (score: number, contributions: number): string[] => {
    const achievements: string[] = [];
    
    // Score-based achievements (GSSoC style)
    if (score >= 5000) achievements.push("🏆 Elite Contributor");
    if (score >= 3000) achievements.push("⭐ Master Contributor");
    if (score >= 1000) achievements.push("🚀 Advanced Contributor");
    if (score >= 500) achievements.push("💪 Active Contributor");
    if (score >= 100) achievements.push("🌟 Rising Star");
    
    // PR count-based achievements
    if (contributions >= 100) achievements.push("� Century Club");
    if (contributions >= 50) achievements.push("🎯 Half Century");
    if (contributions >= 25) achievements.push("⚡ Quick Contributor");
    if (contributions >= 10) achievements.push("🔥 Consistent");
    
    // Special milestone achievements
    if (score >= 7000) achievements.push("👑 Legend");
    if (contributions >= 150) achievements.push("🎖️ PR Master");
    
    return achievements.slice(0, 3); // Limit to 3 achievements for UI
  };

  const handleTabChange = (tab: 'home' | 'discuss' | 'leaderboard' | 'giveaway') => {
    setActiveTab(tab);
    if (tab === 'discuss') {
      history.push('#discuss');
      window.scrollTo(0, 0);
    } else if (tab === 'leaderboard') {
      history.push('#leaderboard');
      window.scrollTo(0, 0);
    } else if (tab === 'giveaway'){
      history.push('/dashboard/giveaway');
      window.scrollTo(0 , 0);
    }
    else {
      history.push('#');
    }
  };

  const {
    githubStarCount,
    githubStarCountText,
    githubContributorsCount,
    githubContributorsCountText,
    githubForksCount,
    githubForksCountText,
    githubReposCount,
    githubReposCountText,
    loading,
    error,
  } = useCommunityStatsContext();

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalContributors: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
    topContributors: [],
  });

  // Mock data for demonstration - in real implementation, this would come from API
  const mockLeaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Sanjay Viswanathan",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 1247,
      repositories: 15,
      achievements: ["🏆 Top Contributor", "⭐ 1000+ Stars", "🎯 Maintainer"],
      github_url: "https://github.com/sanjay-kv",
    },
    {
      rank: 2,
      name: "Vansh Codes",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 982,
      repositories: 8,
      achievements: ["🚀 Rising Star", "💡 Bug Hunter", "📚 Documentation"],
      github_url: "https://github.com/vansh-codes",
    },
    {
      rank: 3,
      name: "Community Member",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 756,
      repositories: 6,
      achievements: ["🎨 UI/UX Expert", "🔧 Feature Builder"],
      github_url: "https://github.com/example",
    },
    {
      rank: 4,
      name: "Open Source Dev",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 523,
      repositories: 4,
      achievements: ["🌟 First Timer", "👥 Collaborator"],
      github_url: "https://github.com/example2",
    },
    {
      rank: 5,
      name: "Code Contributor",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 401,
      repositories: 3,
      achievements: ["🏅 Consistent", "🔍 Code Reviewer"],
      github_url: "https://github.com/example3",
    },
  ];

  useEffect(() => {
    // Update dashboard stats when community stats are loaded
    setDashboardStats({
      totalContributors: githubContributorsCount,
      totalRepositories: githubReposCount,
      totalStars: githubStarCount,
      totalForks: githubForksCount,
      topContributors: mockLeaderboardData,
    });
  }, [githubContributorsCount, githubReposCount, githubStarCount, githubForksCount]);

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
          {loading ? (
            <div className="loading-spinner">⏳</div>
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

  const LeaderboardCard: React.FC<{ entry: LeaderboardEntry; index: number }> = ({
    entry,
    index,
  }) => (
    <motion.div
      className="leaderboard-card"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
      <div className="leaderboard-rank">
        <span className={`rank-badge rank-${entry.rank}`}>#{entry.rank}</span>
      </div>
      <div className="leaderboard-avatar">
        <img src={entry.avatar} alt={entry.name} />
      </div>
      <div className="leaderboard-info">
        <h4 className="leaderboard-name">{entry.name}</h4>
        <div className="leaderboard-stats">
          <span className="stat-item">
            <strong>{entry.contributions}</strong> Contributions
          </span>
          <span className="stat-item">
            <strong>{entry.repositories}</strong> Repositories
          </span>
        </div>
        <div className="leaderboard-achievements">
          {entry.achievements.map((achievement, i) => (
            <span key={i} className="achievement-badge">
              {achievement}
            </span>
          ))}
        </div>
      </div>
      <div className="leaderboard-actions">
        <a
          href={entry.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-btn"
        >
          View Profile
        </a>
      </div>
    </motion.div>
  );

  return (
    <Layout title="Dashboard" description="RecodeHive Community Dashboard">
      <Head>
        <title>RecodeHive | Dashboard</title>
        <meta name="description" content="RecodeHive Community Dashboard" />
      </Head>
      <div className="dashboard-layout">
        {/* Side Navigation */}
        <nav className={`dashboard-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <h2>RecodeHive</h2>
            </div>
            <button 
              className="sidebar-toggle" 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          <ul className="sidebar-nav">
            <li 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => handleTabChange('home')}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'discuss' ? 'active' : ''}`}
              onClick={() => handleTabChange('discuss')}
            >
              <span className="nav-icon">💬</span>
              <span className="nav-text">Discuss</span>
            </li>
            <li 
              className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => handleTabChange('leaderboard')}
            >
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Leaderboard</span>
            </li>

            <li
             className={`nav-item ${activeTab === 'giveaway' ? 'active' : ''}`}
              onClick={() => handleTabChange
              ('giveaway')}
              >
                <span className="nav-icon">🎁</span>
                <span className="nav-text">Giveaway</span>
            </li>

          </ul>
          <div className="sidebar-footer">
            <button 
              className="sidebar-toggle bottom-toggle" 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          </div>
        </nav>

        <main 
          className={`dashboard-main ${activeTab === 'discuss' ? 'discuss-view' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
          onClick={() => isSidebarCollapsed && setIsSidebarCollapsed(false)}
        >
          {activeTab === 'home' ? (
            <div>
              {/* Hero Section */}
              <motion.section
                className="dashboard-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-content">
                  <h1 className="dashboard-title">
                    Community <span className="highlight">Dashboard</span>
                  </h1>
                  <p className="dashboard-subtitle">
                    Track our community's growth, celebrate top contributors, and explore project statistics
                  </p>
                </div>
              </motion.section>

              {/* Stats Grid */}
              <motion.section
                className="dashboard-stats-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="dashboard-stats-grid">
                  <StatCard
                    icon="⭐"
                    title="Total Stars"
                    value={dashboardStats.totalStars}
                    valueText={githubStarCountText}
                    description="Stars across all repositories"
                  />
                  <StatCard
                    icon="👥"
                    title="Contributors"
                    value={dashboardStats.totalContributors}
                    valueText={githubContributorsCountText}
                    description="Amazing community members"
                  />
                  <StatCard
                    icon="📚"
                    title="Repositories"
                    value={dashboardStats.totalRepositories}
                    valueText={githubReposCountText}
                    description="Open source projects"
                  />
                  <StatCard
                    icon="🍴"
                    title="Forks"
                    value={dashboardStats.totalForks}
                    valueText={githubForksCountText}
                    description="Community contributions"
                  />
                </div>
              </motion.section>

              {/* Leaderboard Section */}
              <motion.section
                className="dashboard-leaderboard-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="leaderboard-header">
                  <h2 className="leaderboard-title">
                    🏆 Top Contributors <span className="title-accent">Leaderboard</span>
                  </h2>
                  <p className="leaderboard-description">
                    Celebrating our most active community members who make RecodHive awesome!
                  </p>
                </div>

                <div className="leaderboard-container">
                  {error && (
                    <div className="error-message">
                      <p>⚠️ Some data may be cached or incomplete</p>
                    </div>
                  )}
                  
                  {dashboardStats.topContributors.map((entry, index) => (
                    <LeaderboardCard key={entry.rank} entry={entry} index={index} />
                  ))}
                </div>
              </motion.section>

              {/* Call to Action */}
              <motion.section
                className="dashboard-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="cta-content">
                  <h3>Want to see your name here?</h3>
                  <p>Join our community and start contributing to open source projects!</p>
                  <div className="cta-buttons">
                    <a
                      href="https://github.com/recodehive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary"
                    >
                      Start Contributing
                    </a>
                    <a href="/community" className="cta-secondary">
                      Join Community
                    </a>
                  </div>
                </div>
              </motion.section>
            </div>
          ) : activeTab === 'discuss' ? (
            <div className="discussion-container">
              <h2>Community Discussions</h2>
              <p>Join the conversation, ask questions, and share your thoughts with the RecodeHive community.</p>
              <div className="giscus-container">
                <Giscus
                  id="discussions"
                  repo="recodehive/recode-website"
                  repoId="R_kgDOOgGO-g"
                  category="Announcements"  // You can change this to your preferred category
                  categoryId="DIC_kwDOOgGO-s4Cb6wU"  // This is a placeholder - you'll need to get the actual category ID
                  mapping="pathname"
                  strict="0"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="bottom"
                  theme="preferred_color_scheme"
                  lang="en"
                  loading="lazy"
                />
              </div>
            </div>
          ) : activeTab === 'leaderboard' ? (
            /* Leaderboard Tab */
            <div className="leaderboard-page-container">
              <motion.div
                className="leaderboard-page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="leaderboard-page-title">
                  🏆 Community <span className="highlight">Leaderboard</span>
                </h1>
                <p className="leaderboard-page-subtitle">
                  Live rankings from GSSoC '24 API • Updated automatically
                </p>
                <div className="refresh-section">
                  <button 
                    onClick={fetchLeaderboardData}
                    disabled={isLoadingLeaderboard}
                    className="refresh-button"
                  >
                    {isLoadingLeaderboard ? '🔄 Loading...' : '🔄 Refresh Data'}
                  </button>
                </div>
              </motion.div>

              {/* Loading State */}
              {isLoadingLeaderboard && (
                <motion.div 
                  className="loading-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="loading-spinner-large">⏳</div>
                  <p>Loading leaderboard data from GSSoC API...</p>
                </motion.div>
              )}

              {/* Error State */}
              {leaderboardError && !isLoadingLeaderboard && (
                <motion.div 
                  className="error-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h3>⚠️ API Connection Issue</h3>
                  <p>{leaderboardError}</p>
                  <div className="error-help">
                    <p><strong>This could be due to:</strong></p>
                    <ul>
                      <li>API server is temporarily down</li>
                      <li>Network connectivity issues</li>
                      <li>API rate limiting</li>
                    </ul>
                    <p>Please try refreshing in a moment!</p>
                  </div>
                  <button onClick={fetchLeaderboardData} className="retry-button">
                    Try Again
                  </button>
                </motion.div>
              )}

              {/* Leaderboard Data */}
              {!isLoadingLeaderboard && !leaderboardError && leaderboardData.length > 0 && (
                <motion.div
                  className="leaderboard-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="leaderboard-stats">
                    <div className="stat-item">
                      <span className="stat-number">{leaderboardData.length}</span>
                      <span className="stat-label">Participants</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{leaderboardData[0]?.score || 0}</span>
                      <span className="stat-label">Top Score</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">
                        {Math.round(leaderboardData.reduce((acc, user) => acc + (user.score || 0), 0) / leaderboardData.length)}
                      </span>
                      <span className="stat-label">Avg Score</span>
                    </div>
                  </div>

                  <div className="leaderboard-grid">
                    {leaderboardData.map((entry, index) => (
                      <motion.div
                        key={entry.rank}
                        className="leaderboard-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                      >
                        {/* Streak Display */}
                        {entry.streak && entry.streak > 1 && (
                          <div className="streak-display">
                            {entry.streak} Day Streak
                          </div>
                        )}

                        <div className="rank-section">
                          <div className={`rank-badge ${entry.rank <= 3 ? `rank-${entry.rank}` : 'rank-other'}`}>
                            #{entry.rank}
                          </div>
                        </div>
                        
                        <div className="avatar-section">
                          <img 
                            src={entry.avatar} 
                            alt={entry.name}
                            className="user-avatar"
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="user-info">
                          <h3 className="user-name">{entry.name}</h3>
                          {entry.username && entry.username !== entry.name && (
                            <p className="user-username">@{entry.username}</p>
                          )}
                          
                          <div className="score-display">
                            <span className="score-number">{entry.score || 0}</span>
                            <span className="score-label">points</span>
                          </div>
                          
                          <div className="user-stats">
                            <div className="stat">
                              <span className="stat-value">{entry.contributions}</span>
                              <span className="stat-text">PRs</span>
                            </div>
                            <div className="stat">
                              <span className="stat-value">{entry.repositories}</span>
                              <span className="stat-text">Repos</span>
                            </div>
                          </div>
                          
                          {entry.achievements.length > 0 && (
                            <div className="achievements">
                              {entry.achievements.map((achievement, i) => (
                                <span key={i} className="achievement-tag">
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="actions-section">
                          <a
                            href={entry.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                          >
                            <span>View Profile</span>
                            <span>🔗</span>
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Empty State */}
              {!isLoadingLeaderboard && !leaderboardError && leaderboardData.length === 0 && (
                <motion.div 
                  className="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3>📊 No data available</h3>
                  <p>The leaderboard is empty. Check back later!</p>
                </motion.div>
              )}
            </div>
            ) : activeTab === 'giveaway'  && (
              // ✅ Giveaway Section 🎁
              <>
                <motion.section className="dashboard-hero" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                  <div className="hero-content">
                    <h1 className="dashboard-title">
                      🎁 <span className="highlight">Giveaway</span>
                    </h1>
                    <p className="dashboard-subtitle">Participate in exclusive giveaways and win exciting prizes!</p>
                  </div>
                </motion.section>

                {/* 🎉 Giveaway Stats Grid */}
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
                      value="5 Days"
                      valueText="5 Days Left"
                      description="Time remaining"
                    />
                    <StatCard
                      icon="🎫"
                      title="Entries"
                      value="1420"
                      valueText="1,420"
                      description="Total participants"
                    />
                    <StatCard
                      icon="📈"
                      title="Your Rank"
                      value="32"
                      valueText="Rank 32"
                      description="Based on your contribution"
                    />
                    <StatCard
                      icon="🏅"
                      title="Total Winners"
                      value="10"
                      valueText="10 Winners"
                      description="Winners per giveaway"
                    />
                  </div>
                </motion.section>
              </>
            
          )}
        </main>
      </div>
    </Layout>
  );
};

const Dashboard: React.FC = () => {
  return (
    <CommunityStatsProvider>
      <DashboardContent />
    </CommunityStatsProvider>
  );
};

export default Dashboard;