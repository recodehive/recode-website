import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";
import giscusInjector from "./src/plugins/giscus-injector";
dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "recode hive",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  url: "https://www.recodehive.com",
  baseUrl: "/",

  organizationName: "recodehive",
  projectName: "recode-website",

  onBrokenLinks: "throw",
  // onBrokenMarkdownLinks moved to markdown.hooks

  // Google Analytics and Theme Scripts
  scripts: [
    {
      src: "/instant-theme.js",
      async: false,
    },
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-W02Z2VJYCR",
      async: true,
    },
    {
      src: "/gtag-init.js",
    },
    {
      src: "/pinterest-init.js",
    },
  ],

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl: ({ docPath }) =>
            `https://github.com/recodehive/recode-website/tree/main/docs/${docPath}`,
          remarkPlugins: [giscusInjector],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl: "https://github.com/recodehive/recode-website/tree/main",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-W02Z2VJYCR",
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false, // Let users manually control theme
    },
    navbar: {
      title: "recode hive",
      logo: {
        alt: "recode hive Logo",
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
                 <a class="border-r col-span-1" href="/docs/">Tutorials</a>
                 <div class="grid grid-cols-4 col-span-2">
                   <a href="/docs/sql/intro-sql" class="nav__icons"> <img src="/icons/sql.svg" title="SQL" alt="SQL" /> </a>
                   <a href="/docs/python/intro-python" class="nav__icons"> <img src="/icons/python.svg" title="Python" alt="Python" /> </a>
                   <a href="/docs/GitHub/intro-github" class="nav__icons" > <img src="/icons/github.svg" title="GitHub" alt="GitHub" /> </a>
                   <a href="/docs/Nextjs/intro-nextjs" class="nav__icons" > <img src="/icons/nextjs.svg" title="Nextjs" alt="Nextjs" /> </a>
                   <a href="/docs" class="nav__icons"> <img src="/icons/Logo-512X512.png" title="Docs" alt="Docs" /> </a>
                   <a href="/docs/Docker/intro" class="nav__icons"> <img src="/icons/docker.svg" title="Docker" alt="Docker" /> </a>
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
                 <a class="border-r col-span-1" href="/courses/">Courses</a>
                 <div class="grid grid-cols-4 col-span-2">
                   <a href="https://www.youtube.com/watch?v=GrTV59Y84S8&list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63&ab_channel=RecodeHive" class="nav__icons"> <img src="/icons/git.svg" alt="git" /> </a>
                   <a href="https://www.youtube.com/watch?v=O1ahDsq8DU0&list=PLrLTYhoDFx-k62rLLajSB-jeqKwLkDrkF&ab_channel=RecodeHive" class="nav__icons"> <img src="/icons/postman.svg" alt="Postman" /> </a>
                   <a href="/docs/google-campus-ambassador-part-1" class="nav__icons"> <img src="https://avatars.githubusercontent.com/u/222021622?s=400&u=cb88492d19d9023cac470c3959b25285bb5abcfa&v=4" alt="Google" /> </a>
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
                 <a class="border-r col-span-1" href="/interview-prep/" target="_self">Interview Prep</a>
                 <div class="grid grid-cols-1 col-span-2">
                   <a href="/interview-prep/" target="_self" class="nav__icons"> 🧩Technical </a>
                   <a href="/interview-prep/" target="_self" class="nav__icons"> 💡Behavioral </a>
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
              to: "/ebooks",
            },
            {
              label: "🗺️ Roadmap",
              to: "https://github.com/orgs/recodehive/projects/9",
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
            {
              label: "🛍️ Merch Store",
              to: "/merch",
            },
          ],
        },
        // Search disabled until Algolia is properly configured
        // {
        //   type: "search",
        //   position: "right",
        // },
        {
          type: "html",
          position: "right",
          value: '<div id="firebase-auth-github-navbar"></div>',
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} recode hive. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Disable Algolia search until properly configured
    // algolia: {
    //   appId: "YOUR_APP_ID",
    //   apiKey: "YOUR_SEARCH_API_KEY",
    //   indexName: "YOUR_INDEX_NAME",
    //   contextualSearch: true,
    //   externalUrlRegex: "external\\.com|domain\\.com",
    //   replaceSearchResultPathname: {
    //     from: "/docs/",
    //     to: "/",
    //   },
    //   searchParameters: {},
    //   searchPagePath: "search",
    //   insights: false,
    // },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  // Migrated legacy setting to markdown.hooks.onBrokenMarkdownLinks

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
  ],

  // ✅ Add this customFields object to expose the token to the client-side
  customFields: {
    gitToken: process.env.DOCUSAURUS_GIT_TOKEN,
    // Shopify credentials for merch store
    SHOPIFY_STORE_DOMAIN:
      process.env.SHOPIFY_STORE_DOMAIN || "junh9v-gw.myshopify.com",
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
      "2503dfbf93132b42e627e7d53b3ba3e9",
    // Firebase configuration — override via environment variables in production
    FIREBASE_API_KEY:
      process.env.FIREBASE_API_KEY || "AIzaSyBSiO9d5tHuyyAeUCt37pxDWTT7jPSigaU",
    FIREBASE_AUTH_DOMAIN:
      process.env.FIREBASE_AUTH_DOMAIN ||
      "awesome-github-profiles.firebaseapp.com",
    FIREBASE_DATABASE_URL:
      process.env.FIREBASE_DATABASE_URL ||
      "https://awesome-github-profiles-default-rtdb.firebaseio.com",
    FIREBASE_PROJECT_ID:
      process.env.FIREBASE_PROJECT_ID || "awesome-github-profiles",
    FIREBASE_STORAGE_BUCKET:
      process.env.FIREBASE_STORAGE_BUCKET ||
      "awesome-github-profiles.firebasestorage.app",
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.FIREBASE_MESSAGING_SENDER_ID || "490821849262",
    FIREBASE_APP_ID:
      process.env.FIREBASE_APP_ID ||
      "1:490821849262:web:7e97984d98f578b81f9d3f",
    FIREBASE_MEASUREMENT_ID:
      process.env.FIREBASE_MEASUREMENT_ID || "G-WM33JZYEV0",
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
};

export default config;
