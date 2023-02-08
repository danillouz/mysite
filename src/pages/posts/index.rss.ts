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
    title: config.PAGES.POSTS.TITLE,
    description: config.PAGES.POSTS.DESCRIPTION,
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: postsSorted.map((post) => {
      return {
        link: `/posts/${post.slug}/`,
        title: post.data.title,
        description: post.data.description,
        content: renderPostContent(post.body),
        pubDate: post.data.publishedAt,
      }
    }),
  })
}
