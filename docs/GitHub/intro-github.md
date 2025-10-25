---
id: intro-github
title: Introduction to GitHub
sidebar_label: Introduction to GitHub #displays in sidebar
sidebar_position: 1
tags:
  [
    GitHub,
    Introduction to GitHub,
    What is GitHub,
    Why learn GitHub,
    How to use GitHub,
  ]
description: In this tutorial, you will learn about GitHub, its importance, what GitHub is from scratch, how to use GitHub, steps to start using GitHub, and more.
---

GitHub is a web-based platform used for version control and collaboration. It allows developers to work together on projects from anywhere in the world. GitHub is built on top of Git, a distributed version control system created by Linus Torvalds in 2005.

:::note
Key Features of GitHub:
* **Repositories:** Host your code in public (open-source) or private repositories.
* **Version Control:** Provides a web interface for the powerful Git version control system, allowing you to track changes to your code.
* **Collaboration:** Use features like **Pull Requests**, **Issues**, and **Code Reviews** to work effectively with a team.
* **Project Management:** Organize tasks, set milestones, and track progress.
* **Automation:** Use **GitHub Actions** to automate your build, test, and deployment (CI/CD) workflows.
:::

## How to start with GitHub?

Whenever you create something exciting or something new on your own, you always want to show it to others. As programmers, we also want to show our projects and codes to others, but how? GitHub is the solution; it lets people collaborate and scale projects, all in the cloud. Some other examples of similar platforms are Bitbucket, GitLab, Beanstalk, etc. Many of them give you the tools to work on your code together as a team. Currently, GitHub is more popular than the other above-listed platforms for hosting your code.

:::info
In the picture below, you can see Developer 1, Developer 2, etc., working on the same project. Let's say they are trying to build an Amazon website; Developer 1 handles the men's shopping section, Developer 2 deals with the women's section, and Developer 3 works on the login feature.

So, each individual works on a different feature from a copy of the central repository. Once the development is done, they push changes to the *remote repository* (central repo as per picture). Once a code review happens and it is good to go, the senior developer will merge the code into the central repository so all the features will be live in production.
:::

  <BrowserWindow url="https://github.com/" bodyStyle={{padding: 0}}>    
     ![Introduction to GitHub Diagram](./assets/1-Introduction-to-github.png)
  </BrowserWindow>

## What is Git??

In the above example, all the developers were able to work on different features simultaneously because of **Git**. For uploading your project to your GitHub account, you need to install Git first. In other words, Git helps with the version management of files and coordinates work among a diverse team in the software development phase. Git is an open-source project, originally developed in 2005 by Linus Torvalds.
  
:::info
**What is a Version Control System?**

To understand the version control system, let me give you one example: sometimes, you wish you had a record that contains all the changes you made in your code or your project. Version control systems (VCS) are software tools that record all the changes you make to files. It is like a database of changes. Git is the version control system that most developers prefer to use. We will see how you can upload your code on GitHub using Git. With a VCS, you can track branches, see who made changes (and when), review added lines of code, and retrieve previous versions of changes.

**Basic Git Terminology:**

| Keyword | Terminology | Description |
| --- | --- | --- |
| VCS | Version Control System | Tracks changes to a collection of files. |
| SCM | Software Configuration Management | Another name for VCS. Earlier versions, like CVS and SVN, used a centralized server, which caused a single point of failure. |
| DVCS | Distributed Version Control System| Git is distributed; the project history is stored on both the client and the server. This means you can make changes locally and remotely. |
| Working Tree | Tree | The current set of files you are actively working on. |
| Repo | Repository | A directory (usually `.git`) where Git keeps all project records and history. |
| Bare repo | | A repository used for sharing; it contains no working tree (no editable files). |
| Hash | | A unique 40-character (SHA-1) identifier for a specific commit, tree, or blob (file content). |
| Object | Git has 4 objects | **Blob** (file content), **Tree** (directory structure), **Commit** (a snapshot in time), **Tag** (a name attached to a commit). |
| Commit | | A snapshot of the repository at a specific point in time. |
| Branch | | A lightweight, movable pointer to a specific commit. `HEAD` is the pointer to your current branch. |
| Remote | | A reference to another Git repository, typically on a server like GitHub. |

:::

## Why Learn GitHub? 

GitHub simplifies the command-line interface of Git and makes it more GUI-friendly. GitHub is built on top of Git. Here, what we do is stage files and make commits (using Git), and then push those commits to GitHub. You can clone an entire repository, create a branch, commit to that branch, and then ask the main developer to merge the branch via a Pull Request. When you clone, in reality, you are creating a copy of the remote repository in your local environment.

 ![Git Structure](./assets/2-git-strucutre.png)
   
:::info
**Basic GitHub Keywords:**

| Category | Description |
| --- | --- |
| Issues | The place where new suggestions, bugs, or development ideas can be added and tracked. |
| Discussions | A forum for community discussion about the project. |
| Pull requests | PR - When a user has finished working on a feature (often from an issue), they can "request" to merge their changes into the main codebase. |
| Labels | Tags to categorize issues and pull requests (e.g., `bug`, `documentation`, `feature`). |
| Actions | A tool to automate repetitive tasks in your workflow (like testing and deploying) directly on GitHub. |
| Forks | A personal, server-side copy of another user's repository that you create under your own account. This allows you to experiment freely without affecting the original project. |

A fork is a personal copy of a repo that is already present on GitHub. Once you fork a repository and make changes, the changes will happen to your forked repo, not the original one.

:::

### Watch the video Tutorial
<iframe width="880" height="480" src="https://www.youtube.com/embed/VIDEO_ID_HERE" title="How to start with GitHub in 2024 | Beginner's Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

If you think this GitHub Tutorial starter kit for beginners was useful to you, then don’t forget to share it with others. In the next post, we will discuss how to upload your project to your GitHub account using Git.
