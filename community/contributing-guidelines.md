---
id: contributing-guidelines
title: Contributing Guidelines
sidebar_label: Contributing Guidelines
sidebar_position: 2
---

## Table of Contents

- [Local Setup Guide](#local-setup-guide)
- [Environment Setup](#environment-setup)
- [Contributing to recode hive](#contributing-to-recode-hive)
- [Production Build](#production-build)
- [Blog banners](#blog-banners)
- [Formatting](#formatting)
- [Tech Stack](#tech-stack)
- [Branding & Naming Conventions](#branding--naming-conventions)
- [License](#license)

## Local Setup Guide

:::tip New to GitHub?
Follow the [First-time setup guide](https://www.recodehive.com/docs/first-time-setup). It walks you through forking, cloning and running the project step by step.
:::

### Prerequisites

- [Node.js](https://nodejs.org/) **20.9 – 22** (the repo has an `.nvmrc` file, so `nvm use` picks the right version)
- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/engine/install/) (optional)

### Fork, clone and run

1. **Fork the repository** on GitHub, then clone your fork:

   ```bash
   git clone https://github.com/<your-username>/recode-website.git
   cd recode-website
   ```

2. **Set up environment variables** (optional, see [Environment Setup](#environment-setup)):

   ```bash
   cp .env.example .env
   ```

3. **Install dependencies and run the site locally:**

   ```bash
   npm install
   npm run start
   ```

   Your application will be available at http://localhost:3000

<details>
<summary><b>🐳 Prefer Docker? Use this instead</b></summary>

**Docker Compose (with hot-reload):**

```bash
docker-compose up
```

**Plain Docker (no hot-reload, rebuild after changes):**

```bash
docker build -t recodehive-app .
docker run -p 3000:3000 recodehive-app
```

</details>

## Environment Setup

The site runs without any environment variables. A GitHub token is recommended because it avoids GitHub API rate limits and fills the discussions, releases and sponsors pages with live data.

1. **Copy the example environment file** (skip this if you already did it above):

   ```bash
   cp .env.example .env
   ```

2. **Generate a GitHub Personal Access Token**
   1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens).
   2. Click **"Generate new token (classic)"**.
   3. Give it a name (for example `recode hive`).
   4. Tick the `read:discussion` scope so the discussions page can load. No other permissions are needed for public data.
   5. Copy the generated token.

3. **Add your token to `.env`** as both variables:

   ```bash
   GITHUB_TOKEN=ghp_your_generated_token_here
   DOCUSAURUS_GIT_TOKEN=ghp_your_generated_token_here
   ```

:::note What works without a token?
Most of the site works without any token, including documentation, blog posts, the badges page and the leaderboard (it uses a hosted backend). The GitHub token only affects live GitHub data such as discussions, releases, sponsors and community PRs.

Keys for Algolia search, Clerk sign-in, EmailJS and Supabase are managed by the maintainers, so those features stay disabled locally unless you create your own. If you need a development key, ask [@sanjay-kv](https://github.com/sanjay-kv).
:::

If you see GitHub API errors, check that your `.env` file is saved in the project root and restart `npm run start`.

## Contributing to recode hive

We welcome contributions! Once the project is running locally, follow these steps.

1. **Add the original repository as upstream**

   This lets you fetch changes from the main repository to keep your fork up to date.

   ```bash
   git remote add upstream https://github.com/recodehive/recode-website.git
   ```

   Verify the remotes:

   ```bash
   git remote -v
   ```

   You should see both `origin` (your fork) and `upstream` (the main repository).

2. **Keep your fork updated**

   Before starting a new feature or bug fix, update your local main branch:

   ```bash
   git checkout main
   git fetch upstream
   git merge upstream/main
   ```

3. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes** and test them thoroughly in the running site.

5. **Run the checks** described in [Formatting](#formatting).

6. **Commit your changes**

   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

7. **Push your branch to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a pull request**
   1. Go to your fork on GitHub.
   2. Click **Compare & pull request** for your branch.
   3. Fill out the PR template with a clear description of your changes.
   4. Submit the PR.

   :::tip
   If your branch falls behind main, fetch and merge updates from upstream again before pushing.
   :::

## Production Build

To check that the whole site builds, as it does when deployed:

```bash
npm run build
npm run serve
```

:::note
The build first fetches releases, sponsors and community PRs from GitHub, so it needs network access. Set the tokens from `.env` to avoid rate limits.
:::

## Blog banners

Every blog post needs a banner so it looks right on the Blogs page.

- Set it in the post's front matter with `image: /img/blogs/your-banner.png`, and add a `category:` (a short label such as ARCHITECTURE or TUTORIAL).
- Banners should be **1600 x 900 pixels (16:9)**, with **one big headline of 3 to 5 words**. The Blogs page shows the whole banner without cropping, so a banner in another shape gets empty bars on its sides.
- Keep important text away from the edges and keep the file small (under 300 KB where you can).
- Add `featured: true` only to the post the editors pick for the Featured spot.

## Formatting

To keep code style consistent and catch errors before they reach review, run these checks before you commit:

1. **Automatically fix linting issues where possible:**

   ```bash
   npm run lint:fix
   ```

2. **Check types:**

   ```bash
   npm run typecheck
   ```

3. **Format the files you changed:**

   ```bash
   npx prettier --write path/to/your-file.tsx
   ```

   :::warning
   `npm run format` rewrites every matching file in the project, which can fill your PR with changes you didn't make. Format only your own files instead.
   :::

4. **Build the project to verify everything compiles:**

   ```bash
   npm run build
   ```

New to these checks? Read [Understand Checks before PR](./understand-lint-checks.md) for a beginner-friendly explanation.

## Tech Stack

- **Framework:** Docusaurus 3 (React + TypeScript)
- **Language:** TypeScript (Node.js 20.9 – 22)
- **Styling:** Tailwind CSS 4
- **UI components:** Radix UI, Framer Motion
- **Linting and formatting:** ESLint, Prettier
- **Type checking:** TypeScript (`tsc`)

## Branding & Naming Conventions

- Use **`recode hive`** in lowercase for all mentions of the project name.
- Update any headers, titles, or utility constants accordingly.

### Exceptions to Lowercase Branding

While we use lowercase **`recode hive`** throughout the project for consistency, there are some places where the exact repository name with capitalization must be used:

- Repository-specific badges (for example, [shields.io](https://shields.io) badges)
- GitHub repository URLs in tools or badges
- Any external services that require exact repo names

## License

This project is open source and available under the [MIT License](https://github.com/recodehive/recode-website/blob/main/LICENSE).
