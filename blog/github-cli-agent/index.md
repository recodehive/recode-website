---
title: "GitHub Copilot CLI: Public Preview"
authors: [sanjay-kv]
sidebar_label: "GitHub CLI"
tags: [GitHub, CLI, tech, updates]
date: 2025-09-17

description: add your decription here

draft: false
canonical_url:
---
 <!-- truncate -->

We’re bringing the power of the GitHub Copilot coding agent directly to your terminal. With GitHub Copilot CLI, you can work locally and synchronously with an AI agent that understands your code and GitHub context — no IDE switching required.

---

## 📖 Overview

GitHub Copilot CLI is now in **public preview**, and it’s designed to bring AI-powered development right to your command line.

**Key features:**

* **Terminal-native development** – Use the Copilot coding agent directly in your terminal.
* **GitHub integration** – Work with repositories, issues, and pull requests using natural language.
* **Agentic capabilities** – Build, edit, debug, and refactor code with AI.
* **MCP-powered extensibility** – Extend with custom MCP servers for additional capabilities.
* **Full control** – Every action requires your explicit approval.

Plus, extend Copilot CLI's capabilities and context through **custom MCP servers**.


![Architecture](./images/01-GitHub-CLI-start-command.png)

---

## 📦 Getting Started

### Supported Platforms

* Linux
* macOS
* Windows (experimental)

### Prerequisites

* Node.js **v22+**
* npm **v10+**
* PowerShell **v6+** (Windows only)
* Active GitHub Copilot subscription (Pro, Pro+, Business, or Enterprise)

---

## ⚙️ Installation

Install globally with npm:

```bash
npm install -g @github/copilot
```

Verify installation:

```bash
copilot --banner
```

Authenticate with your GitHub account:

```bash
/login
```

Or authenticate using a **Personal Access Token (PAT):**

```bash
# Linux/macOS
export GH_TOKEN=your_token_here  

# Windows
setx GH_TOKEN your_token_here
```

---

## 🖥️ Usage

Launch Copilot CLI in a project folder:

```bash
copilot
```

By default, it runs **Claude Sonnet 4**. To switch to **GPT-5**:

```bash
# Linux/macOS
COPILOT_MODEL=gpt-5 copilot

# Windows
set COPILOT_MODEL=gpt-5
```

Exit anytime with:

```
Ctrl + C (twice)
```

---

## 💡 Get Suggestions for Common Development Tasks

### Development

```bash
gh copilot suggest "start development server for docusaurus"
gh copilot suggest "build docusaurus site for production"
gh copilot suggest "deploy docusaurus site"
```

### Package Management

```bash
gh copilot suggest "install new dependencies for react project"
gh copilot suggest "update docusaurus to latest version"
```

### Git Workflow

```bash
gh copilot suggest "create feature branch for new blog post"
gh copilot suggest "commit changes to blog content"
gh copilot suggest "create pull request for documentation updates"
```

### Repository Maintenance

```bash
gh copilot suggest "check repository status and pending changes"
gh copilot suggest "merge feature branch after review"
```

### Documentation

```bash
gh copilot suggest "create new documentation page in docusaurus"
gh copilot suggest "organize documentation with sidebars"
gh copilot suggest "create code of conduct for repository"
```

### Testing & Quality

```bash
gh copilot suggest "run linting checks on typescript files"
gh copilot suggest "fix build errors in docusaurus"
```

---

## 🔗 Resources

* [Official Documentation](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* [Copilot CLI GitHub Repository](https://github.com/github/copilot-cli)
* [Copilot Features](https://github.com/features/copilot/cli)

---

## ✅ Final Verdict

GitHub Copilot CLI is the next step in developer productivity — bringing AI assistance natively to your terminal. With support for repositories, workflows, testing, and documentation, it simplifies development without taking control away from you.

Less setup, more shipping.




Hey Starting of your blog

requires version 
 node: '>=22
 
## What is?

GitHub Copilot CLI is now in public preview
We’re bringing the power of GitHub Copilot coding agent directly to your terminal. With GitHub Copilot CLI, you can work locally and synchronously with an AI agent that understands your code and GitHub context.

What’s new:

Terminal-native development: Work with Copilot coding agent directly in your command line — no context switching required.
GitHub integration out of the box: Access your repositories, issues, and pull requests using natural language, all authenticated with your existing GitHub account.
Agentic capabilities: Build, edit, debug, and refactor code with an AI collaborator that can plan and execute complex tasks.
MCP-powered extensibility: Take advantage of the fact that the coding agent ships with GitHub’s MCP server by default and supports custom MCP servers to extend capabilities.
Full control: Preview every action before execution — nothing happens without your explicit approval.
Getting started is simple:

.The power of GitHub Copilot, now in your terminal.

GitHub Copilot CLI brings AI-powered coding assistance directly to your command line, enabling you to build, debug, and understand code through natural language conversations. Powered by the same agentic harness as GitHub's Copilot coding agent, it provides intelligent assistance while staying deeply integrated with your GitHub workflow.

See our official documentation for more information.

Image of the splash screen for the Copilot CLI

🚀 Introduction and Overview
We're bringing the power of GitHub Copilot coding agent directly to your terminal. With GitHub Copilot CLI, you can work locally and synchronously with an AI agent that understands your code and GitHub context.

Terminal-native development: Work with Copilot coding agent directly in your command line — no context switching required.
GitHub integration out of the box: Access your repositories, issues, and pull requests using natural language, all authenticated with your existing GitHub account.
Agentic capabilities: Build, edit, debug, and refactor code with an AI collaborator that can plan and execute complex tasks.
MCP-powered extensibility: Take advantage of the fact that the coding agent ships with GitHub's MCP server by default and supports custom MCP servers to extend capabilities.
Full control: Preview every action before execution — nothing happens without your explicit approval.
We're still early in our journey, but with your feedback, we're rapidly iterating to make the GitHub Copilot CLI the best possible companion in your terminal.

📦 Getting Started
Supported Platforms
Linux
macOS
Windows (experimental)
Prerequisites
Node.js v22 or higher
npm v10 or higher
(On Windows) PowerShell v6 or higher
An active Copilot subscription. See Copilot plans.
If you have access to GitHub Copilot via your organization of enterprise, you cannot use GitHub Copilot CLI if your organization owner or enterprise administrator has disabled it in the organization or enterprise settings. See Managing policies and features for GitHub Copilot in your organization for more information.

Installation
Install globally with npm:

Getting started is simple:

Install via npm: npm install -g @github/copilot
Authenticate with your GitHub account.
Start building with your existing Copilot Pro, Pro+, Business, or Enterprise plan.
Whether you’re exploring a new codebase, implementing features from issues, or debugging locally, Copilot CLI brings intelligent assistance right where developers work.
winget install Microsoft.PowerShell


   ## Method 1: Using winget (Recommended)

   Open Command Prompt or Windows PowerShell as Administrator and   
   run:

     winget install Microsoft.PowerShell

pwsh --version
Prerequisites
Node.js v22 or higher
npm v10 or higher
(On Windows) PowerShell v6 or higher
An active Copilot subscription. See Copilot plans.

Ready to get started?

PS D:\recode-hive-github\recode-website> npm install -g @github/copilot

changed 5 packages in 8s
PS D:\recode-hive-github\recode-website> gh copilot --version
unknown command "copilot" for "gh"


Available commands:
  alias
  api
  attestation
  auth
  browse
  cache
  co
  codespace
  completion
  config
  extension
  gist
  gpg-key
  issue
  label
  org
  pr
  preview
  project
  release
  repo
  ruleset
  run
  search
  secret
  ssh-key
  status
  variable
  workflow

  you can run these two commands to see its working


  for preview to run enter the follow ingand it has requirement

 Ctrl+c Exit · Ctrl+r Expand all
https://github.com/github/copilot-cli?utm_source=changelog-amp-linkedin&utm_campaign=agentic-copilot-cli-launch-2025

https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli?utm_campaign=agentic-copilot-cli-launch-2025&utm_source=changelog-amp-linkedin

https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli?utm_campaign=agentic-copilot-cli-launch-2025&utm_source=changelog-amp-linkedin

https://github.com/features/copilot/cli?utm_source=changelog-amp-linkedin&utm_campaign=agentic-copilot-cli-launch-2025


two times crtl +c to exit

to see banner

copilot --bannerc

If you're not currently logged in to GitHub, you'll be prompted to use the /login slash command. Enter this command and follow the on-screen instructions to authenticate.

Authenticate with a Personal Access Token (PAT)
You can also authenticate using a fine-graned PAT with the "Copilot Rrequests" permission enabled.

Visit https://github.com/settings/personal-access-tokens/new
Under "Permissions," click "add permissions" and select "Copilot Requests"
Generate your token
Add the token to your environment via the environment variable GH_TOKEN or GITHUB_TOKEN (in order of precedence)

Using the CLI
Launch copilot in a folder that contains code you want to work with.

By default, copilot utilizes Claude Sonnet 4. We also support GPT-5 via an environment variable. Run COPILOT_MODEL=gpt-5 copilot to launch in GPT-5 mode. Or on Windows, run set COPILOT_MODEL=gpt-5 before running copilot.

Each time you submit a prompt to GitHub Copilot CLI, your monthly quota of premium requests is reduced by one. For information about premium requests, s
https://docs.github.com/en/copilot/concepts/billing/copilot-requests
/

Less setup, more shipping
Included with Copilot Pro, Pro+, Business, and Enterprise — keeping setup simple and costs predictable so you can focus on shipping.

Agent-powered, GitHub-native
Execute coding tasks with an agent that knows your repositories, issues, and pull requests — all natively in your terminal.

Collaboration with full control
Copilot CLI inherits your policies and enforces explicit approvals — so you stay in control with full transparency.

Get started in any codebase instantly
Ask Copilot CLI to explore the project structure, install dependencies, and explain how everything works — all through simple conversation in your terminal.
Leverage GitHub context and extend with your own tools
Bring context from your issues and pull requests directly to your environment, eliminating context switching. 
Plus, extend Copilot CLI's capabilities and context through custom MCP servers.

# Get suggestions for common development tasks
gh copilot suggest "start development server for docusaurus"
gh copilot suggest "build docusaurus site for production"
gh copilot suggest "deploy docusaurus site"

# Package management
gh copilot suggest "install new dependencies for react project"
gh copilot suggest "update docusaurus to latest version"


# Blog post creation
gh copilot suggest "create new blog post in docusaurus"
gh copilot suggest "add metadata to markdown blog post"

# Documentation management
gh copilot suggest "create new documentation page in docusaurus"
gh copilot suggest "organize documentation with sidebars"

# Git workflow
gh copilot suggest "create feature branch for new blog post"
gh copilot suggest "commit changes to blog content"
gh copilot suggest "create pull request for documentation updates"

# Repository maintenance
gh copilot suggest "check repository status and pending changes"
gh copilot suggest "merge feature branch after review"

# Code quality
gh copilot suggest "run linting checks on typescript files"
gh copilot suggest "fix build errors in docusaurus"
gh copilot suggest "optimize website performance"

# Testing
gh copilot suggest "test local development setup"
gh copilot suggest "validate markdown content format"

# Contribution management
gh copilot suggest "create contributing guidelines for open source project"
gh copilot suggest "setup issue templates for github repository"
gh copilot suggest "create pull request template"

# Documentation for contributors
gh copilot suggest "document local development setup process"
gh copilot suggest "create code of conduct for repository"

# File management
gh copilot suggest "organize blog posts by categories"
gh copilot suggest "create navigation structure for documentation"
gh copilot suggest "manage static assets and images"

# SEO and metadata
gh copilot suggest "optimize SEO for docusaurus website"
gh copilot suggest "add metadata to blog posts"

gh copilot suggest "add new documentation section for GitHub tutorials"

gh copilot suggest "prepare repository for new contributors"


---

*The add final verdict*

<GiscusComments/>