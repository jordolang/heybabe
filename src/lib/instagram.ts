import { galleryFallback, site } from "@/data/site";

export type FeedItem = {
  id: string;
  src: string;
  alt: string;
  /** Present only for real posts pulled from the API. */
  permalink?: string;
  isVideo?: boolean;
};

type IgMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

const API_VERSION = process.env.INSTAGRAM_API_VERSION ?? "v21.0";
const LIMIT = 12;

/** Instagram captions are long and emoji-heavy; trim to something an alt can carry. */
function altFromCaption(caption: string | undefined, i: number) {
  const clean = (caption ?? "")
    .replace(/#[^\s#]+/g, "")       // hashtag blocks read as noise in a screen reader
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return `Permanent jewelry by ${site.name}, Instagram post ${i + 1}`;
  return clean.length > 120 ? `${clean.slice(0, 117).trimEnd()}…` : clean;
}

/**
 * Pulls the latest posts from hey babe's Instagram.
 *
 * Instagram cannot be scraped: an unauthenticated request to the profile is
 * redirected to a login wall and the private web endpoints answer 401, and
 * scraping would breach Instagram's terms in any case. So this uses the
 * official Instagram Graph API, which needs a long-lived access token for
 * @xo.heybabe in INSTAGRAM_ACCESS_TOKEN.
 *
 * Without a token — or if the call fails or the token has expired — the
 * curated local gallery is returned instead, so the section always renders
 * something rather than collapsing to an empty grid.
 */
export async function getInstagramFeed(): Promise<{
  items: FeedItem[];
  live: boolean;
}> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  const fallback = {
    items: galleryFallback.map((g, i) => ({
      id: `local-${i}`,
      src: g.src,
      alt: g.alt,
    })),
    live: false,
  };

  if (!token) return fallback;

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
    const url = `https://graph.instagram.com/${API_VERSION}/me/media?fields=${fields}&limit=${LIMIT}&access_token=${token}`;

    const res = await fetch(url, {
      // Re-fetch hourly so new posts appear without a redeploy.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`[instagram] API returned ${res.status}; using local gallery.`);
      return fallback;
    }

    const json = (await res.json()) as { data?: IgMedia[] };
    const items = (json.data ?? [])
      .map((m, i): FeedItem | null => {
        // Videos and reels expose a still under thumbnail_url.
        const src = m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
        if (!src) return null;
        return {
          id: m.id,
          src,
          alt: altFromCaption(m.caption, i),
          permalink: m.permalink,
          isVideo: m.media_type === "VIDEO",
        };
      })
      .filter((m): m is FeedItem => m !== null);

    if (!items.length) return fallback;
    return { items, live: true };
  } catch (err) {
    console.warn("[instagram] Feed request failed; using local gallery.", err);
    return fallback;
  }
}
