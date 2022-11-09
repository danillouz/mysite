import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"

import { remarkReadingTime } from "./src/plugins/reading-time"

// https://astro.build/config
export default defineConfig({
  site: "https://www.danillouz.dev",
  integrations: [
    sitemap(),
    tailwind(),
    mdx({
      extendDefaultPlugins: true,
      remarkPlugins: [remarkReadingTime],
    }),
  ],
})
