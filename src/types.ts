export interface Frontmatter {
  // title of the post.
  title: string

  // description of the post.
  description: string

  // tags of the post.
  tags: string[]

  // publishedAt is the date string when the post was published.
  publishedAt?: string

  // updatedAt is the date string when the post was updated.
  updatedAt?: string

  // heroImage is the hero image of the post.
  heroImage?: string

  // heroImageAlt is the hero image alt text of the post.
  heroImageAlt?: string

  // readingTime describes how long it takes to read the post.
  // Will be injected by `src/plugins/reading-time.mjs`.
  readingTime: string
}
