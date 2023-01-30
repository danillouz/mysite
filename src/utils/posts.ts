import type { MDXInstance } from "astro"
import type { Frontmatter } from "@types"

export function sortPostsRecentlyPublished(posts: MDXInstance<Frontmatter>[]) {
  return posts.sort((a, b) => {
    const pubDateA = a.frontmatter.pubDate ?? new Date()
    const pubDateB = b.frontmatter.pubDate ?? new Date()
    return new Date(pubDateB).getTime() - new Date(pubDateA).getTime()
  })
}
