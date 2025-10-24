---
id: contributing-guidelines
title: Contributing Guidelines
sidebar_label: Contributing Guidelines
sidebar_position: 2
---

## Table of Contents

- [Local Setup Guide](#local-setup-guide)
- [Environment Setup (for GitHub API access)](#environment-setup-for-github-api-access)
- [Contributing to recode hive](#contributing-to-recode-hive)
- [Formatting](#formatting)
- [Branding & Naming Conventions](#branding--naming-conventions)
- [License](#license)

## Local Setup Guide

### How to set up recode hive:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/recode-website.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd recode-website
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Running the Application:**

   Once you have installed the dependencies, you can run the application locally using:

   ```bash
   npm start
   ```

   This command will start a development server and open the application in your default web browser.

## Environment Setup (for GitHub API access)

Some parts of the dashboard — such as the Leaderboard — require access to the GitHub API.
To avoid rate-limit issues, you’ll need to set up a GitHub Personal Access Token (PAT) locally.

1. **Copy the example environment file**

   ```bash
   cp .env.example .env
   ```

   This creates your local `.env` configuration file.

2. **Generate a GitHub Personal Access Token**
   1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
   2. Click **“Generate new token (classic)”**
   3. Give it a name (e.g. `recode hive`)
   4. Select **no special permissions** (the default is fine for public data)
   5. Copy the generated token

3. **Add your token to `.env`**

   Open `.env` and update this line:

   ```bash
   GITHUB_TOKEN=ghp_your_generated_token_here
   ```

4. **Note for Local Development**
   
   Most pages work without a GitHub token, including:
   - 🎖️ GitHub Badges page (`/badges/github-badges/`)
   - 📚 Documentation and blog posts
   - 🏪 Merch store (requires Shopify config)
   
   The GitHub token is only required for:
   - 📊 Dashboard leaderboard functionality
   - 📈 Real-time GitHub statistics
   
   If you see GitHub API errors, ensure your `.env` file is properly configured.

## Contributing to recode hive

We welcome contributions! Follow these steps to get started.

1. **Fork the Repository**
   - Go to the [recode hive repository](https://github.com/recodehive/recode-website) and click **Fork**.

2. **Clone Your Fork Locally**

   ```bash
   git clone https://github.com/your-username/recode-website.git
   cd recode-website
   ```

3. **Add the Original Repository as Upstream**

   This allows you to fetch changes from the main repository to keep your fork up to date.

   ```bash
   git remote add upstream https://github.com/recodehive/recode-website.git
   ```

   Verify the remotes:

   ```bash
   git remote -v
   ```

   You should see both origin (your fork) and upstream (main repository).

4. **Keep Your Fork Updated**

   Before starting a new feature or bug fix, update your local main branch:

   ```bash
   git checkout main
   git fetch upstream
   git merge upstream/main
   ```

   This ensures your branch starts from the latest version of the main repository.

5. **Create a New Branch**

   Create a branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

6. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "Brief description of your changes"
   ```

7. **Push Your Branch to Your Fork**

   ```bash
   git push origin feature-name
   ```

8. **Open a Pull Request**
   1. Go to your fork on GitHub.

   2. Click Compare & pull request for your branch.

   3. Fill out the PR template with a clear description of your changes.

   4. Submit the PR.

   > Tip: If your branch falls behind main, you can fetch and merge updates from upstream again before pushing.

## Formatting

To ensure consistent code style and catch errors before committing, please follow these steps:

1. **Automatically fix linting issues where possible**:

   ```bash
   npm run lint:fix
   ```

2. **Format code according to project conventions**:

   ```bash
   npm run format
   ```

3. **Build the project to verify everything compiles correctly**:

   ```bash
   npm run build
   ```

   It’s recommended to run these commands before committing to maintain code quality and consistency.

## Branding & Naming Conventions

- Use **`recode hive`** in lowercase for all mentions of the project name.
- Update any headers, titles, or utility constants accordingly.

### Exceptions to Lowercase Branding

While we use lowercase **`recode hive`** throughout the project for consistency, there are some places where the exact repository name with capitalization must be used:

- Repository-specific badges (e.g., [contrib.rocks](https://contrib.rocks))
- GitHub repository URLs in tools or badges
- Any external services that require exact repo names

## License

This project is open source and available under the [MIT License](LICENSE).
