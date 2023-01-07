import rss from "@astrojs/rss"
import * as config from "@config"
import { sortRssPostsRecentlyPublished } from "@utils/rss"

import type { Frontmatter } from "@types"

// See: https://docs.astro.build/en/guides/rss/

const postImportResult: Record<
  string,
  { url: string; frontmatter: Frontmatter }
> = import.meta.glob("./posts/**/*.mdx", {
  eager: true,
})
const posts = Object.values(postImportResult)
const postsSorted = sortRssPostsRecentlyPublished(posts)

export const get = () => {
  return rss({
    title: config.RSS_TITLE,
    description: config.RSS_DESCRIPTION,
    site: import.meta.env.SITE,
    stylesheet: "/rss-styles.xsl",
    customData: `<language>en-us</language>`,
    items: postsSorted.map((post) => {
      const {
        url: link,
        frontmatter: { title, description, publishedAt },
      } = post
      return {
        link,
        title,
        description,
        pubDate: publishedAt ? new Date(publishedAt) : new Date(),
      }
    }),
  })
}
