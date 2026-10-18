import React, { useMemo, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { sortedUsers, type User } from '@site/src/data/users';

type ProjectType = 'flagship' | 'community' | 'client';
type Tab = 'all' | ProjectType;
type Topic = 'all' | 'web' | 'data' | 'oss' | 'templates';

// Maps the tag keys in src/data/users.tsx to the four topic chips
const TOPIC_TAGS: Record<Exclude<Topic, 'all'>, string[]> = {
  web: ['html', 'css', 'javascript', 'vanilla', 'react', 'nextjs', 'typescript', 'tailwind', 'scss', 'design', 'portfolio'],
  data: ['ml', 'ai'],
  oss: ['opensource'],
  templates: ['templates', 'clone'],
};

const TOPICS: { key: Topic; label: string }[] = [
  { key: 'all', label: 'All topics' },
  { key: 'web', label: 'Web' },
  { key: 'data', label: 'Data & ML' },
  { key: 'oss', label: 'Open source' },
  { key: 'templates', label: 'Templates' },
];

const TYPE_LABEL: Record<ProjectType, string> = { flagship: 'Flagship', community: 'Community', client: 'Client work' };

// Preview images are require()d assets: a URL string, or a module object with default/src
function previewSrc(u: User): string | undefined {
  const p: any = (u as any).preview;
  if (!p) return undefined;
  if (typeof p === 'string') return p;
  return p.default ?? p.src?.src ?? p.src ?? undefined;
}

function projectType(u: User): ProjectType {
  const t = (u as any).type as ProjectType | undefined;
  if (t) return t;
  return (u.tags as string[]).includes('favorite') ? 'flagship' : 'community';
}

const SUBMIT_URL = 'https://github.com/recodehive';
const HIRE_URL = '/contact-us';

// Tag keys are compact (opensource); show the readable spelling
const tagLabel = (t: string) => (t === 'opensource' ? 'open-source' : t);

function Badge({ type }: { type: ProjectType }) {
  return <span className={`${styles.badge} ${styles[`b_${type}`]}`}>{TYPE_LABEL[type]}</span>;
}

function ProjectCard({ u }: { u: User }) {
  const type = projectType(u);
  const src = previewSrc(u);
  const tags = (u.tags as string[]).filter((t) => t !== 'favorite').slice(0, 3);
  return (
    <article className={styles.card}>
      {src ? <img className={styles.thumb} src={src} alt={`Screenshot of ${u.title}`} loading="lazy" /> : <div className={styles.thumb} aria-hidden="true" />}
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <Badge type={type} />
          {(u as any).stack && <span className={styles.stack}>{(u as any).stack}</span>}
        </div>
        <h3 className={styles.cardTitle}>{u.title}</h3>
        <p className={styles.cardDesc}>{u.description}</p>
        <div className={styles.tags}>{tags.map((t) => <span key={t} className={styles.tag}>{tagLabel(t)}</span>)}</div>
        <div className={styles.cardLinks}>
          {u.website && <a className={styles.lnk} href={u.website} target="_blank" rel="noopener noreferrer">Live <span aria-hidden="true">↗</span></a>}
          {u.source && <a className={`${styles.lnk} ${styles.lnkMuted}`} href={u.source} target="_blank" rel="noopener noreferrer">Source <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}

export default function Showcase(): ReactNode {
  const [tab, setTab] = useState<Tab>('all');
  const [topic, setTopic] = useState<Topic>('all');
  const [q, setQ] = useState('');

  const users = sortedUsers as User[];
  const counts = useMemo(() => {
    const c = { all: users.length, flagship: 0, community: 0, client: 0 };
    users.forEach((u) => { c[projectType(u)] += 1; });
    return c;
  }, [users]);

  const featured = users.find((u) => projectType(u) === 'flagship');

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return users.filter((u) => {
      if (tab !== 'all' && projectType(u) !== tab) return false;
      if (topic !== 'all' && !(u.tags as string[]).some((t) => TOPIC_TAGS[topic].includes(t))) return false;
      if (query && !`${u.title} ${u.description} ${(u.tags as string[]).join(' ')}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [users, tab, topic, q]);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'flagship', label: 'Flagship', count: counts.flagship },
    { key: 'community', label: 'Community', count: counts.community },
    { key: 'client', label: 'Client work', count: counts.client },
  ];

  const showClientEmpty = tab === 'client' && list.length === 0;
  const showNoMatch = !showClientEmpty && list.length === 0;
  const reset = () => { setTab('all'); setTopic('all'); setQ(''); };

  return (
    <Layout title="Showcase" description="Flagship products, community projects and client work built in the open by recode hive contributors.">
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="showcase-heading">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={`${styles.container} ${styles.heroInner}`}>
            <p className={styles.eyebrow}>✦ Showcase</p>
            <h1 id="showcase-heading" className={styles.h1}>Built in the open by <span className={styles.green}>the hive</span></h1>
            <p className={styles.lead}>Flagship products, community projects and client work from recode hive contributors. Every project is open to explore, learn from and contribute to.</p>
            <div className={styles.actions}>
              <a className={styles.btnGreen} href="#projects">Explore projects <span aria-hidden="true">→</span></a>
              <Link className={styles.btnOut} to={HIRE_URL}>Work with the team</Link>
            </div>
            <div className={styles.counts}>
              <span><b>{counts.flagship}</b> flagship</span>
              <span><b>{counts.community}</b> community</span>
              {counts.client > 0 && <span><b>{counts.client}</b> client</span>}
              <span><b>100%</b> open source</span>
            </div>
          </div>
        </section>

        {featured && (
          <section className={`${styles.container} ${styles.section}`} aria-labelledby="featured-heading">
            <div className={styles.head}>
              <p className={styles.eyebrow}>✦ Flagship</p>
              <h2 id="featured-heading" className={styles.h2}>Featured project</h2>
            </div>
            <article className={`${styles.card} ${styles.featured}`}>
              <div className={styles.featuredMedia}>
                {previewSrc(featured) && <img src={previewSrc(featured)} alt={`Screenshot of ${featured.title}`} />}
              </div>
              <div className={styles.featuredBody}>
                <div className={styles.cardTop}><Badge type="flagship" /><span className={`${styles.badge} ${styles.b_neutral}`}>Open source</span></div>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.featuredDesc}>{featured.description}</p>
                <div className={styles.meta}>
                  {(featured as any).stack && <div><span className={styles.metaLabel}>STACK</span><span className={styles.metaValue}>{(featured as any).stack}</span></div>}
                  <div><span className={styles.metaLabel}>TYPE</span><span className={styles.metaValue}>Flagship</span></div>
                </div>
                <div className={styles.tags}>{(featured.tags as string[]).filter((t) => t !== 'favorite').slice(0, 4).map((t) => <span key={t} className={styles.tag}>{tagLabel(t)}</span>)}</div>
                <div className={styles.actions}>
                  {featured.website && <a className={styles.btnGreen} href={featured.website} target="_blank" rel="noopener noreferrer">View live site <span aria-hidden="true">↗</span></a>}
                  {featured.source && <a className={styles.btnOut} href={featured.source} target="_blank" rel="noopener noreferrer">Source code</a>}
                </div>
              </div>
            </article>
          </section>
        )}

        <section id="projects" className={`${styles.container} ${styles.section}`} aria-labelledby="projects-heading">
          <div className={styles.headRow}>
            <div className={styles.head}>
              <p className={styles.eyebrow}>✦ Projects</p>
              <h2 id="projects-heading" className={styles.h2}>All projects</h2>
            </div>
            <label className={styles.search}>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <span className={styles.srOnly}>Search projects</span>
              <input type="search" placeholder="Search projects..." value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>

          <div className={styles.filters}>
            <div role="tablist" aria-label="Project type" className={styles.segs}>
              {tabs.map((t) => (
                <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={`${styles.seg} ${tab === t.key ? styles.segOn : ''}`} onClick={() => setTab(t.key)}>
                  {t.label} <span className={styles.count}>{t.count}</span>
                </button>
              ))}
            </div>
            <div role="group" aria-label="Topic" className={styles.chips}>
              {TOPICS.map((t) => (
                <button key={t.key} type="button" aria-pressed={topic === t.key} className={`${styles.chip} ${topic === t.key ? styles.chipOn : ''}`} onClick={() => setTopic(t.key)}>{t.label}</button>
              ))}
            </div>
          </div>

          {list.length > 0 && <div className={styles.grid}>{list.map((u) => <ProjectCard key={u.title} u={u} />)}</div>}

          {showClientEmpty && (
            <article className={styles.clientEmpty}>
              <div className={styles.clientText}>
                <Badge type="client" />
                <h3 className={styles.clientTitle}>Client case studies are coming soon</h3>
                <p className={styles.cardDesc}>Each case study will show the client's challenge, what the community built and the result, published only with the client's written approval.</p>
                <Link className={styles.btnGreen} to={HIRE_URL}>Start a project with us <span aria-hidden="true">→</span></Link>
              </div>
              <dl className={styles.clientTemplate}>
                <div><dt>CLIENT</dt><dd>Client name and industry</dd></div>
                <div><dt>CHALLENGE</dt><dd>What problem they needed solved</dd></div>
                <div><dt>WHAT WE BUILT</dt><dd>Product, stack and timeline</dd></div>
                <div><dt>RESULT</dt><dd>A measurable outcome they agree to share</dd></div>
              </dl>
            </article>
          )}

          {showNoMatch && (
            <div className={styles.noMatch}>
              <h3 className={styles.clientTitle}>No projects match</h3>
              <p className={styles.cardDesc}>Try another topic or clear the search.</p>
              <button type="button" className={styles.btnOut} onClick={reset}>Clear filters</button>
            </div>
          )}
        </section>

        <section className={`${styles.container} ${styles.ctaRow}`} aria-label="Get involved">
          <div className={styles.ctaCard}>
            <p className={styles.eyebrow}>For contributors</p>
            <h3 className={styles.ctaTitle}>Built something with the hive?</h3>
            <p className={styles.cardDesc}>Submit your project with a live link, the source and a screenshot. Maintainers review every submission before it is listed.</p>
            <a className={styles.btnOut} href={SUBMIT_URL} target="_blank" rel="noopener noreferrer">Submit a project</a>
          </div>
          <div className={`${styles.ctaCard} ${styles.ctaDark}`}>
            <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>For companies</p>
            <h3 className={styles.ctaTitle}>Need something built?</h3>
            <p className={styles.cardDesc}>Work with recode hive developers whose code you can read before you hire.</p>
            <Link className={styles.btnGreen} to={HIRE_URL}>Hire developers <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
