import * as fs from "fs";
import * as path from "path";

module.exports = function blogReadingTimePlugin(context: any) {
  return {
    name: "blog-reading-time-plugin",
    async loadContent() {
      const readingTimes: Record<string, number> = {};

      const blogCacheDir = path.join(
        context.siteDir,
        ".docusaurus",
        "docusaurus-plugin-content-blog",
        "default"
      );

      if (!fs.existsSync(blogCacheDir)) return readingTimes;

      const files = fs.readdirSync(blogCacheDir).filter(
        (f) => f.startsWith("site-blog-") && f.endsWith(".json")
      );

      for (const file of files) {
        try {
          const raw = fs.readFileSync(path.join(blogCacheDir, file), "utf-8");
          const data = JSON.parse(raw);
          const metadata = data?.metadata;
          if (!metadata) continue;
          const permalink: string = metadata.permalink ?? "";
          const readingTime: number = metadata.readingTime ?? 0;
          if (!permalink) continue;
          const slug = permalink.replace(/^\/blog\//, "").replace(/\/$/, "");
          readingTimes[slug] = Math.max(1, Math.ceil(readingTime));
        } catch {
          // skip malformed files
        }
      }

      return readingTimes;
    },
    async contentLoaded({ content, actions }: any) {
      actions.setGlobalData(content);
    },
  };
};