---
id: github-repo-command-line
title: Create Repo Via Command line 
sidebar_label: Create Repo Via Command line 
sidebar_position: 2
tags: [git, github, command-line, repository]
description: In this tutorial, you will learn how to create a GitHub repository and push your first files to it from the command line.
hide_title: true
footer_width: lesson
---

import {
  SetupLesson, LessonHeader, SetupChecklist, StepTimeline, Step, Shot, UpNextCard,
} from '@site/src/components/setupLesson';

<SetupLesson
  storageKey="recodehive:github-repo-command-line:done"
  steps={["Create the repository","Add and push files"]}
  doneMessage={"🎉 All 2 steps done. Nice work!"}
>

<LessonHeader title={"Create Repo Via Command line"} platform="💻 Terminal">

In this tutorial, you will learn how to create a GitHub repository and push your first files to it from the command line.

</LessonHeader>

## Prerequisites

1. You should have a GitHub account.
2. You should have a basic understanding of how Git works and ensure Git is installed and running on your operating system.

<SetupChecklist title="Your checklist" />

<StepTimeline>

<Step n={1}>

### Step 1: How to create Github Repository

**1.** Go to GitHub and create a new Repository.

<Shot>
<BrowserWindow url="https://github.com" bodyStyle={{padding: 0}}>

[![GitHub](./assets/1-GitHub-repo.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

<br />

**2.** Specify the name of your project, make it public or private, check the option to include a README file. Then click on Create repository on the button below.

<Shot>
<BrowserWindow url="https://github.com/new" bodyStyle={{padding: 0}}>

[![GitHub](./assets/2-repo-create-github.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

Once the repository is created, you'll see a screen similar to the one below, the explanation for each element is provided below. 
 
  ```bash title="create a new repository on the command line"
echo "# demo-repo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/sanjay-kv/demo-repo.git
git push -u origin main
    ```

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/3-command-line-exec.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

</Step>

<Step n={2}>

### Step 2: Browser Rendering

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/12-add-file.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/13-cmd-git.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/14-git-command-add.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

Now you can see the new file has been added to your local system

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/15-push-changes.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

**10.** Once the work is done, click save and open cmd or Terminal

<Shot>
<BrowserWindow url="https://github.com/sanjay-kv/demo-repo" bodyStyle={{padding: 0}}>

[![GitHub](./assets/16-remote-repo.png)](https://github.com/sanjay-kv)

</BrowserWindow>
</Shot>

**11.** Initially when I was creating the repo I used Git add * to add all files in one go.

If you are committing for the first time, Git may prompt you to enter your GitHub email id and username to proceed. 
The screenshot below shows an example of the prompt. After entering these details, when you run the git push command, a browser window may open asking you to sign in to GitHub.

  ```bash title="create a new repository on the command line"
git config --global user.email "Enter your github Email"
git config --global user.name "Github username"
    ```

</Step>

</StepTimeline>

### Watch the video Tutorial

<iframe width="880" height="480" src="https://www.youtube.com/embed/DO38CZcw5pg?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63" title="Github create repo using command line" style={{ border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

In this tutorial, you created a repository on GitHub, then used Git on the command line to add a file, commit it and push it to the remote repository.

<UpNextCard />

</SetupLesson>
