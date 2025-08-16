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

  // Google Analytics and Theme Scripts
  scripts: [
    {
      src: '/theme-init.js',
      async: false, // Load synchronously to prevent flash
    },
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
        gtag: {
          trackingID: 'G-W02Z2VJYCR',
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      
      logo: {
        alt: "RecodeHive Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "dropdown",
          html: '<span id="nav-docs"></span> Docs',
          position: "left",
          items: [
            {
              type: "html",
              value: `<div class="grid grid-cols-3 gap-4 w-xl">
                <a class="border-r col-span-1" href="/courses/" style="color:black ; ">Tutorials</a>
                <div class="grid grid-cols-4 col-span-2">
                  <a href="/docs/sql/intro-sql" class="nav__icons"> <img src="/icons/sql.svg" title="SQL" alt="SQL" /> </a>
                  <a href="/docs/python/intro-python" class="nav__icons"> <img src="/icons/python.svg" title="Python" alt="Python" /> </a>
                  <a href="/docs/GitHub/intro-github" class="nav__icons" > <img src="/icons/github.svg" title="GitHub" alt="GitHub" /> </a>
                  <a href="/docs/Nextjs/intro-github" class="nav__icons" > <img src="/icons/nextjs.svg" title="Nextjs" alt="Nextjs" /> </a>
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
                <a class="border-r col-span-1" href="/courses/" style="color:black"> Courses </a>
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
                <a  class="border-r col-span-1" href="#" target="_self" style="color:black"> Interview Prep </a>
                <div class="grid grid-cols-1 col-span-2">
                  <a href="/interview-prep/" target="_self" class="nav__icons"><span id="nav-technical" style="display:inline-flex;align-items:center;"></span> Technical</a> <br />
                  <a href="/interview-prep/" target="_self" class="nav__icons"><span id="nav-behavioral" style="display:inline-flex;align-items:center;"></span> Behavioral</a>
                </div>
              </div>`,
            },
          ],
        },
        {
          to: "/showcase",
          html: '<span id="nav-showcase"></span> Showcase',
          position: "left",
        },
        {
          to: "/dashboard",
          html: '<span id="nav-dashboard"></span> Dashboard',
          position: "left",
        },
        {
          to: "/our-sponsors/",
          html: '<span id="nav-donate"></span> Donate',
          position: "left",
        },
        {
          type: "dropdown",
          html: '<span id="nav-devfolio"></span> Devfolio',
          position: "left",
          items: [
            {
              html: '<span id="nav-github" style="display:inline-flex;align-items:center;"></span> GitHub Profiles',
              to: "https://dev.recodehive.com/devfolio",
            },
            {
              html: '<span id="nav-badges" style="display:inline-flex;align-items:center;"></span> GitHub Badges',
              to: "/badges/github-badges/",
            }, 
          ],
        },
        {
          to: "/blogs",
          html: '<span id="nav-blogs"></span> Blogs',
          position: "left",
        },
        {
          type: "dropdown",
          html: '<span id="nav-more"></span> More',
          position: "left",
          items: [
            {
              html: '<span id="nav-ebooks" style="display:inline-flex;align-items:center;"></span> E-books',
              to: "https://learn.recodehive.com/datascience",
            },
            {
              html: '<span id="nav-roadmap" style="display:inline-flex;align-items:center;"></span> Roadmap',
              to: "https://github.com/orgs/recodehive/projects/9",
            },
            {
              html: '<span id="nav-community" style="display:inline-flex;align-items:center;"></span> Community',
              to: "/community",
            },
            {
              html: '<span id="nav-broadcast" style="display:inline-flex;align-items:center;"></span> Broadcast',
              to: "/broadcasts/",
            },
            {
              html: '<span id="nav-podcast" style="display:inline-flex;align-items:center;"></span> Podcast',
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
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} recodehive. Built with Docusaurus.`,
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
    // Commented out to use TSX-based community page instead
    // [
    //   "@docusaurus/plugin-content-docs",
    //   {
    //     id: "community",
    //     path: "community",
    //     routeBasePath: "community",
    //     sidebarPath: require.resolve("./sidebarsCommunity.js"),
    //     remarkPlugins: [remarkMath],
    //     rehypePlugins: [rehypeKatex],
    //     showLastUpdateAuthor: true,
    //     showLastUpdateTime: true,
    //   },
    // ],
  ],
  //  scripts: [],
};

export default config;
