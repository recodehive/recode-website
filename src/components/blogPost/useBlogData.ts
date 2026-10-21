import { useMemo } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';

export interface ListedPost {
  id: string;
  title: string;
  permalink: string;
  date: string;
  tags: { label: string; permalink: string }[];
}

const norm = (p: string) => p.replace(/\/+$/, '');

/** Blog data for the sidebar: every post from the blog-listing plugin, newest first. */
export function useBlogData(currentPermalink: string) {
  const data = usePluginData('blog-listing') as { posts?: ListedPost[] } | undefined;
  const posts = data?.posts ?? [];

  const topics = useMemo(() => {
    const counts = new Map<string, { label: string; permalink: string; count: number }>();
    for (const p of posts) {
      for (const t of p.tags) {
        const cur = counts.get(t.label);
        if (cur) cur.count += 1;
        else counts.set(t.label, { label: t.label, permalink: t.permalink, count: 1 });
      }
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label)).slice(0, 3);
  }, [posts]);

  const recent = useMemo(() => posts.filter((p) => norm(p.permalink) !== norm(currentPermalink)).slice(0, 5), [posts, currentPermalink]);

  return { topics, recent };
}
