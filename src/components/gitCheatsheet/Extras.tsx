import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight, Play } from 'lucide-react';
import { useLessonPosition } from '../githubLesson/hooks';
import s from './GitCheatsheet.module.css';

const VIDEO = {
  id: 'jE8nqWSbUQs',
  list: 'PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63',
  title: 'Understanding the GitHub Flow',
  card: 'Git commands explained',
  channel: 'recode hive on YouTube',
};

/** A thumbnail with a play button. The YouTube iframe only loads after a click. */
export function LiteVideo() {
  const [on, setOn] = useState(false);
  return (
    <div className={s.video}>
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?list=${VIDEO.list}&autoplay=1`}
          title={VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className={s.videoBtn} onClick={() => setOn(true)} aria-label={`Play video: ${VIDEO.title}`}>
          <img src={`https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className={s.videoShade} />
          <span className={s.playBtn} aria-hidden="true"><Play size={24} fill="currentColor" /></span>
          <span className={s.videoCap}><strong>{VIDEO.card}</strong><small>{VIDEO.channel}</small></span>
        </button>
      )}
    </div>
  );
}

/** The next page in the sidebar, read from the sidebar itself. */
export function UpNext() {
  const { next } = useLessonPosition();
  if (!next) return null;
  return (
    <Link className={s.upNext} to={next.href}>
      <span><small>UP NEXT</small><strong>{next.label}</strong></span>
      <ArrowRight size={22} aria-hidden="true" />
    </Link>
  );
}
