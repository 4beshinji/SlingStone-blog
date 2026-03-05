import { visit } from "unist-util-visit";

export function rehypeFigure() {
  return tree => {
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName !== "img" ||
        !node.properties?.alt ||
        parent?.tagName === "figure"
      )
        return;

      const caption = String(node.properties.alt);

      const figure = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          node,
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: [{ type: "text", value: caption }],
          },
        ],
      };

      parent.children[index] = figure;
    });
  };
}
