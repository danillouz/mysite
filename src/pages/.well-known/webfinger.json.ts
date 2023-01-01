import type { APIRoute } from "astro"

// See:
// - https://docs.joinmastodon.org/spec/webfinger
// - https://webfinger.net

const MASTODON_USERNAME = "danillouz"
const MASTODON_DOMAIN = "mastodon.social"

export const get: APIRoute = async function get({ params, request }) {
  return {
    body: JSON.stringify({
      subject: `acct:${MASTODON_USERNAME}@${MASTODON_DOMAIN}`,
      aliases: [
        `https://${MASTODON_DOMAIN}/@${MASTODON_USERNAME}`,
        `https://${MASTODON_DOMAIN}/users/${MASTODON_USERNAME}`,
      ],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: `https://${MASTODON_DOMAIN}/@${MASTODON_USERNAME}`,
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: `https://${MASTODON_DOMAIN}/users/${MASTODON_USERNAME}`,
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: `https://${MASTODON_DOMAIN}/authorize_interaction?uri={uri}`,
        },
      ],
    }),
  }
}
