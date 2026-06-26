# Get Started with Recode

Welcome to Recode! Thank you for wanting to contribute. This guide will help you set up the project locally on your machine and submit your first contribution.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org) (v18 or higher recommended)
- A package manager like npm, yarn, or pnpm

## Local Setup Instructions

### 1. Fork the Repository
Click the **Fork** button at the top right of this repository page to create a copy of the project under your own GitHub account.

### 2. Clone Your Fork
Clone your cloned repository to your local machine:
```bash
git clone https://github.com<YOUR-USERNAME>/recode-web.git
cd recode-web
```

### 3. Add Upstream Remote
Keep your fork synced with the main repository by adding it as an upstream remote:
```bash
git remote add upstream https://github.comsanjay-kv/recode-web.git
```

### 4. Install Dependencies
Install the required project dependencies using your package manager:
```bash
npm install
```

### 5. Run the Project Locally
Start the local development server to test your changes:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser to view the application.

## Contribution Workflow

1. **Always get assigned first**: Do not open a PR unless a maintainer explicitly assigns the issue to you.
2. **Create a branch**: Use descriptive names like `feat/feature-name` or `fix/bug-name`.
3. **Commit your changes**: Write clear, concise commit messages.
4. **Push and Open a PR**: Push your branch to your fork and submit a Pull Request against the main project's `main` branch.
