import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Custom manual sidebar configuration for complete control
  tutorialSidebar: [
    {
      type: "doc",
      id: "docs", // document ID
      label: "🏠 Home", // sidebar label
      className: "custom-sidebar-home",
    },
    {
      type: "doc",
      id: "Getting-Started",
      label: "🚀 Getting Started",
      className: "custom-sidebar-contributing",
    },
    {
      type: "category",
      label: "🐙 GitHub",
      className: "custom-sidebar-github",
      items: [
        "GitHub/intro-github",
        
        {
          type: "category",
          label: "⚙️ Setup Environment",
          className: "custom-sidebar-setup",
          items: [
            "GitHub/setup-environment/setup-environment",
            "GitHub/setup-environment/setup-git-on-windows",
            "GitHub/setup-environment/setup-git-on-mac",
            "GitHub/setup-environment/git-commands",
          ],
        },
        {
          type: "category",
          label: "📚 GitHub Basics",
          className: "custom-sidebar-basics",
          items: [
            "GitHub/GitHub-basics/create-github-repo",
            "GitHub/GitHub-basics/github-repo-command-line",
            "GitHub/GitHub-basics/how-to-clone-repository",
            "GitHub/GitHub-basics/how-to-fork",
            "GitHub/GitHub-basics/first-opensource-code",
          ],
        },
        {
          type: "category",
          label: "👨‍💼 Maintainer Guide",
          className: "custom-sidebar-maintainer",
          items: [
            "GitHub/Maintainer-guide/github-labels",
            "GitHub/Maintainer-guide/milestone",
            "GitHub/Maintainer-guide/github-project",
            "GitHub/Maintainer-guide/enable-dicussion",
          ],
        },
        {
          type: "category",
          label: "Fun Proflie Customizations",
          className: "custom-sidebar-fun",
          items: [
            "GitHub/Fun-Profile-Customizations/Why-Customize",
            "GitHub/Fun-Profile-Customizations/Anurag-Hazra's-GitHub-Readme-Cards",
            "GitHub/Fun-Profile-Customizations/Trophy-Case-Streaks",
            "GitHub/Fun-Profile-Customizations/Snake-Contribution-Animation",
          ],
        },
      ],
    },
  ],
};

export default sidebars;
