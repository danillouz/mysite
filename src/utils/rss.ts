import type { CollectionEntry } from "astro:content"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"

const parser = new MarkdownIt()

export function sortRssPostsRecentlyPublished(
  posts: CollectionEntry<"posts">[]
) {
  return posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  })
}

export function renderPostContent(body: string) {
  return sanitizeHtml(parser.render(body), {
    // See: https://github.com/apostrophecms/sanitize-html#filters
    exclusiveFilter: (node) => {
      if (
        node.tag === "p" &&
        node.text.trim() === `import { Image } from 'astro:assets'`
      ) {
        // Remove Image import.
        return true
      }

      if (node.tag === "p" && node.text.trim().startsWith(`<figure>`)) {
        // Remove figure element.
        return true
      }

      return false
    },
  })
}
