import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

// See: https://astro.build/config
export default defineConfig({
  site: "https://www.danillouz.dev",
  integrations: [mdx(), sitemap()],
})
