// Contributor extraction for GitHub release notes.
// Pure functions with no imports, so they can be unit tested directly with node.

export type Contributor = { handle: string; prs: number };

const LINE_PATTERN =
  /by @([A-Za-z0-9-]+(?:\[bot\])?)(?: with @[A-Za-z0-9-]+)? in https:\/\/github\.com\/[^\s/]+\/[^\s/]+\/pull\/(\d+)/g;

const EXCLUDED = new Set(['copilot', 'github-actions', 'dependabot', 'renovate']);

/** Bots and AI authors are never shown as contributors. */
export function isExcludedHandle(handle: string): boolean {
  const h = handle.toLowerCase();
  return h.endsWith('[bot]') || EXCLUDED.has(h);
}

type Entry = { handle: string; pr: string };

function entries(body: string): Entry[] {
  const out: Entry[] = [];
  const re = new RegExp(LINE_PATTERN.source, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    out.push({ handle: m[1], pr: m[2] });
  }
  return out;
}

/** People with merged PRs in a release, most PRs first, then by handle. */
export function getContributors(body: string): Contributor[] {
  const perHandle = new Map<string, { handle: string; prs: Set<string> }>();
  for (const { handle, pr } of entries(body)) {
    if (isExcludedHandle(handle)) continue;
    const key = handle.toLowerCase();
    const cur = perHandle.get(key) ?? { handle, prs: new Set<string>() };
    cur.prs.add(pr);
    perHandle.set(key, cur);
  }
  return [...perHandle.values()]
    .map(({ handle, prs }) => ({ handle, prs: prs.size }))
    .sort((a, b) => b.prs - a.prs || a.handle.localeCompare(b.handle));
}

/** Unique PRs authored by bots or AI authors. */
export function getBotCount(body: string): number {
  const prs = new Set<string>();
  for (const { handle, pr } of entries(body)) {
    if (isExcludedHandle(handle)) prs.add(pr);
  }
  return prs.size;
}

/** Splits a release body into the human lines and the bot/AI lines. */
export function splitBotLines(body: string): { humanBody: string; botLines: string[] } {
  const humanLines: string[] = [];
  const botLines: string[] = [];
  for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
    const re = new RegExp(LINE_PATTERN.source);
    const m = re.exec(line);
    if (m && isExcludedHandle(m[1])) botLines.push(line);
    else humanLines.push(line);
  }
  return { humanBody: humanLines.join('\n'), botLines };
}
