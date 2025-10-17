---
id: setup-nodejs
title: Setting Up Node.js for Local Development
sidebar_label: Node.js Setup
description: A beginner's guide to installing and configuring Node.js on your local machine.
slug: /NodeJS-Setup
---

# Setting Up Node.js for Local Development

## Introduction
Node.js is a powerful JavaScript runtime that allows you to run JavaScript code outside of a web browser. It's essential for building modern web applications, APIs, and tools. In this tutorial, we'll walk through the steps to set up Node.js on your local machine. By the end, you'll have a working environment ready for development.

This guide is aimed at beginners, so we'll cover everything from installation to verification. If you're new to programming, don't worry—we'll keep it simple!

## Prerequisites
Before we begin, make sure you have:
- A computer with internet access (Windows, macOS, or Linux).
- Administrative privileges on your machine (to install software).
- A code editor like VS Code (optional but recommended for writing code).

Estimated time: 10-15 minutes.

## Step-by-Step Guide

### Step 1: Download Node.js
1. Go to the official Node.js website at [nodejs.org](https://nodejs.org).
2. On the homepage, you'll see two versions: LTS (Long Term Support, recommended for stability) and Current (for the latest features).
   - For beginners, choose the LTS version.
3. Click on the "LTS" download button. This will automatically detect your operating system and provide the correct installer.

### Step 2: Install Node.js
The installation process varies slightly by operating system. Follow the instructions for your OS:

- **Windows**:
  1. Run the downloaded installer (e.g., `node-vXX.XX.X-x64.msi`).
  2. Follow the wizard: Accept the license, choose the default installation options, and click "Install."
  3. Once complete, click "Finish."

- **macOS**:
  1. Open the downloaded `.pkg` file.
  2. Follow the installer prompts: Agree to the license and click "Continue" through the steps.
  3. Enter your administrator password if prompted.
  4. After installation, open a terminal to verify.

- **Linux (e.g., Ubuntu)**:
  1. Download the installer or use the package manager. For Ubuntu, open a terminal and run:
     ```
     curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
  2. If you downloaded the installer, extract it and follow the on-screen instructions.

### Step 3: Verify the Installation
After installation, let's check if Node.js is working correctly:
1. Open your terminal or command prompt.
2. Type the following command and press Enter:

node -v

- This should display the version of Node.js, e.g., `v18.12.1`.
3. Next, check if npm (Node Package Manager) is installed:

npm -v

- This should show a version like `8.19.2`. npm is used to install packages and dependencies.

If you see the versions printed, congratulations—Node.js is set up successfully!

### Step 4: Set Up a Simple Project (Optional Hands-On)
To make this more practical, let's create a simple "Hello World" project:
1. In your terminal, create a new directory:

mkdir my-first-node-project cd my-first-node-project

2. Create a new file called `app.js` using your code editor:

echo 'console.log("Hello, Node.js!");' > app.js

3. Run the file with Node.js:

node app.js

4. You should see: `Hello, Node.js!` printed in the terminal.

## Troubleshooting Common Issues
- **Error: 'node' is not recognized**: Ensure Node.js was added to your system's PATH during installation. Restart your terminal or computer and try again.
- **Permission errors on macOS/Linux**: If you encounter issues, try running commands with `sudo`, but be cautious.
- **Version mismatches**: If the versions don't match, double-check the installation or reinstall from the official site.

For more help, refer to the [official Node.js documentation](https://nodejs.org/en/docs/).

## Conclusion
You've now set up a local development environment with Node.js! This is your first step toward building web applications, experimenting with frameworks like React, or contributing to projects like Recode Hive. Once you're comfortable, try creating a simple web server or exploring npm packages.

If you found this tutorial helpful, consider sharing your experience in the Recode Hive community. Happy coding! 🚀

---