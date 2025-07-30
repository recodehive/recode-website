import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Recode Hive",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  organizationName: "facebook",
  projectName: "docusaurus",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Google Analytics
  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-W02Z2VJYCR',
      async: true,
    },
    {
      src: '/gtag-init.js',
    },
    {
      src: '/pinterest-init.js',
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Recode Hive",
      logo: {
        alt: "RecodeHive Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "dropdown",
          html: '<span class="nav-emoji">📚</span> Docs',
          position: "left",
          items: [
            {
              type: "html",
              value: `<div class="grid grid-cols-3 gap-4 w-xl">
                <a class="border-r col-span-1" href="/courses/">Tutorials</a>
                <div class="grid grid-cols-4 col-span-2">
                  <a href="/docs/category/sql/" class="nav__icons"> <img src="/icons/sql.svg" title="SQL" alt="SQL" /> </a>
                  <a href="/docs/category/python/" class="nav__icons"> <img src="/icons/python.svg" title="Python" alt="Python" /> </a>
                  <a href="/docs/category/GitHub/" class="nav__icons" > <img src="/icons/github.svg" title="GitHub" alt="GitHub" /> </a>
                  <a href="/docs/category/nextjs/" class="nav__icons" > <img src="/icons/nextjs.svg" title="Nextjs" alt="Nextjs" /> </a>
                </div>
              </div>`,
            },
            {
              type: "html",
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              type: "html",
              value: `<div class="grid grid-cols-3 gap-4">
                <a class="border-r col-span-1" href="/courses/"> Courses </a>
                <div class="grid grid-cols-4 col-span-2">
                  <a href="https://www.youtube.com/watch?v=GrTV59Y84S8&list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63&ab_channel=RecodeHive" class="nav__icons"> <img src="/icons/git.svg" alt="git" /> </a>
                  <a href="https://www.youtube.com/watch?v=O1ahDsq8DU0&list=PLrLTYhoDFx-k62rLLajSB-jeqKwLkDrkF&ab_channel=RecodeHive" class="nav__icons"> <img src="/icons/postman.svg" alt="Postman" /> </a>
                  <a href="/docs/category/google-student-ambassador" class="nav__icons"> <img src="https://avatars.githubusercontent.com/u/222021622?s=400&u=cb88492d19d9023cac470c3959b25285bb5abcfa&v=4" alt="Google" /> </a>
                </div>
              </div>`,
            },
            {
              type: "html",
              value: '<hr style="margin: 0.3rem 0;">',
            },
            {
              type: "html",
              value: `<div class="grid grid-cols-3 gap-4">
                <a  class="border-r col-span-1" href="#" target="_self"> Interview Prep </a>
                <div class="grid grid-cols-1 col-span-2">
                  <a href="/docs/category/Technical/" target="_self" class="nav__icons"> 🧩Technical </a> <br />
                  <a href="#" target="_self" class="nav__icons"> 💡Behaviour </a>
                </div>
              </div>`,
            },
          ],
        },
        {
          to: "/showcase",
          html: '<span class="nav-emoji">🌍</span> Showcase',
          position: "left",
        },
        {
          to: "/dashboard",
          html: '<span class="nav-emoji">📊</span> Dashboard',
          position: "left",
        },
        {
          to: "/our-sponsors/",
          html: '<span class="nav-emoji">💰</span> Donate',
          position: "left",
        },
        {
          type: "dropdown",
          html: '<span class="nav-emoji">👩🏻‍💻</span> Devfolio',
          position: "left",
          items: [
            {
              label: "💻GitHub Profiles",
              to: "https://dev.recodehive.com/devfolio",
            },
            {
              label: "🎖️ GitHub Badges",
              to: "/badges/github-badges/",
            }, 
          ],
        },
        {
          to: "/blogs",
          html: '<span class="nav-emoji">📰</span> Blogs',
          position: "left",
        },
        {
          type: "dropdown",
          html: '<span class="nav-emoji">🔗</span> More',
          position: "left",
          items: [
            {
              label: "📚 E-books",
              to: "https://learn.recodehive.com/datascience",
            },
            {
              label: "🛣️ Roadmap",
              to: "#",
            },
            {
              label: "🤝 Community",
              to: "/community",
            },
            {
              label: "📺 Broadcast",
              to: "/broadcasts/",
            },
            {
              label: "🎙️ Podcast",
              to: "/podcasts/",
            },
          ],
        },
        {
          type: "search",
          position: "right",
        },
        {
          type: "html",
          position: "right",
          value: '<div id="firebase-auth-github-navbar"></div>',
        },
        // {
        //   type: "dropdown",
        //   html: '<span class="nav-emoji">🏷️</span> Tags',
        //   position: "left",
        //   items: [
        //     {
        //       label: "🏷️ Tutorial Tags 📚",
        //       to: "/docs/tags/",
        //       activeBaseRegex: "/docs/tags/",
        //     },
        //     {
        //       label: "🏷️ Courses Tags 🎓",
        //       to: "/courses/tags/",
        //       activeBaseRegex: "/courses/tags/",
        //     },
        //     {
        //       label: "🏷️ DSA Tags 🧠",
        //       to: "/dsa/tags/",
        //       activeBaseRegex: "/dsa/tags/",
        //     },
        //   ],
        // },
        
        // {
        //   href: "https://github.com/codeharborhub/codeharborhub",
        //   position: "right",
        //   className: "header-github-link",
        //   "aria-label": "GitHub repository",
        // },
        // {
        //   href: "https://www.codeharborhub.live/register",
        //   position: "right",
        //   className: "header-signup-link",
        //   "aria-label": "Auth",
        //   label: "Auth",
        // },
      ],
      // hideOnScroll: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: "YOUR_APP_ID",
      apiKey: "YOUR_SEARCH_API_KEY",
      indexName: "YOUR_INDEX_NAME",
      contextualSearch: true,
      externalUrlRegex: "external\\.com|domain\\.com",
      replaceSearchResultPathname: {
        from: "/docs/",
        to: "/",
      },
      searchParameters: {},
      searchPagePath: "search",
      insights: false,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  //  scripts: [],
};

export default config;
