# Blog Writing Standards and Guidelines

## Overview

This document outlines the standard structure and guidelines for writing blog posts on the recode hive website. Following these standards ensures consistency, quality, and optimal SEO performance across all blog content.

## Frontmatter Structure

All blog posts must include the following frontmatter fields:

```yaml
---
title: "Your Blog Title Here"
authors: [author-username] # Array of author usernames from authors.yml
sidebar_label: "Short Title for Sidebar" # Max 50 characters
tags: [tag1, tag2, tag3] # Relevant tags for categorization
date: YYYY-MM-DD # Publication date in ISO format
description: "Brief description for SEO and previews (150-160 characters)"
draft: false # Set to true during development
canonical_url: # Optional: canonical URL if republished elsewhere
---
```

### Frontmatter Field Details

- **title**: Main headline (50-70 characters recommended)
- **authors**: Array of usernames matching `authors.yml` entries
- **sidebar_label**: Shorter version for navigation (if different from title)
- **tags**: 3-5 relevant tags for discoverability
- **date**: ISO format date (YYYY-MM-DD)
- **description**: SEO-optimized summary (150-160 characters)
- **draft**: Boolean for unpublished content
- **canonical_url**: Optional for cross-posted content

## Content Structure

### 1. Excerpt Separator

Always include `<!-- truncate -->` after the introduction paragraph to define the preview text.

```markdown
---
[frontmatter]
---

<!-- truncate -->

[Introduction paragraph that appears in previews]
```

### 2. Introduction Section

- Start with an engaging hook
- Include relevant emojis sparingly
- Explain what readers will learn
- Keep under 150 words

### 3. Main Content Organization

Use clear heading hierarchy:

```markdown
# Main Title (H1 - Reserved for frontmatter)

## Section Heading (H2)

### Subsection (H3)

#### Sub-subsection (H4)

- Use H2 for major sections
- Use H3 for subsections
- Avoid H5 and H6
```

### 4. Content Best Practices

#### Images and Media
- Use descriptive alt text
- Store images in `./images/` or `./assets/` folder
- Use relative paths: `./images/filename.png`
- Include image captions when helpful

#### Code Blocks
- Use language-specific syntax highlighting
- Include comments for complex code
- Use `jsx live` for interactive React examples

#### Lists and Formatting
- Use bullet points for unordered lists
- Use numbered lists for sequential steps
- Use **bold** for emphasis
- Use *italics* for subtle emphasis
- Use `inline code` for technical terms

#### Links
- Use descriptive link text
- Prefer relative links for internal content
- Include external link indicators when needed

## Blog Categories and Themes

### Technology Blogs
- Focus on practical implementation
- Include code examples and demos
- Explain concepts with real-world applications

### Tutorial Blogs
- Step-by-step instructions
- Prerequisites clearly listed
- Troubleshooting sections
- Code repositories when applicable

### Industry Insights
- Current trends and analysis
- Expert opinions and interviews
- Future predictions with reasoning

### Personal/Community Stories
- Authentic experiences
- Lessons learned
- Community impact stories

## SEO and Accessibility Guidelines

### SEO Best Practices
- Include primary keyword in title
- Use secondary keywords in first paragraph
- Maintain 1-2% keyword density
- Include internal and external links
- Use descriptive headings

### Accessibility
- Alt text for all images
- Semantic HTML structure
- Sufficient color contrast
- Keyboard navigation support

## Quality Checklist

Before publishing, ensure:

- [ ] Frontmatter is complete and accurate
- [ ] Content is original or properly attributed
- [ ] Grammar and spelling are correct
- [ ] Links are functional
- [ ] Images load properly
- [ ] Mobile responsiveness tested
- [ ] SEO description is compelling
- [ ] Reading time is appropriate (5-15 minutes)
- [ ] Call-to-action included

## Examples

### Good Blog Structure Example

```markdown
---
title: "Building REST APIs with Node.js: A Complete Guide"
authors: [sanjay-kv]
sidebar_label: "Node.js REST APIs"
tags: [Node.js, API, Backend, Tutorial]
date: 2024-01-15
description: "Learn how to build scalable REST APIs with Node.js, Express, and best practices for production deployment."
draft: false
---

<!-- truncate -->

Building robust REST APIs is a fundamental skill for modern web developers. In this comprehensive guide, you'll learn how to create production-ready APIs using Node.js and Express.

## Why Node.js for APIs?

Node.js excels at handling concurrent requests and provides excellent performance for I/O operations...

## Setting Up Your Project

First, let's create a new Node.js project and install the necessary dependencies...

## Creating Your First Endpoint

Now we'll build our first GET endpoint that returns JSON data...

## Best Practices

Here are some essential practices for production APIs...
```

## Review Process

1. **Self-Review**: Author checks against quality checklist
2. **Peer Review**: Another contributor reviews for technical accuracy
3. **Editor Review**: Content editor reviews for clarity and engagement
4. **Technical Review**: Code examples tested and verified
5. **SEO Review**: Meta tags and content optimization checked

## Tools and Resources

- **Grammarly**: For writing quality checks
- **Hemingway**: For readability assessment
- **Google Lighthouse**: For performance testing
- **SEO tools**: For keyword research and optimization

## Maintenance

- Update outdated content annually
- Refresh broken links quarterly
- Monitor engagement metrics monthly
- Archive outdated tutorials appropriately

---

*This standard was established based on analysis of successful blog posts including GitHub CLI Agent, Google DeepMind, and OpenAI Agent Builder examples.*