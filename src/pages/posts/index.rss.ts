import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import * as config from "@config"
import { sortRssPostsRecentlyPublished, renderPostContent } from "@utils/rss"

// See: https://docs.astro.build/en/guides/rss/

export async function get() {
  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  return rss({
    title: config.RSS_TITLE,
    description: config.RSS_DESCRIPTION,
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: postsSorted.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.description,
        link: `/posts/${post.slug}/`,
        content: renderPostContent(post.body),
      }
    }),
  })
}