---
id: create-github-repo
title: Create GitHub Repo (GUI)
sidebar_label: Create GitHub Repo (GUI)
sidebar_position: 1
tags: [GitHub, GitHub-development, document-structure, GitHub repo,]
description: In this tutorial, you will learn how to create a GitHub repository from the web interface, edit its README, commit your changes and upload a file.
hide_title: true
footer_width: lesson
---

import {
  SetupLesson, LessonHeader, SetupChecklist, StepTimeline, Step, Shot, UpNextCard,
} from '@site/src/components/setupLesson';
import {
  rootClass, RepoArt, FlowChips, PrereqCards, Prereq, VisibilityToggle, TourCards, MarkdownTabs, DemoRepo, VideoCard,
} from '@site/src/components/createRepoLesson';

<SetupLesson
  className={rootClass}
  storageKey="recodehive:create-github-repo:done"
  steps={['Open New repository', 'Name and visibility', 'Tour the repo', 'Edit the README', 'Commit changes', 'Upload a file']}
  doneMessage="🎉 All 6 steps done. Your first repository is live on GitHub."
>

<LessonHeader title="Create GitHub Repo (GUI)" platform="No command line" art={<RepoArt />} options={<FlowChips />}>

In the previous post, we learned about commit, fork and clone. In this post, we are going to take a deep dive into the terminology by creating a GitHub repository from scratch. To create and host a project, the repository is the place where you add all your program code files and other documentation.

</LessonHeader>

## Prerequisites

<PrereqCards>
<Prereq icon="👤" title="A GitHub account">

Set one up in [Setup GitHub Account →](/docs/GitHub/setup-environment/)

</Prereq>
<Prereq icon="⚙️" title="Git installed and running">

Plus a basic idea of how Git works. See [Setup Git →](/docs/GitHub/setup-environment/setup-git-on-windows)

</Prereq>
</PrereqCards>

<SetupChecklist title="Your progress" />

## How to create a GitHub repository

<StepTimeline>

<Step n={1}>

### Step 1: Open New repository

Go to the GitHub website. By default, you will be on the Home page as shown below. Click on the `+` icon in the top-right corner, and from the dropdown, select `New repository`.

<Shot pins={[{ n: 1, label: 'Click on the + icon' }, { n: 2, label: 'Click on New repository' }]}>
<BrowserWindow url="https://github.com" bodyStyle={{padding: 0}}>

[![GitHub home page with the plus icon and the New repository option marked](./assets/1-GitHub-repo.png)](https://github.com/new)

</BrowserWindow>
</Shot>

</Step>

<Step n={2}>

### Step 2: Name it and choose who can see it

Specify the name of the project and choose whether to make it public or private. For this tutorial, we’ll make it public.

<VisibilityToggle />

Next, check the box to include a README file. This will automatically create a `README.md` file along with the repository. Finally, click on `Create repository` at the bottom.

<Shot
  pins={[
    { n: 3, label: 'Choose your profile' },
    { n: 4, label: 'Give a repo name' },
    { n: 5, label: 'Add a description' },
    { n: 6, label: 'Make it public' },
    { n: 7, label: 'Add a README file' },
  ]}
>
<BrowserWindow url="https://github.com/new" bodyStyle={{padding: 0}}>

[![The Create a new repository form with the owner, name, description, visibility and README options marked](./assets/4-git-gui-install.png)](https://github.com/new)

</BrowserWindow>
</Shot>

</Step>

<Step n={3}>

### Step 3: Tour your new repository

Once the repository is created, you’ll see a screen like the one below. The explanation of each element is below.

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo" bodyStyle={{padding: 0}}>

[![The new Git-Demo repository page with the README file, the edit button and the Add file menu marked](./assets/5-git-add-file.png)](https://github.com/sanjay-kv/Git-Demo)

</BrowserWindow>
</Shot>

<TourCards
  items={[
    { n: 8, title: 'Your README file', text: 'The README is the front page of your repository. GitHub shows it below the file list.' },
    { n: 9, title: 'The edit button', text: 'Click the pencil icon on the README to edit it in the browser.' },
    { n: 10, title: 'Add file', text: 'Upload any files to the repository from here.' },
  ]}
/>

</Step>

<Step n={4}>

### Step 4: Edit the README

I’m going to add my resume and include my name as a heading in the `README.md` file. Click the edit icon on the README.

<Shot pins={[{ n: 10, label: 'Click on the Edit icon' }]}>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo" bodyStyle={{padding: 0}}>

[![The README of the repository with the edit icon marked](./assets/6-edit-file-git.png)](https://github.com/sanjay-kv/Git-Demo)

</BrowserWindow>
</Shot>

#### The Markdown I added

README files use Markdown, a simple way to format text. Switch to Preview to see how GitHub displays it.

<MarkdownTabs
  file="README.md"
  code={`# Git-Demo
This is a demo installation via GUI

## Developed by Sanjay Viswanathan
This readme contains my resume, please refer to the attached file in the repo.`}
  legend={[
    { badge: '#', text: 'A level 1 heading. Here it is the repository name.' },
    { badge: '##', text: 'A level 2 heading, smaller than #.' },
    { badge: 'Plain text', text: 'A line without # is shown as a normal paragraph.' },
    { badge: 'Blank line', text: 'Starts a new paragraph or section.' },
  ]}
/>

When you are done, click `Commit changes` to save your edit.

<Shot pins={[{ n: 11, label: 'Click on Commit to save the changes' }]}>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo/edit/main/README.md" bodyStyle={{padding: 0}}>

[![The README editor with the Commit changes button marked](./assets/7-commit-the-changes.png)](https://github.com/sanjay-kv/Git-Demo/edit/main/README.md)

</BrowserWindow>
</Shot>

</Step>

<Step n={5}>

### Step 5: Commit the changes

This is the step where you add your commit message. A short message says what changed; the extended description can explain why.

<Shot
  pins={[
    { n: 12, label: 'Add a short message' },
    { n: 13, label: 'Add a detailed message' },
    { n: 14, label: 'Commit directly to main' },
    { n: 15, label: 'Click on Commit' },
    { n: 16, label: 'Go to the main page after the commit' },
  ]}
>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo/edit/main/README.md" bodyStyle={{padding: 0}}>

[![The Commit changes dialog with the message fields and the Commit button marked](./assets/8-commit-message.png)](https://github.com/sanjay-kv/Git-Demo/edit/main/README.md)

</BrowserWindow>
</Shot>

Back on the repository page, you can see the result of your commit.

<Shot
  pins={[
    { n: 17, label: 'README file got changed' },
    { n: 18, label: 'New commit history' },
    { n: 19, label: 'Hash key for version control' },
    { n: 20, label: 'Your latest commit message' },
  ]}
>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo" bodyStyle={{padding: 0}}>

[![The repository page after the commit, with the changed README and the commit history marked](./assets/9-final-commit.png)](https://github.com/sanjay-kv/Git-Demo)

</BrowserWindow>
</Shot>

<DemoRepo repo="sanjay-kv/Git-Demo" />

</Step>

<Step n={6}>

### Step 6: Upload your resume

Now let’s upload my resume to the repository. Click on `Add file`, then `Upload files`.

<Shot pins={[{ n: 21, label: 'Click on Add file' }, { n: 22, label: 'Click on Upload' }]}>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo" bodyStyle={{padding: 0}}>

[![The Add file menu with the Upload files option marked](./assets/10-add-git-file.png)](https://github.com/sanjay-kv/Git-Demo)

</BrowserWindow>
</Shot>

Drag your file in or choose it from your computer, add a commit message and click `Commit changes`.

<Shot
  pins={[
    { n: 23, label: 'Upload your file from your system' },
    { n: 24, label: 'Add a commit message' },
    { n: 25, label: 'Click on Commit' },
  ]}
>
<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo/upload/main" bodyStyle={{padding: 0}}>

[![The upload page with the drop area, the commit message and the Commit button marked](./assets/11-add-file-commit-git.png)](https://github.com/sanjay-kv/Git-Demo/upload/main)

</BrowserWindow>
</Shot>

You will now be able to see the uploaded resume in your repository.

</Step>

</StepTimeline>

## Watch the video tutorial

<VideoCard
  id="XWjx-RjmhRM"
  list="PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63"
  title="How to create your first GitHub repository"
  channel="recode hive on YouTube"
/>

## Conclusion

In this tutorial, you created a GitHub repository from the web interface, edited its README with Markdown, committed your changes and uploaded a file. In the next post, you will create a repository from the command line.

<UpNextCard />

</SetupLesson>
