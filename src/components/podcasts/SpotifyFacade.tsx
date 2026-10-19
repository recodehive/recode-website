import React from 'react';
import styles from '../../pages/podcasts/styles.module.css';
import type { SpotifyKind } from '../../data/podcasts';

type PlayButtonProps = {
  title: string;
  playing: boolean;
  onToggle: () => void;
  size?: 'lg' | 'md';
};

/** Round play/pause control. It never loads anything from Spotify itself. */
export function PlayButton({ title, playing, onToggle, size = 'md' }: PlayButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.playBtn} ${size === 'lg' ? styles.playLg : styles.playMd} ${playing ? styles.playOn : ''}`}
      aria-label={playing ? `Close player for ${title}` : `Play ${title}`}
      aria-pressed={playing}
      onClick={onToggle}
    >
      {playing ? (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" />
        </svg>
      )}
    </button>
  );
}

type SpotifyFacadeProps = {
  spotifyId: string;
  title: string;
  kind?: SpotifyKind;
  open: boolean;
};

/**
 * Click-to-load player area. Nothing from open.spotify.com loads until `open` is true,
 * and the iframe is removed again when it turns false.
 */
export default function SpotifyFacade({ spotifyId, title, kind = 'episode', open }: SpotifyFacadeProps) {
  if (!open) return null;
  return (
    <div className={styles.player}>
      <iframe
        src={`https://open.spotify.com/embed/${kind}/${spotifyId}?utm_source=generator`}
        width="100%"
        height="152"
        style={{ border: 0, borderRadius: 12 }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`${title} on Spotify`}
      />
    </div>
  );
}
