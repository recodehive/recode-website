// Generates one static page per contributor at /u/<handle>, so every profile has real <title>,
// description and Open Graph tags (link previews do not run JavaScript).
//
// Reads, at build time only:
//   - the recodehive leaderboard backend (rank, points, merged PRs)
//   - the blog posts (matched to the author by GitHub handle)
//   - src/data/profiles/<handle>.json, the optional extras the person provides
// Live GitHub data (streak, heatmap, languages) is NOT fetched here. The page loads it in the browser
// from the profile edge function, which keeps the token private and caches for a week.
//
// /u/_ is a fallback page for any other valid GitHub handle (served through a Vercel rewrite).
const fs = require('fs');
const path = require('path');

const BACKEND = process.env.BACKEND_API_URL || 'https://leaderboard-production-6143.up.railway.app';
const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/;
// Keep in step with EXCLUDED_USERS in src/lib/statsProvider.tsx.
const EXCLUDED = new Set([
  'allcontributors', 'allcontributors[bot]', 'dependabot', 'dependabot[bot]', 'copilot', 'copilot[bot]',
  'github-actions[bot]', 'renovate[bot]', 'dependabot-preview[bot]',
]);
const MIN_PRS_TO_INDEX = 3;
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const ENGAGEMENT = ['contract', 'full-time', 'freelance', 'mentoring'];

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined) || undefined;
const strList = (v, max, each) => (Array.isArray(v) ? v.map((x) => str(x, each)).filter(Boolean).slice(0, max) : undefined);
/** Only https links are kept. */
const https = (v) => {
  const s = str(v, 500);
  return s && /^https:\/\//i.test(s) ? s : undefined;
};

/** Whitelists the fields of an owner extras file, so a bad file can never break the build or inject markup. */
function cleanExtras(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const links = raw.links && typeof raw.links === 'object'
    ? { linkedin: https(raw.links.linkedin), website: https(raw.links.website), x: https(raw.links.x) }
    : undefined;
  const featuredWork = Array.isArray(raw.featuredWork)
    ? raw.featuredWork.slice(0, 3).map((w) => ({
        title: str(w && w.title, 120),
        role: str(w && w.role, 80),
        summary: str(w && w.summary, 300),
        tags: strList(w && w.tags, 6, 30) || [],
        links: Array.isArray(w && w.links)
          ? w.links.map((l) => ({ label: str(l && l.label, 40), url: https(l && l.url) })).filter((l) => l.label && l.url).slice(0, 4)
          : [],
        image: https(w && w.image) || (typeof (w && w.image) === 'string' && w.image.startsWith('/img/') ? w.image : undefined),
      })).filter((w) => w.title && w.role && w.summary)
    : undefined;
  const credentials = Array.isArray(raw.credentials)
    ? raw.credentials.slice(0, 12).map((c) => ({
        name: str(c && c.name, 120),
        issuer: str(c && c.issuer, 120),
        type: ['certification', 'program', 'degree'].includes(c && c.type) ? c.type : 'certification',
        url: https(c && c.url),
      })).filter((c) => c.name && c.issuer)
    : undefined;
  // Hire details are opt-in: the whole block is dropped unless the owner set open to true.
  const hireRaw = raw.hire && typeof raw.hire === 'object' && raw.hire.open === true ? raw.hire : null;
  const hire = hireRaw
    ? {
        open: true,
        roles: strList(hireRaw.roles, 6, 60),
        engagement: Array.isArray(hireRaw.engagement) ? hireRaw.engagement.filter((e) => ENGAGEMENT.includes(e)) : undefined,
        workRights: str(hireRaw.workRights, 200),
        bookingUrl: https(hireRaw.bookingUrl),
        cvUrl: https(hireRaw.cvUrl),
      }
    : undefined;
  // Endorsements are reviewed by an admin before they are added, and only from real GitHub handles.
  const endorsements = Array.isArray(raw.endorsements)
    ? raw.endorsements.slice(0, 20).map((e) => ({
        by: str(e && e.by, 39),
        skill: str(e && e.skill, 60),
        text: str(e && e.text, 400),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(e && e.date)) ? e.date : undefined,
      })).filter((e) => e.by && HANDLE_RE.test(e.by.toLowerCase()) && e.skill && e.text && e.date)
    : undefined;
  const out = {
    headline: str(raw.headline, 140),
    bio: str(raw.bio, 600),
    timezone: str(raw.timezone, 60),
    links,
    featuredWork: featuredWork && featuredWork.length ? featuredWork : undefined,
    credentials: credentials && credentials.length ? credentials : undefined,
    skillsDeclared: strList(raw.skillsDeclared, 30, 40),
    hire,
    endorsements: endorsements && endorsements.length ? endorsements : undefined,
  };
  return Object.values(out).some((v) => v !== undefined) ? out : null;
}

function readExtras(siteDir) {
  const dir = path.join(siteDir, 'src', 'data', 'profiles');
  const map = new Map();
  if (!fs.existsSync(dir)) return map;
  for (const file of fs.readdirSync(dir)) {
    // Files starting with an underscore are examples and are never published.
    if (!file.endsWith('.json') || file.startsWith('_')) continue;
    const handle = file.slice(0, -5).toLowerCase();
    if (!HANDLE_RE.test(handle)) continue;
    try {
      const extras = cleanExtras(JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')));
      if (extras) map.set(handle, extras);
    } catch (err) {
      console.warn(`[developer-profiles] ${file} is not valid JSON, ignored:`, String(err.message || err));
    }
  }
  return map;
}

/** The share image is made by the og edge function. The date in the URL gives new shares fresh numbers despite LinkedIn's cache. */
function ogImageFor(handle, builtAt) {
  return SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/og?handle=${handle}&d=${String(builtAt).slice(0, 10)}` : null;
}

function githubHandleOf(author) {
  const gh = author && author.socials && author.socials.github;
  if (typeof gh === 'string' && gh) return gh.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '').toLowerCase();
  const url = author && author.url;
  if (typeof url === 'string') {
    const m = url.match(/github\.com\/([A-Za-z0-9-]+)/i);
    if (m) return m[1].toLowerCase();
  }
  return null;
}

module.exports = function developerProfilesPlugin(context) {
  return {
    name: 'developer-profiles',

    async loadContent() {
      try {
        const res = await fetch(`${BACKEND}/api/leaderboard`, { signal: AbortSignal.timeout(25000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list = Array.isArray(json.leaderboard) ? json.leaderboard : Array.isArray(json.contributors) ? json.contributors : [];
        return { contributors: list, builtAt: new Date().toISOString() };
      } catch (err) {
        console.warn('[developer-profiles] leaderboard unavailable, only the fallback page and extras profiles are built:', String(err.message || err));
        return { contributors: [], builtAt: new Date().toISOString() };
      }
    },

    async allContentLoaded({ allContent, actions }) {
      const own = allContent['developer-profiles'] && allContent['developer-profiles'].default;
      const { contributors = [], builtAt = new Date().toISOString() } = own || {};
      const extrasByHandle = readExtras(context.siteDir);

      // Blog posts by GitHub handle
      const blog = allContent['docusaurus-plugin-content-blog'];
      const posts = (blog && blog.default && blog.default.blogPosts) || [];
      const postsByHandle = new Map();
      for (const p of posts) {
        const m = p.metadata;
        if (m.unlisted) continue;
        const fm = m.frontMatter || {};
        for (const a of m.authors || []) {
          const handles = new Set([githubHandleOf(a), a.key && String(a.key).toLowerCase()].filter(Boolean));
          for (const h of handles) {
            if (!postsByHandle.has(h)) postsByHandle.set(h, []);
            postsByHandle.get(h).push({
              title: m.title,
              permalink: m.permalink,
              date: m.date instanceof Date ? m.date.toISOString() : String(m.date),
              image: typeof fm.image === 'string' ? fm.image : undefined,
            });
          }
        }
      }

      // Rank among people, best first (bots are left out, like on the leaderboard)
      const people = contributors
        .filter((c) => c && typeof c.username === 'string' && !EXCLUDED.has(c.username.toLowerCase()))
        .sort((a, b) => (b.points || 0) - (a.points || 0));

      const seen = new Set();
      const sites = [];
      people.forEach((c, i) => {
        const handle = c.username.toLowerCase();
        if (!HANDLE_RE.test(handle) || seen.has(handle)) return;
        seen.add(handle);
        const details = (Array.isArray(c.prDetails) ? c.prDetails : [])
          .filter((d) => d && d.url && d.mergedAt)
          .sort((a, b) => String(b.mergedAt).localeCompare(String(a.mergedAt)));
        const extras = extrasByHandle.get(handle) || null;
        const prs = Number(c.prs) || details.length;
        sites.push({
          handle,
          username: c.username,
          avatar: String(c.avatar || `https://github.com/${c.username}.png`),
          rank: i + 1,
          points: Number(c.points) || 0,
          prs,
          recentPrs: details.slice(0, 5).map((d) => ({ title: String(d.title), url: String(d.url), number: Number(d.number) || 0, repo: String(d.repoName || ''), mergedAt: String(d.mergedAt) })),
          repos: [...new Set(details.map((d) => d.repoName).filter(Boolean))].slice(0, 12),
          firstPrAt: details.length ? details[details.length - 1].mergedAt : null,
          posts: (postsByHandle.get(handle) || []).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6),
          extras,
          indexable: prs >= MIN_PRS_TO_INDEX && Boolean(extras && (extras.headline || extras.bio)),
          ogImage: ogImageFor(handle, builtAt),
          builtAt,
        });
      });

      // People who wrote an extras file but are not on the leaderboard yet still get a page.
      for (const [handle, extras] of extrasByHandle) {
        if (seen.has(handle)) continue;
        seen.add(handle);
        sites.push({
          handle, username: handle, avatar: `https://github.com/${handle}.png`, rank: 0, points: 0, prs: 0,
          recentPrs: [], repos: [], firstPrAt: null, posts: postsByHandle.get(handle) || [], extras, indexable: false, ogImage: ogImageFor(handle, builtAt), builtAt,
        });
      }

      for (const site of sites) {
        const dataPath = await actions.createData(`profile-${site.handle}.json`, JSON.stringify(site));
        actions.addRoute({
          path: `/u/${site.handle}`,
          component: '@site/src/components/profile/ProfilePage',
          exact: true,
          modules: { site: dataPath },
        });
      }

      // The list of handles that have a page, so other parts of the site only link to profiles that exist
      actions.setGlobalData({ handles: sites.map((x) => x.handle) });

      // Fallback for any other handle. Never indexed.
      actions.addRoute({ path: '/u/_', component: '@site/src/components/profile/ProfilePage', exact: true });
      console.log(`[developer-profiles] built ${sites.length} profile pages`);
    },
  };
};
