const { visit } = require("unist-util-visit");

// Blog posts only. Removes a leading emoji from heading text, so headings and the contents list stay clean.
// It runs before Docusaurus builds the table of contents, so the contents list is clean too.
const LEADING_EMOJI = /^[\s‍️]*(?:\p{Extended_Pictographic}[‍️\u{1F3FB}-\u{1F3FF}]*\s*)+/u;

export default function stripHeadingEmoji() {
  return (tree: unknown) => {
    visit(tree, "heading", (node: { children?: { type: string; value?: string }[] }) => {
      const first = node.children?.[0];
      if (first && first.type === "text" && typeof first.value === "string") {
        first.value = first.value.replace(LEADING_EMOJI, "");
      }
    });
  };
}
