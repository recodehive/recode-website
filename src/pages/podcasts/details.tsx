import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import './details.css';

interface PodcastData {
  id: string;
  spotifyUrl: string;
  type: 'episode' | 'show' | 'playlist';
}

interface LocationState {
  podcast: PodcastData;
}

interface SpotifyTitleProps {
  spotifyUrl: string;
  type: 'episode' | 'show' | 'playlist';
}

// Enhanced Spotify Title Component
const SpotifyTitle: React.FC<SpotifyTitleProps> = ({ spotifyUrl, type }) => {
  const [title, setTitle] = React.useState<string>('');
  const [artist, setArtist] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setTitle(data.title);
          // Extract artist/show info if available
          if (data.author_name) {
            setArtist(data.author_name);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTitle('');
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [spotifyUrl]);

  if (loading) {
    return (
      <div className="title-loading">
        <div className="loading-shimmer large"></div>
        <div className="loading-shimmer medium"></div>
        <div className="loading-shimmer small"></div>
      </div>
    );
  }

  return (
    <div className="enhanced-podcast-title">
      <div className="title-badge">
        <span className="badge-icon">
          {type === 'episode' ? '🎙️' : type === 'show' ? '📻' : '🎵'}
        </span>
        <span className="badge-text">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      </div>
      <h1 className="main-title">
        {title || `Featured ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      </h1>
      {artist && (
        <div className="artist-info">
          <span className="by-text">by</span>
          <span className="artist-name">{artist}</span>
        </div>
      )}
    </div>
  );
};

export default function PodcastDetails(): ReactElement {
  const location = useLocation();
  const history = useHistory();
  const state = location.state as LocationState;
  const podcast = state?.podcast;
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("podcast-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const isFavorited = podcast ? favorites.includes(podcast.id) : false;
  const toggleFavorite = () => {
    if (!podcast) return;
    setFavorites(prev => {
      const updated = prev.includes(podcast.id)
        ? prev.filter(id => id !== podcast.id)
        : [...prev, podcast.id];
      localStorage.setItem("podcast-favorites", JSON.stringify(updated));
      return updated;
    });
  };
  
  // Enhanced descriptions with categories
  const descriptions = {
    episode: [
      "Dive deep into fascinating conversations and thought-provoking content that challenges conventional thinking.",
      "Experience expert insights and engaging narratives that expand your understanding of the world.",
      "Join compelling discussions that bridge the gap between knowledge and practical wisdom.",
      "Explore unique perspectives from industry leaders and innovative thinkers.",
      "Uncover hidden stories and behind-the-scenes insights that mainstream media rarely covers."
    ],
    show: [
      "Discover a treasure trove of episodes covering diverse topics and groundbreaking ideas.",
      "Follow an incredible journey of storytelling that spans multiple fascinating episodes.",
      "Experience consistent quality content that keeps you coming back for more insights.",
      "Join a community of listeners who appreciate depth, authenticity, and expert curation.",
      "Explore a comprehensive collection of discussions that shape modern discourse."
    ],
    playlist: [
      "Enjoy a carefully curated selection of audio content designed for your listening pleasure.",
      "Experience the perfect blend of entertainment and education in one convenient collection.",
      "Discover diverse voices and perspectives assembled into a cohesive listening experience.",
      "Tune into a handpicked selection that showcases the best of podcast storytelling.",
      "Explore a thoughtfully arranged collection that takes you on an audio journey."
    ]
  };

  // Additional podcast features
  const features = [
    { icon: "🎯", label: "Expert Insights", description: "Learn from industry professionals" },
    { icon: "🌟", label: "Premium Quality", description: "High-quality audio production" },
    { icon: "📈", label: "Trending Content", description: "Stay ahead with latest topics" },
    { icon: "🎧", label: "Immersive Experience", description: "Engaging storytelling format" }
  ];

  const getRandomDescription = (type: 'episode' | 'show' | 'playlist') => {
    const typeDescriptions = descriptions[type];
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out this ${podcast.type}`,
          url: podcast.spotifyUrl
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(podcast.spotifyUrl);
      }
    } else {
      navigator.clipboard.writeText(podcast.spotifyUrl);
    }
  };

  if (!podcast) {
    return (
      <Layout>
        <div className="enhanced-details-container">
          <div className="error-state">
            <div className="error-icon">🔍</div>
            <h1 className="error-title">Podcast Not Found</h1>
            <p className="error-description">
              Sorry, we couldn't find the podcast you're looking for.
            </p>
            <button className="back-to-podcasts" onClick={() => history.push('/podcasts')}>
              <span className="button-icon">←</span>
              Back to Podcasts
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="enhanced-details-container">
        {/* Navigation Header */}
        <div className="details-navigation">
          <button className="nav-back-button" onClick={handleBack}>
            <span className="nav-icon">←</span>
            <span className="nav-text">Back to Podcasts</span>
          </button>
          <div className="nav-actions">
  <button
    className="nav-action-button"
    onClick={handleShare}
    title="Share"
  >
    <span className="action-icon">🔗</span>
  </button>
  <button
    className={`nav-action-button favorite ${isFavorited ? "favorited" : ""}`}
    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    onClick={e => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite();
    }}
  >
    <span className="action-icon">{isFavorited ? "❤️" : "🤍"}</span>
  </button>
</div>
        </div>

        {/* Main Content */}
        <div className="details-content">
          {/* Hero Section */}
          <div className="details-hero">
            <div className="hero-content">
              <SpotifyTitle spotifyUrl={podcast.spotifyUrl} type={podcast.type} />
              <p className="hero-description">
                {getRandomDescription(podcast.type)}
              </p>
              
              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-pill">
                  <span className="stat-icon">⏱️</span>
                  <span className="stat-text">Premium Content</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-icon">🎯</span>
                  <span className="stat-text">Expert Curated</span>
                </div>
                <div className="stat-pill">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-text">Trending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Embed Section */}
          <div className="enhanced-embed-section">
            <div className="embed-container">
              <div className="embed-header">
                <h2 className="embed-title">
                  <span className="title-icon">🎧</span>
                  Listen Now
                </h2>
                <div className="embed-controls">
                  <button className="control-button" title="Full screen">
                    <span className="control-icon">⛶</span>
                  </button>
                </div>
              </div>
              
              <div className="spotify-embed-wrapper">
                <iframe
                  src={`https://open.spotify.com/embed/${podcast.type}/${podcast.spotifyUrl.split('/').pop()?.split('?')[0]}`}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={`Spotify embed ${podcast.id}`}
                />
              </div>
              
              <div className="embed-footer">
                <div className="platform-info">
                  <span className="platform-badge">
                    <span className="spotify-icon">🎵</span>
                    Powered by Spotify
                  </span>
                </div>
                <div className="embed-actions">
                  <button className="embed-action" onClick={handleShare}>
                    <span className="action-icon">📤</span>
                    Share
                  </button>
                  <a 
                    href={podcast.spotifyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="embed-action external"
                  >
                    <span className="action-icon">🔗</span>
                    Open in Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h2 className="section-title">
              <span className="title-icon">✨</span>
              Why You'll Love This Content
            </h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.label}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Content Suggestions */}
          <div className="suggestions-section">
            <h2 className="section-title">
              <span className="title-icon">🚀</span>
              Explore More Content
            </h2>
            <div className="suggestions-content">
              <div className="suggestion-card primary">
                <div className="suggestion-icon">📻</div>
                <div className="suggestion-text">
                  <h3>Discover More Shows</h3>
                  <p>Explore our curated collection of premium podcasts</p>
                </div>
                <button 
                  className="suggestion-button"
                  onClick={() => history.push('/podcasts')}
                >
                  Browse All →
                </button>
              </div>
              
              <div className="suggestion-card secondary">
                <div className="suggestion-icon">🎯</div>
                <div className="suggestion-text">
                  <h3>Similar Content</h3>
                  <p>Find podcasts matching your interests</p>
                </div>
                <button 
                  className="suggestion-button"
                  onClick={() => history.push('/podcasts')}
                >
                  Discover →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
