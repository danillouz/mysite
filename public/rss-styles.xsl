<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet
  version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
>
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <!-- Global metadata -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <!-- Site metadata -->
        <title>RSS feed for <xsl:value-of select="/rss/channel/title"/></title>

        <!-- Icon metadata -->
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />

        <style type="text/css">
          @media (prefers-color-scheme: light) {
            :root {
              --color-bg-body: 250 250 250; /* zinc-50 */
              --color-bg-primary: 255 255 255; /* white */
              --color-text-primary: 39 39 42; /* zinc-800 */
              --color-text-secondary: 82 82 91; /* zinc-600 */
              --color-text-link: 82 82 91; /* zinc-600 */
              --color-text-special: 39 39 42; /* zinc-800 */
              --color-border: 82 82 91; /* zinc-600 */
              --color-focus: 20 184 166; /* teal-500 */
              --color-box-shadow: 39 39 42; /* zinc-800 */
            }
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --color-bg-body: 0 0 0; /* black */
              --color-bg-primary: 24 24 27; /* zinc-900 */
              --color-text-primary: 228 228 231; /* zinc-200 */
              --color-text-secondary: 161 161 170; /* zinc-400 */
              --color-text-link: 161 161 170; /* zinc-400 */
              --color-text-special: 228 228 231; /* zinc-200 */
              --color-border: 63 63 70; /* zinc-700 */
              --color-focus: 45 212 191; /* teal-400 */
            }
          }

          /* Body and main */

          .pattern-boxes {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(161 161 170 / 0.08)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
          }

          body {
            padding: 0;
            margin: 0;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
              "Liberation Mono", "Courier New", monospace;
            background-color: rgb(var(--color-bg-body));
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          main {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          /* Header */

          header {
            box-sizing: border-box;
            height: 1.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 1rem;
            padding-right: 1rem;
            background-color: rgb(var(--color-bg-primary));
            font-family: ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
              "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-primary));
            border-bottom: 1px solid rgb(var(--color-border));
          }

          .header-wrapper {
            display: flex;
            align-items: center;
          }

          .header-title {
            display: inline-block;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            font-weight: 600;
          }

          /* Text and links */

          p {
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-secondary));
          }

          a {
            text-decoration-line: underline;
            text-underline-offset: 2px;
            text-decoration-thickness: 1px;
            color: rgb(var(--color-text-link));
          }
          a:focus {
            outline: 2px solid rgb(var(--color-focus));
            outline-offset: 2px;
          }

          /* Window */

          .window {
            box-sizing: border-box;
            flex: 1 1 0%;
            display: flex;
            flex-direction: column;
            max-width: 48rem;
            margin: 0;
            background-color: rgb(var(--color-bg-primary));
          }

          .retro-box-shadow-overlay {
            display: none;
            position: absolute;
            top: 0px;
            right: 0px;
            bottom: 0px;
            left: 0px;
            border-radius: 0.125rem;
            border: 1px solid rgb(var(--color-border));
          }

          .window-header {
            display: none;
            height: 1.75rem;
          }

          .window-header-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .window-header-icon {
            height: 0.625rem;
            width: 0.625rem;
            border: 1px solid rgb(var(--color-border));
            border-radius: 9999px;
          }

          .window-main {
            position: relative;
            flex: 1 1 0%;
            overflow-y: scroll;
            scroll-behavior: smooth;
            border-bottom: 1px solid rgb(var(--color-border));
          }
          .window-main:focus-visible {
            outline: 2px solid rgb(var(--color-focus));
            outline-offset: 0px;
          }

          .window-main-wrapper {
            max-width: 42rem;
            padding: 0.5rem;
          }

          .window-footer {
            display: none;
            height: 1.5rem;
            font-family: ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
              "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 0.75rem;
            line-height: 1rem;
            color: rgb(var(--color-text-secondary));
          }

          /* Prompt */

          .prompt::after {
            content: "$";
            font-weight: 600;
            color: rgb(var(--color-text-secondary) / 0.7);
          }

          .cmd {
            font-weight: 600;
            color: rgb(var(--color-text-special));
          }

          /* Posts */

          .posts-list-wrapper {
            --spacing: 1.5rem;

            padding: 0;
          }

          .posts-list-wrapper > li {
            display: block;
            position: relative;
            padding-left: 1rem;
          }

          .posts-list-wrapper summary {
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-secondary));
          }
          .posts-list-wrapper summary:hover {
            cursor: pointer;
          }
          .posts-list-wrapper summary:focus {
            outline: 2px solid rgb(var(--color-focus));
            outline-offset: 2px;
          }

          .posts-list {
            margin-top: 0.25rem;
            margin-bottom: 0.25rem;
            margin-left: 2px;
            padding-left: 0;
          }

          .post {
            display: block;
            position: relative;
            padding-left: 2rem;
            border-left-style: solid;
            border-left-width: 1px;
            border-left-color: rgb(var(--color-border));
          }
          .post::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: -1px;
            width: var(--spacing);
            height: calc(var(--spacing) + 1px);
            border-style: solid;
            border-width: 0 0 1px 1px;
            border-color: rgb(var(--color-border));
          }
          .post:last-child {
            border-color: transparent;
          }

          .post h3 {
            /* font-weight: 600; */

            margin: 0;
            padding-top: 1rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-primary));
          }
          .post h3 a {
            color: rgb(var(--color-text-primary));
          }

          .post p {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
          }

          .post time {
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-secondary));
          }

          /* Misc */

          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }

          /* md */
          @media (min-width: 768px) {
            @media (prefers-color-scheme: light) {
              .window {
                box-shadow: 8px 8px 0 0 rgb(var(--color-box-shadow));
              }
            }
            @media (prefers-color-scheme: dark) {
              .window {
                box-shadow: none;
              }
            }

            .window {
              position: fixed;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              margin-left: auto;
              margin-right: auto;
              margin-top: 3rem;
              margin-bottom: 1.25rem;
              border-radius: 0.125rem;
            }

            .retro-box-shadow-overlay {
              display: block;
            }

            .window-header {
              display: flex;
              align-items: center;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }

            .window-main {
              border-top: 1px solid rgb(var(--color-border));
            }

            .window-footer {
              display: flex;
            }
          }

          /* lg */
          @media (min-width: 1024px) {
            .window {
              max-width: 64rem;
            }
          }

          /* Animation */

          .blink {
            animation-name: blink;
            animation-duration: 1s;
            animation-timing-function: linear;
            animation-delay: 0.5s;
            animation-iteration-count: infinite;
          }

          @keyframes blink {
            0% {
              opacity: 0;
            }
            40% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        </style>
      </head>

      <body class="pattern-boxes">
        <main>
          <header>
            <div class="header-wrapper">
              <span class="header-title" aria-hidden="true">
                RSS feed for <xsl:value-of select="/rss/channel/title" />
              </span>
            </div>
          </header>

          <figure class="window">
            <div class="retro-box-shadow-overlay"></div>

            <div class="window-header">
              <div class="window-header-wrapper">
                <span class="window-header-icon"></span>
                <span class="window-header-icon"></span>
                <span class="window-header-icon"></span>
              </div>
            </div>

            <div class="window-main">
              <div class="window-main-wrapper">
                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> rss about
                </p>

                <br />

                <h1 class="sr-only">
                  RSS feed for <xsl:value-of select="/rss/channel/title" />
                </h1>

                <p>
                  <xsl:value-of select="/rss/channel/description" />
                </p>

                <br />

                <p>
                  Visit
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="/rss/channel/link" />
                    </xsl:attribute>
                    my site</a
                  >.
                </p>

                <br />

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> rss fetch
                </p>

                <ul class="posts-list-wrapper">
                  <li>
                    <details open="true">
                      <summary>
                        Posts (<xsl:value-of
                          select="count(/rss/channel/item)"
                        />)
                      </summary>

                      <ul class="posts-list">
                        <xsl:for-each select="/rss/channel/item">
                          <li class="post">
                            <h3>
                              <a>
                                <xsl:attribute name="href">
                                  <xsl:value-of select="link" />
                                </xsl:attribute>

                                <xsl:value-of select="title" />
                              </a>
                            </h3>

                            <p>
                              <xsl:value-of select="description" />
                            </p>

                            <time>
                              <xsl:value-of
                                select="substring(pubDate, 0, string-length(pubDate) - 12)"
                              />
                            </time>
                          </li>
                        </xsl:for-each>
                      </ul>
                    </details>
                  </li>
                </ul>

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> rss help
                </p>

                <br />

                <h2 class="sr-only">What is this?</h2>

                <p>This is an RSS feed, also known as a web feed.</p>

                <br />

                <p>
                  You can subscribe to this feed by copying the URL from the
                  address bar into your favorite RSS reader. Your reader will
                  then automatically fetch (new) articles from my site!
                </p>

                <br />

                <p>
                  See
                  <a href="https://aboutfeeds.com">about feeds</a>
                  to learn more about RSS feeds and readers.
                </p>

                <br />

                <p aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span>
                  <span class="blink" aria-hidden="true"> _</span>
                </p>
              </div>
            </div>

            <div class="window-footer"></div>
          </figure>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
