---
id: first-opensource-code
title: Let's Do First Opensource Project
sidebar_label: First Opensource Project
sidebar_position: 5
tags: [git, github, open-source, contribution, pull-request, fork]
description: In this tutorial, you will learn how to make your first open source contribution on GitHub without using the command line. Learn to fork, edit, commit, and create pull requests directly through the GitHub web interface.
keywords: [git, github, open source, first contribution, pull request, fork repository, github tutorial, web-based editing, opensource contribution, beginner guide, github workflow, contributing to open source]
---

# First Open Source Project – Making Your First Contribution

## Introduction

Welcome to your first open source contribution! In this tutorial, you will learn how to contribute to an open source project directly through GitHub's web interface—no command line required! This is perfect for beginners who want to start contributing to open source projects.

## What is Open Source?

Open source software is code that is freely available for anyone to view, use, modify, and distribute. Contributing to open source projects helps you:
- Learn from real-world code
- Build your portfolio
- Connect with the developer community
- Improve your coding skills
- Give back to projects you use

## Prerequisites

Before starting, make sure you have:
- A GitHub account (create one at [github.com](https://github.com))
- Basic understanding of Git and GitHub concepts
- Willingness to learn and contribute!

## The Contribution Workflow

The typical open source contribution workflow involves:
1. **Fork** the repository
2. **Edit** the files
3. **Commit** your changes
4. **Create** a pull request
5. **Wait** for review and feedback

Let's walk through each step!

## Step 1: Find the Repository

Navigate to the practice repository: [https://github.com/sanjay-kv/Open-source-Practice](https://github.com/sanjay-kv/Open-source-Practice)

This is a beginner-friendly repository designed for practicing open source contributions.

<BrowserWindow url="https://github.com/sanjay-kv/Open-source-Practice" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/23-opensource.png)](https://github.com/sanjay-kv/Open-source-Practice)
  <div align="center"><small>Step 1: Repository Home Page</small></div>
</BrowserWindow>

Take a moment to:
- Read the README file to understand the project
- Check if there are contribution guidelines (CONTRIBUTING.md)
- Look at existing issues or pull requests
- Understand what kind of contributions are welcome

## Step 2: Fork the Repository

Forking creates your own copy of the repository where you can make changes without affecting the original project.

1. Click the **Fork** button in the top-right corner of the repository page
2. Select your account as the destination
3. Wait for GitHub to create your fork

<BrowserWindow url="https://github.com/sanjay-kv/Learn-GitHub/fork" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/21-final-fork.png)](https://github.com/sanjay-kv/Learn-GitHub/fork)
  <div align="center"><small>Step 2: Forking the Repository</small></div>
</BrowserWindow>

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/24-opensource-fork.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 3: Fork Button Location</small></div>
</BrowserWindow>

Once the fork is complete, you'll see:
- Your username in the repository name
- A note saying "forked from [original-repo]"

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/25-opensource-done.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 4: Fork Complete</small></div>
</BrowserWindow>

## Step 3: Edit Files Directly on GitHub

One of the great features of GitHub is the ability to edit files directly in your browser without cloning the repository to your computer.

### Finding the File to Edit

1. Navigate to the file you want to edit (usually specified in the project's README)
2. Click on the file name to view it
3. Click the **pencil icon** (✏️) in the top-right corner to edit

### Making Your Changes

For this practice repository, you'll typically add your name to a contributors list:

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/26-add-name.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 5: Add Your Name</small></div>
</BrowserWindow>

Common first contributions include:
- Adding your name to a contributors list
- Fixing a typo in documentation
- Updating outdated information
- Adding a translation
- Improving README formatting

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/27-added-git-line.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 6: Changes Made</small></div>
</BrowserWindow>

:::tip Best Practices for Making Changes

- **Keep changes small and focused** - Don't try to fix multiple things at once
- **Follow the project's style** - Match the formatting and conventions used
- **Test your changes** - Make sure links work and formatting is correct
- **Read contribution guidelines** - Many projects have specific requirements
- **Be respectful** - Remember real people maintain these projects

:::

## Step 4: Commit Your Changes

After making your edits, you need to commit them. A commit is like saving a snapshot of your changes with a description.

### Writing a Good Commit Message

1. Scroll down to the "Commit changes" section
2. Write a clear, concise commit message describing what you changed
3. Optionally add a longer description if needed
4. Select "Commit directly to the main branch" for simple changes
5. Click **Commit changes**

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/28-opensource-commit.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 7: Commit Changes</small></div>
</BrowserWindow>

**Good commit message examples:**
- ✅ "Add John Doe to contributors list"
- ✅ "Fix typo in installation instructions"
- ✅ "Update Python version requirement"

**Poor commit message examples:**
- ❌ "Update"
- ❌ "Changes"
- ❌ "asdfasdf"

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/29-git-final-commit.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 8: Final Commit Review</small></div>
</BrowserWindow>

## Step 5: Create a Pull Request

Now that you've made changes in your fork, it's time to propose those changes to the original repository through a **Pull Request** (PR).

### What is a Pull Request?

A Pull Request is a way to propose changes to a repository. It allows:
- Project maintainers to review your changes
- Discussion about the proposed modifications
- Automated tests to run on your code
- Iterative improvements before merging

### Steps to Create a Pull Request

1. **Navigate to the original repository** (not your fork)
2. Click on the **Pull Requests** tab
3. Click the green **New pull request** button
4. Click **Compare across forks**
5. Select your fork and branch from the dropdowns
   - Base repository: The original project
   - Head repository: Your fork
   - Base branch: Usually `main` or `master`
   - Compare branch: Your branch with changes
6. Review the changes shown in the diff
7. Click **Create pull request**
8. Add a descriptive title and detailed description
9. Click **Create pull request** again to submit

<BrowserWindow url="https://github.com/sandemouser/Learn-GitHub" bodyStyle={{padding: 0}}>
  [![GitHub](./assets/30-opensource-final-check.png)](https://github.com/sandemouser/Learn-GitHub)
  <div align="center"><small>Step 9: Create Pull Request</small></div>
</BrowserWindow>

### Writing a Good Pull Request Description

Your PR description should include:
- **What** changes you made
- **Why** you made them
- **How** to test the changes (if applicable)
- **Screenshots** (if it's a visual change)
- **Related issues** (if fixing a bug or implementing a feature)

**Example PR description:**
```
## Description
Added my name to the contributors list as per the contribution guidelines.

## Changes Made
- Added "John Doe" to CONTRIBUTORS.md
- Maintained alphabetical ordering

## Checklist
- [x] Followed the project's style guidelines
- [x] Checked for typos
- [x] Read the contribution guidelines
```

## Understanding "Compare Across Forks"

The **Compare across forks** feature is crucial for creating pull requests from your fork to the original repository.

### What Does It Do?

This feature allows you to compare changes between:
- Your forked repository (where you made changes)
- The original repository (where you want to contribute)

### Why Is It Important?

The comparison view shows:
- **All commits** you've made since forking
- **File changes** in a diff format
- **Additions** highlighted in green
- **Deletions** highlighted in red
- **Conflict warnings** if there are any

### How to Use It Effectively

1. **Select the correct branches:**
   - Base: Original repository's main branch
   - Compare: Your fork's branch with changes

2. **Review the diff carefully:**
   - Ensure only intended changes are included
   - Check for accidental modifications
   - Verify formatting is correct

3. **Look for conflicts:**
   - Red warnings indicate merge conflicts
   - Update your fork if needed
   - Resolve conflicts before creating PR

### Benefits of Comparing

- **Prevents mistakes** - Catch unintended changes early
- **Improves quality** - Review your work before submission
- **Reduces conflicts** - Identify issues before they become problems
- **Saves time** - Avoid back-and-forth with maintainers
- **Shows professionalism** - Demonstrates attention to detail

:::warning Important Notes

- Always check the diff before creating a PR
- Make sure you're comparing the right branches
- If you see unexpected changes, fix them before submitting
- Keep your fork updated to avoid conflicts

:::

## Step 6: Wait for Review

After creating your pull request:

1. **Wait patiently** - Maintainers review PRs on their schedule
2. **Respond to feedback** - Be open to suggestions and changes
3. **Make requested changes** - Update your PR based on feedback
4. **Stay professional** - Be courteous and respectful


## Watch This Video Tutorial

For a visual walkthrough of the entire process, watch this helpful video:

<iframe width="883" height="480" src="https://www.youtube.com/embed/R7NReLBCT_8?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63" title="How to do your first opensource on GitHub" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Finding Projects to Contribute To

### Beginner-Friendly Resources

- **Good First Issue** labels on GitHub
- [First Timers Only](https://www.firsttimersonly.com/)
- [Up For Grabs](https://up-for-grabs.net/)
- [Good First Issues](https://goodfirstissues.com/)
- [CodeTriage](https://www.codetriage.com/)

### Types of Contributions

You don't have to write code to contribute:
- 📝 **Documentation** - Fix typos, improve clarity, add examples
- 🌐 **Translation** - Translate docs or UI to other languages
- 🐛 **Bug Reports** - Report issues you encounter
- 💡 **Feature Suggestions** - Propose new features
- 🎨 **Design** - Improve UI/UX
- ✅ **Testing** - Test new features and report results
- 📊 **Data** - Add datasets or examples
- ❓ **Support** - Help answer questions in issues

## Conclusion

Congratulations! You've learned how to make your first open source contribution using only GitHub's web interface. You now know how to:

- ✅ Fork a repository
- ✅ Edit files directly on GitHub
- ✅ Commit changes with meaningful messages
- ✅ Compare changes across forks
- ✅ Create pull requests

