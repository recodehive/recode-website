// Counts the words in each Learn lesson at build time.
// Lessons under MIN_WORDS are listed in a build warning and exposed as global data,
// so the lesson page can render <meta name="robots" content="noindex"> for them.
const fs = require('fs');
const path = require('path');

const MIN_WORDS = 300;

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
      if (!fs.existsSync(learnDir)) return { counts, thin: [], min: MIN_WORDS };

      for (const file of walk(learnDir)) {
        const rel = path.relative(learnDir, file).split(path.sep).join('/');
        // index pages are the catalog and course overviews, not lessons
        if (/(^|\/)index\.mdx?$/.test(rel)) continue;
        const key = rel.replace(/\.mdx?$/, '');
        counts[key] = countWords(fs.readFileSync(file, 'utf8'));
      }

      const thin = Object.keys(counts).filter((k) => counts[k] < MIN_WORDS);
      return { counts, thin, min: MIN_WORDS };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
      if (content.thin.length > 0) {
        console.warn(
          `[learn] ${content.thin.length} lesson(s) have fewer than ${content.min} words and will be noindex:\n` +
            content.thin.map((k) => `  - ${k} (${content.counts[k]} words)`).join('\n'),
        );
      }
    },
  };
};
