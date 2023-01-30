export interface Frontmatter {
  // Title of the post.
  title: string

  // Description of the post.
  description: string

  // Tags of the post.
  tags: string[]

  // Date string when the post was published.
  pubDate?: string

  // Date string when the post was updated.
  updatedDate?: string

  // Hero image of the post.
  heroImage?: string

  // Hero image alt text of the post.
  heroImageAlt?: string

  // How long it takes to read the post.
  // Will be injected by `src/plugins/reading-time.mjs`.
  readingTime: string

  // Url of the post.
  // For example: `/posts/cool-post`.
  url: string
}

export interface RssItem {
  // Title of the RSS item.
  title: string

  // Description of the RSS item.
  description?: string | undefined

  // Content of the RSS item.
  content?: string | undefined

  // If the RSS item is a draft or not.
  draft?: boolean | undefined

  // Custom XML data of the RSS item.
  customData?: string | undefined

  // Date string when the RSS item was published.
  pubDate: Date

  // Link to the RSS item.
  link: string
}
