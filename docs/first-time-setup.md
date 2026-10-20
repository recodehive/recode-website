---
id: first-time-setup
title: First-Time Setup Guide
sidebar_label: First-Time Setup
sidebar_position: 2
description: A step-by-step guide for beginners to run the recode hive website on their own computer for the first time.
---

# First-Time Setup Guide

This page takes you from "I have nothing installed" to "the recode hive website is running on my computer". Take it one step at a time. Nobody gets every step right on the first try, and the troubleshooting section at the bottom covers the most common problems.

:::tip How long will this take?
About 20 to 30 minutes, most of it waiting for downloads. You only do this once.
:::

## What you will need

| Tool | What it is for |
|---|---|
| A GitHub account | Lets you copy the project and share your changes |
| Git | Downloads the project and tracks your changes |
| Node.js | Runs the website on your computer |
| A code editor | Lets you read and edit the files (we suggest VS Code) |

You do not need to know React or TypeScript to get the site running.

---

## Step 1: Create a GitHub account

If you already have one, skip to Step 2.

1. Go to [github.com/signup](https://github.com/signup).
2. Follow the prompts and verify your email address.

New to GitHub? The [GitHub account guide](./GitHub/setup-environment/setup-environment.md) explains each screen.

---

## Step 2: Install Git

Git is the tool that downloads the project and keeps track of your changes.

**Check if you already have it.** Open a terminal:

- **Windows:** press the Windows key, type `PowerShell`, and press Enter.
- **Mac:** press `Cmd + Space`, type `Terminal`, and press Enter.
- **Linux:** open your Terminal app.

Then type this and press Enter:

```bash
git --version
```

If you see something like `git version 2.45.0`, Git is installed. If you see "command not found" or "not recognized", install it:

- Windows: follow the [Git on Windows guide](./GitHub/setup-environment/setup-git-on-windows.md).
- Mac: follow the [Git on Mac guide](./GitHub/setup-environment/setup-git-on-mac.md).

After installing, **close the terminal and open a new one**, then run `git --version` again.

### Tell Git who you are

Run these two commands once, using your own name and the email you used for GitHub:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Step 3: Install Node.js

Node.js runs the website on your computer.

1. Go to [nodejs.org](https://nodejs.org/).
2. Download the **LTS** version (version 20 or 22). The site does not support versions older than 20.
3. Run the installer and accept the default options.
4. Close your terminal, open a new one, and check:

```bash
node --version
npm --version
```

You should see a version number for each, for example `v22.11.0` and `10.9.0`. `npm` comes with Node.js, so there is nothing extra to install.

---

## Step 4: Install a code editor

We suggest [Visual Studio Code](https://code.visualstudio.com/) (free). Download it, install it, and open it once to make sure it starts.

---

## Step 5: Fork the project

A **fork** is your own copy of the project on GitHub. You make changes in your copy, then ask us to add them to the main project.

1. Open [github.com/recodehive/recode-website](https://github.com/recodehive/recode-website).
2. Click the **Fork** button in the top right.
3. Leave the default settings and click **Create fork**.

GitHub takes you to your copy. The address now contains your username: `github.com/YOUR-USERNAME/recode-website`.

---

## Step 6: Download your fork (clone)

**Cloning** downloads your fork to your computer.

1. On your fork's page, click the green **Code** button and copy the HTTPS address.
2. In your terminal, go to the folder where you keep projects. For example, to use your Documents folder:

```bash
cd Documents
```

3. Clone the project. Replace `YOUR-USERNAME` with your GitHub username:

```bash
git clone https://github.com/YOUR-USERNAME/recode-website.git
```

4. Move into the project folder:

```bash
cd recode-website
```

5. Connect your copy to the original project, so you can pick up new changes later:

```bash
git remote add upstream https://github.com/recodehive/recode-website.git
```

:::note
If GitHub asks you to sign in during the clone, follow the browser prompt. It only happens the first time.
:::

---

## Step 7: Open the project in your editor

From the same terminal, run:

```bash
code .
```

This opens the project in VS Code. If the command is not found, open VS Code yourself and choose **File > Open Folder**, then pick the `recode-website` folder.

---

## Step 8: Install the project's dependencies

The project uses many small libraries. This command downloads all of them:

```bash
npm install
```

What to expect:

- It can take **2 to 5 minutes** the first time.
- You will see a lot of text scroll past. This is normal.
- Yellow `warn` lines are normal and safe to ignore.
- It is finished when you get your prompt back.

---

## Step 9: Start the website

```bash
npm start
```

The first start can take a minute or two. When it is ready, your browser opens to [http://localhost:3000](http://localhost:3000) and you will see the recode hive website running on your own computer.

If the browser does not open by itself, copy `http://localhost:3000` into the address bar.

:::info Keep the terminal open
The website runs for as long as this terminal is running. To stop it, click in the terminal and press `Ctrl + C`.
:::

---

## Step 10: Make a tiny change to see it work

1. In VS Code, open `docs/first-time-setup.md` (this very page).
2. Change the first sentence slightly and save the file (`Ctrl + S`, or `Cmd + S` on Mac).
3. Look at your browser. The page updates on its own within a second or two.

You have just edited the website. To undo the experiment, run this in a **second** terminal in the same folder:

```bash
git checkout -- docs/first-time-setup.md
```

---

## Troubleshooting

| Problem | What to try |
|---|---|
| `git` or `node` is "not recognized" or "command not found" | Close the terminal and open a new one. If it still fails, the install did not finish, so run the installer again. |
| `npm install` fails with a permissions error | Make sure you cloned into a folder you own, such as Documents, not a system folder. |
| `npm install` fails with a network error | Check your connection and run `npm install` again. |
| Node version error mentioning `engines` | Install the LTS version of Node.js (20 or 22) from [nodejs.org](https://nodejs.org/). |
| `Port 3000 is already in use` | Another program is using it. Press `Y` when asked to use a different port, or close the other program. |
| The page is blank or looks broken | Wait for the terminal to say the site compiled, then refresh the browser. |
| `npm start` is very slow | The first start is always the slowest. Later starts are much faster. |

Still stuck? Ask in the [recode hive Discord](https://discord.gg/dh3TA8U55Q) and include the exact error text from your terminal.

---

## What to do next

You now have a working copy of the site. When you are ready to make a real contribution:

1. Read the **Contribution Workflow** section on the [Welcome page](./index.md) for the branch, commit, push and pull request steps.
2. Pick a beginner-friendly task from the [good first issues](https://github.com/recodehive/recode-website/issues?q=is%3Aissue+state%3Aopen+label%3A%22good+first+issue%22).
3. Practice the full flow safely in the [Opensource-practice](https://github.com/recodehive/Opensource-practice) repository.

Welcome to the hive!
