// See: https://www.jsonfeed.org/version/1.1/
export interface JSONFeed {
  // The URL of the version of the format the feed uses.
  version: "https://jsonfeed.org/version/1.1"

  // The name of the feed.
  title: string

  // The description of the feed. It provides more detail (besides title), on
  // what the feed is about.
  description?: string

  // The URL of the resource that the feed describes.
  home_page_url?: string

  // The URL of the feed. It serves as the unique identifier for the feed.
  feed_url?: string

  // The description of the purpose of the feed (for humans; should be ignored
  // by feed readers).
  user_comment?: string

  // The URL of a feed that provides the next n items, where n is determined by
  // the publisher (used for pagination).
  next_url?: string

  // The URL of an image for the feed suitable to be used in a timeline (like
  // an avatar).
  icon?: string

  // The URL of an image for the feed suitable to be used in a source list.
  favicon?: string

  // The author(s) of the feed.
  authors?: JSONFeedAuthor[]

  // The primary language for the feed in the format specified in RFC 5646.
  // The value is usually a 2-letter language tag from ISO 639-1.
  // For example en-US.
  language?: string

  // If the feed will ever be updated again.
  expired?: boolean

  // Feed items.
  items: JSONFeedItem[]
}

export interface JSONFeedAuthor {
  // The name of the author.
  name?: string

  // The URL of a site owned by the author.
  url?: string

  // The URL for an image for the author.
  avatar?: string
}

export interface JSONFeedItem {
  // Unique ID over time.
  id: string

  // The URL of the resource described by the item. May be the same as id.
  url?: string

  // The name of the item.
  title?: string

  // The HTML or plain text of the item.
  // Either content_html or content_text should be present.
  content_html?: string
  content_text?: string

  // Short summary of what the item is about.
  summary?: string

  // The URL of the main image for the item.
  image?: string

  // The URL of an image to use as a banner.
  banner_image?: string

  // The date the item was published in RFC 3339 format.
  date_published?: string

  // The date the item was updated in RFC 3339 format.
  date_modified?: string

  // The author(s) of the item.
  authors?: JSONFeedAuthor[]

  // Tags of the item
  tags?: string[]

  // The primary language for the item in the format specified in RFC 5646.
  // The value is usually a 2-letter language tag from ISO 639-1.
  // For example en-US.
  language?: string

  // Estimated time needed to read the item.
  // Custom field (i.e. JSON feed extension).
  _reading_time?: string
}
