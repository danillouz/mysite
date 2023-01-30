import type { RssItem } from "@types"

export function sortRssPostsRecentlyPublished(items: RssItem[]) {
  return items.sort((a, b) => {
    const pubDateA = a.pubDate
    const pubDateB = b.pubDate
    return new Date(pubDateB).getTime() - new Date(pubDateA).getTime()
  })
}
