export interface LinkedInPost {
  /** The public post URL, used for the "view on LinkedIn" link. */
  url: string;
  /** The embed id, for example "urn:li:share:7123456789012345678". */
  embedUrn: string;
  /** ISO date you added it (YYYY-MM-DD). Newest is shown first. */
  addedOn: string;
  /** Pinned posts come first on the "Top posts" tab. */
  pinned?: boolean;
}

// Curated public LinkedIn posts that mention @sanjay-k-v, newest first.
//
// LinkedIn's API does not allow searching posts that mention a person without partner access, so this
// page uses LinkedIn's official "Embed this post" iframe instead.
//
// To add a post:
//   1. Open the post on LinkedIn, click the three dots (...) and choose "Embed this post".
//   2. Copy the id from the iframe src, the part after "https://www.linkedin.com/embed/feed/update/"
//      (for example "urn:li:share:7123456789012345678"), then add an entry below with the post URL,
//      that id and today's date.
export const LINKEDIN_POSTS: LinkedInPost[] = [];
