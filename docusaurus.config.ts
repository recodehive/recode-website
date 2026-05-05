import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";
import giscusInjector from "./src/plugins/giscus-injector";
dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const algoliaAppId = process.env.ALGOLIA_APP_ID?.trim();
const algoliaSearchApiKey = process.env.ALGOLIA_SEARCH_API_KEY?.trim();
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME?.trim();

const hasAlgoliaSiteSearch = Boolean(
  algoliaAppId && algoliaSearchApiKey && algoliaIndexName,
);

const hasPartialAlgoliaSiteSearchConfig = Boolean(
  algoliaAppId || algoliaSearchApiKey || algoliaIndexName,
);

if (hasPartialAlgoliaSiteSearchConfig && !hasAlgoliaSiteSearch) {
  console.warn(
    "Algolia SiteSearch is partially configured. Set ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY, and the actual Algolia index name in ALGOLIA_INDEX_NAME to enable navbar search.",
  );
}

const config: Config = {
  title: "recode hive",
  tagline: "Learn, Build & Grow with Open Source",
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
    image: "/img/og-image.png",
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
              to: "/roadmaps",
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
        {
          type: "html",
          position: "right",
          value: `<a href="https://github.com/recodehive" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" class="navbar__link navbar-social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>`,
        },
        {
          type: "html",
          position: "right",
          value: `<a href="https://discord.gg/dh3TA8U55Q" target="_blank" rel="noopener noreferrer" aria-label="Discord" title="Discord" class="navbar__link navbar-social-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </a>`,
        },
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
        disableInDev: true,
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
    // EmailJS credentials for Contact Us page (public values only)
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || "",
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || "",
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || "",
    algoliaSiteSearch: hasAlgoliaSiteSearch
      ? {
          applicationId: algoliaAppId,
          apiKey: algoliaSearchApiKey,
          indexName: algoliaIndexName,
        }
      : null,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
};

export default config;
