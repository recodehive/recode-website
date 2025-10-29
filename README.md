<div align="center">
  <a href="https://www.recodehive.com">
  <img src="static/icons/Logo-512X512.png" alt="recode hive logo" width="150" />
  </a>
</div>

<h1 align="center">recode hive</h1>

<div align="center">

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![Stars Badge](https://img.shields.io/github/stars/recodehive/recode-website)](https://github.com/recodehive/recode-website/stargazers)
[![Forks Badge](https://img.shields.io/github/forks/recodehive/recode-website)](https://github.com/recodehive/recode-website/network/members)
[![Pull Requests Badge](https://img.shields.io/github/issues-pr/recodehive/recode-website)](https://github.com/recodehive/recode-website/pulls)
[![Issues Badge](https://img.shields.io/github/issues/recodehive/recode-website)](https://github.com/recodehive/recode-website/issues)
[![Contributors](https://img.shields.io/github/contributors/recodehive/recode-website?color=2b9348)](https://github.com/recodehive/recode-website/graphs/contributors)
[![License Badge](https://img.shields.io/github/license/recodehive/recode-website?color=2b9348)](https://github.com/recodehive/recode-website/LICENSE)

**Your all-in-one resource for learning Git, GitHub, Python, and Next.js through comprehensive tutorials and hands-on projects.**

[Website](https://recodehive.com/) • [Documentation](https://recodehive.com/docs) • [Contributing](community/contributing-guidelines.md) • [Discord](https://discord.gg/Yxv9RA3r)

</div>

---

## 📖 About

recode hive is an open-source educational platform built to help developers master essential technologies through interactive tutorials, practical guides, and community-driven learning. Whether you're a beginner taking your first steps in programming or an advanced developer looking to sharpen your skills, recode hive provides the resources you need.

## ✨ Features

- **Comprehensive Tutorials** – Step-by-step guides for Git, GitHub, Python, and Next.js, suitable for beginners and advanced users
- **Hands-On Setup Guides** – Practical walkthroughs for setting up projects, repositories, and development environments
- **Leaderboards & Challenges** – Track your progress, earn points, and compete with others to stay motivated
- **Documentation Hub** – Centralized docs for quick reference, best practices, and deep dives into concepts
- **Merchandise Store** – Exclusive branded merchandise to celebrate your learning milestones
- **User Dashboard** – Personalized space to monitor your completed tutorials, achievements, and activity
- **Community & Collaboration** – Engage with other learners, share tips, and collaborate on projects
- **SEO Optimized Content** – Search engine optimized documentation and blog posts for better discoverability

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [Docker](https://docs.docker.com/engine/install/) (optional, for containerized development)
- Docker Compose (optional)

### Installation

**Clone the repository:**

```bash
git clone https://github.com/your-username/recode-website.git
cd recode-website
```

**Using Docker (Recommended):**

```bash
# Build the image (first time only)
docker build -t recodehive-app .

# Run the container
docker run -p 3000:3000 recodehive-app
```

**Using Docker Compose (with hot-reload):**

```bash
docker-compose up
```

Your application will be available at http://localhost:3000

**Traditional Setup:**

```bash
npm install
npm run start
```

### Production Build

```bash
npm run build
npm run serve
```

## 🛠️ Tech Stack

### Core Technologies

- **Framework:** Docusaurus 3 (React + TypeScript)
- **Language:** TypeScript (Node.js ≥ 18)
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI, Framer Motion

### Developer Tools

- **Linting & Formatting:** ESLint, Prettier
- **Type Checking:** TypeScript (`tsc`)

## 📁 Project Structure

```
recode-website/
│
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
│
├── blog/                       # Blog posts
│   ├── git-coding-agent/
│   ├── google-backlinks/
│   └── ...
│
├── community/                  # Community documentation
│   ├── contributing-guidelines.md
│   ├── index.md
│   ├── our-documentation.md
│   └── understand-lint-checks.md
│
├── docs/                       # Main documentation
│   ├── GitHub/
│   ├── Google-Student-Ambassador/
│   ├── seo-best-practices.md    # SEO guides and best practices
│   └── ...
│
├── src/                        # Source code
│   ├── components/             # React components
│   ├── css/
│   │   └── custom.css
│   ├── data/
│   ├── database/
│   ├── lib/
│   ├── pages/
│   ├── plugins/
│   ├── services/
│   ├── style/
│   │   └── globals.css
│   ├── theme/
│   └── utils/
│
├── static/                     # Static assets
│   ├── icons/
│   ├── img/
│   ├── .nojekyll
│   ├── robots.txt              # Search engine crawling instructions
│   └── *.png
│
├── .gitignore
├── CODE_OF_CONDUCT.md
├── LICENSE
├── README.md
└── ...
```

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can get started:

### Contribution Workflow

```mermaid
flowchart LR
    Fork[Fork the project]-->branch[Create a New Branch]
    branch-->Edit[Edit file]
    Edit-->commit[Commit the changes]
    commit -->|Finally|creatpr((Create a Pull Request))
```

### Step-by-Step Guide

**Fork the repository** on GitHub

**Clone your fork:**

```bash
git clone https://github.com/your-username/recode-website.git
cd recode-website
```

**Create a new branch:**

```bash
git checkout -b feature/your-feature-name
```

**Make your changes** and test thoroughly

**Commit your changes:**

```bash
git commit -m "Add: brief description of your changes"
```

**Push to your fork:**

```bash
git push origin feature/your-feature-name
```