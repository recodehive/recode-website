import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { GithubProfile } from '../../lib/profile/types';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type GithubStatus = 'loading' | 'ready' | 'notfound' | 'error' | 'unconfigured';

interface Stored {
  t: number;
  data: GithubProfile;
}

/**
 * GitHub data for a profile (streak, heatmap, languages). It comes from the profile edge function, which
 * caches for a week. The browser keeps its own copy for a week too, so a visitor triggers one request a week.
 */
export function useGithubProfile(handle: string | null, repos: string[]): { status: GithubStatus; data: GithubProfile | null } {
  const { siteConfig } = useDocusaurusContext();
  const base = String(siteConfig.customFields?.supabaseUrl ?? '').replace(/\/$/, '');
  const [state, setState] = useState<{ status: GithubStatus; data: GithubProfile | null }>({ status: base ? 'loading' : 'unconfigured', data: null });
  const reposKey = repos.join(',');

  useEffect(() => {
    if (!handle) return;
    if (!base) {
      setState({ status: 'unconfigured', data: null });
      return;
    }
    const key = `rh-profile-${handle}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const s = JSON.parse(raw) as Stored;
        if (Date.now() - s.t < WEEK_MS && s.data && Array.isArray(s.data.calendar)) {
          setState({ status: 'ready', data: s.data });
          return;
        }
      }
    } catch {
      // storage unavailable or corrupt: go to the network
    }

    const ctrl = new AbortController();
    setState({ status: 'loading', data: null });
    fetch(`${base}/functions/v1/profile?handle=${encodeURIComponent(handle)}&repos=${encodeURIComponent(reposKey)}`, { signal: ctrl.signal })
      .then(async (res) => {
        if (res.status === 404) {
          setState({ status: 'notfound', data: null });
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as GithubProfile;
        try {
          localStorage.setItem(key, JSON.stringify({ t: Date.now(), data } satisfies Stored));
        } catch {
          // ignore
        }
        setState({ status: 'ready', data });
      })
      .catch((err: unknown) => {
        if ((err as { name?: string })?.name === 'AbortError') return;
        setState({ status: 'error', data: null });
      });
    return () => ctrl.abort();
  }, [handle, base, reposKey]);

  return state;
}
