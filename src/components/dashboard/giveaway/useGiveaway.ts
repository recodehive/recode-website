import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useClerk, useUser } from '@clerk/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { GIVEAWAY, SOCIAL_ACTIONS, phaseAt, type Phase } from '../../../data/giveaway';

const REF_KEY = 'rh-giveaway-ref';
const REF_DAYS = 30;
const LOGIN_RE = /^[A-Za-z0-9-]{1,39}$/;

/** Only used for the quests that cannot be verified (the "support" links). Never counted as entries. */
interface Saved {
  done: Record<string, string>;
}

/** What the server verified with GitHub. The browser never computes these. */
export interface ServerState {
  phase: Phase;
  login: string;
  entries: number;
  star: boolean;
  follow: boolean;
  prs: number;
  referrals: number;
  bonus: boolean;
}

export type SyncStatus = 'idle' | 'checking' | 'error' | 'unconfigured';

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
  return { done: g?.done ?? {} };
}

function readRef(login: string | null): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const { ref, at } = JSON.parse(raw) as { ref: string; at: number };
    if (Date.now() - at > REF_DAYS * 86400000) return null;
    if (!LOGIN_RE.test(ref) || (login && ref.toLowerCase() === login.toLowerCase())) return null;
    return ref;
  } catch {
    return null;
  }
}

export function useGiveaway() {
  const { siteConfig } = useDocusaurusContext();
  const supabaseUrl = String(siteConfig.customFields?.supabaseUrl ?? '').replace(/\/$/, '');

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
  const [server, setServer] = useState<ServerState | null>(null);
  const [status, setStatus] = useState<SyncStatus>(supabaseUrl ? 'idle' : 'unconfigured');
  const inFlight = useRef(false);

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

  /** Ask the server to verify with GitHub and return the totals. */
  const sync = useCallback(async () => {
    if (!supabaseUrl) {
      setStatus('unconfigured');
      return;
    }
    if (!clerk?.session || inFlight.current) return;
    inFlight.current = true;
    setStatus('checking');
    try {
      const token = await clerk.session.getToken();
      if (!token) throw new Error('no token');
      const res = await fetch(`${supabaseUrl}/functions/v1/giveaway`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-clerk-token': token },
        body: JSON.stringify({ ref: readRef(login) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setServer((await res.json()) as ServerState);
      setStatus('idle');
    } catch {
      setStatus('error');
    } finally {
      inFlight.current = false;
    }
  }, [supabaseUrl, clerk, login]);

  // Check on sign in, and again whenever the visitor comes back to this tab (after starring on GitHub).
  useEffect(() => {
    if (!user) {
      setServer(null);
      return;
    }
    void sync();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void sync();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [user?.id, sync]); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = useCallback(() => {
    clerk?.openSignIn?.({});
  }, [clerk]);

  /** Records that a support link was opened. Worth no entries. */
  const markDone = useCallback(
    (id: string) => {
      if (!user) {
        signIn();
        return;
      }
      if (saved.done[id]) return;
      const all = (user.unsafeMetadata?.giveaway as Record<string, Saved> | undefined) ?? {};
      void user.update({
        unsafeMetadata: { ...user.unsafeMetadata, giveaway: { ...all, [GIVEAWAY.id]: { done: { ...saved.done, [id]: new Date().toISOString() } } } },
      });
    },
    [user, signIn, saved.done],
  );

  const verified = useCallback(
    (id: string): boolean => {
      if (!server) return false;
      if (id === 'star') return server.star;
      if (id === 'follow-gh') return server.follow;
      return false;
    },
    [server],
  );

  const socialDone = SOCIAL_ACTIONS.filter((a) => (a.verify === 'honor' ? Boolean(saved.done[a.id]) : verified(a.id))).length;

  return {
    signedIn: Boolean(user),
    login,
    avatar,
    saved,
    server,
    status,
    entries: server?.entries ?? 0,
    prCount: server?.prs ?? 0,
    referrals: server?.referrals ?? 0,
    bonus: server?.bonus ?? false,
    socialDone,
    verified,
    sync,
    signIn,
    markDone,
  };
}
