import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useCommunityStatsContext } from '@site/src/lib/statsProvider';
import { BADGES, RANK_PERIOD } from '../../data/badges';
import type { BadgeStats } from '../../utils/badges';
import BadgeModal from './BadgeModal';

interface BadgeContextValue {
  /** True when we know who is signed in. Signed out visitors see every badge as locked. */
  signedIn: boolean;
  viewerStats: BadgeStats | null;
  statsFor: (login: string) => BadgeStats;
  /** Opens the badge popup. Pass a login to show that contributor's badges instead of the viewer's. */
  openBadge: (id: string, login?: string) => void;
}

const BadgeContext = createContext<BadgeContextValue | null>(null);

export function useBadges(): BadgeContextValue {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error('useBadges must be used inside BadgesProvider');
  return ctx;
}

const HASH_PREFIX = '#badge=';
const FALLBACK_HASH = '#leaderboard';

export function BadgesProvider({ viewerLogin, children }: { viewerLogin: string | null; children: React.ReactNode }) {
  const { allTimeRanking, monthlyRanking } = useCommunityStatsContext();
  const rankList = RANK_PERIOD === 'monthly' ? monthlyRanking : allTimeRanking;

  const totals = useMemo(() => {
    const m = new Map<string, { prs: number; points: number }>();
    for (const r of allTimeRanking) m.set(r.username.toLowerCase(), { prs: r.prs, points: r.points });
    return m;
  }, [allTimeRanking]);
  const ranks = useMemo(() => {
    const m = new Map<string, number>();
    rankList.forEach((r, i) => m.set(r.username.toLowerCase(), i + 1));
    return m;
  }, [rankList]);

  const statsFor = useCallback(
    (login: string): BadgeStats => {
      const key = login.toLowerCase();
      const t = totals.get(key);
      return { prs: t?.prs ?? 0, points: t?.points ?? 0, rank: ranks.get(key) ?? null };
    },
    [totals, ranks],
  );

  const viewerStats = useMemo(() => (viewerLogin ? statsFor(viewerLogin) : null), [viewerLogin, statsFor]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openBadge = useCallback((id: string, login?: string) => {
    if (!BADGES.some((b) => b.id === id)) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSubject(login && login !== viewerLogin ? login : null);
    setSelectedId(id);
    window.history.replaceState(null, '', `${HASH_PREFIX}${id}`);
  }, [viewerLogin]);

  const close = useCallback(() => {
    setSelectedId(null);
    setSubject(null);
    window.history.replaceState(null, '', FALLBACK_HASH);
    const el = openerRef.current;
    openerRef.current = null;
    if (el && document.contains(el)) el.focus();
  }, []);

  // Open the modal when the page loads with #badge=<id>.
  useEffect(() => {
    const h = window.location.hash;
    if (h.startsWith(HASH_PREFIX)) {
      const id = h.slice(HASH_PREFIX.length);
      if (BADGES.some((b) => b.id === id)) setSelectedId(id);
    }
  }, []);

  const value = useMemo<BadgeContextValue>(
    () => ({ signedIn: Boolean(viewerLogin), viewerStats, statsFor, openBadge }),
    [viewerLogin, viewerStats, statsFor, openBadge],
  );

  return (
    <BadgeContext.Provider value={value}>
      {children}
      {selectedId && (
        <BadgeModal
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            window.history.replaceState(null, '', `${HASH_PREFIX}${id}`);
          }}
          onClose={close}
          signedIn={Boolean(viewerLogin) || subject !== null}
          subject={subject}
          stats={subject ? statsFor(subject) : viewerStats ?? { prs: 0, points: 0, rank: null }}
        />
      )}
    </BadgeContext.Provider>
  );
}
