// Types for the public developer profile at /u/<handle>.
// Three tiers: GitHub (always, fetched on the server), recodehive data (build time) and owner extras (optional).
import type { CalendarDay } from './streak';

/** Tier 3: details the owner provides, stored in src/data/profiles/<handle>.json. Every field is optional. */
export interface ProfileExtras {
  headline?: string;
  bio?: string;
  /** IANA zone, for example "Australia/Sydney". Used for the streak and shown on the page. */
  timezone?: string;
  links?: { linkedin?: string; website?: string; x?: string };
  /** At most 3 are shown. */
  featuredWork?: {
    title: string;
    role: string;
    summary: string;
    tags: string[];
    links: { label: string; url: string }[];
    image?: string;
  }[];
  credentials?: { name: string; issuer: string; type: 'certification' | 'program' | 'degree'; url?: string }[];
  skillsDeclared?: string[];
  /** Opt-in. Not rendered yet. */
  hire?: {
    open: boolean;
    roles?: string[];
    engagement?: ('contract' | 'full-time' | 'freelance' | 'mentoring')[];
    workRights?: string;
    bookingUrl?: string;
    cvUrl?: string;
  };
}

export interface ProfilePR {
  title: string;
  url: string;
  number: number;
  repo: string;
  mergedAt: string;
}

export interface ProfilePost {
  title: string;
  permalink: string;
  date: string;
  image?: string;
}

/** Tier 2: from the recodehive leaderboard and blog, baked into each static page at build time. */
export interface ProfileSite {
  handle: string;
  username: string;
  avatar: string;
  rank: number;
  points: number;
  prs: number;
  /** Latest merged PRs, newest first (at most 5). */
  recentPrs: ProfilePR[];
  /** Repos the contributor merged into, for language lookup. */
  repos: string[];
  /** First merged PR date, if known. */
  firstPrAt: string | null;
  posts: ProfilePost[];
  extras: ProfileExtras | null;
  /** True when this page may be indexed by search engines. */
  indexable: boolean;
  /** When the leaderboard data was read. */
  builtAt: string;
}

/** Tier 1: from GitHub through the profile edge function. */
export interface GithubProfile {
  fetchedAt: string;
  user: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    location: string | null;
    blog: string | null;
    company: string | null;
    twitter: string | null;
    createdAt: string;
  };
  calendar: CalendarDay[];
  /** Primary language per repo name, for the repos asked for. */
  repoLanguages: Record<string, string>;
}
