import { usePluginData } from '@docusaurus/useGlobalData';
import type { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export type PostAuthor = ReturnType<typeof useBlogPost>['metadata']['authors'][number];

/** The author's GitHub handle: from their socials, else their GitHub url, else the author key. */
export function githubHandle(a: { url?: string; key?: string; socials?: unknown }): string | null {
  const s = (a as { socials?: Record<string, string> }).socials?.github;
  if (s) return s.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').toLowerCase();
  const m = a.url?.match(/github\.com\/([A-Za-z0-9-]+)/i);
  if (m) return m[1].toLowerCase();
  return a.key ? a.key.toLowerCase() : null;
}

/** Where an author's name or avatar should lead: their recode hive profile when that page exists, else GitHub. */
export function useAuthorLink(a: PostAuthor): { href: string; internal: boolean } | null {
  const profiles = usePluginData('developer-profiles') as { handles?: string[] } | undefined;
  const handle = githubHandle(a);
  if (!handle) return null;
  return profiles?.handles?.includes(handle) ? { href: `/u/${handle}`, internal: true } : { href: `https://github.com/${handle}`, internal: false };
}
