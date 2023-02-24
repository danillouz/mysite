import { getCollection } from "astro:content"
import rss from "@astrojs/rss"
import * as config from "@config"
import { getAlphabeticallySortedTagsFromPosts } from "@utils/tags"
import { sortRssPostsRecentlyPublished, renderPostContent } from "@utils/rss"

import type { APIRoute } from "astro"
import type { RSSOptions } from "@astrojs/rss"

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
  const { tag } = params

  const options: RSSOptions = {
    title: `${config.PAGES.TAG.TITLE} ${tag}`,
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
