import * as config from "@config"
import { renderPostContent, sortRssPostsRecentlyPublished } from "@utils/rss"
import { getAlphabeticallySortedTagsFromPosts } from "@utils/tags"
import { getCollection } from "astro:content"

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

export const GET: APIRoute = async function ({ params }) {
  const site = import.meta.env.SITE
  const { tag } = params

  const feed: JSONFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: config.FULL_NAME,
    description: `${config.PAGES.TAG.DESCRIPTION} ${tag}`,
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
    return new Response(
      JSON.stringify({
        body: feed,
      })
    )
  }

  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  const postsForTag = postsSorted.filter((post) => {
    const { tags = [] } = post.data
    return tags.includes(tag)
  })

  return new Response(
    JSON.stringify({
      body: {
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
      },
    })
  )
}
