import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import * as config from "@config"
import { sortRssPostsRecentlyPublished } from "@utils/rss"

// See: https://docs.astro.build/en/guides/rss/

export async function get() {
  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  return rss({
    title: config.RSS_TITLE,
    description: config.RSS_DESCRIPTION,
    site: import.meta.env.SITE,
    stylesheet: "/rss-styles.xsl",
    customData: `<language>en-us</language>`,
    items: postsSorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  })
}
