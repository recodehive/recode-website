export interface CommunityEvent {
  title: string;
  /** ISO date or date time. The calendar day is read from the first 10 characters. */
  start: string;
  end?: string;
  org: 'recode hive' | 'GitHub' | 'Microsoft';
  where: string;
  url: string;
}

// Our own events first (org: 'recode hive'), then GitHub and Microsoft events as a fallback.
//
// To add a recode hive event: add an entry below with org: 'recode hive', its start date (and end date
// if it runs longer than a day), where it happens and a link. Past events hide themselves, and the page
// shows at most 4.
export const EVENTS: CommunityEvent[] = [
  { title: 'Trust What You Ship: Governance, Security and Code Quality in the Agentic Era', start: '2026-10-22T11:00:00-07:00', org: 'GitHub', where: 'Virtual · 11am PDT', url: 'https://github.com/resources/events' },
  { title: 'Microsoft AI Tour: Philadelphia', start: '2026-10-22', org: 'Microsoft', where: 'Philadelphia, US', url: 'https://github.com/resources/events' },
  { title: 'GitHub Universe 2026', start: '2026-10-28', end: '2026-10-29', org: 'GitHub', where: 'San Francisco + online', url: 'https://githubuniverse.com/' },
  { title: 'Microsoft AI Tour: Mexico City', start: '2026-10-29', org: 'Microsoft', where: 'Mexico City, MX', url: 'https://github.com/resources/events' },
];
