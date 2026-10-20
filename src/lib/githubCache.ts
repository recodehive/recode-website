// Small cache for public GitHub API calls so visitors do not burn through the
// 60 requests per hour limit for unauthenticated clients.

const DEFAULT_TTL = 10 * 60 * 1000; // 10 minutes

type Entry<T> = { t: number; d: T };

export async function cachedJson<T>(key: string, url: string, ttl = DEFAULT_TTL): Promise<T> {
  const cacheKey = `rh:gh:${key}`;

  try {
    const raw = window.sessionStorage.getItem(cacheKey);
    if (raw) {
      const entry = JSON.parse(raw) as Entry<T>;
      if (Date.now() - entry.t < ttl) return entry.d;
    }
  } catch {
    // storage unavailable or corrupt: fall through to the network
  }

  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub request failed with status ${res.status}`);
  const data = (await res.json()) as T;

  try {
    window.sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), d: data } satisfies Entry<T>));
  } catch {
    // storage full or blocked: the data is still returned
  }
  return data;
}
