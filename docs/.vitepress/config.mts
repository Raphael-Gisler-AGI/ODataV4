import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/ODataV4/",
  title: "OData V4",
  description: "A documentation for working with OData V4 using CAP and UI5",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/ui5/" },
    ],

    sidebar: [
      {
        text: "UI5",
        link: "/ui5/",
        collapsed: false,
        items: [
          {
            text: "Drafts",
            link: "/ui5/drafts",
          },
          {
            text: "Batch Control",
            link: "/ui5/batchcontrol",
          },
          {
            text: "Flexibel Programing Model",
            link: "/ui5/fpm",
          },
        ],
      },
      {
        text: "CAP",
        link: "/cap/",
        collapsed: true,
        items: [
          {
            text: "Events",
            link: "/cap/events",
          },
          {
            text: "Remote Service",
            link: "/cap/remoteservice",
          }
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/Raphael-Gisler-AGI/ODataV4" },
    ],
  },
});
