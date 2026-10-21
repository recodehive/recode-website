import clsx from "clsx";
import type { Props } from "@theme/TOC";
import ContentsCard from "../../components/blogPost/ContentsCard";

/**
 * The right-hand contents list for docs and learn pages. It is the same card as the blog posts, with a real
 * read progress bar and the active section highlighted. (Blog posts render their own card in BlogPostPage.)
 */
export default function TOC({ className, toc, minHeadingLevel = 2, maxHeadingLevel = 3 }: Props): JSX.Element | null {
  const items = toc.filter((t) => t.level >= minHeadingLevel && t.level <= maxHeadingLevel);
  if (items.length === 0) return null;
  return (
    // The wrapper is what sticks, because its parent column is as tall as the page
    <div className={clsx(className)} style={{ position: "sticky", top: "calc(var(--ifm-navbar-height, 60px) + 1rem)" }}>
      <ContentsCard toc={items} articleId="doc-article" variant="docs" />
    </div>
  );
}
