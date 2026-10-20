import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { filterBlogsBySearchTerm } from '../../utils/blogFilters';
import { TOPICS, hasTag, usePosts, type Post } from '../../components/blogsPage/blogData';
import Hero from '../../components/blogsPage/Hero';
import { ChangelogStrip, Featured, Latest, Spotlight, WriteBanner } from '../../components/blogsPage/Sections';
import styles from '../../components/blogsPage/blogsPage.module.css';

const DESCRIPTION =
  'Practical guides and honest field notes on data engineering, cloud platforms, GitHub, AI tools, and modern software development from the recode hive community.';

export default function Blogs(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const posts = usePosts();
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const t = TOPICS.find((x) => x.label === topic);
    const byTopic = t ? posts.filter((p) => hasTag(p, t.tags)) : posts;
    // Reuse the site's search filter. It looks at title, description and tags.
    const searchable = byTopic.map((p) => ({ ...p, tags: p.tags.map((x) => x.label), category: p.category }));
    const ids = new Set(filterBlogsBySearchTerm(searchable as never[], query).map((p: Post) => p.id));
    return byTopic.filter((p) => ids.has(p.id));
  }, [posts, topic, query]);

  useEffect(() => setPage(1), [topic, query]);

  // The results grid sits below the hero, so bring it into view when a filter or search changes.
  // Typing waits a moment so the page does not jump on every key.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (topic === 'All' && !query.trim()) return;
    const id = window.setTimeout(() => {
      const el = document.getElementById('latest');
      if (!el) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }, 350);
    return () => window.clearTimeout(id);
  }, [topic, query]);

  const clearFilters = () => {
    setTopic('All');
    setQuery('');
  };

  const goPage = (n: number) => {
    setPage(n);
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const backToAll = () => {
    setTopic('All');
    setQuery('');
    setPage(1);
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const title = `Engineering Blog | ${siteConfig.title}`;
  return (
    <Layout title={title} description={DESCRIPTION}>
      <Head>
        <link rel="canonical" href={`${siteConfig.url}/blogs`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteConfig.url}/blogs`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={DESCRIPTION} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: title,
            description: DESCRIPTION,
            url: `${siteConfig.url}/blogs`,
            isPartOf: { '@type': 'WebSite', name: siteConfig.title, url: siteConfig.url },
          })}
        </script>
      </Head>
      <main className={styles.root}>
        <Hero posts={posts} query={query} onQuery={setQuery} topic={topic} onTopic={setTopic} />
        <div className={styles.wrap}>
          <Spotlight posts={posts} />
          <Latest posts={filtered} page={page} onPage={goPage} topic={topic} query={query} onClear={clearFilters} />
          <Featured posts={posts} total={posts.length} onBackToAll={backToAll} />
          <ChangelogStrip posts={posts} />
          <WriteBanner />
        </div>
      </main>
    </Layout>
  );
}
