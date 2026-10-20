// Exposes every blog post to the /blogs listing page as global data, so the page never needs a
// hardcoded post list. Reads the blog plugin's content after it has loaded.
const path = require('path');

function githubOf(author) {
  const gh = author.socials && author.socials.github;
  if (gh) return `https://github.com/${gh}`;
  if (author.url && /github\.com/i.test(author.url)) return author.url;
  return undefined;
}

module.exports = function blogListingPlugin() {
  return {
    name: 'blog-listing',
    async allContentLoaded({ allContent, actions }) {
      const blog = allContent['docusaurus-plugin-content-blog'];
      const posts = (blog && blog.default && blog.default.blogPosts) || [];

      const out = posts
        .filter((p) => !p.metadata.unlisted)
        .map((p) => {
          const m = p.metadata;
          const fm = m.frontMatter || {};
          return {
            id: p.id,
            folder: path.basename(path.dirname(m.source.replace(/^@site[\\/]/, ''))),
            title: m.title,
            permalink: m.permalink,
            description: m.description || '',
            date: m.date instanceof Date ? m.date.toISOString() : String(m.date),
            readingTime: Math.max(1, Math.ceil(m.readingTime || 1)),
            image: typeof fm.image === 'string' ? fm.image : undefined,
            category: typeof fm.category === 'string' ? fm.category : undefined,
            featured: fm.featured === true,
            tags: (m.tags || []).map((t) => ({ label: t.label, permalink: t.permalink })),
            authors: (m.authors || []).map((a) => ({
              key: a.key || a.name,
              name: a.name,
              imageURL: a.imageURL,
              github: githubOf(a),
            })),
          };
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      actions.setGlobalData({ posts: out });
    },
  };
};
