import rehypePrettyCode from "rehype-pretty-code"

// Taken from: https://github.com/shikijs/shiki/blob/main/packages/shiki/themes/github-light.json
import githubLight from "./themes/github-light.json"

// Taken from: https://github.com/shikijs/shiki/blob/main/packages/shiki/themes/github-dark.json
import githubDark from "./themes/github-dark.json"

// See: https://rehype-pretty-code.netlify.app
const options = {
  // This will generate 2 shiki blocks, and one is hidden based on the preferred
  // color scheme in `base.css.
  //
  // See: https://github.com/shikijs/shiki/blob/main/docs/themes.md#2-generate-two-shiki-code-blocks-one-for-each-theme
  theme: {
    light: githubLight,
    dark: githubDark,
  },

  keepBackground: false,

  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ]
    }
  },

  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted")
  },

  onVisitHighlightedWord(node) {
    node.properties.className = ["highlighted-word"]
  },

  tokensMap: {},
}

export const codeSnippets = [rehypePrettyCode, options]
