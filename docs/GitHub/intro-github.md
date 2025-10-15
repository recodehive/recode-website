---
id: intro-github
title: Introduction of GitHub 
sidebar_label: Introduction of GitHub #displays in sidebar
sidebar_position: 1
tags:
  [
    GitHub,
    Introduction of GitHub,
    What is GitHub,
    Why learn GitHub,
    How to use GitHub,
  ]
description: In this tutorial, you will learn about GitHub, its importance, what is GitHub from Scratch, how to use GitHub, steps to start using GitHub, and more.
---

GitHub is a web-based platform used for version control and collaboration. It allows developers to work together on projects from anywhere in the world. GitHub is built on top of Git, a distributed version control system created by Linus Torvalds in 2005.

:::note
Key Features of GitHub:
GitHub  will help you to control the version of the project on a large scale.

GitHub offers <a href="https://github.com/pricing">Premium</a> account for use, Premium users get unlimited GitHub Repo time, Storage etc. 

:::

## How to start with GitHub?

Whenever you create something exciting or something new on your own, you always want to show it to others. As programmers, we also want to show our projects and codes to others, but how? So GitHub is the solution, it let's people to collaborate and scale the projects all on cloud.  Some other example of similar platform are Bitbucket, GitLab, Beanstalk, etc. Many of them give you the facility to work on your code together as a team. Currently, GitHub is more popular than other above-listed platforms for hosting your code.
:::info
In the picture below, you can see Developer 1, Developer 2, etc., working on the same project. Let's say they are trying to build an Amazon website; Developer 1 handles the men's shopping section, Developer 2 deals with the women's section, and Developer 3 works on the login feature.

So, each individual works on a different feature from a copy of the central repository, once the development is done they push changes to the *remote repository* (central repo as per picture). Once a code review happens and it is good to go, the senior developer will merge the code into the central repository so all the features will be live in production.
:::

  <BrowserWindow url="https://github.com/" bodyStyle={{padding: 0}}>    
     [![Visual Studio Code](./assets/1-Introduction-to-github.png)](https://code.visualstudio.com/)
    </BrowserWindow>



## What is Git??

In the above example, all the developers were able to work on different features simultaneously because of Git. For uploading your project to your GitHub account, you need to install Git first. In other words, Git helps with the version management of files and coordinates work among a diverse team in the software development phase. Git is an open-source project and developed in 2005 by Linus Torvalds and Junior.


  
:::info
1.  *What is Version control System?*: To understand the version control system, let me give you one example; sometimes, you wish you have a record that contains all the changes you made in your code or your project. The version control systems are software tools that record all of your changes in the files. It is like a database of changes. Git is a version control system that most developers prefer to use. We will see how you can upload your code on GitHub using Git. With VCS you can track the branch, who made changes at what time, line of code added, retrieve the previous version of changes. 
2.  Basic Git Terminology::

        | Keyword | 	Terminology | 	Description |
        | --- | --------------- | -------------------- |
        | VCS   | Version Control System | Track changes to a collection of files |
        | SCM  | Software configuration Management | 	Another name for VCS,earlier versions of VCS, like CVS and SVN, used a centralized server, which caused a single point of failure. |
        | DVCS | 	Distributed Version Control System| Git is distributed, the project history is stored both in client and server. Means you can make changes locally and remote. |
        | Working Tree  | Tree | Current version of files where the active project is on |
        | Repo  | 	Repository | 		Top of the working tree where Git keeps all records and history. |
        | Bare repo   | 	 | 		Not part of working Tree ends with .git, eg. backup.git |
        | Hash  | 	160 bit long SHA-1 | 		Based on the hash number, the file has been modified or not. |
        | Object  | 	Git has 4 objects | 		Tree Object(directory, names),  Blob Object(main file), Commit Object(specific versions), Tag(name attached to commit) |
        | Commit  |  | 		Makes Changes |
        | Branch  | 	A series of linked commits | 		The most recent commit is called Head. |
        | Remote  | 	 | 		reference to other git repo |
        | | 	 Git Command | 		Check our [Git Commands Cheatsheet](../GitHub/setup-environment/git-commands.md) for practical examples |

:::

:::tip Need Git Commands?
Want to start using Git right away? Check out our [comprehensive Git Commands Cheatsheet](../GitHub/setup-environment/git-commands.md) that includes 50 essential Git commands with examples. We also recommend trying [Learn Git Branching](https://learngitbranching.js.org/) - an interactive visual tool to practice Git commands in a gamified environment!
:::

## Why Learn GitHub? 

GitHub simplifies the command-line interface of Git and makes it more GUI-friendly. GitHub is built on top of Git. Here want we do is staging the files and doing the commit, You can clone the entire repository, create a branch, commit to that branch, and then ask the main developer to merge the branch. When you clone in reality you are creating a copy of the real code/repository in your local environment.

 ![Git Structure](./assets/2-git-strucutre.png)
   
  
:::info
1.  Basic GitHub Keywords::

        | Category | 	Description |
        | --- |  -------------------- |
        | Issues | The place where new suggestions or development ideas can be added. |
        | Discussions | Place where a community discussion can happen |
        | Pull requests | PR - Once the user worked on the issue, they can develop the feature and ask to merge |
        | Labels | Feature to categorise the issue, like bug, deadline, feature |
        | Actions | To automate the entire process of repeitive task on GitHub |
        | Forks | Cloning the original repo to your name |


The fork is a personal copy of the repo which is already present or uploaded in GitHub by a different user. Once you fork and make changes to the repository the changes will happen to your forked repo, not the real one.

:::



### Watch the video Tutorial
<iframe width="880" height="480" src="https://www.youtube.com/embed/GrTV59Y84S8?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63" title="How to start with GitHub in 2024 | Beginner&#39;s Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



## Conclusion

If you think this GitHub Tutorial starter kit for Beginner was useful to you, then don’t forget to share it with others.  We will discuss this in detail in the next post. or In the next post, we will discuss how to upload your project to your GitHub account using Git.
