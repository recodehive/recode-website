---
id: contributing-guidelines
title: Contributing Guidelines
sidebar_label: Contributing Guidelines
sidebar_position: 2
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Local Setup Guide](#local-setup-guide)
  - [How to set up recode hive:](#how-to-set-up-recode-hive)
- [Environment Setup (for GitHub API access)](#environment-setup-for-github-api-access)
- [Contributing to recode hive](#contributing-to-recode-hive)
    - [Commit Message Format](#commit-message-format)
  - [Example Commit Messages:](#example-commit-messages)
  - [Using Commitizen with Husky](#using-commitizen-with-husky)
- [Formatting](#formatting)
- [Branding \& Naming Conventions](#branding--naming-conventions)
  - [Exceptions to Lowercase Branding](#exceptions-to-lowercase-branding)
- [License](#license)

## Local Setup Guide

### How to set up recode hive:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/recodehive-website.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd recodehive-website
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

## Contributing to recode hive

We welcome contributions! Follow these steps to get started.

1. **Fork the Repository**
   - Go to the [recode hive repository](https://github.com/recodehive/recode-website) and click **Fork**.

2. **Clone Your Fork Locally**

   ```bash
   git clone https://github.com/your-username/recodehive-website.git
   cd recodehive-website
   ```

3. **Add the Original Repository as Upstream**

   This allows you to fetch changes from the main repository to keep your fork up to date.

   ```bash
   git remote add upstream <repo-url>
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
   #### Commit Message Format

   We use [Commitizen](https://www.npmjs.com/package/commitizen) with the [git-cz](https://www.npmjs.com/package/git-cz) adapter to ensure consistent commit messages that follow a standard changelog style. This helps in generating changelogs and maintaining a clear project history.

   Commit messages should follow this pattern:

   ```
   <type>: [#<GIT-ISSUE>] <subject>
   ```
   - **type**: The type of change that you're committing. It should be one of the following:
     - **feat**: A new feature
     - **fix**: A bug fix
     - **docs**: Documentation only changes
     - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
     - **refactor**: A code change that neither fixes a bug nor adds a feature
     - **perf**: A code change that improves performance
     - **test**: Adding missing tests or correcting existing tests
     - **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
     - **ci**: Changes to CI configuration files and scripts

   - **GIT-ISSUE**: The Git issue ID associated with the change.
   - **subject**: A brief description of the change.

   ### Example Commit Messages:

   - `feat: [#1] Add user login functionality`
   - `fix: [#24] Resolve navbar alignment issue`
   - `chore: [#101] Update dependencies to latest versions`

   ### Using Commitizen with Husky

   We have configured [Husky](https://www.npmjs.com/package/husky) to automatically run Commitizen when you commit changes. This is done using the `prepare-commit-msg` hook. Simply use the `git commit` command, and Commitizen will guide you through the commit message creation process.


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

2. **Automatically fix linting issues where possible**:

   ```bash
   npm run lint:fix
   ```

3. **Format code according to project conventions**:

   ```bash
   npm run format
   ```

4. **Build the project to verify everything compiles correctly**:

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
