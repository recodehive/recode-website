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

const FloatingContributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [activities, setActivities] = useState<ContributorActivity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch contributors from RecodeHive organization
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);

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

        setContributors(contributorsList);
        
        // Generate activities
        const generatedActivities: ContributorActivity[] = contributorsList.map(contributor => ({
          contributor,
          action: getRandomAction(),
          timeAgo: generateRandomTimeAgo(),
        }));
        
        setActivities(generatedActivities);
        setLoading(false);
        
      } catch (error) {
        // Silently handle GitHub API errors (rate limits, etc.)
        console.warn('Using fallback contributor data due to GitHub API limitations');

        // Fallback demo data
        const demoContributors: Contributor[] = [
          {
            id: '1',
            login: 'sanjay-kv',
            avatar_url: 'https://avatars.githubusercontent.com/u/30715153?v=4',
            contributions: 250,
            html_url: 'https://github.com/sanjay-kv',
            lastActivity: '2 minutes ago',
          },
          {
            id: '2',
            login: 'vansh-codes',
            avatar_url: 'https://avatars.githubusercontent.com/u/114163734?v=4',
            contributions: 180,
            html_url: 'https://github.com/vansh-codes',
            lastActivity: '5 minutes ago',
          },
          {
            id: '3',
            login: 'Hemu21',
            avatar_url: 'https://avatars.githubusercontent.com/u/106808387?v=4',
            contributions: 120,
            html_url: 'https://github.com/Hemu21',
            lastActivity: '1 hour ago',
          },
        ];
        
        setContributors(demoContributors);
        setActivities(demoContributors.map(contributor => ({
          contributor,
          action: getRandomAction(),
          timeAgo: contributor.lastActivity,
        })));
        setLoading(false);
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

  // Auto-hide after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000); // Hide after 30 seconds

    return () => clearTimeout(timer);
  }, []);

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
          className="floating-contributors-container"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.4, 0, 0.2, 1] 
          }}
        >
          {/* Main floating card */}
          <motion.div
            className="floating-contributors-card"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
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