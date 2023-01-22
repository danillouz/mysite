import type { FunctionalComponent } from "preact"

const Help: FunctionalComponent = () => {
  return (
    <section class="my-12 px-4 py-3 bg-[#fafafa] dark:bg-[#27272a] border-4 border-double border-danos-primary dark:border-danos-primary-inverted rounded-sm">
      <span class="flex flex-row items-center gap-1 page-subheading text-lg">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentcolor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        </span>

        <span>What is this?</span>
      </span>

      <p>
        <a href="https://indieweb.org/Webmention">Webmention</a> is a standard
        that makes conversation across different sites possible. It notifies a
        site when it's mentioned on a different site, which for example can
        happen as a reply, like, repost, bookmark or mention.
      </p>

      <p>
        This site can receive webmentions, also when interacting with a{" "}
        <a href="https://joinmastodon.org">Mastodon</a> post that links to a
        blog post on this site.
      </p>

      <details>
        <summary class="mt-6 cursor-pointer focus:focusable page-subheading text-lg">
          Frequently asked questions
        </summary>

        <ul class="list-none mx-3 my-4 p-0">
          <li class="my-5 p-0">
            <p class="m-0 page-subheading">
              Can you delete my webmention from your site?
            </p>

            <p class="mt-0">
              Sure thing. Send me an email to "hi" at "danillouz" dot "dev", and
              include the link to the webmention source you want me to delete.
            </p>
          </li>

          <li class="my-5 p-0">
            <p class="m-0 page-subheading">
              Why is there no mention here after posting a link to this post on
              Mastodon?
            </p>

            <p class="mt-0">
              I use <a href="https://brid.gy">Bridgy</a> to send webmentions for
              Mastodon posts. But it doesn't support{" "}
              <a href="https://indieweb.org/backfeed">backfeeding</a> (i.e.
              mentioning) links to a site:
            </p>

            <blockquote class="my-5">
              <p>
                We can't backfeed links to your site like we do on Twitter and
                Reddit because Mastodon has no global search, and even local
                instance search is limited to hashtags and your own posts.
              </p>

              <cite>
                <p>
                  <a href="https://brid.gy/about">Bridgy about</a>
                </p>
              </cite>
            </blockquote>

            <p>
              So just posting a link to this post on Mastodon will not result in
              a webmention. Only replying to, favouriting or boosting a post on
              Mastodon that links to this post will do so.
            </p>

            <p>
              Also note that it might take some time before the webmention shows
              up here, because Bridgy polls Mastodon every 30 minutes or so.
            </p>
          </li>
        </ul>
      </details>
    </section>
  )
}

export default Help
