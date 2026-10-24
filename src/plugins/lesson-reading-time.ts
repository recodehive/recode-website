const { visit } = require("unist-util-visit");

// Docs only. Counts the words in a lesson's prose and hands the number to its <LessonHeader>, so the
// "min read" label is computed from the page and never typed in by hand. Pages without a LessonHeader are untouched.
type MdNode = { type: string; value?: string; name?: string; attributes?: unknown[] };

export default function lessonReadingTime() {
  return (tree: unknown) => {
    let words = 0;
    visit(tree, "text", (node: MdNode) => {
      words += (node.value ?? "").split(/\s+/).filter(Boolean).length;
    });
    visit(tree, "mdxJsxFlowElement", (node: MdNode) => {
      if (node.name === "LessonHeader") {
        node.attributes = [...(node.attributes ?? []), { type: "mdxJsxAttribute", name: "proseWords", value: String(words) }];
      }
    });
  };
}
