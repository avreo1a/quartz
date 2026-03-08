import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "avreo1a.github.io/quartz",
    ignorePatterns: ["private", "templates", "**/_template*", ".obsidian", "Core", "Hardware Projects", "Journal", "Leetcode", "School Activities", "Wisdom-io Startup", "Z-Hidden", "daily", "Clippings", "*.epub", "*.kanban.md"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Cormorant Garamond",
        body: "Cormorant Garamond",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fffef9",
          lightgray: "#f5f4ef",
          gray: "#d0cfc8",
          darkgray: "#1a1a1a",
          dark: "#0a0a0a",
          secondary: "#0a0a0a",
          tertiary: "#3a3a3a",
          highlight: "rgba(0, 0, 0, 0.03)",
          textHighlight: "rgba(0, 0, 0, 0.08)",
        },
        darkMode: {
          light: "#0a0a0a",
          lightgray: "#141414",
          gray: "#3a3a3a",
          darkgray: "#e8e8e8",
          dark: "#fffef9",
          secondary: "#fffef9",
          tertiary: "#c0c0c0",
          highlight: "rgba(255, 255, 255, 0.03)",
          textHighlight: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      //Plugin.CustomOgImages(),
    ],
  },
}

export default config
