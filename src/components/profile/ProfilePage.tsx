import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { useUser } from '@clerk/react';
import { ArrowUpRight, Briefcase, Building2, Clock, Download, Github, Globe, Linkedin, MapPin, Share2 } from 'lucide-react';
import { BADGES, type Badge } from '../../data/badges';
import { getClosestLocked, getProgress, getRarestEarned, isUnlocked, type BadgeStats } from '../../utils/badges';
import type { ProfileSite } from '../../lib/profile/types';
import { computeStreak } from '../../lib/profile/streak';
import BadgeImage from '../leaderboard/BadgeImage';
import Cover from './Cover';
import HireCard from './HireCard';
import ShareCard from './ShareCard';
import { useGithubProfile } from './useGithubProfile';
import styles from './profile.module.css';

const SITE = 'https://www.recodehive.com';
const REPO_ISSUES = 'https://github.com/recodehive/recode-website/issues/new';
const DISCORD = 'https://discord.gg/dh3TA8U55Q';
const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/;

const XMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/** Only https links are used, and always with rel="noopener nofollow ugc". */
function safeHref(url: string | null | undefined): string | null {
  if (!url) return null;
  const withScheme = /^[a-z]+:\/\//i.test(url) ? url : `https://${url}`;
  return /^https:\/\//i.test(withScheme) ? withScheme : null;
}

function rarityLabel(r: number): string {
  if (r <= 2) return 'COMMON';
  if (r <= 4) return 'UNCOMMON';
  if (r <= 6) return 'RARE';
  if (r <= 10) return 'EPIC';
  return 'LEGENDARY';
}

const dateFmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function tierVars(b: Badge, i: number): React.CSSProperties {
  return { '--c': b.tier.light, '--d': b.tier.dark, '--g': b.tier.rgb, '--dl': `${(i * 0.35).toFixed(2)}s` } as React.CSSProperties;
}

function blankSite(handle: string): ProfileSite {
  return {
    handle, username: handle, avatar: `https://github.com/${handle}.png`, rank: 0, points: 0, prs: 0, recentPrs: [], repos: [],
    firstPrAt: null, posts: [], extras: null, indexable: false, ogImage: null, builtAt: new Date().toISOString(),
  };
}

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>No contributor found</h1>
      <p>We could not find that GitHub handle. Check the spelling, or look at everyone who contributes to recode hive.</p>
      <Link className={styles.btnPrimary} to="/dashboard#leaderboard">See the leaderboard</Link>
    </div>
  );
}

function useViewerLogin(): string | null {
  // useUser throws when no ClerkProvider is mounted, so keep the page working without it.
  try {
    const { user } = useUser();
    return user?.externalAccounts?.find((a) => a.provider === 'github')?.username?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export default function ProfilePage({ site: siteProp }: { site?: ProfileSite }): React.JSX.Element {
  const location = useLocation();
  const fallbackHandle = useMemo(() => {
    const m = location.pathname.match(/^\/u\/([^/]+)/);
    const h = m ? decodeURIComponent(m[1]).toLowerCase() : '';
    return HANDLE_RE.test(h) && h !== '_' ? h : null;
  }, [location.pathname]);

  const isFallback = !siteProp;
  const handle = siteProp?.handle ?? fallbackHandle;
  const site = siteProp ?? (handle ? blankSite(handle) : null);
  const gh = useGithubProfile(handle, site?.repos ?? []);
  const viewer = useViewerLogin();

  if (!site || !handle || gh.status === 'notfound') {
    return (
      <Layout title="No contributor found" description="This developer profile does not exist.">
        <Head><meta name="robots" content="noindex" /></Head>
        <main className={styles.root}><NotFound /></main>
      </Layout>
    );
  }

  return <Profile site={site} gh={gh} isFallback={isFallback} isOwner={viewer === site.handle} />;
}

function Profile({ site, gh, isFallback, isOwner }: { site: ProfileSite; gh: ReturnType<typeof useGithubProfile>; isFallback: boolean; isOwner: boolean }) {
  const { extras } = site;
  const user = gh.data?.user ?? null;
  const name = user?.name || site.username;
  const bio = extras?.bio || user?.bio || null;
  const tz = extras?.timezone || 'UTC';
  const profileUrl = `${SITE}/u/${site.handle}`;
  const [tab, setTab] = useState<'earned' | 'all'>('earned');

  const stats: BadgeStats = { prs: site.prs, points: site.points, rank: site.rank > 0 ? site.rank : null };
  const unlocked = BADGES.filter((b) => isUnlocked(b, stats));
  const rarest = getRarestEarned(stats);
  const next = getClosestLocked(stats);
  const nextProgress = next ? getProgress(next, stats) : null;
  const streak = useMemo(() => (gh.data ? computeStreak(gh.data.calendar, new Date(), tz) : null), [gh.data, tz]);

  const description = [
    extras?.headline,
    site.rank > 0 ? `Rank #${site.rank} on the recode hive leaderboard` : null,
    site.prs > 0 ? `${site.prs} merged PRs` : null,
    unlocked.length > 0 ? `${unlocked.length} of ${BADGES.length} badges` : null,
  ].filter(Boolean).join(' · ') || `Developer profile of @${site.handle} on recode hive.`;
  const title = `${name} (@${site.handle}) · recode hive developer profile`;
  const noindex = isFallback || !site.indexable;

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: profileUrl });
        return;
      }
    } catch {
      return;
    }
    void copy();
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch {
      const t = document.createElement('textarea');
      t.value = profileUrl;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
  };

  // Skills with proof
  const proven = useMemo(() => {
    const langs = gh.data?.repoLanguages ?? {};
    const byLang = new Map<string, number[]>();
    for (const pr of site.recentPrs) {
      const l = langs[pr.repo];
      if (!l) continue;
      byLang.set(l, [...(byLang.get(l) ?? []), pr.number]);
    }
    return [...byLang.entries()].map(([lang, nums]) => ({ lang, nums: nums.slice(0, 2) }));
  }, [gh.data, site.recentPrs]);
  const certified = (extras?.credentials ?? []).filter((c) => c.type !== 'degree');
  const declared = extras?.skillsDeclared ?? [];
  const hasSkills = proven.length + certified.length + declared.length > 0;

  const hire = extras?.hire?.open ? extras.hire : null;
  const firstName = name.split(' ')[0] || site.username;
  const website = safeHref(extras?.links?.website || user?.blog);
  const linkedin = safeHref(extras?.links?.linkedin);
  const xUrl = safeHref(extras?.links?.x) ?? (user?.twitter ? `https://x.com/${user.twitter}` : null);
  const thin = !extras?.headline && !extras?.featuredWork?.length;
  const issueUrl = `${REPO_ISSUES}?template=profile-update.yml&title=${encodeURIComponent(`Profile update: @${site.handle}`)}`;
  const endorseUrl = `${REPO_ISSUES}?template=endorsement.yml&title=${encodeURIComponent(`Endorsement for @${site.handle}`)}`;
  const reportUrl = `${REPO_ISSUES}?title=${encodeURIComponent(`Report profile: @${site.handle}`)}&body=${encodeURIComponent(`Profile: ${profileUrl}\n\nWhat is wrong?`)}`;

  // Journey: newest first, dated events before undated ones
  const journey = useMemo((): { date?: string; title: string; sub: string }[] => {
    const ev: { date?: string; title: string; sub: string }[] = [];
    if (site.recentPrs[0]) ev.push({ date: site.recentPrs[0].mergedAt, title: `Merged #${site.recentPrs[0].number} in ${site.recentPrs[0].repo}`, sub: site.recentPrs[0].title });
    for (const p of site.posts.slice(0, 3)) ev.push({ date: p.date, title: `Published “${p.title}”`, sub: 'blog' });
    if (site.firstPrAt) ev.push({ date: site.firstPrAt, title: 'First merged PR', sub: 'Badge · First Contribution' });
    const dated = ev.filter((e) => e.date).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const undated: { date?: string; title: string; sub: string }[] = [];
    if (site.rank > 0 && site.rank <= 3) undated.push({ title: `Reached Rank #${site.rank} on the leaderboard`, sub: 'Badge' });
    for (const b of [...unlocked].filter((x) => x.group !== 'leaderboard').sort((a, c) => c.rarity - a.rarity).slice(0, 3)) undated.push({ title: `${b.name}: ${b.criteria}`, sub: `Badge · ${rarityLabel(b.rarity)}` });
    return [...dated, ...undated];
  }, [site, unlocked]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: profileUrl,
    image: site.avatar,
    sameAs: [`https://github.com/${site.handle}`, linkedin, website].filter(Boolean),
  };

  return (
    <Layout title={title} description={description}>
      <Head>
        <link rel="canonical" href={profileUrl} />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={profileUrl} />
        <meta property="og:image" content={site.ogImage ?? site.avatar} />
        {site.ogImage && <meta property="og:image:width" content="1200" />}
        {site.ogImage && <meta property="og:image:height" content="630" />}
        <meta name="twitter:card" content={site.ogImage ? 'summary_large_image' : 'summary'} />
        {noindex && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <main className={styles.root}>
        <Cover status={gh.status} calendar={gh.data?.calendar ?? null} handle={site.handle} timeZone={tz} fetchedAt={gh.data?.fetchedAt ?? null} />

        <div className={styles.wrap}>
          <div className={styles.headRow}>
            <img className={styles.avatar} src={site.avatar} alt={`${name} avatar`} width={132} height={132} />
            <div className={styles.headActions}>
              <button type="button" className={styles.btnOutline} onClick={() => void share()}><Share2 size={15} aria-hidden="true" /> Share</button>
              {hire && <a className={styles.btnPrimary} href="#hire"><Briefcase size={15} aria-hidden="true" /> Hire {firstName}</a>}
            </div>
          </div>

          <div className={styles.cols}>
            <div className={styles.main}>
              <section className={styles.card} aria-label="About">
                <h1 className={styles.name}>{name}</h1>
                <p className={styles.handleLine}>@{site.handle}</p>
                {extras?.headline && <p className={styles.headline}>{extras.headline}</p>}
                {bio && <p className={styles.bio}>{bio}</p>}
                <div className={styles.pills}>
                  {site.rank > 0 && <span className={`${styles.pill} ${styles.pillGreen}`}>{'\u{1F3C6}'} Rank #{site.rank} on the leaderboard</span>}
                  {streak && streak.current > 0 && <span className={`${styles.pill} ${styles.pillOrange}`}>{'\u{1F525}'} {streak.current}-day GitHub streak</span>}
                </div>
                <ul className={styles.meta}>
                  {user?.location && <li><MapPin size={14} aria-hidden="true" /> {user.location}</li>}
                  {extras?.timezone && <li><Clock size={14} aria-hidden="true" /> {extras.timezone}</li>}
                  {user?.company && <li><Building2 size={14} aria-hidden="true" /> {user.company}</li>}
                  {website && <li><Globe size={14} aria-hidden="true" /> <a href={website} target="_blank" rel="noopener nofollow ugc">{website.replace(/^https:\/\//, '').replace(/\/$/, '')}</a></li>}
                </ul>
                <div className={styles.socials}>
                  <a href={`https://github.com/${site.handle}`} target="_blank" rel="noopener" aria-label="GitHub (opens in a new tab)"><Github size={16} aria-hidden="true" /></a>
                  {linkedin && <a href={linkedin} target="_blank" rel="noopener nofollow ugc" aria-label="LinkedIn (opens in a new tab)"><Linkedin size={16} aria-hidden="true" /></a>}
                  {xUrl && <a href={xUrl} target="_blank" rel="noopener nofollow ugc" aria-label="X (opens in a new tab)"><XMark /></a>}
                  {website && <a href={website} target="_blank" rel="noopener nofollow ugc" aria-label="Website (opens in a new tab)"><Globe size={16} aria-hidden="true" /></a>}
                </div>
              </section>

              {thin && (
                <aside className={styles.thin}>
                  {isOwner ? (
                    <>
                      <p>Your profile is built from public GitHub data. Add your work, links and availability so clients can find you.</p>
                      <div className={styles.thinActions}>
                        <a className={styles.btnPrimary} href={issueUrl} target="_blank" rel="noopener">Request a profile update</a>
                        <a className={styles.btnOutline} href={DISCORD} target="_blank" rel="noopener">Contact admin on Discord</a>
                      </div>
                    </>
                  ) : (
                    <p>This profile is built from public GitHub data.</p>
                  )}
                </aside>
              )}

              {site.rank > 0 && (
                <section className={styles.standing} aria-label="Leaderboard standing">
                  <p className={styles.standingLabel}>LEADERBOARD STANDING{site.rank <= 3 ? <span className={styles.top3}>TOP 3</span> : null}</p>
                  <div className={styles.standingRow}>
                    <div className={styles.rankBig}>
                      {rarest && <BadgeImage badge={rarest} size={72} locked={false} showLock={false} />}
                      <div><strong>#{site.rank}</strong><span>on the recode hive leaderboard</span></div>
                    </div>
                    <dl className={styles.boxes}>
                      <div><dt>MERGED PRS</dt><dd>{site.prs}</dd><span>across recode hive repos</span></div>
                      <div><dt>POINTS</dt><dd>{site.points.toLocaleString('en-US')}</dd><span>from labelled PRs</span></div>
                      <div><dt>BADGES</dt><dd>{unlocked.length} / {BADGES.length}</dd><span>{rarest ? `rarest: ${rarest.name}` : 'none yet'}</span></div>
                    </dl>
                  </div>
                  {next && nextProgress && (
                    <div className={styles.nextBar}>
                      <p><span>Next badge: <strong>{next.name}</strong></span><span>{nextProgress.label}</span></p>
                      <div className={styles.track} role="progressbar" aria-label={`Progress toward ${next.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(nextProgress.pct)}>
                        <span style={{ width: `${nextProgress.pct}%` }} />
                      </div>
                    </div>
                  )}
                </section>
              )}

              {extras?.featuredWork && extras.featuredWork.length > 0 && (
                <section className={styles.card} aria-labelledby="fw">
                  <h2 id="fw" className={styles.h2}>Featured work</h2>
                  <ul className={styles.work}>
                    {extras.featuredWork.map((w) => (
                      <li key={w.title} className={styles.workCard}>
                        <p className={styles.workRole}>{w.role.toUpperCase()}</p>
                        <h3>{w.title}</h3>
                        <p className={styles.workSummary}>{w.summary}</p>
                        {w.tags.length > 0 && <p className={styles.tags}>{w.tags.map((t) => <span key={t}>{t}</span>)}</p>}
                        <p className={styles.workLinks}>
                          {w.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener nofollow ugc">{l.label} <ArrowUpRight size={12} aria-hidden="true" /></a>)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {hasSkills && (
                <section className={styles.card} aria-labelledby="sk">
                  <h2 id="sk" className={styles.h2}>Skills with proof</h2>
                  <ul className={styles.chips}>
                    {proven.map((p) => <li key={p.lang} className={styles.chipProven}>{'✓'} {p.lang} <small>PR {p.nums.map((n) => `#${n}`).join(', ')}</small></li>)}
                    {certified.map((c) => <li key={c.name} className={styles.chipCert}>{'✓'} {c.name} <small>{c.issuer}</small></li>)}
                    {declared.map((s) => <li key={s} className={styles.chipSelf}>{s}</li>)}
                  </ul>
                  <p className={styles.legend}>
                    <span><i className={styles.swProven} /> Proven by merged PRs</span>
                    <span><i className={styles.swCert} /> Certified</span>
                    <span><i className={styles.swSelf} /> Self-declared</span>
                  </p>
                </section>
              )}

              {site.recentPrs.length > 0 && (
                <section className={styles.card} aria-labelledby="rp">
                  <div className={styles.cardHead}><h2 id="rp" className={styles.h2}>Recent merged PRs</h2><span className={styles.mono}>From the leaderboard</span></div>
                  <ul className={styles.prs}>
                    {site.recentPrs.map((p) => (
                      <li key={p.url}>
                        <a href={p.url} target="_blank" rel="noopener">
                          <span><strong>{p.title}</strong><small>{p.repo} {'·'} merged {dateFmt(p.mergedAt)}</small></span>
                          <code>#{p.number}</code>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a className={styles.more} href={`https://github.com/search?q=${encodeURIComponent(`org:recodehive is:pr is:merged author:${site.handle}`)}&type=pullrequests`} target="_blank" rel="noopener">All merged PRs on GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
                </section>
              )}

              {site.prs > 0 && (
                <section className={styles.card} aria-labelledby="bd">
                  <div className={styles.cardHead}>
                    <h2 id="bd" className={styles.h2}>Badges earned</h2>
                    <div className={styles.tabs} role="tablist" aria-label="Badge filter">
                      <button type="button" role="tab" aria-selected={tab === 'earned'} className={tab === 'earned' ? styles.tabOn : ''} onClick={() => setTab('earned')}>Earned {unlocked.length}</button>
                      <button type="button" role="tab" aria-selected={tab === 'all'} className={tab === 'all' ? styles.tabOn : ''} onClick={() => setTab('all')}>All {BADGES.length}</button>
                    </div>
                  </div>
                  <ul className={styles.badgeGrid}>
                    {BADGES.filter((b) => tab === 'all' || isUnlocked(b, stats)).map((b, i) => {
                      const on = isUnlocked(b, stats);
                      return (
                        <li key={b.id} className={`${styles.badgeCard} ${on ? styles.badgeOn : styles.badgeOff}`} style={tierVars(b, i)}>
                          <span className={styles.badgeTag}>{on ? '✓ EARNED' : 'LOCKED'}</span>
                          <BadgeImage badge={b} size={64} locked={!on} fx={on} />
                          <strong>{b.name}</strong>
                          <span className={styles.badgeCrit}>{b.criteria}</span>
                          <em>{rarityLabel(b.rarity)}</em>
                          {on && <a className={styles.badgeDl} href={b.image} download={`${b.id}.png`} aria-label={`Download the ${b.name} badge`}><Download size={12} aria-hidden="true" /> Download</a>}
                        </li>
                      );
                    })}
                  </ul>
                  <p className={styles.badgeFoot}>
                    <span>Each badge can link back to this profile as proof.</span>
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME" target="_blank" rel="noopener"><Linkedin size={13} aria-hidden="true" /> Add badges to LinkedIn</a>
                  </p>
                </section>
              )}

              {site.posts.length > 0 && (
                <section className={styles.card} aria-labelledby="wr">
                  <div className={styles.cardHead}><h2 id="wr" className={styles.h2}>Writing on recode hive</h2><Link to="/blogs" className={styles.moreLink}>All {site.posts.length} {site.posts.length === 1 ? 'post' : 'posts'} {'→'}</Link></div>
                  <Link to={site.posts[0].permalink} className={styles.post}>
                    {site.posts[0].image && <img src={site.posts[0].image} alt="" loading="lazy" />}
                    <span><small>LATEST POST</small><strong>{site.posts[0].title}</strong><em>{dateFmt(site.posts[0].date)} {'·'} recode hive blog</em></span>
                  </Link>
                </section>
              )}

              {extras?.credentials && extras.credentials.length > 0 && (
                <section className={styles.card} aria-labelledby="cr">
                  <div className={styles.cardHead}><h2 id="cr" className={styles.h2}>Credentials</h2><span className={styles.mono}>{extras.credentials.length} credentials</span></div>
                  <ul className={styles.creds}>
                    {extras.credentials.map((c) => {
                      const href = safeHref(c.url);
                      const body = <span><strong>{c.name}</strong><small>{c.issuer}</small></span>;
                      return <li key={c.name}>{href ? <a href={href} target="_blank" rel="noopener nofollow ugc">{body}</a> : body}</li>;
                    })}
                  </ul>
                </section>
              )}

              {journey.length > 0 && (
                <section className={styles.card} aria-labelledby="jr">
                  <div className={styles.cardHead}><h2 id="jr" className={styles.h2}>Journey on recode hive</h2><span className={styles.mono}>Newest first</span></div>
                  <ol className={styles.timeline}>
                    {journey.map((e, i) => (
                      <li key={`${e.title}-${i}`}>
                        <strong>{e.title}</strong>
                        <small>{e.date ? `${dateFmt(e.date)} · ` : ''}{e.sub}</small>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <section className={styles.card} aria-labelledby="en">
                <div className={styles.cardHead}><h2 id="en" className={styles.h2}>Endorsements</h2><span className={styles.mono}>From maintainers and collaborators</span></div>
                {extras?.endorsements && extras.endorsements.length > 0 ? (
                  <ul className={styles.endorse}>
                    {extras.endorsements.map((e) => (
                      <li key={`${e.by}-${e.skill}-${e.date}`}>
                        <p>{'\u201C'}{e.text}{'\u201D'}</p>
                        <small><a href={`https://github.com/${e.by}`} target="_blank" rel="noopener">@{e.by}</a> endorsed <strong>{e.skill}</strong> {'\u00B7'} {dateFmt(e.date)}</small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={styles.endorseEmpty}>
                    <p><strong>No endorsements yet</strong></p>
                    <p>Worked with {firstName} on a recode hive project? Endorse a skill. You need a GitHub account with a merged PR. An admin reviews each one before it appears.</p>
                  </div>
                )}
                <a className={styles.btnOutline} href={endorseUrl} target="_blank" rel="noopener">Endorse {firstName}</a>
              </section>
            </div>

            <aside className={styles.side} aria-label="Share and trust">
              {hire && <HireCard firstName={firstName} handle={site.handle} hire={hire} timezone={extras?.timezone} profileUrl={profileUrl} />}
              <ShareCard handle={site.handle} name={name} title={title} profileUrl={profileUrl} ogImage={site.ogImage} rank={site.rank} />

              <section className={styles.card} aria-labelledby="tr">
                <h2 id="tr" className={styles.h2}>Why you can trust this page</h2>
                <ul className={styles.trust}>
                  <li>Merged PRs, points, rank and badges come from the recode hive leaderboard.</li>
                  <li>Activity comes from GitHub and refreshes weekly.</li>
                  <li>Skills are labelled by proof: merged PRs, credentials or self-declared.</li>
                </ul>
                <a className={styles.report} href={reportUrl} target="_blank" rel="noopener">Report this profile</a>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
}
