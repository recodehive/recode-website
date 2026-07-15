/**
 * Wraps @docusaurus/plugin-content-blog to expose the latest posts as
 * global data, so homepage components can render them via usePluginData.
 * Registered in docusaurus.config.ts in place of the preset's blog
 * (preset blog is set to false) with the same options.
 */
const path = require("path");
const fs = require("fs");
const blogPluginExports = require("@docusaurus/plugin-content-blog");

const defaultBlogPlugin = blogPluginExports.default;

// Posts don't set an `image` frontmatter, so fall back to the first
// image referenced in the post body for the card cover
function extractFirstImage(content) {
  if (!content) return undefined;
  const markdownImage = content.match(/!\[[^\]]*\]\(\s*([^)\s]+)/);
  if (markdownImage) return markdownImage[1];
  const htmlImage = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return htmlImage ? htmlImage[1] : undefined;
}

// Covers referenced relative to the post folder (e.g. ./assets/x.png) aren't
// served outside the post page, so copy them into static/ and return that URL.
// Generated files live in static/img/blog-covers/ (gitignored).
function resolveCover(post, siteDir) {
  const raw =
    post.metadata.frontMatter?.image || extractFirstImage(post.content);
  if (!raw) return undefined;
  if (/^(https?:)?\/\//i.test(raw) || raw.startsWith("/")) return raw;

  try {
    const sourcePath = post.metadata.source.replace(/^@site[\\/]/, "");
    const postDir = path.dirname(path.join(siteDir, sourcePath));
    const imagePath = path.resolve(postDir, raw);
    if (!fs.existsSync(imagePath)) return undefined;

    const coversDir = path.join(siteDir, "static", "img", "blog-covers");
    const fileName = `${path.basename(postDir)}-${path.basename(imagePath)}`;
    fs.mkdirSync(coversDir, { recursive: true });
    fs.copyFileSync(imagePath, path.join(coversDir, fileName));
    return `/img/blog-covers/${fileName}`;
  } catch {
    return undefined;
  }
}

async function blogPluginEnhanced(context, options) {
  const blogPlugin = await defaultBlogPlugin(context, options);

  return {
    ...blogPlugin,
    async contentLoaded(args) {
      await blogPlugin.contentLoaded?.(args);

      const { content, actions } = args;
      const recentPosts = [...content.blogPosts]
        .sort(
          (a, b) =>
            new Date(b.metadata.date).getTime() -
            new Date(a.metadata.date).getTime(),
        )
        .slice(0, 4)
        .map((post) => {
          const author = post.metadata.authors?.[0];
          return {
            title: post.metadata.title,
            permalink: post.metadata.permalink,
            date: post.metadata.date,
            readingTime: post.metadata.readingTime,
            image: resolveCover(post, context.siteDir),
            author: author
              ? {
                  name: author.name,
                  handle: author.key || author.name,
                  imageURL: author.imageURL,
                }
              : null,
          };
        });

      actions.setGlobalData({ recentPosts });
    },
  };
}

module.exports = {
  ...blogPluginExports,
  default: blogPluginEnhanced,
};
