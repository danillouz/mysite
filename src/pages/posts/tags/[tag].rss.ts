import rss from "@astrojs/rss"
import * as config from "@config"
import { renderPostContent, sortRssPostsRecentlyPublished } from "@utils/rss"
import { getAlphabeticallySortedTagsFromPosts } from "@utils/tags"
import { getCollection } from "astro:content"

import type { RSSOptions } from "@astrojs/rss"
import type { APIRoute } from "astro"

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

export const GET: APIRoute = async function ({ params }) {
  const { tag } = params

  const options: RSSOptions = {
    title: config.FULL_NAME,
    description: `${config.PAGES.TAG.DESCRIPTION} ${tag}`,
    site: import.meta.env.SITE,
    customData: `<language>en-us</language>`,
    items: [],
  }

  if (!tag) {
    return rss(options)
  }

  const posts = await getCollection("posts")
  const postsSorted = sortRssPostsRecentlyPublished(posts)
  const postsForTag = postsSorted.filter((post) => {
    const { tags = [] } = post.data
    return tags.includes(tag)
  })
  return rss({
    ...options,
    items: postsForTag.map((post) => {
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
