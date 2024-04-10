## 服务器端渲染的多种模式
### 传统的spa应用，都属于CSR (Client Side Rendering)客户端渲染
主要问题
1. 白屏时间过长：在 JS bundle 返回之前，假如 bundle 体积过大或者网络条件不好的情况下，页面一直是空白的，用户体验不友好
2. SEO不友好：搜索引擎访问页面时，只会看 HTML 中的内容，默认是不会执行JS，所以抓取不到页面的具体内容
服务器端渲染的多种模式
1. SSR (Server Side Rendering)， 即服务端渲染
服务端直接实时同构渲染当前用户访问的页面，返回的 HTML 包含页面具体内容，提高用户的体验
适用于：页面动态内容，SEO 的诉求、要求首屏时间快的场景
缺点：SSR 需要较高的服务器运维成本、切换页面时较慢，每次切换页面都需要服务端新生成页面
2. SSG (Static Site Generation)，是指在应用编译构建时预先渲染页面，并生成静态的 HTML
把生成的 HTML 静态资源部署到服务器后，浏览器不仅首次能请求到带页面内容的 HTML ，而且不需要服务器实时渲染和响应，大大节约了服务器运维成本和资源
适用于：页面内容由后端获取，但变化不频繁，满足SEO 的诉求、要求首屏时间快的场景，SSG打包好的是静态页面，和普通页面部署一样
3. ISR (Incremental Static Regeneration)，创建需要增量静态再生的页面
创建具有动态路由的页面（增量静态再生），允许在应用运行时再重新生成每个页面 HTML，而不需要重新构建整个应用，这样即使有海量页面（比如博客、商品介绍页等场景），也能使用上 SSG 的特性
在Nextjs中，使用 ISR 需要getStaticPaths 和 getStaticProps 同时配合使用
### vue SSR 服务端渲染
vue项目，可以使用Nestjs框架，实现ssr渲染，开发有SEO需求的页面
SSR原理
通过asyncData获取数据，数据获取成功后，通过vue-server-renderer将数据渲染到页面中，生成完整的html内容，服务端将这段html发送给客户端，实现服务端渲染
SSR基本交互流程
1. 在浏览器访问首页时，Web 服务器根据路由拿到对应数据渲染并输出html，输出的html包含两部分
①路由页对应的页面及已渲染好的数据（后端渲染）
②完整的SPA程序代码
2. 在客户端首屏渲染完成之后，其实已经是一个和之前的 SPA 相差无几的应用程序了，接下来我们进行的任何操作都只是客户端的应用进行交互
### vue SSR整体流程
1. 配置两个入口文件，一个是客户端使用，一个是服务端使用，一套代码两套执行环境
2. 服务端渲染需要Vue实例，每一次客户端请求页面，服务端渲染都是用一个新的Vue实例，服务端利用工厂函数每次都返回一个新的Vue实例
3. 获取请求页面的路由，生成对应的vue实例
4. 如果页面中需要调接口获取数据，通过asyncData获取数据，数据获取成功后，通过异步的方式再继续进行初始化，通过vue-server-renderer将数据渲染到页面中，生成html内容
### 如何避免客户端重复请求数据
在服务端已经请求的数据，在客户端应该避免重复请求，怎样同步数据到客户端？
##### 通过（window对象作为中间媒介进行传递数据）
1. 服务端获取数据，保存到服务端的store状态，以便渲染时候使用，最终会将store保存到window中
2. 在renderer中会在html代码中添加
```<script>window.__INITIAL_STATE__ = context.state</script>```，```
在解析页面的时候会进行设置全局变量
3. 在浏览器进行初始化Store的时候，通过window对象进行获取数据在服务端的状态，并且将其注入到store.state状态中，这样能够实现状态统一
为什么服务端渲染不能调用mounted钩子
服务端渲染不能调用beforeMount和mounted，Node环境没有document对象，初始化的时候，vue底层会判断当前环境中是否有el这个dom对象，如果没有，就不会执行到beforeMount和mounted这两个钩子函数



Next.js 是一个基于 React 的框架，它默认支持服务端渲染（SSR）。服务端渲染在服务器端生成 HTML 字符串，然后将其发送到客户端，这样用户可以直接看到渲染好的页面，而不是先看到空白的页面，然后等待 JavaScript 执行完毕后再看到内容。

### Next.js 服务端渲染（SSR）实现教程

1. **安装和设置 Next.js**

如果你还没有安装 Next.js，可以使用 Create Next App 来快速开始。在你的终端或命令提示符中运行以下命令：


```bash
npx create-next-app@latest
```
然后按照提示进行操作。
2. **编写页面**

在 Next.js 中，页面位于 `pages` 目录中。每个 `.js` 或 `.tsx` 文件都映射到一个路由。例如，`pages/index.js` 是应用程序的主页。

在 `pages/index.js` 中，你可以像编写普通的 React 组件一样编写页面。Next.js 会自动处理服务端渲染。


```jsx
// pages/index.js
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}
```
3. **运行应用程序**

在项目的根目录中运行以下命令来启动开发服务器：


```bash
npm run dev
```
或者如果你使用 yarn：


```bash
yarn dev
```
这将启动一个开发服务器，并在你的浏览器中打开应用程序。由于 Next.js 默认使用服务端渲染，因此你会看到页面内容已经渲染好，而不需要等待 JavaScript 执行。
4. **自定义服务端渲染**

虽然 Next.js 默认支持服务端渲染，但你也可以通过 `getServerSideProps` 异步函数来自定义服务端渲染的逻辑。这个函数在服务器端运行，并且可以访问请求对象（`req`）和查询参数（`query`）。它返回一个对象，该对象的属性将作为 props 传递给页面组件。

例如，你可以从外部 API 获取数据，并在服务端渲染时将其传递给页面组件：


```jsx
// pages/about.js
import React from 'react';

export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return { props: { data } };
}

export default function About({ data }) {
  return (
    <div>
      <h1>About Page</h1>
      <p>{data.someField}</p>
    </div>
  );
}
```
在这个例子中，`getServerSideProps` 函数从外部 API 获取数据，并将其作为 props 传递给 `About` 组件。这样，当页面在服务器端渲染时，它就已经包含了从 API 获取的数据。
5. **部署应用程序**

当你准备好部署应用程序时，可以使用 Vercel（Next.js 的官方平台）或其他支持 Next.js 的托管服务。你也可以使用 Docker 或其他方法将其部署到自己的服务器上。

### 注意事项

* 服务端渲染会增加服务器的负载，因为每个请求都需要在服务器端执行 JavaScript 代码。因此，在需要考虑性能的场景中，你可能需要考虑使用其他渲染策略，如静态站点生成（SSG）或静态站点生成与客户端渲染的组合（ISR）。
* `getServerSideProps` 只能在 `pages` 目录下的页面组件中使用。如果你需要在非页面组件中获取数据，可以考虑使用其他方法，如 Redux、MobX 或 React 的 Context API。

这就是 Next.js 中服务端渲染的基本实现教程和代码示例。通过结合 Next.js 的其他特性和最佳实践，你可以构建出高效、可维护的 React 应用程序。
