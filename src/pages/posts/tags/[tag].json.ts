import { getCollection } from "astro:content"
import * as config from "@config"
import { getAlphabeticallySortedTagsFromPosts } from "@utils/tags"
import { sortRssPostsRecentlyPublished, renderPostContent } from "@utils/rss"

import type { APIRoute } from "astro"
import type { JSONFeed } from "src/types"

export async function getStaticPaths() {
  const posts = await getCollection("posts")
  const tags = getAlphabeticallySortedTagsFromPosts(posts)
  return tags.map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })
}

// See: https://docs.astro.build/en/guides/rss/

export const get: APIRoute = async function get({ params }) {
  const site = import.meta.env.SITE
  const { tag } = params

  const feed: JSONFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${config.PAGES.TAG.TITLE} ${tag}`,
    description: config.PAGES.TAG.DESCRIPTION,
    home_page_url: site,
    feed_url: `${site}/posts/tags/${tag}.json`,
    favicon: `${site}/favicon-32.png`,
    authors: [
      {
        name: config.FULL_NAME,
      },
    ],
    language: "en-US",
    items: [],
  }

  if (!tag) {
    return {
      body: JSON.stringify(feed),
    }
  }

  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  const postsForTag = postsSorted.filter((post) => {
    const { tags = [] } = post.data
    return tags.includes(tag)
  })

  return {
    body: JSON.stringify({
      ...feed,
      items: postsForTag.map((post) => {
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
    }),
  }
}
