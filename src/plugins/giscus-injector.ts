const { visit } = require("unist-util-visit");

/**
 * Remark plugin to automatically inject GiscusComments component
 * at the end of MDX files that don't already have it
 */
export default function giscusInjector() {
  return (tree) => {
    let hasGiscus = false;

    // Check if GiscusComments already exists
    visit(tree, (node) => {
      // Check JSX elements
      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        if (node.name === "GiscusComments") {
          hasGiscus = true;
        }
      }

      // Check raw JSX strings
      if (
        node.type === "jsx" &&
        node.value &&
        node.value.includes("GiscusComments")
      ) {
        hasGiscus = true;
      }
    });

    // Only inject if not present
    if (!hasGiscus) {
      // Add the component as an MDX JSX element
      tree.children.push({
        type: "mdxJsxFlowElement",
        name: "GiscusComments",
        attributes: [],
        children: [],
      });
    }
  };
}
