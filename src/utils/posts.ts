import type { MDXInstance } from "astro"
import type { Frontmatter } from "@types"

export function sortPostsRecentlyPublished(posts: MDXInstance<Frontmatter>[]) {
  return posts.sort((a, b) => {
    const pubDateA = a.frontmatter.publishedAt ?? new Date()
    const pubDateB = b.frontmatter.publishedAt ?? new Date()
    return new Date(pubDateB).getTime() - new Date(pubDateA).getTime()
  })
}
