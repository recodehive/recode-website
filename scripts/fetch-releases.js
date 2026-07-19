/**
 * Fetches GitHub Releases for recodehive/recode-website and writes them to
 * src/data/releases.json, consumed statically by the /updates page.
 * Run via `npm run fetch:releases` (also wired into prestart/prebuild).
 */
const fs = require("fs");
const path = require("path");

const REPO = "recodehive/recode-website";
const OUTPUT_PATH = path.join(__dirname, "..", "src", "data", "releases.json");

async function fetchReleases() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "recode-website-updates-page",
  };
  const token = process.env.DOCUSAURUS_GIT_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/releases?per_page=50`,
    { headers },
  );

  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`);
  }

  const releases = await res.json();

  return releases
    .filter((release) => !release.draft)
    .map((release) => ({
      id: release.id,
      name: release.name || release.tag_name,
      tagName: release.tag_name,
      publishedAt: release.published_at,
      htmlUrl: release.html_url,
      body: release.body || "",
      prerelease: release.prerelease,
      author: {
        login: release.author?.login ?? "unknown",
        htmlUrl: release.author?.html_url ?? `https://github.com/${release.author?.login ?? ""}`,
      },
    }));
}

async function main() {
  try {
    const releases = await fetchReleases();
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(releases, null, 2) + "\n");
    console.log(`Fetched ${releases.length} release(s) -> ${path.relative(process.cwd(), OUTPUT_PATH)}`);
  } catch (err) {
    console.warn(`fetch-releases: ${err.message}`);
    if (!fs.existsSync(OUTPUT_PATH)) {
      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, "[]\n");
    }
    console.warn("fetch-releases: keeping existing src/data/releases.json (build not blocked)");
  }
}

main();
