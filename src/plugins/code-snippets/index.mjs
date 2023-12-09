import rehypePrettyCode from "rehype-pretty-code"

// https://rehype-pretty-code.netlify.app/#options
const options = {
  defaultLang: "plaintext",
  keepBackground: false,
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
}

export const codeSnippets = [rehypePrettyCode, options]
