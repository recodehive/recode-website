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

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

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
    {
      content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-W02Z2VJYCR', {
          debug_mode: ${process.env.NODE_ENV !== 'production' ? 'true' : 'false'}
        });
      `,
    },
  ],

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
    colorMode: {
      defaultMode: "light", // You can change this to "dark" if preferred
      disableSwitch: false, // Enable the toggle switch
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Recode Hive",
      logo: {
        alt: "RecodeHive Logo",
        src: "img/logo.png",
      },
      items: [
        // Add your navbar items here
      ],
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
};

export default config;
