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
      // {
      //   text: '关于我',
      //   items: [
      //     { text: '个人介绍', link: '/aboutme/0' }
      //   ]
      // },
      {
        text: 'vscode插件开发',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '第一个插件', link: '/vscode/0' },
          { text: '扩展能力', link: '/vscode/4' },
          { text: 'contributes(贡献点)', link: '/vscode/1' },
          { text: 'activationEvents(激活事件)', link: '/vscode/2' },
          { text: 'package.json(插件清单)', link: '/vscode/3' },

          
          
        ]
      }, {
        text: 'intellij插件开发',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '第一个插件', link: '/intellij/0' },
    
          
          
        ]
      }, {
        text: 'python|linux',
        collapsible: true,
        collapsed: true,
        items: [
          { text: '常用命令', link: '/python/0' },
    
          
          
        ]
      },
    //   {
    //     text: '前端基础',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: 'JavaScript', link: '/base/0' },
    //       { text: 'TypeScript', link: '/base/ts' },
    //       { text: 'HTML', link: '/base/4' },
    //       { text: 'CSS', link: '/base/css' },
    //       { text: 'HTTP', link: '/base/http' },
    //       { text: 'seo相关', link: '/base/10' },
    //       { text: 'CMS相关', link: '/base/11' },
    //       { text: 'scroll相关探索', link: '/base/scroll' },
    //       { text: '谷歌插件开发', link: '/base/google' },
    //       { text: '原生实现【前端引导页】', link: '/base/guild' },
    //       { text: '懒加载、虚拟列表实现', link: '/base/6' },
    //       { text: '超大文件上传', link: '/base/9' },
    //       { text: '使用双token实现无感刷新', link: '/base/7' },
    //       { text: '最大请求并发数做限制', link: '/base/8' },
          
          
    //     ]
    //   },
    //   {
    //     text: '鸿蒙',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '整体入门', link: '/harmonyOs/0' },
    //       { text: '状态管理', link: '/harmonyOs/2' },
    //       { text: '渲染控制', link: '/harmonyOs/3' },
    //       { text: '进程与线程模型', link: '/harmonyOs/4' },
    //       { text: '并发', link: '/harmonyOs/5' },
    //       { text: ' 使用 Taro 开发鸿蒙原生应用 ', link: '/harmonyOs/1' }, 
    //     ]
    //   },
    //   {
    //     text: 'Vue',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: 'vue3快速入门', link: '/vue/0' },
    //       { text: '进阶篇', link: '/vue/1' },
    //       { text: '基础篇', link: '/vue/3' },
    //       { text: '实战篇', link: '/vue/4' },
    //       { text: '高级篇', link: '/vue/5' },
    //       { text: '扩展篇', link: '/vue/6' },
    //       { text: 'Vue 3与WebGL/Three.js', link: '/vue/7' },
    //       { text: 'vue3总结', link: '/vue/8' },
    //       {
    //         text: 'Vue 2 Docs',
    //         link: 'https://v2.vuejs.org'
    //       },
    //       {
    //         text: 'Migration from Vue 2',
    //         link: 'https://v3-migration.vuejs.org/'
    //       }
    //     ]
    //   },
 
    //   {
    //     text: 'React',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: 'React简介', link: '/react/0' },
    //       { text: '安装与配置', link: '/react/1' },
    //       { text: 'React基础', link: '/react/2' },
    //       { text: 'React进阶', link: '/react/4' },
    //       { text: 'React路由', link: '/react/5' },
    //       { text: 'React与后端交互', link: '/react/6' },
    //       { text: 'React与Redux', link: '/react/7' },
    //       { text: 'React实战', link: '/react/8' },
    //       { text: 'React生态与工具', link: '/react/9' },
    //       { text: '学习资源与社区', link: '/react/10' },
    //     ]
    //   },
    //   {
    //     text: 'svelte',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '框架介绍', link: '/svelte/1' },
    //       { text: '教程示例', link: '/svelte/2' },
    //     ]
    //   },
    //   {
    //     text: 'solidjs',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '框架介绍', link: '/sloid/1' },
    //       { text: '教程示例', link: '/sloid/2' },
    //     ]
    //   },
    //   {
    //     text: 'nextjs',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '框架介绍', link: '/nextjs/0' },
    //       { text: '入门示例', link: '/nextjs/1' },
    //       { text: '数据库相关操作', link: '/nextjs/2' },

    //     ]
    //   },
    //   {
    //     text: '跨端',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '框架介绍', link: '/cro/0' },
    //       { text: '入门示例', link: '/cro/1' },

    //     ]
    //   },
     
    //   {
    //     text: '低代码',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '低代码介绍', link: '/didaima/0' },
    //       { text: '组件的动态懒加载和渲染', link: '/didaima/4' },
    //       { text: '前端组件在浏览器兼容问题', link: '/didaima/5' },
    //       { text: 'vue组件', link: '/didaima/6' },
    //       { text: 'Omi', link: '/didaima/7' },
    //       { text: 'Stencil', link: '/didaima/8' },
    //       { text: 'QuarkC', link: '/engineering/component' },
    //       { text: 'ECharts', link: '/didaima/1' },
    //       { text: 'G6', link: '/didaima/2' },
    //       { text: 'd3.js', link: '/didaima/3' },
          
    //     ]
    //   },
      
    //   {
    //     text: '工程化',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //             {
    //     text: '设计模式',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '单例模式', link: '/design/1' },
    //       { text: '策略模式', link: '/design/2' },
    //       { text: '代理模式', link: '/design/3' },
    //       { text: '装饰者模式', link: '/design/4' },
    //       { text: '组合模式', link: '/design/5' },
    //       { text: '工厂模式', link: '/design/6' },
    //       { text: '访问者模式', link: '/design/7' },
    //       { text: '发布订阅模式', link: '/design/8' },
    //       { text: '观察者模式', link: '/design/9' },
    //     ]
    //   },
    //       { text: '状态管理', link: '/engineering/state' },
    //       { text: '组件库', link: '/engineering/component' },
    //       { text: '主题色', link: '/engineering/theme' },
    //       { text: '微前端', link: '/engineering/weiqianduan' },
    //       { text: '简易脚手架搭建', link: '/engineering/build' },
    //       { text: 'jest单测', link: '/engineering/test' },
    //       { text: 'GitLab自动化CI/CD', link: '/engineering/build2' },
    //       { text: 'Jenkins自动化CI/CD', link: '/engineering/build1' },
    //       { text: 'git常见命令', link: '/base/2' },
    //       { text: 'npm,pnpm,yarn', link: '/engineering/37' },
    //       { text: '前端代码规范', link: '/engineering/lint' },
    //       { text: '前端线上问题定位', link: '/base/5' },
    //       { text: '项目排期相关模式', link: '/engineering/develop' },
    //       { text: '技术选型与架构设计', link: '/engineering/manage' },
    //       { text: '小程序', link: '/engineering/flow' },
    //       { text: 'RESTful接口机制', link: '/engineering/restful' },
    //       { text: 'Web安全', link: '/base/3' },
    //       { text: '服务端渲染', link: '/face/ssr' },
    //       {
    //         text: '性能优化',
    //         collapsible: true,
    //         collapsed: true,
    //         items: [
    //           { text: '构建阶段', link: '/build/0' },
    //           { text: '加载阶段', link: '/build/1' },
    //           { text: '渲染阶段', link: '/build/2' },
    
    //         ]
    //       },
    //       {
    //         text: '监控',
    //         collapsible: true,
    //         collapsed: true,
    //         items: [
    //           { text: '页面监控', link: '/jiankong/0' },
    //           { text: '数据埋点', link: '/jiankong/1' },
    //         ]
    //       },
    //       { text: 'vite', link: '/engineering/vite' },
    //       { text: 'webpack', 
    //       collapsible: true,
    //       collapsed: true,
    //       items: [

    //         { text: 'plugin', link: '/engineering/webpack/plugin' },
    //         { text: 'bable', link: '/engineering/webpack/babel' },
    //         { text: 'loader', link: '/engineering/webpack/loader' },

    //         { text: 'Module、Chunk与Bundle', link: '/engineering/webpack/ModuleChunkBundle' },
    //         { text: 'webpack', link: '/engineering/webpack/webpack' },
    //         { text: 'webpack5', link: '/engineering/webpack/webpack5' },
    //         { text: '工程相关优化', link: '/engineering/webpack/toQiuckBuild' },
    //         { text: '自定义部署插件plugin', link: '/engineering/webpack/plugins' },
    //       ]
    //        },
    //        { text: 'vite', link: '/engineering/vite' },
    //        { text: 'vite和webpack对比', link: '/engineering/viteAndWebpack' },
    //        { text: 'gulp', 
    //        collapsible: true,
    //        collapsed: true,
    //        items: [
    //          { text: 'gulp 入门指南', link: '/engineering/gulp/README' },
    //          { text: '安装 Node 和 gulp', link: '/engineering/gulp/chapter1' },
    //          { text: '使用 gulp 压缩 JS', link: '/engineering/gulp/chapter2' },
    //          { text: '使用 gulp 压缩 CSS', link: '/engineering/gulp/chapter3' },
    //          { text: '使用 gulp 压缩图片', link: '/engineering/gulp/chapter4' },
    //          { text: '使用 gulp 编译 LESS', link: '/engineering/gulp/chapter5' },
    //          { text: '使用 gulp 编译 Sass', link: '/engineering/gulp/chapter6' },
    //          { text: '使用 gulp 构建一个项目', link: '/engineering/gulp/chapter7' },
    //        ]
    //         },
    //     ]
    //   },
    //   {
    //     text: '知识点考察',
    //     collapsible: true,
    //     collapsed: true,
    //     items: [
    //       { text: '基础篇',
    //       collapsible: true,
    //       collapsed: true, 
    //       items: [
    //         { text: 'ajax是什么？怎么实现的', link: '/face/base/00' },
    //         { text: 'var,let,const区别', link: '/face/base/38' },
    //         { text: 'for in 与for of 的区别', link: '/face/base/44' },
    //         { text: 'async以及defer的区别', link: '/face/base/39' },
    //         { text: '行内元素有哪些？块级元素有哪些？ 空(void)元素有哪些', link: '/face/base/0' },
    //         { text: '页面导入样式时，使用link和@import有什么区别', link: '/face/base/1' },
    //         { text: 'title与h1的区别、b与strong的区别、i与em的区别', link: '/face/base/2' },
    //         { text: 'img标签的title和alt有什么区别',link: '/face/base/3' },
    //         { text: 'png、jpg、gif 这些图片格式解释一下，分别什么时候用',link: '/face/base/4' },
    //         { text: 'vw px rem em是什么',link: '/face/base/19' },
    //         { text: 'vw px rem之间的换算',link: '/face/base/30' },
    //         { text: '页面多屏适配', link: '/face/base/29' },
    //         { text: 'js+rem响应式', link: '/face/base/31' },
    //         { text: '静态布局、自适应布局、流式布局、响应式布局、弹性布局',link: '/face/base/46' },
    //         { text: '介绍一下CSS的盒子模型',link: '/face/base/5' },
    //         { text: 'line-height和heigh区别',link: '/face/base/6' },
    //         { text: 'CSS选择符有哪些？哪些属性可以继承',link: '/face/base/7' },
    //         { text: 'CSS优先级算法如何计算',link: '/face/base/8' },
    //         { text: '用CSS画一个三角形',link: '/face/base/9' },
    //         { text: '重绘重排有什么区别',link: '/face/base/20' },
    //         { text: 'BFC',link: '/face/base/10' },
    //         { text: '介绍下 BFC、IFC、GFC 和 FFC',link: '/face/base/45' },
    //         { text: '清除浮动有哪些方式',link: '/face/base/11' },
    //         { text: '闭包',link: '/face/base/13' },
    //         { text: 'react闭包',link: '/face/base/42' }, 
    //         { text: 'react 闭包陷阱',link: '/face/base/43' }, 
    //         { text: '前端的内存泄漏怎么理解',link: '/face/base/21' },
    //         { text: 'Javascript垃圾回收方法',link: '/face/base/16' },
    //         { text: '防抖与节流',link: '/face/base/14' },
    //         { text: '介绍下 Set、Map、WeakSet 和 WeakMap 的区别',link: '/face/base/17' },
    //         { text: 'ES5/ES6 的继承除了写法以外还有什么区别',link: '/face/base/18' },
    //         { text: '原型链',link: '/face/base/22' },
    //         { text: '作用域链',link: '/face/base/23' },
    //         { text: 'new操作符具体做了什么',link: '/face/base/24' },
    //         { text: 'JS的继承方式有哪些，es6继承',link: '/face/base/25' },
    //         { text: 'JS的设计原理是什么',link: '/face/base/26' },
    //         { text: 'JS中关于this指向的问题',link: '/face/base/27' },
    //         { text: 'call,apply,bind区别',link: '/face/base/28' },
    //         { text: 'Promise相关',link: '/face/base/32' },
    //         { text: '实现一个深拷贝',link: '/face/base/33' },
    //         { text: 'es6新特性',link: '/face/base/34' },
    //         { text: 'html5有哪些新特性',link: '/face/base/35' },
    //         { text: 'CSS3有哪些新特性',link: '/face/base/36' },
    //         { text: 'js实现继承的方式有哪些',link: '/face/base/41' },
            

    //       ]},
    //       { text: 'vue',
    //       collapsible: true,
    //       collapsed: true,
    //       items:[
    //         { text: '如何理解MVVM的', link: '/face/vue/00' },
    //         { text: '手写mini版的MVVM框架', link: '/face/vue/0' },
    //         { text: '手写 v-model 数据双向绑定', link: '/face/vue/1' },
    //         { text: '使用proxy实现数据监听', link: '/face/vue/2' },
    //         { text: 'vue 异步更新原理', link: '/face/vue/3' },
    //         { text: 'nextTick为什么要优先使用微任务实现？', link: '/face/vue/4' },
    //         { text: 'computed 和 watch的区别', link: '/face/vue/5' },
    //         { text: 'vue css scoped', link: '/face/vue/6' },
    //         { text: '虚拟dom', link: '/face/vue/7' },
    //         { text: 'vuex 属性有哪些', link: '/face/vue/21' },
    //         { text: 'vuex原理', link: '/face/vue/8' },
    //         { text: 'vue路由守卫', link: '/face/vue/17' },
    //         { text: 'vue-router原理', link: '/face/vue/9' },
    //         { text: 'vue路由的hash模式和history模式有什么区别', link: '/face/vue/15' },
    //         { text: 'vue路由拦截是怎么实现的', link: '/face/vue/16' },
    //         { text: 'vue中如何做强制刷新', link: '/face/vue/18' },
    //         { text: 'vue3与vue2的区别', link: '/face/vue/10' },
    //         { text: 'proxy相比于Object.defineProperty性能的提升有哪些', link: '/face/vue/11' },
    //         { text: 'vue中数据是双向绑定的，但是为何数据的变化是单向的，这样的好处是什么', link: '/face/vue/12' },
    //         { text: 'vue生命周期', link: '/face/vue/13' },
    //         { text: 'vue如何进行组件通信', link: '/face/vue/14' },
    //         { text: 'vue的过滤器怎么使用', link: '/face/vue/19' },
    //         { text: 'vue如何封装一个组件', link: '/face/vue/20' },
    //         { text: 'vue单项数据流', link: '/face/vue/22' },


    //      ] },
    //       { text: 'react', 
    //       collapsible: true,
    //       collapsed: true,
    //       items: [
    //         { text: 'react16、17、18变化', link: '/face/react/00' },
    //         { text: 'Vue 和 react的 虚拟dom 区别', link: '/face/react/12' },
    //         { text: 'react diff算法以及原理', link: '/face/react/0' },
    //         { text: 'react 组件通信方式', link: '/face/react/14' },
    //         { text: 'react Redux', link: '/face/react/10' },
    //         { text: 'react redux-thunk', link: '/face/react/11' },
    //         { text: 'react Fiber', link: '/face/react/1' },
    //         { text: 'react中使用了Fiber，为什么vue没有用Fiber？', link: '/face/react/4' },
    //         { text: 'react 高阶函数以及状态复用问题', link: '/face/react/13' },
    //         { text: 'react Hooks', link: '/face/react/2' },
    //         { text: 'useMemo和useCallback的作用与区别', link: '/face/react/6' },
    //         { text: '为什么vue和react都选择了Hooks', link: '/face/react/3' },
    //         { text: '为什么react推行函数式组件', link: '/face/react/5' },
    //         { text: 'setState 是同步还是异步', link: '/face/react/7' },
    //         { text: 'react中的合成事件和原生事件', link: '/face/react/8' },
    //         { text: '使用setCount修改数据后，到页面重新渲染，整个流程是怎么样的', link: '/face/react/9' },
    //      ] },
    //      { text: '计算机网络与安全',  
    //      collapsible: true,
    //      collapsed: true,
    //      items: [
    //       { text: '从输入URL到页面加载发生了什么', link: '/face/net/0' },
    //       { text: '三次握手与四次挥手',link: '/face/base/15' },
    //       { text: '跨域问题',link: '/face/base/12' },
    //       { text: '彻底弄懂cors跨域请求', link: '/face/net/1' },
    //       { text: 'WebSocket', link: '/face/net/2' },
    //       { text: 'token与jwt的区别', link: '/face/net/14' },
    //       { text: 'TCP和UDP的区别', link: '/face/net/3' },
    //       { text: 'http1、2、3', link: '/base/http' },
    //       { text: 'keep-alive 持久连接', link: '/face/net/4' },
    //       { text: 'http 请求头', link: '/face/net/15' },
    //       { text: 'http 各状态码', link: '/face/net/5' },
    //       { text: 'DNS解析过程', link: '/face/net/6' },
    //       { text: 'sql注入', link: '/face/net/7' },
    //       { text: 'XSS(跨站脚本攻击)', link: '/face/net/8' },
    //       { text: 'csrf 跨站请求伪造', link: '/face/net/9' }, 
    //       { text: '中间人攻击', link: '/face/net/10' },
    //       { text: 'jsonp安全防范', link: '/face/net/11' },
    //       { text: '浏览器如何验证ca证书的有效性', link: '/face/net/12' },
    //       { text: 'csp内容安全策略', link: '/face/net/13' },
    //       { text: '前端安全', link: '/face/net/16' },

          

    //    ] },
    //    { text: '浏览器原理',
    //    collapsible: true,
    //    collapsed: true,  
    //    items: [
    //     { text: 'js的单线程', link: '/face/box/0' },
    //     { text: 'js事件循环', link: '/face/box/7' },
    //     { text: '线程与进程',link: '/face/box/1' },
    //     { text: '浏览器页面渲染机制',link: '/face/box/2' },
    //     { text: 'script标签 async defer的区别', link: '/face/box/3' },
    //     { text: 'DOM事件流', link: '/face/box/4' },
    //     { text: '浏览器空闲时间', link: '/face/box/5' },
    //     { text: '浏览器缓存', link: '/face/box/6' },
    //  ] },
    //      { text: 'node', 
    //      collapsible: true,
    //      collapsed: true,
    //       items: [
    //       { text: 'Node 高并发的原理', link: '/face/node/0' },
    //       { text: 'Node 事件循环机制与浏览器的区别', link: '/face/node/1' },
    //       { text: 'mongoDb 和mySQL的区别', link: '/face/node/2' },
    //       { text: '高并发时的如何正确修改库存', link: '/face/node/3' },
    //       { text: 'Redis', link: '/face/node/4' },
    //       { text: 'PM2', link: '/face/node/5' },
    //       { text: 'node 创建子进程', link: '/face/node/6' },
    //    ] },
  
    //      { text: '性能篇',
    //      collapsible: true,
    //      collapsed: true, 
    //      items: [
    //       { text: '如何应对某一时段流量比较大的情况', link: '/face/0' },
    //       { text: '为什么日志打印较多会影响服务器性能', link: '/face/1' },
    //       { text: '前端大数据量性能优化', link: '/face/2' },
    //       { text: 'react性能优化都有哪些方案', link: '/face/3' },
    //       { text: 'vue性能优化都有哪些方案', link: '/face/5' },
    //       { text: '如何处理浏览器兼容问题', link: '/face/4' },
    //       { text: '首屏优化该如何去做', link: '/face/6' },
    //       { text: 'taro3和taro2区别', link: '/face/taro' },
            

    //      ] },
     
    //    { text: '算法以及代码实现篇',
    //    collapsible: true,
    //    collapsed: true, 
    //    items: [

    //      { text: '检查符号闭合', link: '/face/count/0' },
    //      { text: '转化成RMB形式', link: '/face/count/1' },
    //      { text: '手动实现发布订阅', link: '/face/count/2' },
    //      { text: '数组扁平化', link: '/face/count/3' },
    //      { text: '原生实现监听select之外区域，关闭下拉框效果', link: '/face/count/4' },
    //      { text: '异步任务3秒超时控制', link: '/face/count/5' },
    //      { text: '冒泡排序', link: '/face/count/11' },
    //      { text: '快速排序', link: '/face/count/6' },
    //      { text: 'reduce实现map', link: '/face/count/7' },
    //      { text: '手机号验证', link: '/face/count/8' },
    //      { text: '反转链表', link: '/face/count/9' },
    //      { text: '遍历二叉树', link: '/face/count/10' },
    //      { text: '给定一个非负数，最多可以交换一拍即次数字中的任意两位，返回你能得到的最大值', link: '/face/count/12' },

    //    ] },

   

    //     ]
    //   },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/swingAnt' }
    ]
  }
})
