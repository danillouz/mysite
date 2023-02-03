import type { CollectionEntry } from "astro:content"

export function sortTagsAlphabetically(tags: string[]): string[] {
  return tags.sort((a, b) => a.localeCompare(b))
}

export function getAlphabeticallySortedTagsFromPosts(
  posts: CollectionEntry<"posts">[]
): string[] {
  const allTags = posts.map((p) => p.data.tags ?? []).flat()
  const tags = Array.from(new Set(allTags))
  const sorted = sortTagsAlphabetically(tags)
  return sorted
}
