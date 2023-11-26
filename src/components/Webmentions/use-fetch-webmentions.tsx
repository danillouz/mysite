import { useEffect, useState } from "preact/hooks"
import { processWebmentions } from "./utils"

import type { Webmention } from "./types"

function useFetchWebmentions(source: string) {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [fetchErr, setFetchErr] = useState<null | Error>(null)
  const [webmentions, setWebmentions] = useState<{
    likes: Webmention[]
    reposts: Webmention[]
    bookmarks: Webmention[]
    mentions: Webmention[]
    replies: Webmention[]
  }>({
    likes: [],
    reposts: [],
    bookmarks: [],
    mentions: [],
    replies: [],
  })

  useEffect(() => {
    setIsFetching(true)
    setFetchErr(null)

    // See: https://github.com/aaronpk/webmention.io#api
    const api = "https://webmention.io/api/mentions.jf2"

    const query = new URLSearchParams()

    // NOTE: the trailing "/" for a target (source) is required!
    query.append("target", `${source}/`)

    // Sort in ascending order (chronological).
    query.append("sort-dir", "up")

    // NOTE: it would probably be better to properly paginate, but for now this
    // is okay.
    query.append("per-page", "999")

    const url = `${api}?${query}`
    const controller = new AbortController()

    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        return res.json()
      })
      .then(
        (feed: {
          type: "feed"
          name: "Webmentions"
          children: Webmention[]
        }) => {
          return feed.children
        }
      )
      .then(processWebmentions)
      .then((processed) => {
        setWebmentions(processed)
      })
      .catch((err) => {
        setFetchErr(new Error(`Failed to get webmentions: ${err}`))
      })
      .finally(() => {
        setIsFetching(false)
      })

    return () => {
      controller.abort()
    }
  }, [source])

  return { isFetching, fetchErr, webmentions }
}

export default useFetchWebmentions
