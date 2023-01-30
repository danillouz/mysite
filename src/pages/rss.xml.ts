import rss, { pagesGlobToRssItems } from "@astrojs/rss"
import * as config from "@config"
import { sortRssPostsRecentlyPublished } from "@utils/rss"

import type { RssItem } from "@types"

// See: https://docs.astro.build/en/guides/rss/

const items: RssItem[] = await pagesGlobToRssItems(
  import.meta.glob("./posts/**/*.mdx")
)

export async function get() {
  return rss({
    title: config.RSS_TITLE,
    description: config.RSS_DESCRIPTION,
    site: import.meta.env.SITE,
    stylesheet: "/rss-styles.xsl",
    customData: `<language>en-us</language>`,
    items: sortRssPostsRecentlyPublished(items),
  })
}
