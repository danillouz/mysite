import { getCollection } from "astro:content"
import * as config from "@config"
import { sortRssPostsRecentlyPublished, renderPostContent } from "@utils/rss"

import type { APIRoute } from "astro"
import type { JSONFeed } from "src/types"

// See: https://docs.astro.build/en/guides/rss/

export const get: APIRoute = async function get() {
  const site = import.meta.env.SITE
  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  const feed: JSONFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: config.PAGES.POSTS.TITLE,
    description: config.PAGES.POSTS.DESCRIPTION,
    home_page_url: site,
    feed_url: `${site}/posts.json`,
    favicon: `${site}/favicon-32.png`,
    authors: [
      {
        name: config.FULL_NAME,
      },
    ],
    language: "en-US",
    items: postsSorted.map((post) => {
      const url = `${site}/posts/${post.slug}/`
      return {
        id: url,
        url,
        title: post.data.title,
        summary: post.data.description,
        content_html: renderPostContent(post.body),
        date_published: post.data.publishedAt.toISOString(),
        date_modified: post.data?.updatedAt?.toISOString(),
        tags: post.data.tags,
      }
    }),
  }
  return {
    body: JSON.stringify(feed),
  }
}
