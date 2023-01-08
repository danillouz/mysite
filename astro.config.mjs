import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import image from "@astrojs/image"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import autolinkHeadings from "rehype-autolink-headings"
import { h } from "hastscript"

import { remarkReadingTime } from "./src/plugins/reading-time"

// See: https://astro.build/config
export default defineConfig({
  site: "https://www.danillouz.dev",

  markdown: {
    syntaxHighlight: "shiki",

    // See: https://docs.astro.build/en/guides/markdown-content/#syntax-highlighting
    shikiConfig: {
      // See: https://github.com/shikijs/shiki/blob/main/docs/themes.md
      //
      // For CSS var values see: `src/styles/base.css`
      theme: "css-variables",

      wrap: false,
    },

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
      extendPlugins: "markdown",
      extendDefaultPlugins: true,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeHeadingIds,
        [
          autolinkHeadings,
          {
            behavior: "append",
            content: () => [
              h(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 16 16",
                  fill: "currentcolor",
                  width: 16,
                  height: 16,
                },
                h("path", {
                  "fill-rule": "evenodd",
                  fill: "currentcolor",
                  d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
                })
              ),
            ],
          },
        ],
      ],
    }),

    // See: https://docs.astro.build/en/guides/integrations-guide/image
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
})
