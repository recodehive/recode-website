// Fetches real GitHub Discussions at build time so no token ever reaches the browser.
// Needs GITHUB_TOKEN (or DOCUSAURUS_GIT_TOKEN) in the build environment. Without one, or if the
// API fails, the plugin exposes `ok: false` and the page shows its empty state.
const OWNER = 'recodehive';
const REPO = 'recode-website';

const QUERY = `
query($owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    discussionCategories(first: 30) { nodes { name emojiHTML isAnswerable } }
    pinnedDiscussions(first: 10) { nodes { discussion { number } } }
    discussions(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
      nodes {
        number title url bodyText createdAt updatedAt upvoteCount answerChosenAt
        category { name emojiHTML isAnswerable }
        labels(first: 3) { nodes { name } }
        author { login avatarUrl }
        comments(first: 3) { totalCount nodes { author { login avatarUrl } } }
      }
    }
  }
}`;

const clean = (s) => String(s || '').replace(/\\/g, '');
const emojiOf = (html) => String(html || '').replace(/<[^>]*>/g, '').trim();
const avatar = (a) => (a ? { login: a.login, avatarUrl: a.avatarUrl } : null);

function normalise(repo) {
  const pinned = new Set(repo.pinnedDiscussions.nodes.map((n) => n.discussion.number));
  const categories = repo.discussionCategories.nodes.map((c) => ({
    name: clean(c.name),
    emoji: emojiOf(c.emojiHTML),
    isAnswerable: c.isAnswerable,
  }));
  const discussions = repo.discussions.nodes.map((d) => {
    const seen = new Set();
    const participants = [];
    for (const c of d.comments.nodes) {
      if (c.author && !seen.has(c.author.login)) {
        seen.add(c.author.login);
        participants.push(avatar(c.author));
      }
    }
    return {
      number: d.number,
      title: d.title,
      url: d.url,
      excerpt: d.bodyText.replace(/\s+/g, ' ').trim().slice(0, 200),
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      upvotes: d.upvoteCount,
      pinned: pinned.has(d.number),
      category: { name: clean(d.category.name), emoji: emojiOf(d.category.emojiHTML), isAnswerable: d.category.isAnswerable },
      answered: d.category.isAnswerable && d.answerChosenAt != null,
      labels: d.labels.nodes.map((l) => l.name),
      author: avatar(d.author),
      replies: d.comments.totalCount,
      participants,
    };
  });
  return { categories, discussions };
}

module.exports = function githubDiscussionsPlugin() {
  return {
    name: 'github-discussions',
    async loadContent() {
      const empty = { ok: false, fetchedAt: new Date().toISOString(), categories: [], discussions: [] };
      const token = process.env.GITHUB_TOKEN || process.env.DOCUSAURUS_GIT_TOKEN;
      if (!token) {
        console.warn('[github-discussions] no GITHUB_TOKEN set, the page will show its empty state');
        return empty;
      }
      try {
        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'recode-hive-site' },
          body: JSON.stringify({ query: QUERY, variables: { owner: OWNER, repo: REPO } }),
          signal: AbortSignal.timeout(20000),
        });
        const json = await res.json();
        if (!res.ok || json.errors || !json.data) throw new Error(JSON.stringify(json.errors || res.status));
        return { ok: true, fetchedAt: new Date().toISOString(), ...normalise(json.data.repository) };
      } catch (err) {
        console.warn('[github-discussions] fetch failed:', String(err.message || err).slice(0, 200));
        return empty;
      }
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
