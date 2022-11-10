import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import autolinkHeadings from "rehype-autolink-headings"
import { h } from "hastscript"

import { remarkReadingTime } from "./src/plugins/reading-time"

// See: https://astro.build/config
export default defineConfig({
  site: "https://www.danillouz.dev",
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
      extendDefaultPlugins: true,
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        [
          autolinkHeadings,
          {
            behavior: "append",
            content: () => [
              h(
                "svg",
                {
                  xlmns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  width: 20,
                  height: 20,
                },
                h("path", {
                  fillRule: "evenodd",
                  d: "M11.097 1.515a.75.75 0 01.589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 111.47.294L16.665 7.5h3.585a.75.75 0 010 1.5h-3.885l-1.2 6h3.585a.75.75 0 010 1.5h-3.885l-1.08 5.397a.75.75 0 11-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 01-1.47-.294l1.02-5.103H3.75a.75.75 0 110-1.5h3.885l1.2-6H5.25a.75.75 0 010-1.5h3.885l1.08-5.397a.75.75 0 01.882-.588zM10.365 9l-1.2 6h4.47l1.2-6h-4.47z",
                  clipRule: "evenodd",
                })
              ),
            ],
          },
        ],
      ],
    }),
  ],
})
