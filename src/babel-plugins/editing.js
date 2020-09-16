const TAGS_TO_REPLACE = ["p"];
const INPUT_IDENTIFIER = "__CC_Input__";

const { relative } = require("path");

module.exports = ({ types: t }) => {
  return {
    visitor: {
      // Add the import statement at the top each time so that if we needed, we can get it
      Program(path) {
        const importStatement = t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(INPUT_IDENTIFIER))],
          t.stringLiteral("copycat/ui/Input")
        );
        path.node.body.splice(0, 0, importStatement);
      },
      // If we find a tag that matches, then add a custom input element as a child and pass
      // the tag's children to the input as children
      JSXElement(path, state) {
        if (!TAGS_TO_REPLACE.includes(path.node.openingElement.name.name)) {
          return;
        }
        const filename = relative(__dirname, state.file.opts.filename);
        const { line, column } = path.node.loc.start;
        path.node.children = [
          t.jSXElement(
            t.jSXOpeningElement(t.jSXIdentifier(INPUT_IDENTIFIER), [
              t.jSXAttribute(
                t.jSXIdentifier("id"),
                t.stringLiteral(`${filename}:${line}:${column}`)
              ),
            ]),
            t.jSXClosingElement(t.jSXIdentifier(INPUT_IDENTIFIER)),
            path.node.children
          ),
        ];
      },
    },
  };
};
