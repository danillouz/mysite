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
              --color-text-link: 39 39 42; /* zinc-800 */
              --color-text-special: 39 39 42; /* zinc-800 */
              --color-border-primary: 228 228 231; /* zinc-200 */
              --color-focus-primary: 20 184 166; /* teal-500 */
            }
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --color-bg-body: 0 0 0; /* black */
              --color-bg-primary: 24 24 27; /* zinc-900 */
              --color-text-primary: 228 228 231; /* zinc-200 */
              --color-text-secondary: 161 161 170; /* zinc-400 */
              --color-text-link: 228 228 231; /* zinc-200 */
              --color-text-special: 228 228 231; /* zinc-200 */
              --color-border-primary: 63 63 70; /* zinc-700 */
              --color-focus-primary: 45 212 191; /* teal-400 */
            }
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

          header {
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
            border-bottom: 1px solid rgb(var(--color-border-primary));
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

          h1,
          h2,
          h3 {
            margin: 0;
            margin-top: 0.25rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 400;
            color: rgb(var(--color-text-primary));
          }

          p {
            margin: 0;
            font-size: 0.875rem;
            line-height: 1.25rem;
            color: rgb(var(--color-text-secondary));
          }

          a {
            font-weight: 400;
            text-decoration-line: underline;
            text-underline-offset: 5px;
            text-decoration-thickness: 1px;
            color: rgb(var(--color-text-link));
          }
          a:focus {
            outline: 2px solid rgb(var(--color-focus-primary));
            outline-offset: 2px;
          }

          figure {
            margin: 0;
          }

          .pattern-boxes {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(161 161 170 / 0.08)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
          }

          .window {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            max-width: 48rem;
            background-color: rgb(var(--color-bg-primary));
            margin-top: 29px;
            box-shadow: 0 3px 6px -1px rgb(0 0 0 / 0.09),
              0 2px 4px -3px rgb(0 0 0 / 0.09);
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
            border: 1px solid rgb(var(--color-border-primary));
            border-radius: 9999px;
          }

          .window-main {
            flex: 1 1 0%;
            overflow-y: scroll;
            scroll-behavior: smooth;
            border-bottom: 1px solid rgb(var(--color-border-primary));
          }
          .window-main:focus-visible {
            outline: 2px solid rgb(var(--color-focus-primary));
            outline-offset: 2px;
          }

          .window-main-wrapper {
            max-width: 42rem;
            padding: 0.5rem;
          }

          .window-footer {
            height: 1.5rem;
            display: flex;
            font-family: ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
              "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
              "Segoe UI Symbol", "Noto Color Emoji";
            font-size: 0.75rem;
            line-height: 1rem;
            color: rgb(var(--color-text-secondary));
          }

          .cmd {
            font-weight: 600;
            color: rgb(var(--color-text-special));
          }

          .prompt::after {
            content: "$";
            font-weight: 600;
            color: rgb(var(--color-text-secondary) / 0.7);
          }

          .blink {
            animation-name: blink;
            animation-duration: 1s;
            animation-timing-function: linear;
            animation-delay: 0.5s;
            animation-iteration-count: infinite;
          }

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

          .datetime {
            font-size: 0.75rem;
            line-height: 1rem;
            color: rgb(var(--color-text-secondary));
          }

          /* md */
          @media (min-width: 768px) {
            .window {
              margin-left: auto;
              margin-right: auto;
              margin-top: 47px;
              margin-bottom: 19px;
              border: 1px solid rgb(var(--color-border-primary));
              border-radius: 0.125rem;
            }

            .window-header {
              display: flex;
              align-items: center;
              padding-left: 0.5rem;
              padding-right: 0.5rem;
            }

            .window-main {
              border-top: 1px solid rgb(var(--color-border-primary));
            }
          }

          /* lg */
          @media (min-width: 1024px) {
            .window {
              max-width: 64rem;
            }
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
        <header>
          <div class="header-wrapper">
            <span class="header-title" aria-hidden="true">
              RSS feed for <xsl:value-of select="/rss/channel/title" />
            </span>
          </div>
        </header>

        <main>
          <figure class="window">
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
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="/rss/channel/link" />
                    </xsl:attribute>
                    Visit my site
                  </a>
                </p>

                <br />

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> rss fetch
                </p>

                <br />

                <h2 class="sr-only">Posts</h2>

                <xsl:for-each select="/rss/channel/item">
                  <time class="datetime">
                    <xsl:value-of select="pubDate" />
                  </time>

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

                  <br />
                </xsl:for-each>

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
