---
id: enable-dicussion
title: How to Enable GitHub Discussions
sidebar_label: How to Enable Discussions
sidebar_position: 4
tags: [GitHub, GitHub-development, document-structure, GitHub repo,]
description: In this tutorial, you will learn about the how to create a GitHub repo by Online GUI interface. 
---

In the previous post we spoke about commit, fork, clone, in this post we gonna deep dive into the terminology by creating a GitHub Repository from scratch. 
In order to create a project and host, the repository is a place where you add all your program code files and other documentation. 

### Prerequisites

- 1. You must have a GitHub account. 
- 2. You must also have a basic understanding of how Git works and ensure Git is installed and running on your operating system.


### How to create GitHub Repository

**Step 1:** Go to the GitHub website. By default, you will be on the Home page as shown below. Click on the ``+`` icon in the top-right corner, and from the dropdown, select ``New Repository``.

    <BrowserWindow url="https://github.com/recodehive/recode-website" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/21-discussion-github.png)](https://github.com/recodehive/recode-website)
    </BrowserWindow>
**Step 2:** Specify the name of the project and choose whether to make it public or private. For this tutorial, we’ll make it public.

Once a repository is made private, the project admin must manually grant permission to other GitHub users to collaborate or view it. This is a common practice at the organizational level.

Next, check the box to include a README file—this will automatically create a ``README.md`` file along with the repository. Finally, click on ``Create repository`` at the bottom.


    <BrowserWindow url="https://github.com/recodehive/recode-website/milestones" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/22-success-dashboard.png)](https://github.com/recodehive/recode-website/milestones)
    </BrowserWindow>

Once the repository is created, you’ll see a screen like the one below. The explanation of each elements is mentioned below.
 
    <BrowserWindow url="https://github.com/recodehive/recode-website/milestones" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/23-github-discussion.png)](https://github.com/recodehive/recode-website/milestones)
    </BrowserWindow>

- **`<!DOCTYPE html>`**: Declares the document type and version of HTML.
- **`<html>`**: Root element that contains all other elements.
- **`<head>`**: Contains metadata about the document. It includes elements like `<meta>` and `<title>`.
- **`<meta charset="UTF-8" />`**: Specifies the character encoding of the document.
- **`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`**: Sets the viewport properties for responsive design.
- **`<title>`**: Sets the title of the document (displayed in the browser tab).
- **`<body>`**: Contains the visible content of the document.
- **`<!-- Your content goes here -->`**: Represents a comment that is not displayed in the browser.


## Changing Readme and Adding more files.

I'm going to add my resume and add my name as heading to the ``README.md`` file

    <BrowserWindow url="https://github.com/recodehive/recode-website/milestones/new" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/24-start-github-discussion.png)](https://github.com/recodehive/recode-website/milestones/new)
    </BrowserWindow>

### Adding Markdown Language

Below is a visual representation of the basic HTML document structure:
```html title="readme.md"
# Git-Demo
This is a demo installation via GUI

## Developed by Sanjay Viswanathan
This readme contains my resume, please refer to the attached file in the repo.
```


### Browser Rendering

When the above HTML code is rendered in a browser, it will display the following content:

<BrowserWindow url="https://github.com/sanjay-kv/Git-Demo/edit/main/README.md">
  <>
    <h1>Git-Demo</h1>
    <p>This is a demo installation via GUI</p>

    <h1>Developed by Sanjay Viswanathan</h1>
    <p>This readme contains my resume, please refer to the attached file in the repo.</p>
    
  </>
</BrowserWindow>

### Explanation

- **`<!DOCTYPE html>`**: Declares the document type and version of HTML.
- **`<html>`**: Root element that contains all other elements.
- **`<head>`**: Contains metadata about the document.
- **`<title>`**: Sets the title of the document (displayed in the browser tab).
- **`<meta>`**: Provides character set and viewport information.
- **`<body>`**: Contains the visible content of the document.
- **`<h1>`**: Heading element with the text "Hello, World!".
- **`<p>`**: Paragraph element with the text "Welcome to HTML learning.".

## Committing the changes.

I'm going to add my resume and add my name as heading to the ``README.md`` file

    <BrowserWindow url="https://github.com/recodehive/recode-website/milestones?with_issues=no" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/25-start new discussion.png)](https://github.com/recodehive/recode-website/milestones?with_issues=no)
    </BrowserWindow>

This is the step where you need to add additional comments.

    <BrowserWindow url="https://github.com/recodehive/recode-website/milestones?with_issues=no" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/26-final-discussion.png)](https://github.com/recodehive/recode-website/milestones?with_issues=no)
    </BrowserWindow>



https://github.com/sanjay-kv/Git-Demo

### Now let's upload your resume

I'm going to add my resume and add my name as heading to the ``README.md`` file

    <BrowserWindow url="https://github.com/recodehive/recode-website/issues/21" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/27-announce-github.png)](https://github.com/recodehive/recode-website/issues/21)
    </BrowserWindow>

   


Now you will be able to see the uploaded resume. 

### Watch the video Tutorial

<iframe width="880" height="480" src="https://www.youtube.com/embed/XWjx-RjmhRM?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63" title="How to create your first GitHub repository" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

In this tutorial, you learned about the syntax and structure of HTML. HTML syntax consists of elements, tags, and attributes that define the structure and content of a web page.
A HTML document follows a basic structure with elements like `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, `<meta>`, and `<body>`. Understanding HTML syntax and structure is essential for creating web pages and applications.
