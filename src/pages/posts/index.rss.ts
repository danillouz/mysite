import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import * as config from "@config"
import { sortRssPostsRecentlyPublished, renderPostContent } from "@utils/rss"

import type { APIRoute } from "astro"

// See: https://docs.astro.build/en/guides/rss/

export const get: APIRoute = async function get() {
  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  return rss({
    title: `RSS feed for ${config.PAGES.POSTS.TITLE}`,
    description: config.PAGES.POSTS.DESCRIPTION,
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
