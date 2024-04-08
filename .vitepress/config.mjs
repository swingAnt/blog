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
      { text: '主页', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '关于我',
        items: [
          { text: '个人介绍', link: '/aboutme/0' }
        ]
      },
      {
        text: '前端基础',
        items: [
          { text: 'JavaScript', link: '/base/0' },
          { text: 'HTML', link: '/base/0' },
          { text: 'CSS', link: '/base/0' },
          { text: 'HTTP', link: '/base/0' },
          { text: 'Web安全', link: '/base/0' },
          { text: 'git常见命令', link: '/base/2' },
        ]
      },

      {
        text: 'Vue',
        items: [
          { text: 'vue3快速入门', link: '/vue/0' },
          { text: '进阶篇', link: '/vue/1' },
          { text: '基础篇', link: '/vue/3' },
          { text: '实战篇', link: '/vue/4' },
          { text: '高级篇', link: '/vue/5' },
          { text: '扩展篇', link: '/vue/6' },
          { text: 'Vue 3与WebGL/Three.js', link: '/vue/7' },
          { text: '总结', link: '/vue/8' },
          {
            text: 'Vue 2 Docs',
            link: 'https://v2.vuejs.org'
          },
          {
            text: 'Migration from Vue 2',
            link: 'https://v3-migration.vuejs.org/'
          }
        ]
      },
 
      {
        text: 'React',
        items: [
          { text: 'React简介', link: '/react/0' },
          { text: '安装与配置', link: '/react/1' },
          { text: 'React基础', link: '/react/2' },
          { text: 'React进阶', link: '/react/4' },
          { text: 'React路由', link: '/react/5' },
          { text: 'React与后端交互', link: '/react/6' },
          { text: 'React与Redux', link: '/react/7' },
          { text: 'React实战', link: '/react/8' },
          { text: 'React生态与工具', link: '/react/9' },
          { text: '学习资源与社区', link: '/react/10' },
        ]
      },
      {
        text: 'svelte',
        items: [
        ]
      },
      {
        text: 'sloid',
        items: [
        ]
      },
      {
        text: '鸿蒙',
        items: [
        ]
      },
      { text: '常见设计模式', link: '/base/1' },
      {
        text: '安全',
        items: [
        ]
      },
      {
        text: '监控',
        items: [
        ]
      },
      {
        text: '性能优化',
        items: [
        ]
      },
      {
        text: '低代码',
        items: [
        ]
      },
      {
        text: '工程化',
        items: [
          { text: 'webpack', 
          items: [
            { text: 'plugin', link: '/engineering/webpack/plugin' },
            { text: 'bable', link: '/engineering/webpack/babel' },
            { text: 'Module、Chunk与Bundle', link: '/engineering/webpack/ModuleChunkBundle' },
            { text: 'webpack', link: '/engineering/webpack/webpack' },
            { text: 'webpack5', link: '/engineering/webpack/webpack5' },
            { text: '相关优化', link: '/engineering/webpack/toQiuckBuild' },

          ]
           },
           { text: 'vite', link: '/engineering/vite' },
           { text: 'vite和webpack对比', link: '/engineering/viteAndWebpack' },
           { text: 'gulp', 
           items: [
             { text: 'gulp 入门指南', link: '/engineering/gulp/README' },
             { text: '安装 Node 和 gulp', link: '/engineering/gulp/chapter1' },
             { text: '使用 gulp 压缩 JS', link: '/engineering/gulp/chapter2' },
             { text: '使用 gulp 压缩 CSS', link: '/engineering/gulp/chapter3' },
             { text: '使用 gulp 压缩图片', link: '/engineering/gulp/chapter4' },
             { text: '使用 gulp 编译 LESS', link: '/engineering/gulp/chapter5' },
             { text: '使用 gulp 编译 Sass', link: '/engineering/gulp/chapter6' },
             { text: '使用 gulp 构建一个项目', link: '/engineering/gulp/chapter7' },

 
           ]
            },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/swingAnt' }
    ]
  }
})
