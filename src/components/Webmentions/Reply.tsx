import type { FunctionalComponent } from "preact"
import type { Webmention } from "./types"

const Reply: FunctionalComponent<{ reply: Webmention }> = ({ reply }) => {
  const { "wm-source": source, author, published, content } = reply

  if (!content?.value) {
    return null
  }

  return (
    <article class="my-6 px-4 py-3 bg-[#fafafa] dark:bg-[#27272a] border border-danos-primary dark:border-danos-primary-inverted rounded-sm">
      <header class="flex gap-2">
        <div class="self-center flex-shrink-0">
          <a href={author.url}>
            <img alt="" src={author.photo} class="w-12 h-12 m-0" />
          </a>
        </div>

        <div class="flex flex-col justify-center page-subtext truncate">
          <a
            href={author.url}
            title={author.name}
            class="truncate text-danos-secondary dark:text-danos-secondary-inverted"
          >
            {author.name}
          </a>

          <div class="flex gap-1">
            {published && (
              <time dateTime={published} class="page-subtext truncate">
                {new Date(published).toLocaleDateString("en-us", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
        </div>
      </header>

      {content.value.startsWith("<p>") ? (
        <section
          dangerouslySetInnerHTML={{ __html: content.value }}
          class="break-words wm-reply-content"
        ></section>
      ) : (
        <section class="break-words wm-reply-content">
          <p dangerouslySetInnerHTML={{ __html: content.value }}></p>
        </section>
      )}

      <footer>
        {!content.isTruncated && (
          <p class="m-0 page-subtext text-right">
            <a
              href={source}
              title="Go to webmention source"
              class="text-danos-secondary dark:text-danos-secondary-inverted"
            >
              Source
            </a>
          </p>
        )}
      </footer>
    </article>
  )
}

export default Reply
