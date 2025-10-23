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
        "GitHub/intro-gitlab",
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
    {
      type: "category",
      label: "🐍 Python",
      className: "custom-sidebar-python",
      items: [
        "python/intro-python",
        "python/setup-environment",
        "python/python-syntax",
        "python/python-variables",
        "python/datatype-python",
        "python/python-casting",
        "python/python-string",
        "python/python-operators",
        "python/python-list",
        "python/python-tuple",
        "python/python-set",
        "python/python-dictionaries",
        "python/python-array",
        "python/python-conditional-statements",
        "python/python-loops",
        "python/python-functions",
        "python/python-errors-and-exceptions",
        "python/python-oops",
      ],
    },
    {
      type: "category",
      label: "🗄️ SQL",
      className: "custom-sidebar-sql",
      items: [
        "sql/intro-sql",
        "sql/setup-environment",
        {
          type: "category",
          label: "📊 SQL Basics",
          className: "custom-sidebar-sql-basics",
          items: [
            "sql/SQL-basics/sql-constraints",
            "sql/SQL-basics/selecting-data",
            "sql/SQL-basics/filtering-data",
            "sql/SQL-basics/ordering-data",
            "sql/SQL-basics/grouping-data",
            "sql/SQL-basics/the-inequality-operator",
            "sql/SQL-basics/sql-datatypes",
            "sql/SQL-basics/primary-key-foreign-key",
            "sql/SQL-basics/sql-operators",
            "sql/SQL-basics/sql-clauses",
          ],
        },
        {
          type: "category",
          label: "🔄 Table Transformation",
          className: "custom-sidebar-sql-transform",
          items: [
            "sql/table-transformation/table-creation",
            "sql/table-transformation/alter-table",
            "sql/table-transformation/data-operations",
            "sql/table-transformation/list-drop-table",
          ],
        },
        {
          type: "category",
          label: "SQL Joins",
          className: "custom-sidebar-sql-joins",
          items: [
            "sql/SQL-joins/intro-sql-joins",
            "sql/SQL-joins/inner-join",
            "sql/SQL-joins/left-join",
            "sql/SQL-joins/right-join",
            "sql/SQL-joins/full-outer-join",
            "sql/SQL-joins/cross-join",
            "sql/SQL-joins/self-join",
          ],
        },
        {
          type: "category",
          label: "SQL Advance",
          className: "custom-sidebar-sql-advance",
          items: [
            "sql/SQL-Advance/sql-subqueries",
            "sql/SQL-Advance/common-table-expressions",
            "sql/SQL-Advance/window-functions",
            "sql/SQL-Advance/sql-indexes",
            "sql/SQL-Advance/sql-procedures-functions-triggers",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "⚡ Next.js",
      className: "custom-sidebar-nextjs",
      items: [
        "Nextjs/intro-nextjs",
        "Nextjs/setup-environment",
        "Nextjs/project-structure",
      ],
    },
    {
      type: "category",
      label: "🎓 Google Student Ambassador",
      className: "custom-sidebar-gsa",
      items: [
        "Google-Student-Ambassador/part-1-getting-started/gsa-part-1",
        "Google-Student-Ambassador/part-2-application-process/gsa-part-2",
        "Google-Student-Ambassador/part-3-eligibility/gsa-part-3",
        "Google-Student-Ambassador/part-4-gemini-pro/gsa-part-4",
      ],
    },
    {
      type: "category",
      label: "🔧 Technical",
      className: "custom-sidebar-technical",
      items: ["Technical/intro-github"],
    },
  ],
};

export default sidebars;
