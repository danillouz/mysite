import type { MDXInstance } from "astro"
import type { Frontmatter } from "@types"

export function sortTagsAlphabetically(tags: string[]): string[] {
  return tags.sort((a, b) => a.localeCompare(b))
}

export function getAlphabeticallySortedTagsFromPosts(
  posts: MDXInstance<Frontmatter>[]
): string[] {
  const allTags = posts.map((p) => p.frontmatter.tags ?? []).flat()
  const tags = Array.from(new Set(allTags))
  const sorted = sortTagsAlphabetically(tags)
  return sorted
}
