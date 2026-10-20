import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import SpotifyFacade, { PlayButton } from '../../components/podcasts/SpotifyFacade';
import { show, ownEpisodes, picks, type Pick, type Topic } from '../../data/podcasts';
import styles from './styles.module.css';

const COVER_PATH = '/img/podcast/comeback-code-cover.webp';
const CONTACT_URL = '/contact-us';
const TOPICS: Topic[] = ['AI & Tech', 'Communication', 'Science'];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Equaliser() {
  return (
    <span className={styles.eq} aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={styles.eqBar} style={{ animationDelay: `${i * 0.12}s` }} />
      ))}
    </span>
  );
}

/** Cover art with a built-in fallback for when the image file is missing. */
function Cover({ compact = false }: { compact?: boolean }) {
  const src = useBaseUrl(COVER_PATH);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The error event can fire before hydration, so also check the image after mount
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className={`${styles.coverFallback} ${compact ? styles.coverFallbackSm : ''}`} role="img" aria-label="The Comeback Code podcast cover art">
        {!compact && <span className={styles.coverLabel}>recodehive · podcast</span>}
        <Equaliser />
        <span className={styles.coverTitle}>
          The Comeback <span className={styles.coverCode}>Code</span>
        </span>
      </div>
    );
  }
  return (
    <img
      ref={imgRef}
      className={compact ? styles.coverSm : styles.coverImg}
      src={src}
      alt="The Comeback Code podcast cover art"
      width={compact ? 132 : 400}
      height={compact ? 132 : 400}
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}

function PickCard({ p, playingId, toggle }: { p: Pick; playingId: string | null; toggle: (id: string) => void }) {
  const open = playingId === p.id;
  return (
    <article className={`${styles.card} ${styles.pick}`}>
      <div className={styles.pickTop}>
        <span className={`${styles.tile} ${styles[`tile_${p.color}`]}`} aria-hidden="true">{p.initials}</span>
        <div className={styles.pickWho}>
          <span className={styles.pickShow}>{p.show}</span>
          <span className={styles.mono}>{p.meta}</span>
        </div>
        <PlayButton title={p.title} playing={open} onToggle={() => toggle(p.id)} />
      </div>
      <span className={styles.topicTag}>{p.topic}</span>
      <h3 className={styles.pickTitle}>{p.title}</h3>
      {p.why && (
        <div className={styles.why}>
          <span className={styles.whyLabel}>WHY LISTEN</span>
          <p className={styles.whyText}>{p.why}</p>
        </div>
      )}
      <SpotifyFacade spotifyId={p.spotifyId} title={p.title} open={open} />
    </article>
  );
}

export default function Podcasts(): ReactNode {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [topic, setTopic] = useState<'all' | Topic>('all');
  const ogImage = useBaseUrl(COVER_PATH, { absolute: true });

  const toggle = (id: string) => setPlayingId((cur) => (cur === id ? null : id));

  const latest = ownEpisodes[0];
  const playLatest = () => {
    if (!latest) return;
    setPlayingId(latest.id);
    document.getElementById(`episode-${latest.id}`)?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  const availableTopics = TOPICS.filter((t) => picks.some((p) => p.topic === t));
  const visiblePicks = picks.filter((p) => topic === 'all' || p.topic === topic);

  const { spotify, youtube, apple } = show.links;
  const hasLinks = Boolean(spotify || youtube || apple);
  const n = ownEpisodes.length;

  return (
    <Layout
      title="Podcasts"
      description="The Comeback Code by recodehive: episodes on careers, comebacks and building in tech, plus community-recommended episodes with notes on why they are worth your time."
    >
      <Head>
        <meta property="og:image" content={ogImage} />
      </Head>
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="podcasts-heading">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <div className={styles.heroText}>
              <p className={styles.eyebrow}>✦ PODCASTS</p>
              <h1 id="podcasts-heading" className={styles.h1}>
                Listen and learn<br />
                with <span className={styles.accent}>the hive</span>
              </h1>
              <p className={styles.lead}>
                Our own show about careers, comebacks and building in tech, plus a short list of episodes our community actually recommends, with notes on why.
              </p>
              <div className={styles.actions}>
                {latest && (
                  <button type="button" className={styles.btnPrimary} onClick={playLatest}>
                    Play latest episode
                  </button>
                )}
                {hasLinks && (
                  <a className={styles.btnOutline} href="#subscribe">
                    Follow the show
                  </a>
                )}
              </div>
            </div>
            <div className={styles.heroCard}>
              <Cover />
            </div>
          </div>
        </section>

        {/* Our show */}
        <section id="our-show" className={`${styles.container} ${styles.section}`} aria-labelledby="our-show-heading">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>✦ OUR SHOW</p>
              <h2 id="our-show-heading" className={styles.h2}>{show.name}</h2>
              {show.description && <p className={styles.sub}>{show.description}</p>}
            </div>
            <span className={styles.counter}>{n} {n === 1 ? 'episode' : 'episodes'}</span>
          </div>

          <div className={styles.list}>
            {ownEpisodes.map((ep) => {
              const open = playingId === ep.id;
              return (
                <article key={ep.id} id={`episode-${ep.id}`} className={`${styles.card} ${styles.episode}`}>
                  <div className={styles.epCover}>
                    <Cover compact />
                    <span className={styles.epBadge}>EP {ep.number}</span>
                  </div>
                  <div className={styles.epBody}>
                    <div className={styles.epMeta}>
                      <span className={styles.ownTag}>OUR SHOW</span>
                      <span className={styles.mono}>{ep.date} · {ep.duration}</span>
                    </div>
                    <h3 className={styles.epTitle}>{ep.title}</h3>
                    {ep.summary && <p className={styles.epSummary}>{ep.summary}</p>}
                    <SpotifyFacade spotifyId={ep.spotifyId} kind={ep.spotifyKind} title={ep.title} open={open} />
                  </div>
                  <div className={styles.epSide}>
                    <PlayButton title={ep.title} playing={open} onToggle={() => toggle(ep.id)} size="lg" />
                    {ep.notesUrl && (
                      <a className={styles.notes} href={ep.notesUrl} target="_blank" rel="noopener noreferrer">
                        Show notes →
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.pitch}>
            <p className={styles.pitchText}>New episodes land here first. Want to be a guest or suggest a topic?</p>
            <Link className={styles.btnOutline} to={CONTACT_URL}>Pitch an episode</Link>
          </div>
        </section>

        {/* Community picks */}
        <section id="picks" className={`${styles.container} ${styles.section}`} aria-labelledby="picks-heading">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>✦ COMMUNITY PICKS</p>
              <h2 id="picks-heading" className={styles.h2}>Worth your commute</h2>
              <p className={styles.sub}>
                Episodes from other shows that our members recommend, each with a note on what you will take away.
              </p>
            </div>
            <div role="group" aria-label="Topic" className={styles.chips}>
              <button type="button" aria-pressed={topic === 'all'} className={`${styles.chip} ${topic === 'all' ? styles.chipOn : ''}`} onClick={() => setTopic('all')}>
                All
              </button>
              {availableTopics.map((t) => (
                <button key={t} type="button" aria-pressed={topic === t} className={`${styles.chip} ${topic === t ? styles.chipOn : ''}`} onClick={() => setTopic(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {visiblePicks.map((p) => (
              <PickCard key={p.id} p={p} playingId={playingId} toggle={toggle} />
            ))}
          </div>
        </section>

        {/* Subscribe */}
        {hasLinks && (
          <section id="subscribe" className={`${styles.container} ${styles.section}`} aria-labelledby="subscribe-heading">
            <div className={styles.band}>
              <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>✦ NEVER MISS AN EPISODE</p>
              <h2 id="subscribe-heading" className={styles.bandTitle}>Follow {show.name}</h2>
              <p className={styles.bandText}>
                Pick your app.{show.frequency ? ` New episodes every ${show.frequency}.` : ''}
              </p>
              <div className={styles.actions}>
                {spotify && <a className={styles.btnLight} href={spotify} target="_blank" rel="noopener noreferrer">Spotify <span aria-hidden="true">↗</span></a>}
                {youtube && <a className={styles.btnLight} href={youtube} target="_blank" rel="noopener noreferrer">YouTube <span aria-hidden="true">↗</span></a>}
                {apple && <a className={styles.btnLight} href={apple} target="_blank" rel="noopener noreferrer">Apple Podcasts <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
