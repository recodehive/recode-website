import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClerk, useUser } from '@clerk/react';
import { GIVEAWAY, SOCIAL_ACTIONS, phaseAt, type Phase } from '../../../data/giveaway';

const REF_KEY = 'rh-giveaway-ref';
const REF_DAYS = 30;
const LOGIN_RE = /^[A-Za-z0-9-]{1,39}$/;

interface Saved {
  done: Record<string, string>;
  bonus?: string;
  referredBy?: string;
}

/** The clock, read on the client only (the server render shows a static label). */
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function usePhase(now: number | null): Phase {
  return now === null ? 'live' : phaseAt(now);
}

function readSaved(meta: Record<string, unknown> | undefined): Saved {
  const g = (meta?.giveaway as Record<string, Saved> | undefined)?.[GIVEAWAY.id];
  return { done: g?.done ?? {}, bonus: g?.bonus, referredBy: g?.referredBy };
}

async function countMergedPrs(login: string): Promise<number | null> {
  const key = `rh-giveaway-prs-${login}`;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const c = JSON.parse(raw) as { t: number; n: number };
      if (Date.now() - c.t < 3600000) return c.n;
    }
  } catch {
    // storage unavailable: fall through to the network
  }
  const day = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'Australia/Sydney' });
  const q = `org:recodehive is:pr is:merged author:${login} merged:${day(GIVEAWAY.startsAt)}..${day(GIVEAWAY.endsAt)}`;
  try {
    const res = await fetch(`https://api.github.com/search/issues?per_page=1&q=${encodeURIComponent(q)}`, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return null;
    const n = ((await res.json()) as { total_count?: number }).total_count ?? 0;
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), n }));
    } catch {
      // ignore
    }
    return n;
  } catch {
    return null;
  }
}

export function useGiveaway() {
  // useUser throws when no ClerkProvider is mounted; keep the page viewable without it.
  let user: ReturnType<typeof useUser>['user'] | undefined;
  let clerk: ReturnType<typeof useClerk> | undefined;
  try {
    user = useUser().user;
    clerk = useClerk();
  } catch {
    user = undefined;
  }

  const login = user?.externalAccounts?.find((a) => a.provider === 'github')?.username ?? null;
  const avatar = user?.imageUrl ?? null;
  const saved = useMemo(() => readSaved(user?.unsafeMetadata), [user?.unsafeMetadata]);
  const [prCount, setPrCount] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Remember a referral link visit for 30 days.
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (!ref || !LOGIN_RE.test(ref)) return;
    try {
      localStorage.setItem(REF_KEY, JSON.stringify({ ref, at: Date.now() }));
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback(
    async (patch: Partial<Saved>) => {
      if (!user) return;
      setSaving(true);
      try {
        const all = (user.unsafeMetadata?.giveaway as Record<string, Saved> | undefined) ?? {};
        const cur = readSaved(user.unsafeMetadata);
        await user.update({
          unsafeMetadata: { ...user.unsafeMetadata, giveaway: { ...all, [GIVEAWAY.id]: { ...cur, ...patch } } },
        });
      } finally {
        setSaving(false);
      }
    },
    [user],
  );

  // Save the referrer once, on the first visit after signing in.
  useEffect(() => {
    if (!user || !login || saved.referredBy) return;
    try {
      const raw = localStorage.getItem(REF_KEY);
      if (!raw) return;
      const { ref, at } = JSON.parse(raw) as { ref: string; at: number };
      if (Date.now() - at > REF_DAYS * 86400000) return;
      if (!LOGIN_RE.test(ref) || ref.toLowerCase() === login.toLowerCase()) return;
      void persist({ referredBy: ref });
    } catch {
      // ignore
    }
  }, [user, login, saved.referredBy, persist]);

  useEffect(() => {
    if (!login) {
      setPrCount(null);
      return;
    }
    let cancelled = false;
    countMergedPrs(login).then((n) => !cancelled && setPrCount(n));
    return () => {
      cancelled = true;
    };
  }, [login]);

  const signIn = useCallback(() => {
    clerk?.openSignIn?.({});
  }, [clerk]);

  const markDone = useCallback(
    (id: string) => {
      if (!user) {
        signIn();
        return;
      }
      if (saved.done[id]) return;
      void persist({ done: { ...saved.done, [id]: new Date().toISOString() } });
    },
    [user, signIn, saved.done, persist],
  );

  const allSocialDone = SOCIAL_ACTIONS.every((a) => saved.done[a.id]);
  const claimBonus = useCallback(() => {
    if (!user || !allSocialDone || saved.bonus) return;
    void persist({ bonus: new Date().toISOString() });
  }, [user, allSocialDone, saved.bonus, persist]);

  const entries = useMemo(() => {
    let n = 0;
    for (const a of SOCIAL_ACTIONS) if (saved.done[a.id]) n += a.entries;
    if (saved.bonus) n += GIVEAWAY.bonus.entries;
    const pr = GIVEAWAY.actions.find((a) => a.perPr);
    if (pr && prCount) n += prCount * pr.entries;
    return n;
  }, [saved, prCount]);

  return { signedIn: Boolean(user), login, avatar, saved, prCount, entries, saving, allSocialDone, signIn, markDone, claimBonus };
}
