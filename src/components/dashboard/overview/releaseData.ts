import releases from '@site/src/data/releases.json';
import { getBotCount, getContributors, type Contributor } from '../../../utils/releaseContributors';

type RawRelease = {
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
  body: string;
};

export type LatestRelease = {
  tag: string;
  date: string;
  htmlUrl: string;
  contributors: Contributor[];
  prCount: number;
  botCount: number;
};

// "V1.0.9-recode" becomes "V1.0.9", "1.0.8" becomes "V1.0.8"
export function formatVersion(tagName: string): string {
  const base = tagName.replace(/-recode$/i, '').toUpperCase();
  return base.startsWith('V') ? base : `V${base}`;
}

/** Newest release from the build-time snapshot. Returns null if there are none. */
export function getLatestRelease(): LatestRelease | null {
  const list = releases as RawRelease[];
  const r = list[0];
  if (!r) return null;
  const contributors = getContributors(r.body);
  return {
    tag: formatVersion(r.tagName),
    date: new Date(r.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    htmlUrl: r.htmlUrl,
    contributors,
    prCount: contributors.reduce((sum, c) => sum + c.prs, 0),
    botCount: getBotCount(r.body),
  };
}
