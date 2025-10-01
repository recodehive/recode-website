import React, { useState } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useHistory } from '@docusaurus/router';
import './index.css';

interface PodcastData {
  id: string;
  spotifyUrl: string;
  type: 'episode' | 'show' | 'playlist';
}

const getSpotifyEmbedId = (url: string): string => {
  const match = url.match(/(?:spotify\.com|open\.spotify\.com)\/(episode|show|playlist)\/([a-zA-Z0-9]+)/);
  return match ? match[2] : url;
};

const getSpotifyContentType = (url: string): 'episode' | 'show' | 'playlist' => {
  const match = url.match(/(?:spotify\.com|open\.spotify\.com)\/(episode|show|playlist)/);
  return (match?.[1] as 'episode' | 'show' | 'playlist') || 'show';
};

const podcastUrls: string[] = [
  "https://open.spotify.com/show/6oPJ7ZBlN7y34yiSMguIda?si=729edf3b64a246d7",
  "https://open.spotify.com/episode/1zbmUPmGRjC8o8YIMMx2Z6?si=Q4QAS3IJQVGaQYhYApckdA",
  "https://open.spotify.com/episode/2twnTb39n5GH9DEhXzSIvi?si=e2d6e85ee7fe4095",
  "https://open.spotify.com/episode/3SyDohHTdX2wwaTLNmPTlY?si=5d70f6f7912049a1",
  "https://open.spotify.com/episode/20oNPNibv9YFK89wgYfAdK?si=36DZqf4gREC50jrDYOcGGg",
  "https://open.spotify.com/episode/5MY5KieAmUWzyKVBK9eFYi?si=caa85cca96c74233",
  "https://open.spotify.com/episode/3KSOxrjalScxHFQF9u8M46?si=KNpkP8b3TAy5MShtoISunw",
  "https://open.spotify.com/episode/04G9l6lJCBuQ1OdqsjeZz1?si=YEC9zSFiTiSJlbiMjsJMjg",
  "https://open.spotify.com/episode/2y9SeEILUFWI6rzl8okASZ?si=52faf8736f914f79",
  "https://open.spotify.com/episode/21yp6PDe1XN8B1goR5qMI3?si=k6JURkMRTQq2Ltbujq9qLw",
];

const podcastData: PodcastData[] = podcastUrls.map((url, index) => ({
  id: String(index + 1),
  spotifyUrl: url,
  type: getSpotifyContentType(url)
}));

const SpotifyTitle: React.FC<{spotifyUrl: string; type: 'episode' | 'show' | 'playlist'}> = ({ spotifyUrl, type }) => {
  const [title, setTitle] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setTitle(data.title);
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

  return (
    <div className="podcast-title">
      {loading ? (
        <div className="title-skeleton">
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
      ) : (
        <>
          <div className="podcast-type-badge">
            <span className="type-icon">{type === 'episode' ? '🎙️' : type === 'show' ? '📻' : '🎵'}</span>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          <h3 className="podcast-title-text">{title || `${type.charAt(0).toUpperCase() + type.slice(1)} #${Math.floor(Math.random() * 100) + 1}`}</h3>
        </>
      )}
    </div>
  );
};

export default function Podcasts(): ReactElement {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'episode' | 'show' | 'playlist'>('all');
  const podcastsPerPage = 9;

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoritePodcasts');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (podcastId: string) => {
    setFavorites(prev => {
      const updated = prev.includes(podcastId)
        ? prev.filter(id => id !== podcastId)
        : [...prev, podcastId];
      localStorage.setItem('favoritePodcasts', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredPodcasts = podcastData.filter(podcast => selectedFilter === 'all' || podcast.type === selectedFilter);
  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = filteredPodcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);
  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleShare = async (podcast: PodcastData) => {
    if (navigator.share) {
      try {
        await navigator.share({title: `Check out this ${podcast.type}`, url: podcast.spotifyUrl});
      } catch {
        navigator.clipboard.writeText(podcast.spotifyUrl);
      }
    } else {
      navigator.clipboard.writeText(podcast.spotifyUrl);
    }
  };

  const handlePodcastClick = (podcast: PodcastData, event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IFRAME' || target.closest('.podcast-embed') || target.closest('.action-btn')) {
      return;
    }
    history.push('/podcasts/details', {podcast});
  };

  React.useEffect(() => setCurrentPage(1), [searchTerm, selectedFilter]);

  return (
    <Layout>
      <div className="enhanced-podcast-container">
        <div className="podcast-hero">
          <div className="podcast-hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🎙️</span>
              <span className="badge-text">Premium Audio Content</span>
            </div>
            <h1 className="podcast-hero-title">Discover Top Podcasts</h1>
            <p className="podcast-hero-description">
              Stream the best podcasts from your favorite stations. Dive into episodes that inspire, educate, and entertain from leading voices in tech, business, and beyond.
            </p>
            <div className="podcast-stats">
              <div className="stat-item">
                <div className="stat-number">{podcastData.length}+</div>
                <div className="stat-label">Episodes</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Hours</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Shows</div>
              </div>
            </div>
          </div>
        </div>

        <div className="podcast-filters">
          <div className="filter-search">
            <div className="search-icon"></div>
            <input type="text" placeholder="Search podcasts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
          </div>
          <div className="filter-tabs">
            <button className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`} onClick={() => setSelectedFilter('all')}>
              <span className="tab-icon">📊</span>All ({podcastData.length})
            </button>
            <button className={`filter-tab ${selectedFilter === 'episode' ? 'active' : ''}`} onClick={() => setSelectedFilter('episode')}>
              <span className="tab-icon">🎙️</span>Episodes ({podcastData.filter(p => p.type === 'episode').length})
            </button>
            <button className={`filter-tab ${selectedFilter === 'show' ? 'active' : ''}`} onClick={() => setSelectedFilter('show')}>
              <span className="tab-icon">📻</span>Shows ({podcastData.filter(p => p.type === 'show').length})
            </button>
            <button className={`filter-tab ${selectedFilter === 'playlist' ? 'active' : ''}`} onClick={() => setSelectedFilter('playlist')}>
              <span className="tab-icon">🎵</span>Playlists ({podcastData.filter(p => p.type === 'playlist').length})
            </button>
          </div>
        </div>

        <div className="podcast-content-section">
          {currentPodcasts.length > 0 ? (
            <>
              <div className="podcast-grid">
                {currentPodcasts.map((podcast, idx) => (
                  <div
                    key={podcast.id}
                    className="enhanced-podcast-card"
                    onClick={e => handlePodcastClick(podcast, e)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') handlePodcastClick(podcast, e);
                    }}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="podcast-card-header">
                      <SpotifyTitle spotifyUrl={podcast.spotifyUrl} type={podcast.type} />
                      <div className="card-actions">
                        <button
                          className={`action-btn favorite${favorites.includes(podcast.id) ? ' favorited' : ''}`}
                          title="Add to favorites"
                          onClick={e => {
                            e.stopPropagation();
                            toggleFavorite(podcast.id);
                          }}
                        >
                          {favorites.includes(podcast.id) ? '❤️' : '🤍'}
                        </button>
                        <button
                          className="action-btn share"
                          title="Share podcast"
                          onClick={e => {
                            e.stopPropagation();
                            handleShare(podcast);
                          }}
                        >
                          🔗
                        </button>
                      </div>
                    </div>

                    <div className="podcast-embed" onClick={e => e.stopPropagation()}>
                      <iframe
                        src={`https://open.spotify.com/embed/${podcast.type}/${getSpotifyEmbedId(podcast.spotifyUrl)}`}
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Spotify embed ${podcast.id}`}
                      />
                    </div>

                    <div className="podcast-card-footer">
                      <button className="listen-button">
                        <span className="listen-icon">▶️</span>Listen Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="enhanced-pagination">
                  <button className="pagination-nav" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                    ← Previous
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button key={number} className={`pagination-number ${currentPage === number ? 'active' : ''}`} onClick={() => handlePageChange(number)}>
                        {number}
                      </button>
                    ))}
                  </div>

                  <button className="pagination-nav" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No podcasts found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
