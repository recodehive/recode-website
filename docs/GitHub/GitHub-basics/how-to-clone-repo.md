---
id: how-to-clone-repository
title: How To Clone Repository
sidebar_label: How to clone repository
sidebar_position: 3
tags: [git, github, version-control, repository]
description: In this tutorial, you will learn how to clone a GitHub repository to your local machine using Git commands.
keywords: [git, github, clone repository, git clone, version control, github tutorial, git basics, repository management, git commands]
hide_title: true
footer_width: lesson
---

import {
  SetupLesson, LessonHeader, SetupChecklist, StepTimeline, Step, Shot, UpNextCard,
} from '@site/src/components/setupLesson';

<SetupLesson
  storageKey="recodehive:how-to-clone-repository:done"
  steps={["Get the URL","Open the terminal","Run the clone command","Open the project"]}
  doneMessage={"🎉 All 4 steps done. Nice work!"}
>

<LessonHeader title={"How To Clone Repository"} platform="💻 Terminal">

In this tutorial we will learn about how to clone a GitHub repository to your local machine.

</LessonHeader>

## What is Cloning?

Cloning a repository means creating a local copy of a remote repository on your computer. This allows you to work on the project locally, make changes, and sync them back to the remote repository.

## Prerequisites

Before cloning a repository, make sure you have:
- Git installed on your computer
- A GitHub account (optional, for private repositories)
- The repository URL you want to clone

<SetupChecklist title="Your checklist" />

<StepTimeline>

<Step n={1}>

### Step 1: Get the Repository URL

- Go to the repository you want to clone.

- Click on the green "Code" button and copy the HTTPS URL.

```text title="Repository URL"
https://github.com/sanjay-kv/Learn-GitHub.git
```

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/Learn-GitHub" bodyStyle={{padding: 0}}>

[![GitHub](./assets/17-Git-clone.png)](https://github.com/sanjay-kv/Learn-GitHub)

</BrowserWindow>
</Shot>

</Step>

<Step n={2}>

### Step 2: Open Command Line/Terminal

Open your command prompt (Windows) or terminal (Mac/Linux) and navigate to the directory where you want to clone the repository.

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/Learn-GitHub" bodyStyle={{padding: 0}}>

[![GitHub](./assets/18-cmd-git.png)](https://github.com/sanjay-kv/Learn-GitHub)

</BrowserWindow>
</Shot>

</Step>

<Step n={3}>

### Step 3: Run the Clone Command

Use the `git clone` command followed by the repository URL:

```bash title="Clone Command"
git clone https://github.com/sanjay-kv/Learn-GitHub.git
```

This command will:
1. Create a new directory with the repository name
2. Download all files and commit history
3. Set up the remote connection automatically

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/Learn-GitHub" bodyStyle={{padding: 0}}>

[![GitHub](./assets/19-clonned-files.png)](https://github.com/sanjay-kv/Learn-GitHub)

</BrowserWindow>
</Shot>

</Step>

<Step n={4}>

### Step 4: Navigate to the Cloned Repository

After cloning, navigate into the newly created directory:

```bash
cd Learn-GitHub
```

</Step>

</StepTimeline>

## Cloning Options

### Clone with SSH

If you have SSH keys set up with GitHub:

```bash
git clone git@github.com:sanjay-kv/Learn-GitHub.git
```

### Clone to a Specific Directory

To clone into a custom directory name:

```bash
git clone https://github.com/sanjay-kv/Learn-GitHub.git my-custom-folder
```

### Clone a Specific Branch

To clone only a specific branch:

```bash
git clone -b branch-name https://github.com/sanjay-kv/Learn-GitHub.git
```

:::tip Best Practices for Cloning Repositories

- Always clone repositories into organized directories
- Use SSH instead of HTTPS for repositories you frequently work with
- Verify the repository source before cloning to avoid security risks
- Check the repository's README file after cloning for setup instructions
- Keep your local clone updated with `git pull` regularly

:::

## Conclusion

Cloning a repository is a fundamental Git operation that allows you to work on projects locally. By following these steps, you can easily clone any GitHub repository and start contributing to projects or working on your own code locally.

<UpNextCard />

</SetupLesson>
