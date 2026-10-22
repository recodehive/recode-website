import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import * as dotenv from "dotenv";
import giscusInjector from "./src/plugins/giscus-injector";
import stripHeadingEmoji from "./src/plugins/strip-heading-emoji";
dotenv.config({ path: ".env.local" });
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
  onBrokenAnchors: "ignore",
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

  stylesheets: [
    {
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap",
      type: "text/css",
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
          // Blog only: no emoji at the start of headings, so the contents list stays clean
          remarkPlugins: [stripHeadingEmoji],
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Each post links to its own source file, for example blog/<slug>/index.md
          editUrl: ({ blogDirPath, blogPath }: { blogDirPath: string; blogPath: string }) =>
            `https://github.com/recodehive/recode-website/tree/main/${blogDirPath}/${blogPath}`,
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
        srcDark: "img/logo-dark.png", // add: light-colored / white-background version for night mode
      },
      // The menu is rendered by src/components/navbar (content in src/data/navbar.ts)
      items: [],
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
    blog: {
      sidebar: {
        groupByYear: false,
      },
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  // Migrated legacy setting to markdown.hooks.onBrokenMarkdownLinks

  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    // Free Learn section: one MDX file per lesson, each with its own URL
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "learn",
        path: "learn",
        routeBasePath: "learn",
        docRootComponent: "@site/src/learn/LearnRoot",
        docItemComponent: "@site/src/learn/LearnDoc",
      },
    ],
    // Counts lesson words at build time; thin lessons get noindex
    "./plugins/learn-words",
    // Publish dates for the Broadcasts page from YouTube public RSS feeds (no API key)
    "./plugins/broadcasts-feed",
    // Exposes every blog post to the /blogs listing page
    "./plugins/blog-listing",
    // Real GitHub Discussions, fetched at build time (token never reaches the browser)
    "./plugins/github-discussions",
    // Dashboard notifications, read from src/data/notifications.txt
    "./plugins/notifications",
    // One static public profile page per contributor at /u/<handle>
    "./plugins/developer-profiles",
    // Star and fork counts for the first-time setup guide (hidden if GitHub is unreachable)
    "./plugins/repo-stats",
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

  // Custom fields exposed to client-side code (browser-visible at build time)
  customFields: {
    backendApiUrl: process.env.BACKEND_API_URL || "https://leaderboard-production-6143.up.railway.app",
    clerkPublishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY || "",
    // Giveaway backend (public values). The anon key only reads the public ledger views.
    // Reserved ad containers on blog posts stay empty and hidden until this is true
    adsEnabled: false,
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
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