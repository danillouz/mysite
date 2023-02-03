import type { CollectionEntry } from "astro:content"

export function sortPostsRecentlyPublished(posts: CollectionEntry<"posts">[]) {
  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  })
}
