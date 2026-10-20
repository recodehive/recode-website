import { usePluginData } from '@docusaurus/useGlobalData';

export interface PostAuthor {
  key: string;
  name: string;
  imageURL?: string;
  github?: string;
}
export interface PostTag {
  label: string;
  permalink: string;
}
export interface Post {
  id: string;
  folder: string;
  title: string;
  permalink: string;
  description: string;
  date: string;
  readingTime: number;
  image?: string;
  category?: string;
  featured: boolean;
  tags: PostTag[];
  authors: PostAuthor[];
}

/** Every post, newest first. Comes from the blog plugin, so nothing here is hardcoded. */
export function usePosts(): Post[] {
  const data = usePluginData('blog-listing') as { posts?: Post[] } | undefined;
  return data?.posts ?? [];
}

export const slugify = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export interface Topic {
  label: string;
  /** Tag slugs that put a post under this chip. */
  tags: string[];
}

export const TOPICS: Topic[] = [
  { label: 'Data Engineering', tags: ['data-engineering'] },
  { label: 'Azure', tags: ['azure'] },
  { label: 'Big Data', tags: ['big-data'] },
  { label: 'Career', tags: ['career'] },
  { label: 'Design & UX', tags: ['ux', 'ui-design', 'ui', 'design'] },
];

export const hasTag = (post: Post, tags: string[]): boolean => post.tags.some((t) => tags.includes(slugify(t.label)));

const ACRONYMS = new Set(['adf', 'etl', 'adls', 'sso', 'ai', 'api', 'cli', 'sql', 'ui', 'ux', 'seo', 'dp', 'saml', 'oauth', 'iceberg']);
/** "azure-data-factory" becomes "Azure Data Factory". Known acronyms stay upper case. */
export function tagText(label: string): string {
  return label
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => (ACRONYMS.has(w.toLowerCase()) && w.toLowerCase() !== 'iceberg' ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ');
}

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const initials = (name: string): string =>
  name.trim().split(/\s+/).map((w) => w[0] ?? '').join('').slice(0, 2).toUpperCase();

/** The category label above a title: the front matter value, or the first tag. */
export const categoryOf = (post: Post): string => (post.category ?? (post.tags[0] ? tagText(post.tags[0].label) : '')).toUpperCase();

export interface AuthorSummary extends PostAuthor {
  posts: number;
}
export function uniqueAuthors(posts: Post[]): AuthorSummary[] {
  const map = new Map<string, AuthorSummary>();
  for (const p of posts) {
    for (const a of p.authors) {
      const cur = map.get(a.key);
      if (cur) cur.posts += 1;
      else map.set(a.key, { ...a, posts: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.posts - a.posts);
}
