import React, { useEffect, useState } from 'react';
import styles from './learn.module.css';

type Props = { youtubeId: string; title: string; duration?: string };

/**
 * Click to load YouTube player. Nothing from youtube.com or youtube-nocookie.com
 * is requested until the visitor presses play. The thumbnail comes from i.ytimg.com.
 */
export default function VideoFacade({ youtubeId, title, duration }: Props) {
  const [playing, setPlaying] = useState(false);

  // Switching lessons shows the facade again
  useEffect(() => setPlaying(false), [youtubeId]);

  if (playing) {
    return (
      <div className={styles.video}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={`${title} video`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.video}>
      <img className={styles.thumb} src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
      <span className={styles.videoShade} aria-hidden="true" />
      <button type="button" className={styles.play} onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" focusable="false">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z" />
        </svg>
      </button>
      {duration && <span className={styles.duration}>{duration}</span>}
    </div>
  );
}
