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
              --color-text-tertiary: 113 113 122; /* zinc-500 */
              --color-text-link: 24 24 27; /* zinc-900 */
              --color-border-primary: 228 228 231; /* zinc-200 */
              --color-focus-primary: 20 184 166; /* teal-500 */
            }
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --color-bg-body: 0 0 0; /* black */
              --color-bg-primary: 24 24 27; /* zinc-900 */
              --color-text-primary: 244 244 245; /* zinc-100 */
              --color-text-secondary: 161 161 170; /* zinc-400 */
              --color-text-tertiary: 113 113 122; /* zinc-500 */
              --color-text-link: 250 250 250; /* zinc-50 */
              --color-border-primary: 63 63 70; /* zinc-700 */
              --color-focus-primary: 45 212 191; /* teal-400 */
            }
          }

          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            padding: 0;
            margin: 0 auto;
            font-family: monospace;
            background-color: rgb(var(--color-bg-body));
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          h1,
          h2,
          h3 {
            margin: 0;
            margin-top: 4px;
            margin-bottom: 8px;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            color: rgb(var(--color-text-primary));
          }

          p {
            margin: 0;
            font-size: 14px;
            line-height: 20px;
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

          .window {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            max-width: 768px;
            background-color: rgb(var(--color-bg-primary));
            border: 1px solid rgb(var(--color-border-primary));
          }

          .window-header {
            height: 28px;
            display: flex;
            align-items: center;
            padding-left: 8px;
            padding-right: 8px;
          }

          .window-header-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .window-header-icon {
            height: 10px;
            width: 10px;
            border: 1px solid rgb(var(--color-border-primary));
            border-radius: 9999px;
          }

          .window-main {
            flex: 1 1 0%;
            overflow-y: scroll;
            scroll-behavior: smooth;
            border-top: 1px solid rgb(var(--color-border-primary));
            border-bottom: 1px solid rgb(var(--color-border-primary));
          }
          .window-main:focus-visible {
            outline: 2px solid rgb(var(--color-focus-primary));
            outline-offset: 2px;
          }

          .window-main-wrapper {
            max-width: 672px;
            padding: 8px;
          }

          .window-footer {
            height: 24px;
            display: flex;
            font-family: sans;
            font-size: 12px;
            line-height: 16px;
            color: rgb(var(--color-text-tertiary));
          }

          .cmd {
            font-weight: 600;
            color: rgb(var(--color-text-primary));
          }

          .prompt::after {
            content: "$";
            font-weight: 600;
            color: rgb(var(--color-text-tertiary) / 0.8);
          }

          .prompt-meta {
            color: rgb(var(--color-text-tertiary));
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
            font-size: 12px;
            line-height: 16px;
            color: rgb(var(--color-text-tertiary) / 0.8);
          }

          /* sm */
          @media (min-width: 640px) {
          }

          /* md */
          @media (min-width: 768px) {
            .window {
              margin-left: auto;
              margin-right: auto;
              margin-top: 47px;
              margin-bottom: 47px;
              border-radius: 3px;
            }
          }

          /* lg */
          @media (min-width: 1024px) {
            .window {
              max-width: 1024px;
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

      <body>
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
                  <span class="prompt" aria-hidden="true"></span> feed about
                </p>

                <br />

                <h1 class="sr-only">RSS feed</h1>

                <p>
                  <xsl:value-of select="/rss/channel/title" />:
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
                  <span class="prompt" aria-hidden="true"></span>
                </p>

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> feed fetch
                </p>

                <br />
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
                  <br />
                </xsl:for-each>

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span>
                </p>

                <p class="cmd" aria-hidden="true">
                  <span class="prompt" aria-hidden="true"></span> feed help
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
