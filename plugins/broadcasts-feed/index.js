// Reads YouTube's public RSS feeds at build time to learn when each video was published.
// No API key is involved and nothing from YouTube is requested in the visitor's browser.
// If a feed cannot be reached the page still builds; videos just have no date.
const CHANNEL_ID = 'UCXUJJNoP1QupwsYIWFXmsZg';
const PLAYLIST_ID = 'PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63';
const FEEDS = [
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
  `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`,
];

function parse(xml) {
  const out = {};
  const entries = xml.split('<entry>').slice(1);
  for (const e of entries) {
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(e)?.[1];
    const published = /<published>([^<]+)<\/published>/.exec(e)?.[1];
    if (id && published) out[id] = published;
  }
  return out;
}

module.exports = function broadcastsFeedPlugin() {
  return {
    name: 'broadcasts-feed',
    async loadContent() {
      const dates = {};
      for (const url of FEEDS) {
        try {
          const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          Object.assign(dates, parse(await res.text()));
        } catch (err) {
          console.warn('[broadcasts-feed] feed failed:', String(err.message || err).slice(0, 120));
        }
      }
      return { dates };
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
