import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import image from "@astrojs/image"
import preact from "@astrojs/preact"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"

import * as config from "./src/config"
import { remarkReadingTime } from "./src/plugins/reading-time"
import { autolinkHeadings } from "./src/plugins/autolink-headings"
import { codeSnippets } from "./src/plugins/code-snippets"

// See: https://astro.build/config
export default defineConfig({
  site: `https://${config.SITE_DOMAIN}/`,

  markdown: {
    // Syntax highlighting is controlled via custom plugin `codeSnippets`.
    syntaxHighlight: false,

    // See: https://docs.astro.build/en/reference/configuration-reference/#markdownremarkrehype
    remarkRehype: {
      // See: https://github.com/remarkjs/remark-rehype#optionsfootnotelabelproperties
      footnoteLabelProperties: {
        className: [],
      },
    },
  },

  integrations: [
    // See: https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),

    // See: https://docs.astro.build/en/guides/integrations-guide/tailwind/
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),

    // See: https://docs.astro.build/en/guides/integrations-guide/mdx/
    mdx({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [rehypeHeadingIds, autolinkHeadings, codeSnippets],
    }),

    // See: https://docs.astro.build/en/guides/integrations-guide/image/
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),

    // See: https://docs.astro.build/en/guides/integrations-guide/preact/
    preact(),
  ],
})
