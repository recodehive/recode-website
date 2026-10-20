// Counts the words in each Learn lesson at build time.
// Lessons under MIN_WORDS are listed in a build warning and exposed as global data,
// so the lesson page can render <meta name="robots" content="noindex"> for them.
const fs = require('fs');
const path = require('path');

const MIN_WORDS = 300;
// A skeleton page keeps this marker until real content replaces it. Pages that contain it are drafts.
const TODO_MARKER = 'TODO: write original content';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.mdx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

function countWords(source) {
  const body = source
    .replace(/^---[\s\S]*?---/, '') // frontmatter
    .replace(/```[\s\S]*?```/g, ' ') // code blocks do not count as notes
    .replace(/[#>*_`\[\]()|-]/g, ' ');
  return body.split(/\s+/).filter(Boolean).length;
}

module.exports = function learnWords(context) {
  const learnDir = path.join(context.siteDir, 'learn');

  return {
    name: 'learn-words',

    async loadContent() {
      const counts = {};
      const drafts = [];
      if (!fs.existsSync(learnDir)) return { counts, thin: [], drafts, files: [], unpublished: [], min: MIN_WORDS };

      for (const file of walk(learnDir)) {
        const rel = path.relative(learnDir, file).split(path.sep).join('/');
        // index pages are the catalog and course overviews, not lessons
        if (/(^|\/)index\.mdx?$/.test(rel)) continue;
        const key = rel.replace(/\.mdx?$/, '');
        const source = fs.readFileSync(file, 'utf8');
        counts[key] = countWords(source);
        if (source.includes(TODO_MARKER)) drafts.push(key);
      }

      const thin = Object.keys(counts).filter((k) => counts[k] < MIN_WORDS);
      // Unpublished lessons are not linked, are noindex and are left out of the sitemap.
      const unpublished = Array.from(new Set([...thin, ...drafts]));
      return { counts, thin, drafts, files: Object.keys(counts), unpublished, min: MIN_WORDS };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
      if (content.drafts.length > 0) {
        console.warn(
          `[learn] ${content.drafts.length} lesson(s) are drafts (still contain the TODO marker):\n` +
            content.drafts.map((k) => `  - ${k}`).join('\n'),
        );
      }
      if (content.thin.length > 0) {
        console.warn(
          `[learn] ${content.thin.length} lesson(s) have fewer than ${content.min} words and will be noindex:\n` +
            content.thin.map((k) => `  - ${k} (${content.counts[k]} words)`).join('\n'),
        );
      }
    },
  };
};
