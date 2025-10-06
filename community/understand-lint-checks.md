---
id: understand-lint-checks
title: Understand Checks before PR
sidebar_label: Understand Checks before PR
sidebar_position: 3
---

# 🧠 TypeScript + React Development Guide

Welcome to recode hive! To maintain a high standard of code quality, we follow a strict development and pull request process.  
Before submitting your PR, please **follow the instructions below and attach a screenshot of the checks passed**.

---

## 📦 Prerequisites

- Node.js **18+**
- npm

---

## 🛠️ Tools and Configuration

### 🔧 Core Linting and QA Tools

We use the following tools to enforce code quality:

- `eslint`: Linting for TypeScript & React
- `prettier`: Code formatting
- `typescript (tsc)`: Type checking
- `eslint-config-prettier` and `eslint-plugin-prettier`: Integrate Prettier with ESLint

### ⚙️ Config Files

| File            | Purpose                             |
| --------------- | ----------------------------------- |
| `.eslintrc.cjs` | ESLint rules for TypeScript + React |
| `.prettierrc`   | Prettier formatting rules           |
| `tsconfig.json` | TypeScript configuration            |
| `package.json`  | Dev dependencies and npm scripts    |

---

## 🧪 Development Setup

### 🔄 Install Dev Dependencies

```bash
npm install
```

## 📋 Example Commands

```bash
# Run lint checks
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Type checking
npm run typecheck

# Format code
npm run format

# Build the project
npm run build
```

## 🧹 Code Quality Checks

Standard Tool(s)
Linting eslint
Formatting prettier
Type Checking tsc

| Standard        | Tools(s) |
| --------------- | -------- |
| `Linting`       | eslint   |
| `Formatting`    | prettier |
| `Type Checking` | tsc      |

## 📸 Pull Request Submission Checklist

Before opening a pull request:

✅ Run all checks:

```bash
npm run lint:fix
npm run format
npm run build
```
