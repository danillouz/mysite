import type { CollectionEntry } from "astro:content"

export function sortRssPostsRecentlyPublished(
  posts: CollectionEntry<"posts">[]
) {
  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  })
}
