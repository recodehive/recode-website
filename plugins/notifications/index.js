// Reads src/data/notifications.txt at build time and exposes it as global data for the
// dashboard Notifications popup. The file is plain text so anyone can add a notification
// from the GitHub editor. Blocks with a missing title, message or date, or a link that is not
// http(s) or a site path, are skipped with a warning.
const fs = require('fs');
const path = require('path');

const FIELDS = ['title', 'message', 'date', 'link'];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parse(source) {
  const items = [];
  const skipped = [];

  const blocks = source
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith('#'))
    .join('\n')
    .split(/\n\s*\n/);

  for (const block of blocks) {
    if (!block.trim()) continue;

    const entry = {};
    let last = null;
    for (const line of block.split('\n')) {
      const match = line.match(/^\s*(\w+)\s*:\s*(.*)$/);
      const key = match && match[1].toLowerCase();
      if (key && FIELDS.includes(key)) {
        entry[key] = match[2].trim();
        last = key;
      } else if (last && line.trim()) {
        // a long message wrapped onto the next line
        entry[last] = `${entry[last]} ${line.trim()}`;
      }
    }

    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') && !Number.isNaN(Date.parse(entry.date));
    const validLink = !entry.link || /^(https?:\/\/|\/)/.test(entry.link);
    if (!entry.title || !entry.message || !validDate || !validLink) {
      skipped.push(entry.title || block.trim().split('\n')[0]);
      continue;
    }

    items.push({
      id: `${entry.date}-${slug(entry.title)}`,
      title: entry.title,
      message: entry.message,
      date: entry.date,
      link: entry.link || undefined,
    });
  }

  // newest first, even if someone adds a block at the bottom of the file
  items.sort((a, b) => b.date.localeCompare(a.date));
  return { items, skipped };
}

module.exports = function notificationsPlugin(context) {
  const file = path.join(context.siteDir, 'src', 'data', 'notifications.txt');

  return {
    name: 'notifications',

    getPathsToWatch() {
      return [file];
    },

    async loadContent() {
      if (!fs.existsSync(file)) return { items: [] };

      const { items, skipped } = parse(fs.readFileSync(file, 'utf8'));
      if (skipped.length > 0) {
        console.warn(
          `[notifications] skipped ${skipped.length} block(s) in src/data/notifications.txt. ` +
            'Each one needs a title, a message and a date like 2026-10-21, ' +
            'and a link has to start with https:// or /:\n' +
            skipped.map((s) => `  - ${s}`).join('\n'),
        );
      }
      return { items };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
