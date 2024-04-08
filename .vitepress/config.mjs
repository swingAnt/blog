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
          { text: 'HTML', link: '/base/4' },
          { text: 'CSS', link: '/base/css' },
          { text: 'HTTP', link: '/base/http' },
          { text: 'Web安全', link: '/base/3' },
          { text: 'git常见命令', link: '/base/2' },
          { text: '谷歌插件开发', link: '/base/google' },
          { text: '前端线上问题定位', link: '/base/5' },
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
          { text: 'vue3总结', link: '/vue/8' },
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
          { text: '整体介绍', link: '/svelte/0' },

        ]
      },
      {
        text: 'sloid',
        items: [
          { text: '整体介绍', link: '/sloid/0' },

        ]
      },
      {
        text: 'nextjs',
        items: [
          { text: '框架介绍', link: '/nextjs/0' },
          { text: '入门示例', link: '/nextjs/1' },
          { text: '数据库相关操作', link: '/nextjs/2' },

        ]
      },
      {
        text: '鸿蒙',
        items: [
          { text: '整体介绍', link: '/harmonyOs/0' },
        ]
      },
      {
        text: '低代码',
        items: [
          { text: '低代码介绍', link: '/didaima/0' },
          { text: 'ECharts', link: '/didaima/1' },
          { text: 'G6', link: '/didaima/2' },
          { text: 'd3.js', link: '/didaima/3' },

        ]
      },
      
      {
        text: '工程化',
        items: [
                {
        text: '设计模式',
        items: [
          { text: '单例模式', link: '/design/1' },
          { text: '策略模式', link: '/design/2' },
          { text: '代理模式', link: '/design/3' },
          { text: '装饰者模式', link: '/design/4' },
          { text: '组合模式', link: '/design/5' },
          { text: '工厂模式', link: '/design/6' },
          { text: '访问者模式', link: '/design/7' },
          { text: '发布订阅模式', link: '/design/8' },
          { text: '观察者模式', link: '/design/9' },
        ]
      },
          { text: '组件库', link: '/engineering/component' },
          { text: '微前端', link: '/engineering/weiqianduan' },
          { text: '前端代码规范', link: '/engineering/lint' },
          {
            text: '性能优化',
            items: [
              { text: '构建阶段', link: '/build/0' },
              { text: '加载阶段', link: '/build/1' },
              { text: '渲染阶段', link: '/build/2' },
    
            ]
          },
          {
            text: '监控',
            items: [
              { text: '页面监控', link: '/jiankong/0' },
              { text: '数据埋点', link: '/jiankong/1' },
            ]
          },
          { text: 'vite', link: '/engineering/vite' },
          { text: 'webpack', 
          items: [
            { text: 'plugin', link: '/engineering/webpack/plugin' },
            { text: 'bable', link: '/engineering/webpack/babel' },
            { text: 'Module、Chunk与Bundle', link: '/engineering/webpack/ModuleChunkBundle' },
            { text: 'webpack', link: '/engineering/webpack/webpack' },
            { text: 'webpack5', link: '/engineering/webpack/webpack5' },
            { text: '相关优化', link: '/engineering/webpack/toQiuckBuild' },
            { text: '自定义部署插件plugin', link: '/engineering/webpack/plugins' },
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
