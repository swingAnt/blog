# Webpack 5 详解

Webpack 5 是前端工程化构建工具 Webpack 的最新版本，带来了许多新特性和优化，进一步提升了前端开发的效率和性能。本文将详细介绍 Webpack 5 的主要特点、新特性以及使用方法。

## 一、主要特点

### 1. 持久化缓存

Webpack 5 引入了持久化缓存机制，通过将构建过程中的缓存数据存储在磁盘上，使得在重新构建时可以复用之前的缓存数据，大大减少了构建时间。这对于大型项目或频繁变更的项目来说，是一个重要的性能提升。

### 2. 更好的Tree Shaking 支持

Tree Shaking 是一种消除 JavaScript 上下文中未引用代码的技术。Webpack 5 在这方面进行了进一步的优化，提供了更好的支持。通过使用 ES6 模块语法和配置相应的选项，可以更有效地进行摇树优化，减小打包文件的大小。

### 3. 自动拆分代码

Webpack 5 默认启用了自动拆分代码的功能，可以将代码拆分成多个小的Chunk，实现按需加载和并行加载。这有助于提高页面的加载速度，提升用户体验。

### 4. 内置的模块联邦（Module Federation）

Webpack 5 引入了模块联邦的概念，允许在不同的 Webpack 构建之间共享模块。这使得微前端架构的实现变得更加简单和高效，不同应用之间可以共享代码和组件，提高了代码的复用性和维护性。

## 二、新特性

### 1. 更好的输出和性能

Webpack 5 在输出和性能方面进行了许多改进，包括更快的构建速度、更小的打包文件以及更好的代码优化。这些改进使得 Webpack 5 在处理大型项目时更加高效和可靠。

### 2. 更好的 TypeScript 支持

随着 TypeScript 在前端领域的普及，Webpack 5 加强了对 TypeScript 的支持。现在，Webpack 可以更好地解析和转换 TypeScript 代码，提供了更好的开发体验。

### 3. 新的插件系统

Webpack 5 引入了新的插件系统，使得插件的开发和使用更加灵活和便捷。开发者可以更加容易地扩展 Webpack 的功能，满足不同的项目需求。

## 三、使用方法

### 1. 安装和配置

要使用 Webpack 5，首先需要安装相应的依赖包。可以通过 npm 或 yarn 等包管理器进行安装。安装完成后，需要创建一个 Webpack 配置文件（通常是 webpack.config.js），并在其中进行相关的配置。

### 2. 编写代码

在项目中编写代码时，可以使用 ES6 模块语法来组织代码结构，并利用 Webpack 的特性进行模块化和组件化开发。同时，也可以利用 Webpack 的加载器（loader）来处理不同类型的文件，如 CSS、图片等。

### 3. 构建和打包

完成代码编写后，可以通过运行 Webpack 命令来进行构建和打包。Webpack 会根据配置文件中的选项和规则，将代码拆分成多个Chunk，并进行优化和压缩，最终生成可用于部署的打包文件。

## 四、总结

Webpack 5 带来了许多新特性和优化，使得前端开发的效率和性能得到了进一步提升。通过持久化缓存、更好的 Tree Shaking 支持、自动拆分代码以及模块联邦等新特性，Webpack 5 能够更好地满足现代前端项目的需求。同时，其灵活的插件系统和强大的配置能力也使得开发者能够根据不同的项目需求进行定制和优化。掌握 Webpack 5 的使用方法和特性，对于提升前端开发的效率和质量具有重要意义。


## Webpack5 模块联邦
webpack5 模块联邦(Module Federation) 使 JavaScript应用，得以从另一个 JavaScript应用中动态的加载代码，实现共享依赖，用于前端的微服务化
### 业务场景
假设公司有个业务集群，公共业务组件库升级了，希望能够尽可能少得影响业务线，仅仅在基础组件库版本升级即可全业务线升级，那么可以考虑使用模块联邦来实现。

他和利用 npm 发包来实现的方案的区别在于，npm 发布的组件库从 1.0.1 升级到 1.0.2 的时候，必须要把业务线项目重新构建，打包，发布才能使用到最新的特性，而模块联邦可以实现实时动态更新而无需打包业务线项目。
### Webpack ModuleFederationPlugin
Webpack 5的模块联邦提供加载部分编译好的代码能力，这个似乎会成为微前端架构的标准实现。

   <img src="/moduleFederation.png">

在当前的微前端实现中，我们需要通过一系列的技巧去实现。正如上图所示，微前端的公共依赖加载目前并没有非常好的实现方案。然后，Webpack 5中的模块联邦将会改变这一现状。
模块联邦可以去依赖一个远程模块，这个依赖会在运行时生效，并不影响编译时。因此，这个远程依赖的模块就可以是一个微前端独立模块。同时，每个独立模块都可以申明公共的依赖库，这样也可以避免独立模块间的依赖包的冗余和冲突。
### 去中心化的微前端设计有一个很好的实现，就是在2020年出现的基础webpack的模块联邦。

微前端架构方案
1. Single-Spa：最早的微前端框架（2018年），兼容多种前端技术栈，核心只做路由劫持和应用加载。
 本身没有处理样式隔离、JavaScript 执行隔离
2. Qiankun：诞生于2019年，基于 Single-Spa，阿里系开源微前端框架。对vite支持不是很好
 single-spa + sandbox + import-html-entry
3. 本身解决了样式隔离、JavaScript 执行隔离
 接入简单
4. 2020年 webpack5 模块联邦
 2020 年 EMP 基于 Module Federation（模块联邦），接入成本低，解决第三方依赖包的问题
### Webpack ModuleFederationPlugin
重要参数说明
1. name 当前应用名称，需要全局唯一
2. remotes 可以将其他项目的 name 映射到当前项目中
3. exposes 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用
4. shared 是非常重要的参数，制定了这个参数，可以让远程加载的模块对应依赖，改为使用本地项目的依赖，如React 或 ReactDOM

### 示例
这个例子首先包含一个空壳涵盖两个模块(Home、Flights)，这个空壳应用可以按需的加载各个微前端模块。

 <img src="/module1.png">

下面是微前端模块的部分-Flights，这部分其实也可以独立运行。

 <img src="/module2.png">


通过这样的架构可以实现各个模块的独立开发发布，同时有能够按需的进行集成整合。

### 模块联邦
在过去要实现微前端的架构是非常困难的，尤其是像Webpack这类工具是需要在编译阶段保证全部代码的完整性。懒加载是有可能的，但需要在编译阶段排除掉才行。

在微前端架构下，每个独立模块都需要独立编译打包，并且需要人工引入。大体的代码如下：
import('http://other-microfrontend');
这样的实现需要依赖external方式的JavaScript人工引入，在Webpack 5中这一实现方式将会得到改变。
模块联邦背后的原理非常简单：宿主系统通过配置名称来引用远程模块，同时在编译阶段宿主系统是不需要了解远程模块的，仅仅在运行时通过加载远程模块的入口文件来实现。

 <img src="/module3.png">


宿主系统实现
宿主系统用于引入远程模块。这个例子会加载一个远程模块mfe1/component，mfe1是配置的远程模块名，component是其中提供的一个文件。
```javascript
const rxjs = await import('rxjs');

const container = document.getElementById('container');
const flightsLink = document.getElementById('flights');

rxjs.fromEvent(flightsLink, 'click').subscribe(async _ => {
    const module = await import('mfe1/component');
    const elm = document.createElement(module.elementName);
    […]    
    container.appendChild(elm);
});
```
在Webpack配置中，采用ModuleFederationPlugin可以来申明要使用的远程模块信息。
```javascript
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

[…]

plugins: [
  new ModuleFederationPlugin({
    name: "shell",
    library: { type: "var", name: "shell" },
    remotes: {
      mfe1: "mfe1"
    },
    shared: ["rxjs"]
  })
]
```
这样远程模块mfe1就声明完成了，Webpack在编译阶段就会把mfe1相关的引用都忽略，避免将其进行打包。
在shared中可以定义依赖的公共库，这个例子就是rxjs。这样就可以保证整个应用仅仅会加载rxjs库一次，否则的话公共库会被打包进入宿主应用，同时也会在各个子模块中重复出现。
当然，shared的公共库需要保证是一样的版本。同时，宿主系统需要通过dynamic import的方式进行加载：
import * as rxjs from 'rxjs';
### 远程模块的实现
远程模块也是一个独立系统，这里采用web component方式实现：
```JAVASCRIPT
class Microfrontend1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.shadowRoot.innerHTML = `[…]`;
    }
}

const elementName = 'microfrontend-one';
customElements.define(elementName, Microfrontend1);

export { elementName };
```
当然，你可以采用任何一种前端框架来实现，通用的框架库可以用shared的方式在宿主和远程模块之间实现公用。

在远程模块的Webpack配置中，也需要使用ModuleFederationPlugin，将模块暴露出去。
```javascript
output: {
      publicPath: "http://localhost:3000/",
      […]
 },
 […]
 plugins: [
    new ModuleFederationPlugin({
      name: "mfe1",
      library: { type: "var", name: "mfe1" },
      filename: "remoteEntry.js",
      exposes: {
        component: "./mfe1/component"
      },
      shared: ["rxjs"]
    })
]    
```
name定义了远程模块的配置名称。通过远程模块名称和暴露出来的组件名，宿主就可以远程进行依赖引用：
```javascript 
import('mfe1/component')
```
最后，宿主还需要知道远程模块的url来真正引入。
### 宿主连接远程模块
宿主系统需要加载远程的入口文件，这个文件是远程模块通过ModuleFederationPlugin打包产生的。
入口文件名定义在filename的配置中，这个例子定义为"remoteEntry.js"。微前端模块的url定义在publicPath属性上。
在宿主系统中引入远程模块入口文件：
   ```javascript
   <script src="http://localhost:3000/remoteEntry.js"></script>
```

 <img src="/module4.png">



在这个例子中，我们提供了两个系统

宿主系统：地址是localhost:5000，会加载远程模块入口文件
远程模块：地址是localhost:3000，提供了远程模块组件

结论
Webpack 5的模块联邦机制给微前端势必会带来革命性的变化。远程的模块可以独立编译，然后在运行时进行加载，同时还能够定义公共库来避免重复加载。
可以预见在不久的将来，模块联邦将成为微前端架构中标准解决方案之一。

## 模块联邦组件的版本控制
在Webpack 5的模块联邦中，控制暴露组件的版本通常涉及几个方面的配置和管理。以下是一些建议和步骤，帮助你控制模块联邦中暴露组件的版本：

1. **版本控制**：
   - 对于你希望暴露的组件，确保它们在代码仓库中有明确的版本控制。使用Git或其他版本控制系统，为组件的每个重要更改或发布创建一个新的标签或版本。

2. **package.json中的版本**：
   - 在你的远程应用的`package.json`文件中，为暴露的组件或整个应用指定一个版本号。这有助于其他应用知道它们正在消费的是哪个版本的组件。

3. **Webpack配置中的版本**：
   - 在Webpack的配置中，当使用`ModuleFederationPlugin`暴露组件时，虽然Webpack本身并不直接处理版本控制，但你可以在暴露的组件名称或描述中包含版本信息。例如，你可以将组件名称命名为`MyComponent@1.0.0`。

4. **锁定依赖版本**：
   - 在远程应用的`package.json`中，使用确切的版本号而不是范围来锁定依赖项的版本。这可以确保你的组件在不同环境中使用相同的依赖版本，减少版本冲突的可能性。

5. **文档和通信**：
   - 记录并清晰地传达你的组件版本和它们之间的兼容性。这可以通过README文件、版本控制日志或专门的文档网站来实现。

6. **使用范围**：
   - 虽然通常建议锁定依赖版本以避免不可预见的行为，但在某些情况下，你可能希望允许一定的版本范围。在这种情况下，请确保你进行了充分的测试，以确保范围内的任何版本都能与你的组件正常工作。

7. **CI/CD集成**：
   - 使用持续集成/持续部署(CI/CD)工具来自动化构建和测试过程。这可以确保每当有新的代码提交或依赖项更新时，都会进行自动构建和测试，从而及时发现并解决问题。

8. **语义化版本控制**：
   - 遵循语义化版本控制（Semantic Versioning，简称SemVer）的规范。这意味着你的版本号应该遵循`MAJOR.MINOR.PATCH`的格式，并且每个部分的更改都有明确的意义。

请注意，Webpack本身并不直接管理组件的版本，而是依赖于你的代码仓库、`package.json`文件和构建过程来确保组件版本的正确性和一致性。因此，控制模块联邦中暴露组件的版本是一个多方面的工作，需要你在多个层面进行配置和管理。
