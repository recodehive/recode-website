// Single source of truth for the dashboard giveaway. Edit this file to run the next one.

export type GiveawayVerify = 'github-star' | 'honor' | 'github-merged-pr';

export interface GiveawayAction {
  id: string;
  label: string;
  sub: string;
  url: string;
  entries: number;
  verify: GiveawayVerify;
  /** Counts once for every merged pull request in the window. */
  perPr?: boolean;
}

export const GIVEAWAY = {
  id: 'halloween-2026',
  title: 'Trick or commit. Win with the hive.',
  theme: 'halloween' as 'halloween' | 'default',
  /** Sydney time (AEDT). The window is always read with this offset, never the visitor's local time. */
  startsAt: '2026-10-21T00:00:00+11:00',
  endsAt: '2026-11-01T23:59:59+11:00',
  winners: 1,
  prize: '₹500 Amazon voucher',
  /** Staff can enter but cannot win. */
  staff: ['sanjay-kv'],
  referral: { entriesPerFriend: 3, maxFriends: 5 },
  actions: [
    { id: 'star', label: 'Star recode-website on GitHub', sub: 'github.com/recodehive/recode-website', url: 'https://github.com/recodehive/recode-website', entries: 2, verify: 'github-star' },
    { id: 'follow-gh', label: 'Follow recode hive on GitHub', sub: 'github.com/recodehive', url: 'https://github.com/recodehive', entries: 1, verify: 'honor' },
    { id: 'discord', label: 'Join the Discord', sub: 'Say hi in #introductions', url: 'https://discord.gg/dh3TA8U55Q', entries: 1, verify: 'honor' },
    { id: 'linkedin', label: 'Follow on LinkedIn', sub: 'linkedin.com/in/sanjay-k-v', url: 'https://www.linkedin.com/in/sanjay-k-v/', entries: 1, verify: 'honor' },
    // TODO: confirm channel URL before launch
    { id: 'youtube', label: 'Subscribe on YouTube', sub: 'GitHub tutorials every week', url: 'https://www.youtube.com/@RecodeHive', entries: 1, verify: 'honor' },
    { id: 'x', label: 'Follow on X', sub: 'x.com/nomadbrainsdev', url: 'https://x.com/nomadbrainsdev', entries: 1, verify: 'honor' },
    { id: 'pr', label: 'Get a pull request merged', sub: 'Any recode hive repo, between Oct 21 and Nov 1', url: 'https://github.com/recodehive/recode-website/issues', entries: 10, verify: 'github-merged-pr', perPr: true },
  ] as GiveawayAction[],
  bonus: { label: 'Complete every social quest', entries: 5 },
  /** GitHub logins of the winners. Fill this in after the draw and the closed page lists them. */
  winnersAnnounced: [] as string[],
};

export const SOCIAL_ACTIONS = GIVEAWAY.actions.filter((a) => !a.perPr);
export const startsMs = Date.parse(GIVEAWAY.startsAt);
export const endsMs = Date.parse(GIVEAWAY.endsAt);

export type Phase = 'upcoming' | 'live' | 'closed';
export const phaseAt = (now: number): Phase => (now < startsMs ? 'upcoming' : now <= endsMs ? 'live' : 'closed');

if (process.env.NODE_ENV === 'development' && !GIVEAWAY.prize) {
  console.warn('[giveaway] prize is empty in src/data/giveaway.ts, the page shows "Prize details coming soon"');
}
