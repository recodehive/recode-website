# Profile extras

Optional details for a public profile at `recodehive.com/u/<handle>`. Everything on a profile comes from
GitHub and the recodehive leaderboard automatically. A file here only adds what the person chooses to share.

Create `src/data/profiles/<github-handle-in-lowercase>.json`. Every field is optional and anything left out is
hidden on the page. Files that start with an underscore, like `_example.json`, are examples and are never published.

See `_example.json` for the shape. Only `https:` links are kept, and text is length limited when the site builds.

People usually ask for this through the "Profile update" issue form. An admin copies the answers into the file.
