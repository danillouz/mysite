import type { Frontmatter } from "@types"

export function sortRssPostsRecentlyPublished(
  posts: { url: string; frontmatter: Frontmatter }[]
) {
  return posts.sort((a, b) => {
    const pubDateA = a.frontmatter.publishedAt ?? new Date()
    const pubDateB = b.frontmatter.publishedAt ?? new Date()
    return new Date(pubDateB).getTime() - new Date(pubDateA).getTime()
  })
}
