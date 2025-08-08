---
id: setup-git-on-windows
title: Setup your Git on Windows
sidebar_label: Setup Git on Windows
sidebar_position: 2
tags:
  [
    github,
    install-github,
    git installation,
    development-environment,
    setup-environment,
  ]
description: In this tutorial, you will learn how to set up your development environment for Git And GitHub.
---

Github provides two of installation, one the GitHub Desktop and command line by installing Git Software in your system. Personally from a developer perspective i would suggest you to use the command line as this will come in handy and more flexibility in terms of solving bugs and do more with version control, especially when the conflicts happens with the Git. This tutorial is focused on the command line version. 

< />
### Step 1: Let’s Download the git 

1. Go to the [Git Website](https://git-scm.com/) and click on download for windows button.

    <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/6-git-setup.png)](https://git-scm.com/)
    </BrowserWindow>


### Step 2: Select your Version you want to insatll.

1. Get your Installer:

   Based on the current version of windows you can choose to have standalone installer or windows insaller to get started with. As my system is 64 bit i will choose here 64 bit, you can get know which system you are using by going to ``This PC`` icon right click on ``Properties`` Check under the system type. 

     - **Installer:** Get the Installer
    <BrowserWindow url="https://git-scm.com/downloads/win" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/7-git-installer.png)](https://git-scm.com/downloads/win)
    </BrowserWindow>
        

     - **Start Installation:** Open the Installer, upon downloading. 
          
   
    <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/8-Git-setup01.png)](https://git-scm.com/)
    </BrowserWindow>

   - 1. The next screen click next on Public Licence.
   - 2. Choose the location as default and click on Next

< />

### Step 3: Understanding the Interface.

Next step, Git Will ask you to install couple of components you can checko on additional icons to add on Desktop and leave the rest as default and click on the Next.

   - 1. The next screen click next , make sure the start folder name is Git.
   - 2. Next option is to choose the default editor  you can use your editor, im using visual studio code. or keep Vim as the default editor


    <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![Github](./assets/9-git-components.png)](https://github.com/sanjay-kv)
    </BrowserWindow>

   
### Step 5:  Adjusting name of the repo setting in Git

This stage it will ask you to Choose a initial branch in new repository, it would be ideal approach to give the second option, as we move further it gives us flexibility to change the intial branch name , like main master, trunk. 


     <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![Github](./assets/10-default-git-branch.png)](https://github.com/sanjay-kv)
    </BrowserWindow>

   
### Step 5:  Adjusting Your path enviornment

This is where we specify the path enviornment of git, just go with the recommened option which is 2.

     <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![Github](./assets/11-git-path-env.png)](https://github.com/sanjay-kv)
    </BrowserWindow>


1. ``1`` In the next screen choose the SSH Executable, use the deafault one ``use bundled OpenSSH`` which is the default option.
2. ``2`` On the next, you will ask to configuring the line ending conversions, you gotta keep it default which is option 1.
3. ``3`` Next step will be configuring the terminal emulator to use the git bash. Keep the default which is option 1.
4. ``4`` Next option is to choose the defualt option to use the gith . use the default one which is the Fast- forward and merge option 1.
5. ``5`` In the Credential helper choose the ``Git Credential Manager`` screen. and click on Next.
6. ``6`` Enable the extra option , click on the ``Enable the file system Caching`` and click on the Next button. 
7.  ``7`` In the Next step Screen it will ask you to enable the expiremental support , choose the both the option and click on Install. 

     <BrowserWindow url="https://git-scm.com/" bodyStyle={{padding: 0}}>    
     [![Github](./assets/12-git-final-setup.png)](https://github.com/sanjay-kv)
    </BrowserWindow>

Congratulations! The Git Setup has been finished and now you can launch the GitHub.

After that setup, you can see in your PC’s application list there are few new apps are added like ‘Git Bash,’ ‘Git GUI,’ ‘Git CMD.’ However, we will mostly use Git Bash for uploading our projects.

Execute the below command to see your current version of git in Git CMD or windows command promt. Git Installation on Windows is completed.

<Tabs>
  <TabItem value="Git Code" label="Git Code">
  
  ```html title="Adding file to the repo"
   git --version
    ```

    </TabItem>
    
    <TabItem value="how-git-works" label="Output on browser">
      ![alt text](./assets/14-git-version.png)
    </TabItem>
</Tabs>



    
< />

## Conclusion

In conclusion, I hope you enjoyed reading this article on “Setting up your Git Enviornment?”. In the next post, will be discussing using Git to create a Repository and clone a project Github.  Signing off Sanjay Viswanathan.