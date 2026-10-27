---
id: understand-lint-checks
title: Understand Checks before PR
sidebar_label: Understand Checks before PR
sidebar_position: 3
---

# 🧠 Checks to Run Before Your Pull Request

Welcome to recode hive! Before a maintainer reviews your pull request (PR), a few automated checks make sure the code is clean, consistent and error-free.
This page explains what those checks are, how to run them on your computer, and what to do when one fails.

> [!TIP]
> New to this? You don't need to understand every tool. Run the commands in the "Run the checks" section below and fix whatever they report.

---

## 🤔 What are these checks?

| Check               | What it does                                                           | Tool         |
| ------------------- | ---------------------------------------------------------------------- | ------------ |
| **Linting**         | Finds likely bugs and bad habits (for example, unused variables)       | `eslint`     |
| **Formatting**      | Keeps the code style the same everywhere (quotes, spacing, line length) | `prettier`   |
| **Type checking**   | Catches mistakes in TypeScript types before the code runs              | `tsc`        |
| **Build**           | Confirms the whole site still builds                                   | `docusaurus` |

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) **20.9 – 22** (the repo has an `.nvmrc` file, so `nvm use` picks the right version)
- npm (it comes with Node.js)
- The project cloned and set up. See [Installation](https://github.com/recodehive/recode-website#installation) in the README.

Check your Node.js version with:

```bash
node -v
```

---

## ⚙️ Config files

You don't need to edit these. They are listed so you know where the rules come from.

| File               | Purpose                                       |
| ------------------ | --------------------------------------------- |
| `eslint.config.mjs` | ESLint rules for TypeScript and React        |
| `.prettierrc`      | Prettier formatting rules                     |
| `tsconfig.json`    | TypeScript configuration                      |
| `package.json`     | Dependencies and the `npm run ...` scripts    |

---

## 🧪 Run the checks

Install the dependencies once (skip this if you already ran it during setup):

```bash
npm install
```

Then run these commands from the project folder:

| Command                | What it does                                                    |
| ---------------------- | --------------------------------------------------------------- |
| `npm run lint`         | Reports linting problems                                        |
| `npm run lint:fix`     | Reports problems and **automatically fixes** the easy ones      |
| `npm run typecheck`    | Checks TypeScript types                                         |
| `npm run format:check` | Lists files that are not formatted correctly, without changing them |
| `npm run build`        | Builds the site to make sure nothing is broken                  |

To format only the files you changed (recommended):

```bash
npx prettier --write path/to/your-file.tsx
```

> [!WARNING]
> `npm run format` rewrites **every** matching file in the project. Your PR could then include lots of changes you didn't make, which makes it hard to review. Prefer the single-file command above.

---

## ✅ Before you open a pull request

Run these three commands in order and make sure each one finishes without errors:

```bash
npm run lint:fix
npm run typecheck
npm run build
```

Then:

1. Take a **screenshot of your terminal** showing the checks passing.
2. Attach the screenshot to your pull request description.

> [!NOTE]
> When you push, GitHub also runs `npm run lint` automatically (the **Lint** workflow). If it fails, open the failed check on your PR, read the error, fix it locally and push again. The PR updates by itself.

---

## 🆘 Common problems

| Problem                                  | What to try                                                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run lint` shows errors              | Run `npm run lint:fix`. Fix any remaining errors by hand. The message names the file and line number. |
| Install fails with peer dependency errors | The repo's `.npmrc` already handles this. Make sure you ran `npm install` inside the project folder.  |
| Build fails with a Node version error    | Check `node -v`. You need Node.js 20.9 to 22.                                                         |
| `npm run build` is very slow             | That's normal on the first run, and it needs an internet connection. Wait for it to finish.           |
| Not sure what an error means             | Copy the message into your PR or ask in the community Discord. We're happy to help.                   |
