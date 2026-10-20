import { useEffect, useMemo, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import releases from '../../data/releases.json';
import prsFile from '../../data/community/prs.generated.json';
import { EVENTS, type CommunityEvent } from '../../data/community/events';
import { BLOG_CHANGELOG } from '../../data/blogChangelog';
import { VIDEOS } from '../../data/broadcasts';
import { WE_SPONSOR } from '../../data/sponsors';
import { formatVersion } from '../dashboard/overview/releaseData';
import { splitBotLines } from '../../utils/releaseContributors';
import type { Post } from '../blogsPage/blogData';

type RawRelease = { tagName: string; publishedAt: string; htmlUrl: string; body: string };
const RELEASES = [...(releases as RawRelease[])].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

const monthDay = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).toUpperCase();
export const longDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const LINE = /^\*\s+(.+?)\s+by @([A-Za-z0-9-]+(?:\[bot\])?)(?: with @[A-Za-z0-9-]+)? in https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/pull\/(\d+)/;

/** The release (version) a merge shipped in: the first release published after the merge. */
function versionFor(mergedAt: string): string | null {
  const t = new Date(mergedAt).getTime();
  const after = [...RELEASES].reverse().find((r) => new Date(r.publishedAt).getTime() >= t);
  return after ? formatVersion(after.tagName) : null;
}

export interface FreshPr {
  number: number;
  title: string;
  url: string;
  author: string;
  mergedAt: string;
  version: string | null;
}

/** Latest merged PRs from the build time fetch, or from the newest release notes when the fetch is empty. */
export function getFreshPrs(): FreshPr[] {
  const fetched = (prsFile as { prs: Omit<FreshPr, 'version'>[] }).prs;
  if (fetched.length > 0) {
    return fetched.map((p) => ({ ...p, version: versionFor(p.mergedAt) }));
  }
  const out: FreshPr[] = [];
  for (const r of RELEASES) {
    const { humanBody } = splitBotLines(r.body);
    for (const line of humanBody.replace(/\r\n/g, '\n').split('\n')) {
      const m = LINE.exec(line.trim());
      if (!m) continue;
      out.push({
        number: Number(m[3]),
        title: m[1],
        url: `https://github.com/recodehive/recode-website/pull/${m[3]}`,
        author: m[2],
        mergedAt: r.publishedAt,
        version: formatVersion(r.tagName),
      });
      if (out.length === 5) return out;
    }
  }
  return out;
}

export interface NewsItem {
  kind: 'Release' | 'Blog';
  date: string;
  title: string;
  summary: string;
  label: string;
  href: string;
  external: boolean;
}

export function getNews(posts: Post[]): NewsItem[] {
  const items: NewsItem[] = RELEASES.slice(0, 3).map((r) => {
    const { humanBody } = splitBotLines(r.body);
    const first = humanBody.replace(/\r\n/g, '\n').split('\n').map((l) => LINE.exec(l.trim())).find(Boolean);
    return {
      kind: 'Release' as const,
      date: r.publishedAt,
      title: `${formatVersion(r.tagName)} is out`,
      summary: first ? first[1] : 'See every pull request that went into this release.',
      label: 'Read release notes',
      href: r.htmlUrl,
      external: true,
    };
  });
  const blog = BLOG_CHANGELOG.find((e) => e.post && posts.some((p) => p.folder === e.post));
  if (blog) {
    const post = posts.find((p) => p.folder === blog.post);
    if (post) {
      items.push({ kind: 'Blog', date: `${blog.date}T00:00:00Z`, title: blog.title, summary: blog.summary, label: 'Read the post', href: post.permalink, external: false });
    }
  }
  return items.sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 4);
}

export const shortMonthDay = monthDay;

/** Upcoming events: our own first, then the rest by date. Past ones are hidden after the page loads. */
export function useUpcomingEvents(): CommunityEvent[] {
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);
  return useMemo(
    () =>
      EVENTS.filter((e) => (e.end ?? e.start).slice(0, 10) >= today)
        .sort((a, b) => Number(b.org === 'recode hive') - Number(a.org === 'recode hive') || a.start.localeCompare(b.start))
        .slice(0, 4),
    [today],
  );
}

export interface Talk {
  id: string;
  youtubeId: string;
  title: string;
  publishedAt?: string;
}

/** The newest 4 tutorials from the Broadcasts data, using the publish dates fetched at build time. */
export function useLatestTalks(): Talk[] {
  const feed = usePluginData('broadcasts-feed') as { dates?: Record<string, string> } | undefined;
  return useMemo(() => {
    const dates = feed?.dates ?? {};
    return VIDEOS.map((v) => ({ id: v.id, youtubeId: v.youtubeId, title: v.title, publishedAt: dates[v.youtubeId] }))
      .sort((a, b) => +new Date(b.publishedAt ?? 0) - +new Date(a.publishedAt ?? 0))
      .slice(0, 4);
  }, [feed]);
}

export function useCommunityStats(): { posts: number; authors: number; sponsored: number } {
  const data = usePluginData('blog-listing') as { posts?: Post[] } | undefined;
  return useMemo(() => {
    const posts = data?.posts ?? [];
    return { posts: posts.length, authors: new Set(posts.flatMap((p) => p.authors.map((a) => a.key))).size, sponsored: WE_SPONSOR.length };
  }, [data]);
}

export function usePosts(): Post[] {
  const data = usePluginData('blog-listing') as { posts?: Post[] } | undefined;
  return data?.posts ?? [];
}
