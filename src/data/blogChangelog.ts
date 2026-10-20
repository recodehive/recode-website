// Content changelog shown on /blogs, newest first. The page shows the latest 4.
//
// Every future content PR (a new post update, a fix, a refresh) should add one entry here with a
// one-line summary of what changed. `post` is the folder name under /blog, or omitted for changes
// that touch every post.

export interface ChangelogEntry {
  title: string;
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Pull request numbers on github.com/recodehive/recode-website. */
  prs: number[];
  author: string;
  post?: string;
}

export const BLOG_CHANGELOG: ChangelogEntry[] = [
  {
    title: 'SEO metadata refreshed on every blog post',
    summary: 'Titles, descriptions and social previews improved across the blog.',
    date: '2026-10-19',
    prs: [2296],
    author: 'Adez017',
  },
  {
    title: 'How We Used Purview Data Catalog to Reduce Onboarding Time',
    summary: 'Post content updated after publishing.',
    date: '2026-10-08',
    prs: [2201],
    author: 'Adez017',
    post: 'microsoft-data-purview',
  },
  {
    title: 'Google Changed Workspace Icon after 6 years',
    summary: 'Duplicate line removed and text readability fixed.',
    date: '2026-07-19',
    prs: [1821, 1841],
    author: 'hrx01-dev',
    post: 'google-icon-update',
  },
  {
    title: 'Azure Data Pipeline Cost Optimization: How We Cut a $4,200 Bill by 73%',
    summary: 'Post refactored and restructured.',
    date: '2026-05-19',
    prs: [1556],
    author: 'Adez017',
    post: 'azure-cost-optimization',
  },
];
