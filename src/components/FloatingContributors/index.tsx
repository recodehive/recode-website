import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FloatingContributors.css";

// Bot accounts (dependabot, github-actions, etc.) are excluded from the feed
const isBotAccount = (login: string): boolean => {
  const name = login.toLowerCase();
  return (
    name.includes("[bot]") ||
    name.includes("dependabot") ||
    name.includes("github-actions")
  );
};

// Format relative time (e.g., "2 hours ago")
const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  if (interval === 1) return `1 day ago`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  if (interval === 1) return `1 hour ago`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  if (interval === 1) return `1 minute ago`;

  return `just now`;
};

// Type definitions
interface Contributor {
  id: string;
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  actor: {
    id: number;
    login: string;
    avatar_url: string;
    url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    push_id?: number;
    size?: number;
    distinct_size?: number;
    head?: string;
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
    issue?: {
      number: number;
      title: string;
    };
    pull_request?: {
      merged: boolean;
      title: string;
      number: number;
    };
    comment?: {
      body: string;
    };
  };
}

interface ContributorActivity {
  id: string;
  contributor: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  action:
  | "pushed"
  | "created"
  | "merged"
  | "opened"
  | "commented"
  | "closed"
  | "other";
  message?: string;
  timestamp: Date;
  timeAgo: string;
}

interface FloatingContributorsProps {
  headerEmbedded?: boolean;
  onClose?: () => void;
}

const FloatingContributors: React.FC<FloatingContributorsProps> = ({
  headerEmbedded = false,
  onClose,
}) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [activities, setActivities] = useState<ContributorActivity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<number | null>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Create fallback activities for when API fails
  const createFallbackActivities = useCallback((): ContributorActivity[] => {
    const fallbackContributors = [
      {
        login: "sanjay-kv",
        avatar_url: "https://avatars.githubusercontent.com/u/30715153?v=4",
        html_url: "https://github.com/sanjay-kv",
      },
      {
        login: "recodehive-team",
        avatar_url: "https://avatars.githubusercontent.com/u/150000000?v=4",
        html_url: "https://github.com/recodehive",
      },
      {
        login: "open-source-contributor",
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
        html_url: "https://github.com/open-source-contributor",
      },
      {
        login: "developer",
        avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
        html_url: "https://github.com/developer",
      },
      {
        login: "coder",
        avatar_url: "https://avatars.githubusercontent.com/u/6154722?v=4",
        html_url: "https://github.com/coder",
      },
    ];

    const actions: ContributorActivity["action"][] = [
      "pushed",
      "created",
      "merged",
      "opened",
      "commented",
    ];
    const timeOffsets = [5, 10, 30, 60, 120, 240, 480]; // minutes
    const messages = [
      "Updated documentation",
      "Fixed styling issues",
      "Added new feature",
      "Resolved conflict in package.json",
      "Implemented responsive design",
      "Updated dependencies",
      "Fixed typo in README",
    ];

    return fallbackContributors.map((contributor, index) => {
      const now = new Date();
      const timestamp = new Date(
        now.getTime() - timeOffsets[index % timeOffsets.length] * 60 * 1000,
      );

      return {
        id: `fallback-${index}`,
        contributor: {
          login: contributor.login,
          avatar_url: contributor.avatar_url,
          html_url: contributor.html_url,
        },
        action: actions[index % actions.length],
        message: messages[index % messages.length]?.slice(0, 50), // Consistent message length
        timestamp,
        timeAgo: formatTimeAgo(timestamp),
      };
    });
  }, []);

  // Fetch live data from GitHub
  const fetchLiveData = useCallback(async () => {
    try {
      // Use specific cache key for this repository's events
      const CACHE_KEY = "recodehive_website_events";
      const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes - short for "live" data

      // Check if we have recent data already
      const now = Date.now();
      if (lastFetched && now - lastFetched < 30000) {
        // Don't fetch more than once every 30 seconds
        return;
      }

      // Check for cached events
      let events: GitHubEvent[] = [];
      if (typeof window !== "undefined") {
        try {
          const cachedData = localStorage.getItem(CACHE_KEY);
          if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            if (now - timestamp < CACHE_DURATION) {
              events = data;
            }
          }
        } catch (e) {
          console.warn("Error retrieving cached events", e);
        }
      }

      // If no valid cache, fetch fresh data
      if (events.length === 0) {
        setLoading(true);

        // Fetch repository events from GitHub API
        const eventsResponse = await fetch(
          "https://api.github.com/repos/recodehive/recode-website/events?per_page=30",
        );

        if (!eventsResponse.ok) {
          throw new Error(`GitHub API error: ${eventsResponse.status}`);
        }

        events = await eventsResponse.json();

        // Save to cache
        if (typeof window !== "undefined" && Array.isArray(events)) {
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                data: events,
                timestamp: now,
              }),
            );
          } catch (e) {
            console.warn("Error caching events data", e);
          }
        }
      }

      // Process events into activities (excluding bot accounts)
      if (Array.isArray(events) && events.length > 0) {
        events = events.filter((event) => !isBotAccount(event.actor.login));

        // Convert GitHub events to our activity format
        const newActivities: ContributorActivity[] = events.map((event) => {
          // Map GitHub event types to our action types
          let action: ContributorActivity["action"] = "other";
          let message: string | undefined;

          switch (event.type) {
            case "PushEvent":
              action = "pushed";
              message =
                event.payload.commits &&
                event.payload.commits[0]?.message?.slice(0, 50);
              break;
            case "PullRequestEvent":
              if (event.payload.action === "opened") action = "opened";
              else if (
                event.payload.action === "closed" &&
                event.payload.pull_request?.merged
              )
                action = "merged";
              else if (event.payload.action === "closed") action = "closed";
              break;
            case "CreateEvent":
              action = "created";
              break;
            case "IssueCommentEvent":
            case "CommitCommentEvent":
            case "PullRequestReviewCommentEvent":
              action = "commented";
              message = event.payload.comment?.body?.slice(0, 50);
              break;
            default:
              action = "other";
          }

          const timestamp = new Date(event.created_at);

          return {
            id: event.id,
            contributor: {
              login: event.actor.login,
              avatar_url: event.actor.avatar_url,
              html_url: `https://github.com/${event.actor.login}`,
            },
            action,
            message: message?.slice(0, 50), // Consistent message length limit
            timestamp,
            timeAgo: formatTimeAgo(timestamp),
          };
        });

        // Update only if we have events
        if (newActivities.length > 0) {
          setActivities(newActivities);

          // Extract contributors from these events
          const contributorsMap = new Map<string, Contributor>();

          // Also fetch contributors directly for contribution counts
          try {
            const contributorsResponse = await fetch(
              "https://api.github.com/repos/recodehive/recode-website/contributors?per_page=100",
            );

            if (contributorsResponse.ok) {
              const contributorsData = await contributorsResponse.json();

              if (Array.isArray(contributorsData)) {
                contributorsData.forEach((contributor) => {
                  if (
                    contributor.login &&
                    contributor.type === "User" &&
                    !isBotAccount(contributor.login)
                  ) {
                    contributorsMap.set(contributor.login, {
                      id: contributor.id.toString(),
                      login: contributor.login,
                      avatar_url: contributor.avatar_url,
                      contributions: contributor.contributions,
                      html_url: contributor.html_url,
                    });
                  }
                });
              }
            }
          } catch (error) {
            console.warn("Error fetching contributors:", error);

            // If we couldn't get contributors data, at least use actors from events
            events.forEach((event) => {
              const login = event.actor.login;
              if (!contributorsMap.has(login) && !isBotAccount(login)) {
                contributorsMap.set(login, {
                  id: event.actor.id.toString(),
                  login,
                  avatar_url: event.actor.avatar_url,
                  contributions: 1, // We don't know the actual count
                  html_url: `https://github.com/${login}`,
                });
              }
            });
          }

          // Update contributors if we found any
          if (contributorsMap.size > 0) {
            setContributors(Array.from(contributorsMap.values()));
          }
        }
      }

      setLastFetched(now);
      setLoading(false);

      // Set up next refresh
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
      refreshTimerRef.current = setTimeout(() => {
        fetchLiveData();
      }, 60000); // Refresh every minute
    } catch (error) {
      console.warn("Error fetching GitHub events:", error);

      // Use fallback data if we have no activities yet
      if (activities.length === 0) {
        const fallbackActivities = createFallbackActivities();
        setActivities(fallbackActivities);

        // Create fallback contributors
        const contributorsMap = new Map<string, Contributor>();
        fallbackActivities.forEach((activity) => {
          const login = activity.contributor.login;
          if (!contributorsMap.has(login)) {
            contributorsMap.set(login, {
              id: `fallback-${login}`,
              login,
              avatar_url: activity.contributor.avatar_url,
              contributions: Math.floor(Math.random() * 50) + 10,
              html_url: activity.contributor.html_url,
            });
          }
        });

        setContributors(Array.from(contributorsMap.values()));
      }

      setLoading(false);
    }
  }, [activities.length, createFallbackActivities, lastFetched]);

  // Initialize component and start data fetching
  useEffect(() => {
    // Set loading state
    setLoading(true);

    // Fetch data immediately
    fetchLiveData();

    // Clean up on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [fetchLiveData]);

  // Cycle through activities
  useEffect(() => {
    if (activities.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentActivityIndex((prev) => (prev + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activities.length]);

  // Get GitHub URL for event
  const getGitHubEventUrl = (activity: ContributorActivity): string => {
    const repoUrl = "https://github.com/recodehive/recode-website";

    switch (activity.action) {
      case "pushed":
        return `${repoUrl}/commits`;
      case "merged":
      case "opened":
      case "closed":
        return `${repoUrl}/pulls`;
      case "commented":
        return `${repoUrl}/issues`;
      case "created":
        return repoUrl;
      default:
        return repoUrl;
    }
  };

  // Get icon for action type
  const getActionIcon = (action: ContributorActivity["action"]): string => {
    switch (action) {
      case "pushed":
        return "🚀";
      case "created":
        return "✨";
      case "merged":
        return "🔄";
      case "opened":
        return "📝";
      case "commented":
        return "💬";
      case "closed":
        return "✅";
      default:
        return "💻";
    }
  };

  // Get text for action type
  const getActionText = (action: ContributorActivity["action"]): string => {
    switch (action) {
      case "pushed":
        return "PUSHED";
      case "created":
        return "CREATED";
      case "merged":
        return "MERGED";
      case "opened":
        return "OPENED";
      case "commented":
        return "COMMENTED";
      case "closed":
        return "CLOSED";
      default:
        return "ACTIVE";
    }
  };

  // Bots are filtered at fetch time; this also guards stale cached state.
  // Unrecognized event types ("other" → ACTIVE badge) are hidden from the feed.
  const visibleActivities = activities.filter(
    (activity) =>
      !isBotAccount(activity.contributor.login) && activity.action !== "other",
  );
  const visibleContributors = contributors.filter(
    (contributor) => !isBotAccount(contributor.login),
  );

  // Don't render anything while loading or if nothing is left to show
  if (visibleActivities.length === 0) {
    return null;
  }

  // Get current activity to display
  const currentActivity =
    visibleActivities[currentActivityIndex % visibleActivities.length];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`floating-contributors-container ${headerEmbedded ? "header-embedded" : ""}`}
          initial={{
            opacity: 0,
            y: headerEmbedded ? 0 : 50,
            scale: headerEmbedded ? 1 : 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: headerEmbedded ? 0 : 50,
            scale: headerEmbedded ? 1 : 0.9,
          }}
          transition={{
            duration: headerEmbedded ? 0.8 : 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Main floating card */}
          <motion.div
            className="floating-contributors-card"
            animate={
              headerEmbedded
                ? {}
                : {
                  y: [0, -8, 0],
                }
            }
            transition={
              headerEmbedded
                ? {}
                : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
            }
          >
            {/* Terminal-style titlebar */}
            <div className="floating-contributors-titlebar">
              <span className="fc-dot fc-dot--red" />
              <span className="fc-dot fc-dot--yellow" />
              <span className="fc-dot fc-dot--green" />
              <span className="floating-contributors-titlebar-label">
                ~/recodehive — live activity
              </span>
              <button
                className="floating-contributors-close"
                onClick={() => (onClose ? onClose() : setIsVisible(false))}
                aria-label="Close contributors showcase"
              >
                ×
              </button>
            </div>

            <div className="floating-contributors-body">
            {/* Command line header */}
            <div className="floating-contributors-cmdline">
              <span className="fc-prompt">$</span>{" "}
              <span className="fc-cmd">
                gh activity --repo recode-website --watch
              </span>
            </div>

            {/* Current activity */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivityIndex}
                className="floating-contributors-activity contributor-activity-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                onClick={() =>
                  window.open(getGitHubEventUrl(currentActivity), "_blank")
                }
                tabIndex={0}
                role="link"
                aria-label={`View ${currentActivity.contributor.login}'s ${currentActivity.action} activity on GitHub`}
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
                    <span
                      className="activity-username"
                      title={`@${currentActivity.contributor.login}`}
                    >
                      @{currentActivity.contributor.login}
                    </span>
                    <span className="activity-action-badge">
                      {getActionText(currentActivity.action)}
                    </span>
                  </div>
                  {currentActivity.message && (
                    <div
                      className="activity-message"
                      title={currentActivity.message}
                    >
                      {currentActivity.message}
                    </div>
                  )}
                  <div className="activity-time">{currentActivity.timeAgo}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Contributors grid */}
            <div className="floating-contributors-grid">
              <div className="contributors-grid-header">
                <span>Recent Contributors</span>
                <span className="contributors-count">
                  {visibleContributors.length}
                </span>
              </div>

              <div className="contributors-avatars">
                {[...visibleContributors]
                  .sort((a, b) => b.contributions - a.contributions) // Sort contributors by contributions in descending order
                  .slice(0, 5) // Limit to top 5 contributors
                  .map((contributor, index) => (
                    <motion.div
                      key={contributor.id}
                      className="contributor-avatar-wrapper"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      whileHover={{ scale: 1.1, zIndex: 5 }}
                    >
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${contributor.login}'s GitHub profile`}
                        className="contributor-link"
                      >
                        <img
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          className="contributor-avatar"
                        />
                        <div className="contributor-tooltip">
                          <div className="tooltip-username">
                            @{contributor.login}
                          </div>
                          <div className="tooltip-contributions">
                            {contributor.contributions || 0} contributions
                          </div>
                        </div>
                      </a>
                    </motion.div>
                  ))}

                {visibleContributors.length > 5 && (
                  <div className="contributors-more">
                    <span>+{visibleContributors.length - 5}</span>
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
                aria-label="View repository on GitHub and join the community"
              >
                <span className="cta-icon">🚀</span>
                <span>View Repositories on GitHub</span>
                <span className="cta-arrow">↗</span>
              </motion.a>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingContributors;
