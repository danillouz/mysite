import Heading from "./Heading"
import Details from "./Details"
import Reply from "./Reply"
import Interactions from "./Interactions"
import Help from "./Help"
import useFetchWebmentions from "./use-fetch-webmentions"

import type { FunctionalComponent } from "preact"

const Webmentions: FunctionalComponent<{
  source: string
}> = ({ source }) => {
  const { isFetching, fetchErr, webmentions } = useFetchWebmentions(source)

  if (isFetching) {
    return (
      <>
        <Heading />

        <p class="flex items-center justify-center gap-2 font-sans">
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>

          <span>Loading...</span>
        </p>
      </>
    )
  }

  if (fetchErr) {
    return (
      <>
        <Heading />

        <p class="font-sans text-center">{fetchErr.message}</p>
      </>
    )
  }

  const { replies, likes, reposts, bookmarks, mentions } = webmentions
  return (
    <>
      <Heading />

      <Details open summary={`Replies (${replies.length})`}>
        <section class="mx-3">
          {replies.length ? (
            replies.map((wm) => <Reply key={wm["wm-id"]} reply={wm} />)
          ) : (
            <>
              <p class="font-sans">
                If your site supports sending webmentions, then replies to this
                post will show up here. Or share this post on Mastodon: replies
                on Mastodon will show up here as well.
              </p>
            </>
          )}
        </section>
      </Details>

      <Details
        summary={`Interactions (${
          likes.length + reposts.length + bookmarks.length + mentions.length
        })`}
      >
        <section class="mx-3">
          {Boolean(likes.length) && (
            <Interactions
              heading={<>Likes ({likes.length})</>}
              mentions={likes}
            />
          )}

          {Boolean(reposts.length) && (
            <Interactions
              heading={<>Reposts ({reposts.length})</>}
              mentions={reposts}
            />
          )}

          {Boolean(bookmarks.length) && (
            <Interactions
              heading={<>Bookmarks ({bookmarks.length})</>}
              mentions={bookmarks}
            />
          )}

          {Boolean(mentions.length) && (
            <Interactions
              heading={<>Mentions ({mentions.length})</>}
              mentions={mentions}
            />
          )}

          {!likes.length &&
            !reposts.length &&
            !bookmarks.length &&
            !mentions.length && (
              <>
                <p class="font-sans">
                  If your site supports sending webmentions, then likes,
                  reposts, bookmarks and mentions of this post will show up
                  here. Or share this post on Mastodon: favourites and boosts on
                  Mastodon will show up here as likes and reposts.
                </p>
              </>
            )}
        </section>
      </Details>

      <Help />
    </>
  )
}

export default Webmentions
