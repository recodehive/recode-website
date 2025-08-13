import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingContributors.css';

interface Contributor {
  id: string;
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
  lastActivity: string;
}

interface ContributorActivity {
  contributor: Contributor;
  action: 'checked-in' | 'contributed' | 'starred' | 'forked';
  timeAgo: string;
}

interface FloatingContributorsProps {
  headerEmbedded?: boolean;
}

const FloatingContributors: React.FC<FloatingContributorsProps> = ({ headerEmbedded = false }) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [activities, setActivities] = useState<ContributorActivity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);



  // Initialize with fallback data immediately to ensure toaster always appears
  useEffect(() => {
    // Set fallback data immediately
    const initializeFallbackData = () => {
      const demoContributors: Contributor[] = [
        {
          id: '1',
          login: 'sanjay-kv',
          avatar_url: 'https://avatars.githubusercontent.com/u/30715153?v=4',
          contributions: 127,
          html_url: 'https://github.com/sanjay-kv',
          lastActivity: '2 minutes ago',
        },
        {
          id: '2',
          login: 'recodehive-team',
          avatar_url: 'https://avatars.githubusercontent.com/u/150000000?v=4',
          contributions: 89,
          html_url: 'https://github.com/recodehive',
          lastActivity: '5 minutes ago',
        },
        {
          id: '3',
          login: 'contributor-1',
          avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
          contributions: 64,
          html_url: 'https://github.com/contributor-1',
          lastActivity: '12 minutes ago',
        },
        {
          id: '4',
          login: 'contributor-2',
          avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
          contributions: 45,
          html_url: 'https://github.com/contributor-2',
          lastActivity: '1 hour ago',
        },
        {
          id: '5',
          login: 'contributor-3',
          avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
          contributions: 32,
          html_url: 'https://github.com/contributor-3',
          lastActivity: '3 hours ago',
        },
      ];

      setContributors(demoContributors);
      setActivities(demoContributors.map(contributor => ({
        contributor,
        action: getRandomAction(),
        timeAgo: contributor.lastActivity,
      })));
      setLoading(false);
    };

    // Initialize with fallback data immediately
    initializeFallbackData();

    // Then try to fetch real data
    const fetchContributors = async () => {
      try {

        // Fetch repositories from RecodeHive organization
        const reposResponse = await fetch('https://api.github.com/orgs/recodehive/repos?type=public&per_page=10&sort=updated');

        // Check if the response is ok
        if (!reposResponse.ok) {
          console.warn(`GitHub API rate limit or error: ${reposResponse.status}`);
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        if (!Array.isArray(repos)) {
          throw new Error('Invalid repos response');
        }

        // Collect contributors from multiple repositories
        const contributorsMap = new Map<string, Contributor>();
        
        for (const repo of repos.slice(0, 5)) { // Limit to top 5 repos for performance
          try {
            const contributorsResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/contributors?per_page=20`);
            
            if (contributorsResponse.ok) {
              const repoContributors = await contributorsResponse.json();
              
              if (Array.isArray(repoContributors)) {
                repoContributors.forEach(contributor => {
                  if (contributor.login && contributor.type === 'User') {
                    const existing = contributorsMap.get(contributor.login);
                    if (existing) {
                      existing.contributions += contributor.contributions;
                    } else {
                      contributorsMap.set(contributor.login, {
                        id: contributor.id.toString(),
                        login: contributor.login,
                        avatar_url: contributor.avatar_url,
                        contributions: contributor.contributions,
                        html_url: contributor.html_url,
                        lastActivity: generateRandomTimeAgo(),
                      });
                    }
                  }
                });
              }
            }
          } catch (error) {
            console.warn(`Error fetching contributors for ${repo.name}:`, error);
          }
        }

        const contributorsList = Array.from(contributorsMap.values())
          .sort((a, b) => b.contributions - a.contributions)
          .slice(0, 12); // Top 12 contributors

        // Only update if we got real data
        if (contributorsList.length > 0) {
          setContributors(contributorsList);

          // Generate activities
          const generatedActivities: ContributorActivity[] = contributorsList.map(contributor => ({
            contributor,
            action: getRandomAction(),
            timeAgo: generateRandomTimeAgo(),
          }));

          setActivities(generatedActivities);
        }
        
      } catch (error) {
        // Silently handle GitHub API errors (rate limits, etc.)
        console.warn('Using fallback contributor data due to GitHub API limitations');
        // Fallback data is already initialized, so no need to set it again
      }
    };

    fetchContributors();
  }, []);

  // Cycle through activities
  useEffect(() => {
    if (activities.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activities.length]);


  const generateRandomTimeAgo = (): string => {
    const timeOptions = [
      'a few seconds ago',
      '2 minutes ago',
      '5 minutes ago',
      '10 minutes ago',
      '30 minutes ago',
      '1 hour ago',
      '2 hours ago',
      'a day ago',
      '2 days ago',
    ];
    return timeOptions[Math.floor(Math.random() * timeOptions.length)];
  };

  const getRandomAction = (): ContributorActivity['action'] => {
    const actions: ContributorActivity['action'][] = ['checked-in', 'contributed', 'starred', 'forked'];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const getActionIcon = (action: ContributorActivity['action']): string => {
    switch (action) {
      case 'checked-in': return '✅';
      case 'contributed': return '🚀';
      case 'starred': return '⭐';
      case 'forked': return '🍴';
      default: return '💻';
    }
  };

  const getActionText = (action: ContributorActivity['action']): string => {
    switch (action) {
      case 'checked-in': return 'Checked-in';
      case 'contributed': return 'Contributed';
      case 'starred': return 'Starred';
      case 'forked': return 'Forked';
      default: return 'Active';
    }
  };

  if (loading || activities.length === 0) {
    return null;
  }

  const currentActivity = activities[currentActivityIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`floating-contributors-container ${headerEmbedded ? 'header-embedded' : ''}`}
          initial={{ opacity: 0, y: headerEmbedded ? 0 : 50, scale: headerEmbedded ? 1 : 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: headerEmbedded ? 0 : 50, scale: headerEmbedded ? 1 : 0.9 }}
          transition={{
            duration: headerEmbedded ? 0.8 : 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Main floating card */}
          <motion.div
            className="floating-contributors-card"
            animate={headerEmbedded ? {} : {
              y: [0, -8, 0],
            }}
            transition={headerEmbedded ? {} : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Close button */}
            <button
              className="floating-contributors-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close contributors showcase"
            >
              ×
            </button>

            {/* Header */}
            <div className="floating-contributors-header">
              <div className="floating-contributors-title">
                <span className="title-icon">👥</span>
                <span>Live Activity</span>
              </div>
              <div className="floating-contributors-subtitle">
                RecodeHive Community
              </div>
            </div>

            {/* Current activity */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivityIndex}
                className="floating-contributors-activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="activity-avatar-container">
                  <motion.img
                    src={currentActivity.contributor.avatar_url}
                    alt={currentActivity.contributor.login}
                    className="activity-avatar"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                  <div className="activity-status-indicator">
                    <span className="status-dot"></span>
                  </div>
                </div>
                
                <div className="activity-details">
                  <div className="activity-user">
                    <span className="activity-username">@{currentActivity.contributor.login}</span>
                    <span className="activity-action-badge">
                      <span className="action-icon">{getActionIcon(currentActivity.action)}</span>
                      {getActionText(currentActivity.action)}
                    </span>
                  </div>
                  <div className="activity-time">{currentActivity.timeAgo}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Contributors grid */}
            <div className="floating-contributors-grid">
              <div className="contributors-grid-header">
                <span>Recent Contributors</span>
                <span className="contributors-count">{contributors.length}</span>
              </div>
              
              <div className="contributors-avatars">
                {contributors.slice(0, 8).map((contributor, index) => (
                  <motion.div
                    key={contributor.id}
                    className="contributor-avatar-wrapper"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      zIndex: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      className="contributor-avatar"
                      title={`${contributor.login} - ${contributor.contributions} contributions`}
                    />
                    <div className="contributor-tooltip">
                      <div className="tooltip-name">@{contributor.login}</div>
                      <div className="tooltip-contributions">{contributor.contributions} contributions</div>
                    </div>
                  </motion.div>
                ))}
                
                {contributors.length > 8 && (
                  <div className="contributors-more">
                    <span>+{contributors.length - 8}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="floating-contributors-footer">
              <motion.a
                href="https://github.com/recodehive"
                target="_blank"
                rel="noopener noreferrer"
                className="contributors-cta"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="cta-icon">🚀</span>
                <span>Join the Community</span>
                <span className="cta-arrow">→</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Floating particles */}
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-particle"
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContributors;