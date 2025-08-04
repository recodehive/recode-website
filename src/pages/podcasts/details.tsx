import React from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useLocation } from '@docusaurus/router';
import './index.css';

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

export default function PodcastDetails(): ReactElement {
  const location = useLocation();
  const state = location.state as LocationState;
  const podcast = state?.podcast;

  // Random descriptive text about podcasts
  const descriptions = [
    'Dive deep into fascinating conversations and thought-provoking content.',
    'Experience the power of audio storytelling at its finest.',
    'Join us on a journey of discovery through captivating discussions.',
    'Explore new perspectives and expand your horizons.',
    'Listen to expert insights and engaging narratives.',
    'Uncover the stories behind the stories.',
    'Get inspired by the voices that shape our world.',
    'Tune in to the latest trends and timeless tales.',
    'Discover the art of conversation and the beauty of sound.',
  ];

  // Get a random description
  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  if (!podcast) {
    return (
      <Layout>
        <div className="podcast-container">
          <h1>Podcast Not Found</h1>
          <p>Sorry, we couldn't find the podcast you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="podcast-container">
        <div className="podcast-card details-card">
          <div className="podcast-content">
            <div className="podcast-info">
              <SpotifyTitle
                spotifyUrl={podcast.spotifyUrl}
                type={podcast.type}
              />
            </div>
            <div className="podcast-description">
              <p>{randomDescription}</p>
            </div>
            <div className="podcast-embed-large">
              <iframe
                src={`https://open.spotify.com/embed/${podcast.type}/${podcast.spotifyUrl.split('/').pop()?.split('?')[0]}`}
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
      </div>
    </Layout>
  );
}
