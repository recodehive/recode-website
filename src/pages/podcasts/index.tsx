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

// Function to extract Spotify ID from URL
const getSpotifyEmbedId = (url: string): string => {
  const match = url.match(
    /(?:spotify\.com|open\.spotify\.com)\/(episode|show|playlist)\/([a-zA-Z0-9]+)/
  );
  return match ? match[2] : url;
};

// Function to determine content type from URL
const getSpotifyContentType = (
  url: string
): 'episode' | 'show' | 'playlist' => {
  const match = url.match(
    /(?:spotify\.com|open\.spotify\.com)\/(episode|show|playlist)/
  );
  return (match?.[1] as 'episode' | 'show' | 'playlist') || 'show';
};

// Add your podcasts here
const podcastUrls: string[] = [
  'https://open.spotify.com/show/6oPJ7ZBlN7y34yiSMguIda?si=729edf3b64a246d7',
  'https://open.spotify.com/episode/1zbmUPmGRjC8o8YIMMx2Z6?si=Q4QAS3IJQVGaQYhYApckdA',
  'https://open.spotify.com/episode/2twnTb39n5GH9DEhXzSIvi?si=e2d6e85ee7fe4095',
  'https://open.spotify.com/episode/3SyDohHTdX2wwaTLNmPTlY?si=5d70f6f7912049a1',
  'https://open.spotify.com/episode/20oNPNibv9YFK89wgYfAdK?si=36DZqf4gREC50jrDYOcGGg',
  'https://open.spotify.com/episode/5MY5KieAmUWzyKVBK9eFYi?si=caa85cca96c74233',
  'https://open.spotify.com/episode/3KSOxrjalScxHFQF9u8M46?si=KNpkP8b3TAy5MShtoISunw',
  'https://open.spotify.com/episode/04G9l6lJCBuQ1OdqsjeZz1?si=YEC9zSFiTiSJlbiMjsJMjg',
  'https://open.spotify.com/episode/2y9SeEILUFWI6rzl8okASZ?si=52faf8736f914f79',
  'https://open.spotify.com/episode/21yp6PDe1XN8B1goR5qMI3?si=k6JURkMRTQq2Ltbujq9qLw',
];

const podcastData: PodcastData[] = podcastUrls.map((url, index) => ({
  id: String(index + 1),
  spotifyUrl: url,
  type: getSpotifyContentType(url),
}));

interface SpotifyTitleProps {
  spotifyUrl: string;
  type: 'episode' | 'show' | 'playlist';
}

// Fetches the podcast/show/episode title from Spotify oEmbed API
const SpotifyTitle: React.FC<SpotifyTitleProps> = ({ spotifyUrl, type }) => {
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    let cancelled = false;
    fetch(
      `https://open.spotify.com/oembed?url=${encodeURIComponent(spotifyUrl)}`
    )
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setTitle(data.title);
      })
      .catch(() => {
        if (!cancelled) setTitle('');
      });
    return () => {
      cancelled = true;
    };
  }, [spotifyUrl]);
  return (
    <div className="spotify-title">
      <strong>{title || type.charAt(0).toUpperCase() + type.slice(1)}</strong>
    </div>
  );
};

export default function Podcasts(): ReactElement {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 9; // Pagination size

  // Calculate podcasts for current page
  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = podcastData.slice(
    indexOfFirstPodcast,
    indexOfLastPodcast
  );
  const totalPages = Math.ceil(podcastData.length / podcastsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePodcastClick = (
    podcast: PodcastData,
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IFRAME' || target.className === 'podcast-embed') {
      return;
    }
    history.push('/podcasts/details', { podcast });
  };

  return (
    <Layout>
      <div className="podcast-container">
        <h1>Discover Top Podcasts</h1>
        <p className="podcast-subtitle">
          Stream the best podcasts from your favorite stations
        </p>
        <div className="podcast-grid">
          {currentPodcasts.map(podcast => (
            <div
              key={podcast.id}
              className="podcast-card"
              onClick={e => handlePodcastClick(podcast, e)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePodcastClick(podcast, e);
                }
              }}
            >
              <div className="podcast-content">
                <div className="podcast-info">
                  <SpotifyTitle
                    spotifyUrl={podcast.spotifyUrl}
                    type={podcast.type}
                  />
                </div>
                <div
                  className="podcast-embed"
                  onClick={e => e.stopPropagation()}
                >
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
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              className={`pagination-button ${currentPage === number ? 'active' : ''}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
