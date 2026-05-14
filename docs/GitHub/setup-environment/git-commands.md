---
id: git-commands
title: 50 Git commands Cheatsheet
sidebar_label: Git commands  
sidebar_position: 4
tags: [git, github, git-cheatsheet, commands, git-commands]
description: In this tutorial, you will learn about the basic of git and 50 important git commands.
---

> *This is part of GitHub/Git Tutorials and a continuation of the previous post where we discussed what is gitHub. I hope you have a basic understanding of what is Github in general. Let’s get started with Git Cheat Sheet. Git Cheat Sheet. 50 Git commands | Git Tutorials*

Git commands are handy when comes to fix any problems which you cant fix by the UI, for example consider a scenario  you need to fix the conflict in a page. Git Commands will help you to find the root cause and can explore the entire log history. 

## Understanding Git: Adding the Files to Git

While Setting up git on Windows tutorial before, you learned to perform how to check the current version of the git. Now below you will see how to add some changes to the files you have created. Create a small folder in your local system, where you created a file called filename.ipynb, now you want to add that into the git. 


**Git Basic Commands**

      :::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Basic Commands"
git init _#Initialize a local Git repository_
git add . _#add all file in the current directory_
git add  _#Add a file to the staging area_
git add -A _#Add all new and changed files to the staging area_
git clone _#Create a local copy of a remote repository_
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::

1. **Git commits**: This commit provides all the staged files from your local files to move to remote repository.
:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Git Commit Commands"
git commit #commit staged files
git commit -a #stage and commit all changes to tracked files
git commit -am "message" #stage and commit all files with a message
git commit --amend -m "message" #add additional info to last commit
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::
4. **Checking logs and views**: Here you can see in detail about the changes and summary of the changes you made. 

:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Checking logs and views"
git log #view changes
git log --summary #view changes detailed
git log --oneline #view changes breifly
git status git show
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::


4. **Git Diff**: Helps you to see the change in the code as described below. Check out the output session.
:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Git diff"
git diff
git diff --color-words
git diff -staged
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::


4. **to rename a file to directly stage**: Changing the file name is important in some case, this mv and rm git helps you to perform the same functions. 
:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="to rename a file to directly stage"
git mv <filename> <renamed Filename>
git rm <filename>
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::


4. **Working with Git branch**: 
:::info
<Tabs>
  <TabItem value="Git Code" label="Git branch">
  
  ```html title="Checking logs and views"
git branch #list branches
git branch <name> #create new branch
git branch -d \[branch name\] #delete branch
git checkout <branch name>  #Switch to a branch
git merge <branch name>   #Merge a branch into the active branch
git merge <source name>  <Target name> #Merge a branch into a target branch
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::


4. **Undo Changes**: 
:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Undo Changes"
git checkout --  #telling git to undo changes in working directory.
git checkout -- . #undo all changes in working directory
git reset HEAD <file> #to unstage the file in staging area
git revert <sha value> #to revert back to specfic commit
git clean -n #show the untracked file status
git clean -f #remove untracked files
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::

4. **Adding Changes to remote**: 
:::info
<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Adding Changes to remote"
git remote add origin <link URL>  #Add a remote repository
git branch -M main #make the branch main
git push -u origin main #Push changes to remote repository and remember the branch
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/image-1.png)
    </TabItem>
</Tabs>
    :::

<iframe width="880" height="480" src="https://www.youtube.com/embed/jE8nqWSbUQs?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63" title="Understanding the GitHub Flow" style="border: none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Practice Git Interactively

:::tip Learn By Doing
Master Git through gameplay at [Learn Git Branching↗](https://learngitbranching.js.org/). This interactive learning platform turns Git concepts into visual puzzles and challenges. It's like a game that teaches you Git commands with immediate visual feedback - perfect for beginners and experienced developers alike.
:::

## Conclusion

In conclusion, I hope you enjoyed reading this article on “Git Cheat Sheet. 50 Git commands |Git Tutorials”. In the next post, We will continue the Git/Github courses with more added materials and set up of git in your system. Signing off Sanjay Kv