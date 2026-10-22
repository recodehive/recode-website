const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/;

/** The public profile path for a GitHub login, or null when the login cannot have a profile page (for example a bot). */
export function profilePath(username: string): string | null {
  const h = username.toLowerCase();
  return HANDLE_RE.test(h) ? `/u/${h}` : null;
}
