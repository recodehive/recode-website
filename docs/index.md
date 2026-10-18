---
id: docs
title: Welcome to recode hive
sidebar_label: Welcome to recode hive
sidebar_position: 1
---

# Welcome to recode hive

**Collaboration 1st, code 2nd.**

recode hive is an open-source educational platform built to help developers master essential technologies through interactive tutorials, practical guides, and community-driven learning. Whether you are a beginner taking your first steps in programming or an experienced developer sharpening your skills, recode hive provides the resources you need to grow.

---

## What is recode hive?

recode hive is a community-first platform that focuses on:

- **Data Science & Engineering** — tutorials, projects, and guides on Python, SQL, Pandas, and data pipelines.
- **Open Source Contribution** — a welcoming space to make your first (or hundredth) pull request.
- **GitHub & Developer Tools** — hands-on learning for Git, GitHub Actions, Copilot, and the GitHub ecosystem.
- **Career Growth** — blog posts, podcasts, and resources tailored to help developers and data professionals grow their careers.

The platform is built with [Docusaurus 3](https://docusaurus.io/), written in TypeScript, and styled with Tailwind CSS. Every piece of content — docs, blogs, community pages — is open-source and open to contributions.

---

## Explore the Repositories

The recode hive GitHub organization ([github.com/recodehive](https://github.com/recodehive)) hosts several repositories:

| Repository | Description |
|---|---|
| [recode-website](https://github.com/recodehive/recode-website) | The main website — docs, blogs, and community pages |
| [machine-learning-repos](https://github.com/recodehive/machine-learning-repos) | Curated ML frameworks, libraries, and resources (400+ stars) |
| [Stackoverflow-Analysis](https://github.com/recodehive/Stackoverflow-Analysis) | 3-year developer survey analysis and salary prediction (242 stars) |
| [awesome-github-profiles](https://github.com/recodehive/awesome-github-profiles) | Inspiring GitHub profile READMEs from around the world (139 stars) |
| [Opensource-practice](https://github.com/recodehive/Opensource-practice) | Beginner-friendly practice repo with 1,000+ contributors (103 stars) |
| [Scrape-ML](https://github.com/recodehive/Scrape-ML) | Python scripts to scrape and process data for ML projects (108 stars) |

---

## Join the Community

recode hive has 600+ GitHub followers and contributors from all over the world. Here is how to become part of it:

1. **Join the GitHub Organization** — raise an issue using the [Invite Link](https://github.com/Recode-Hive/Support/issues/new?assignees=&labels=invite+me+to+the+community&projects=&template=invitation.yml&title=Please+invite+me+to+the+Recode-Hive+GitHub+Community+Organization) and you'll receive an email invitation.
2. **Join Discord** — chat with members, ask questions, and find help in real time at [discord.gg/dh3TA8U55Q](https://discord.gg/dh3TA8U55Q).
3. **Practice open source** — make your first PR in the [Opensource-practice](https://github.com/recodehive/Opensource-practice) repository.
4. **Subscribe to the newsletter** — get career insights delivered to your inbox at [recodehive.substack.com](https://recodehive.substack.com/).

---

## Set Up the Repository Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/engine/install/) *(optional — for containerized development)*

### 1. Fork and Clone

Go to [github.com/recodehive/recode-website](https://github.com/recodehive/recode-website), click **Fork**, then clone your fork:

```bash
git clone https://github.com/your-username/recode-website.git
cd recode-website
```

Add the upstream remote so you can stay in sync with the main repo:

```bash
git remote add upstream https://github.com/recodehive/recode-website.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site hot-reloads automatically as you edit files.

### 4. Using Docker (Alternative)

```bash
# Build the image (first time only)
docker build -t recodehive-app .

# Run the container
docker run -p 3000:3000 recodehive-app
```

Or with hot-reload using Docker Compose:

```bash
docker-compose up
```

---

## Contribution Workflow

1. **Keep your fork up to date** before starting any work:

   ```bash
   git checkout main
   git fetch upstream
   git merge upstream/main
   ```

2. **Create a new branch** for your contribution:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and preview them at `localhost:3000`.

4. **Commit your changes:**

   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** — go to your fork on GitHub and click **Compare & pull request**. Set the base repository to `recodehive/recode-website` and the base branch to `main`.

For full details, read the [Contributing Guidelines](https://github.com/recodehive/recode-website/blob/main/community/contributing-guidelines.md).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Docusaurus 3 (React + TypeScript) |
| Language | TypeScript (Node.js ≥ 18) |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, Framer Motion |
| Linting | ESLint, Prettier |

---

## Stay Connected

| Platform | Link |
|---|---|
| Website | [recodehive.com](https://recodehive.com/) |
| YouTube | [@RecodeHive](https://www.youtube.com/@RecodeHive) |
| LinkedIn | [Sanjay K V](https://www.linkedin.com/in/sanjay-k-v/) |
| Twitter / X | [@sanjay_kv_](https://x.com/sanjay_kv_) |
| Instagram | [@nomadbrains.dev](https://www.instagram.com/nomadbrains.dev/) |
| Newsletter | [recodehive.substack.com](https://recodehive.substack.com/) |
| Discord | [discord.gg/Yxv9RA3r](https://discord.gg/Yxv9RA3r) |

---

Happy open-source contributions — here's to your career success! 🎉