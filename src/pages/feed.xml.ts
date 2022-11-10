import rss from "@astrojs/rss"
import { RSS_TITLE, RSS_DESCRIPTION } from "@config"

// See: https://docs.astro.build/en/guides/rss/
export const get = () =>
  rss({
    title: RSS_TITLE,
    description: RSS_DESCRIPTION,
    site: import.meta.env.SITE,
    items: import.meta.glob("./posts/**/*.{md,mdx}"),
    stylesheet: "/rss.xsl",
    customData: ``,
  })
