import rehypePrettyCode from "rehype-pretty-code"

// Needs shiki as a dependency
// See: https://rehype-pretty.pages.dev/#installation

// See: https://rehype-pretty-code.netlify.app/#options
const options = {
  defaultLang: "plaintext",
  keepBackground: false,
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
}

export const codeSnippets = [rehypePrettyCode, options]
