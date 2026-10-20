export interface Ebook {
  slug: string;
  title: string;
  author: string;
  summary: string;
  topics: string[];
  priceUsd: number;
  buyUrl: string;
  cover: string;
  banner?: string;
}

// One entry per ebook. Add more books here without touching the page layout.
export const EBOOKS: Ebook[] = [
  {
    slug: 'data-scientist-cheatsheet',
    title: 'Data Scientist Cheatsheet & Interview Guide',
    author: 'Sanjay KV',
    summary:
      'Everything for your data science journey in one place: basic and advanced topics, plus interview questions for Python, SQL, Statistics and more.',
    topics: ['Python', 'SQL', 'Statistics', 'pandas', 'NumPy', 'Interview prep'],
    priceUsd: 49,
    buyUrl: 'https://sanjaykv.gumroad.com/l/datasciencebook',
    cover: '/img/ebooks/data-scientist-cover.webp',
    banner: '/img/ebooks/data-scientist-banner.webp',
  },
];
