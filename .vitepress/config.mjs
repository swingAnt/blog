import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "李君凯的技术博客",
  description: "A VitePress Site",
  base: "/",
  themeConfig: {
    logo: '/profile.jpeg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '关于我',
        items: [
          { text: '个人介绍', link: '/aboutme/0' }
        ]
      },
      {
        text: 'Vue',
        items: [
          { text: '快速入门', link: '/vue/0' },
          { text: '组件', link: '/vue/1' }
        ]
      },
      {
        text: 'React',
        items: [
          { text: '快速入门', link: '/react/0' },
          { text: '后管', link: '/react/1' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
