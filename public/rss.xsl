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
        <title>RSS feed for <xsl:value-of select="/rss/channel/title"/></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style type="text/css">
          body {
            font-family: sans-serif;
            margin: auto;
            padding: 20px;
            max-width: 65ch;
            text-align: left;
            background-color: #fff;
            word-wrap: break-word;
            overflow-wrap: break-word;
            line-height: 1.5;
            color: #444;
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: serif;
          }
          h3 {
            margin: 0;
          }
          a {
            color: #3273dc;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>

      <body>
        <header>
          <h1>RSS feed for <xsl:value-of select="/rss/channel/title" /></h1>

          <p><xsl:value-of select="/rss/channel/description" /></p>

          <p>
            <a target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link" />
              </xsl:attribute>
              Visit my site &#x2192;
            </a>
          </p>
        </header>

        <hr/>

        <main>
          <div>
            <h2>Posts</h2>

            <xsl:for-each select="/rss/channel/item">
              <div>
                <h3>
                  <a target="_blank">
                    <xsl:attribute name="href">
                      <xsl:value-of select="link" />
                    </xsl:attribute>
                    <xsl:value-of select="title" />
                  </a>
                </h3>

                <small>Published at: <xsl:value-of select="pubDate" /></small>

                <p>
                  <xsl:value-of select="description" />
                </p>
              </div>
            </xsl:for-each>
          </div>
        </main>

        <hr/>

        <footer>
          <h2>What is this?</h2>

          <p>
            This is an <strong>RSS feed</strong>, also known as a <strong>web feed</strong>.
          </p>

          <p>
            You can subscribe to this feed by copying the URL from the address bar into your
            favourite RSS reader. Your reader will then automatically fetch (new) articles from my
            site!
          </p>

          <p>
            See <a href="https://aboutfeeds.com" target="_blank">about feeds</a> to learn more
            about RSS feeds and readers.
          </p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
