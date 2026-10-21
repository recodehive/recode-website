import React, { useMemo, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import {
  CHANNEL_URL,
  LIVE_SESSIONS,
  TOPICS,
  VIDEOS,
  embedUrl,
  thumbnail,
  type Topic,
} from '../../data/broadcasts';
import styles from './broadcasts.module.css';

type Item = {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  publishedAt?: string;
  label: string; // topic, or "Past live"
  topic?: Topic;
  lessonUrl?: string;
  live: boolean;
};

const PAGE = 9;
const TOPIC_CLASS: Record<Topic, string> = {
  'GitHub basics': styles.tBasics,
  Achievements: styles.tAchievements,
  'Open source': styles.tOpen,
  'Tools and AI': styles.tTools,
};

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase() : '';

function Thumb({ youtubeId, className }: { youtubeId: string; className?: string }) {
  return <img className={className} src={thumbnail(youtubeId)} alt="" width={480} height={270} loading="lazy" />;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <rect x="1" y="5" width="22" height="14" rx="4" fill="#ef4444" />
      <path d="M10 9l5 3-5 3z" fill="#fff" />
    </svg>
  );
}

export default function BroadcastsView() {
  const feed = usePluginData('broadcasts-feed') as { dates?: Record<string, string> } | undefined;
  const dates = feed?.dates ?? {};

  const videos: Item[] = useMemo(
    () =>
      VIDEOS.map((v) => ({
        id: v.id,
        youtubeId: v.youtubeId,
        title: v.title,
        description: v.description,
        publishedAt: v.publishedAt ?? dates[v.youtubeId],
        label: v.topic,
        topic: v.topic,
        lessonUrl: v.lessonUrl,
        live: false,
      })),
    [dates],
  );
  const lives: Item[] = useMemo(
    () =>
      LIVE_SESSIONS.map((s) => ({
        id: s.id,
        youtubeId: s.youtubeId,
        title: s.title,
        description: s.description,
        publishedAt: s.publishedAt ?? dates[s.youtubeId],
        label: 'Past live',
        live: true,
      })),
    [dates],
  );

  // Newest by publish date when every video has one, otherwise the first in the list.
  const defaultId = useMemo(() => {
    if (videos.every((v) => v.publishedAt)) {
      return [...videos].sort((a, b) => +new Date(b.publishedAt!) - +new Date(a.publishedAt!))[0].id;
    }
    return videos[0].id;
  }, [videos]);

  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [tab, setTab] = useState<'videos' | 'live'>('videos');
  const [topic, setTopic] = useState<Topic | 'all'>('all');
  const [shown, setShown] = useState(PAGE);
  const playerRef = useRef<HTMLDivElement>(null);

  const all = [...videos, ...lives];
  const featured = all.find((i) => i.id === (featuredId ?? defaultId)) ?? videos[0];

  const upNext = useMemo(() => {
    const list = videos;
    const idx = list.findIndex((v) => v.id === featured.id);
    const ordered = idx === -1 ? list : [...list.slice(idx + 1), ...list.slice(0, idx)];
    return ordered.slice(0, 4);
  }, [featured, videos]);

  const select = (id: string) => {
    setFeaturedId(id);
    setPlaying(false);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    playerRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  };

  const counts = useMemo(() => {
    const m = new Map<Topic, number>();
    for (const v of videos) if (v.topic) m.set(v.topic, (m.get(v.topic) ?? 0) + 1);
    return m;
  }, [videos]);

  const visibleVideos = videos.filter((v) => topic === 'all' || v.topic === topic);
  const series = VIDEOS.filter((v) => v.seriesOrder).sort((a, b) => a.seriesOrder! - b.seriesOrder!);

  const renderCard = (item: Item) => {
    const isFeatured = item.id === featured.id;
    return (
      <article key={item.id} className={styles.card}>
        <button type="button" className={styles.cardBtn} onClick={() => select(item.id)} aria-label={`Play ${item.title} in the featured player`}>
          <span className={styles.thumbWrap}>
            <Thumb youtubeId={item.youtubeId} className={styles.thumbImg} />
            <span className={styles.overlay} aria-hidden="true"><span className={styles.overlayPlay}><PlayIcon /></span></span>
            {isFeatured && <span className={styles.nowTag}>NOW SHOWING</span>}
            {item.live && <span className={styles.liveTag}>LIVE{item.publishedAt ? ` · ${fmtDate(item.publishedAt)}` : ''}</span>}
          </span>
          <span className={styles.cardMeta}>
            {item.topic ? (
              <span className={`${styles.pill} ${TOPIC_CLASS[item.topic]}`}>{item.label}</span>
            ) : (
              <span className={`${styles.pill} ${styles.tLive}`}>{item.label}</span>
            )}
          </span>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardDesc}>{item.description}</p>
        </button>
        {item.lessonUrl && (
          <Link className={styles.lessonLink} to={item.lessonUrl}>
            Lesson notes {'→'}
          </Link>
        )}
      </article>
    );
  };

  return (
    <div className={styles.root}>
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroText}>
        <div className={styles.heroTitleBlock}>
          <p className={styles.eyebrow}>{'✦'} BROADCASTS</p>
          <h1 className={styles.h1}>Watch it, then <span className={styles.accent}>ship it</span></h1>
        </div>
      <p className={styles.lede}>
    Short GitHub tutorials and past live sessions from the recode hive channel. Every video ends with something you can do on a real repo today.
  </p>
</div>
        <div className={styles.heroActions}>
          <Link className={styles.btnOutline} to="/learn">Free courses {'→'}</Link>
          <a className={styles.btnDark} href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon /> Subscribe on YouTube<span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </div>
      </header>

      <section className={styles.featured} aria-label="Featured video">
        <div className={styles.player} ref={playerRef}>
          {playing ? (
            <iframe
              className={styles.iframe}
              src={`${embedUrl(featured.youtubeId)}?autoplay=1&rel=0`}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img key={featured.id} className={styles.playerImg} src={thumbnail(featured.youtubeId)} alt="" width={480} height={270} />
              <div className={styles.playerShade} aria-hidden="true" />
              <div className={styles.playerInfo}>
                <p className={styles.nowShowing}>
                  NOW SHOWING {'·'} {featured.label}
                </p>
                <h2 className={styles.playerTitle}>{featured.title}</h2>
              </div>
              <button type="button" className={styles.bigPlay} onClick={() => setPlaying(true)} aria-label={`Play ${featured.title}`}>
                <span className={styles.bigPlayInner}><PlayIcon /></span>
              </button>
              <span className={styles.onClick}>loads on click</span>
            </>
          )}
        </div>

        <aside className={styles.upNext} aria-label="Up next">
          <h2 className={styles.h3}>Up next</h2>
          <ul className={styles.upList}>
            {upNext.map((v) => (
              <li key={v.id}>
                <button type="button" className={styles.upItem} onClick={() => select(v.id)} aria-label={`Play ${v.title} in the featured player`}>
                  <Thumb youtubeId={v.youtubeId} className={styles.upThumb} />
                  <span className={styles.upText}>
                    <span className={styles.upTitle}>{v.title}</span>
                    <span className={styles.upTopic}>{v.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.library} aria-label="Video library">
        <div className={styles.libHead}>
          <h2 className={styles.h2}>Video library</h2>
          <div className={styles.segmented} role="tablist" aria-label="Library view">
            <button type="button" role="tab" aria-selected={tab === 'videos'} className={`${styles.segment} ${tab === 'videos' ? styles.segmentOn : ''}`} onClick={() => setTab('videos')}>
              {'▶'} Videos
            </button>
            <button type="button" role="tab" aria-selected={tab === 'live'} className={`${styles.segment} ${tab === 'live' ? styles.segmentOn : ''}`} onClick={() => setTab('live')}>
              <span className={styles.redDot} aria-hidden="true" /> Past live
            </button>
          </div>
        </div>

        {tab === 'videos' && (
          <>
            <div className={styles.chips} role="group" aria-label="Filter by topic">
              <button type="button" aria-pressed={topic === 'all'} className={`${styles.chip} ${topic === 'all' ? styles.chipOn : ''}`} onClick={() => { setTopic('all'); setShown(PAGE); }}>
                All <span className={styles.chipCount}>{videos.length}</span>
              </button>
              {TOPICS.filter((t) => counts.get(t)).map((t) => (
                <button key={t} type="button" aria-pressed={topic === t} className={`${styles.chip} ${topic === t ? styles.chipOn : ''}`} onClick={() => { setTopic(t); setShown(PAGE); }}>
                  {t} <span className={styles.chipCount}>{counts.get(t)}</span>
                </button>
              ))}
            </div>
            <div className={styles.grid}>
              {visibleVideos.slice(0, shown).map((v) => renderCard(v))}
            </div>
            {visibleVideos.length > shown && (
              <div className={styles.more}>
                <button type="button" className={styles.btnOutline} onClick={() => setShown((n) => n + PAGE)}>Load more videos</button>
              </div>
            )}
          </>
        )}

        {tab === 'live' && (
          lives.length > 0 ? (
            <div className={styles.grid}>{lives.map((v) => renderCard(v))}</div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>Past live sessions.</p>
              <p>Recordings of our live sessions are added here.</p>
              <a className={styles.btnOutline} href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube {'↗'}<span className={styles.srOnly}> (opens in a new tab)</span></a>
            </div>
          )
        )}
      </section>

      {series.length > 0 && (
        <section className={styles.series} aria-label="Achievements series">
          <div className={styles.seriesHead}>
            <div>
              <p className={styles.seriesEyebrow}>{'✦'} SERIES</p>
              <h2 className={styles.seriesTitle}>Unlock every GitHub achievement</h2>
              <p className={styles.seriesText}>Six short videos, watched in order. Pairs with the badges guide.</p>
            </div>
            <Link className={styles.btnWhite} to="/badges/github-badges/">Open the badges guide {'→'}</Link>
          </div>
          <ol className={styles.seriesGrid}>
            {series.map((v) => (
              <li key={v.id}>
                <button type="button" className={styles.seriesItem} onClick={() => select(v.id)} aria-label={`Play ${v.title} in the featured player`}>
                  <span className={styles.seriesThumb}>
                    <Thumb youtubeId={v.youtubeId} className={styles.thumbImg} />
                    <span className={styles.seriesNum} aria-hidden="true">{v.seriesOrder}</span>
                  </span>
                  <span className={styles.seriesName}>{v.shortName}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className={styles.subscribe}>
        <div>
          <p className={styles.subEyebrow}>{'✦'} NEVER MISS ONE</p>
          <h2 className={styles.subTitle}>New tutorials and live sessions on YouTube.</h2>
          <p className={styles.subText}>Watch, then turn what you learned into your first recode hive PR.</p>
        </div>
        <a className={styles.btnWhite} href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          Subscribe {'↗'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </section>
    </div>
    </div>
  );
}
