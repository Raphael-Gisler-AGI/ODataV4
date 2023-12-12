import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/ODataV4/",
  title: "OData V4",
  description: "A documentation for working with OData V4 using CAP and UI5",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/ui5' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'UI5', link: '/ui5' },
          { text: 'CAP', link: '/cap' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Raphael-Gisler-AGI/ODataV4' }
    ]
  }
})
