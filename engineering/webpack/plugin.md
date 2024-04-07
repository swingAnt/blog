# Webpack 插件机制详解

## 作用

Webpack 插件机制是 Webpack 的核心功能之一，它允许我们通过编写插件来扩展 Webpack 的功能，加入自定义的构建行为。这使得 Webpack 可以执行更广泛的任务，拥有更强的构建能力。

## 工作原理

Webpack 通过内部的事件流机制保证了插件的有序性。底层是利用发布订阅模式，Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，在特定的时机对资源进行处理。

## 手写一个 Plugin 插件

下面是一个简单的示例，演示如何手写一个名为 `MyPlugin` 的插件，该插件在打包完成后，在控制台输出 "打包已完成"。

```javascript
// MyPlugin.js
class MyPlugin {
  // 插件需要有一个 apply 方法，这个方法会被 webpack compiler 调用
  apply(compiler) {
    // 通过 compiler 对象可以监听和挂载 Webpack 生命周期中的事件钩子
    compiler.hooks.done.tap("MyPlugin", (stats) => {
      console.log("打包已完成");
      // 注意：done 钩子是一个异步钩子，但在这个示例中我们不需要执行回调
    });
  }
}

module.exports = MyPlugin;
```

## 在项目中使用自定义插件

### 1. 引入该插件

```javascript
// webpack.config.js
const MyPlugin = require('./MyPlugin');
```

### 2. 在 `plugins` 数组中注册该插件

```javascript
// webpack.config.js
module.exports = {
  // ... 其他配置项
  plugins: [
    new MyPlugin(),
    // ... 其他插件
  ],
};
```

### 3. 执行项目的打包命令

当项目打包成功后，会在控制台输出 "打包已完成"。

## Plugin 的组成部分

1. **Plugin 的本质**：是一个 Node.js 模块，这个模块导出一个 JavaScript 类。

2. **apply 方法**：插件的原型上需要定义一个 `apply` 方法。这个方法在安装插件时，会被 Webpack `compiler` 对象调用一次。

3. **访问钩子**：通过 `compiler` 对象，插件可以访问 Webpack 内部的钩子，从而监听和干预 Webpack 打包过程中的各个阶段。

4. **同步与异步钩子**：Webpack 的钩子分为同步和异步两种。异步钩子通常需要执行相应的回调。

5. **操作编译数据**：通过 `compilation` 对象，插件可以操作 Webpack 内部实例的特定数据。

6. **回调**：当插件完成其功能后，对于异步钩子，需要执行 Webpack 提供的回调以确保流程的继续。

## compiler 上暴露的一些常用钩子简介

<!-- <img src="compilerdesc.png" alt="compiler 上的常用钩子"> -->

### 一些常用钩子的说明：


  <img src="/compilerdesc.png">

## Compilation Hooks

Compilation 是 Compiler 用来创建一次新的编译过程的模块。一个 Compilation 实例可以访问所有模块和它们的依赖。

<!-- <img src="compilerhooks.png" alt="Compilation 上的常用钩子"> -->

### 一些常用钩子的说明：


   <img src="/compilerhooks.png">


## 常用的 Plugin 插件

Webpack 社区提供了许多常用的插件，它们可以帮助我们完成各种构建任务。

<!-- <img src="plugins.png" alt="常用的 Webpack 插件"> -->

### 一些常用插件的说明：

   <img src="/pugins.png">

了解 Webpack 插件的机制和编写插件的基础知识，可以帮助我们更好地扩展 Webpack 的功能，提高构建效率。







## 扩展:文件清单插件


### 概述


在 webpack 打包后自动生成一个文件清单，记录打包的文件名和文件数量等信息，可以通过开发一个自定义插件来实现这个功能。插件会在 webpack 打包过程中获取文件信息，并生成一个清单文件，方便查看和管理打包后的文件。

### 实现思路


1.  注册 `Compiler` 上的 `emit` 钩子，该钩子在文件生成到输出目录之前触发。
2.  在 `emit` 钩子的回调函数中，通过 `compilation.assets` 获取待生成的文件列表。
3.  整理文件信息，包括文件数量和文件名列表，并准备输出到清单文件。
4.  将生成的清单文件添加到 `compilation.assets` 中，以便 webpack 输出。

### 插件代码实现

```javascript
    class FileListPlugin {
        constructor(options) {
            this.filename = options && options.filename ? options.filename : 'FILELIST.md';
        }
    
        apply(compiler) {
            compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
                // 获取文件数量
                let len = Object.keys(compilation.assets).length;
    
                // 准备清单文件内容
                   let content = `# ${len} file${len>1?'s':''} emitted by webpack\n\n`;
                for (let filename in compilation.assets) {
                    content += `- ${filename}\n`;
                }
    
                // 添加清单文件
                compilation.assets[this.filename] = {
                    source: function() {
                        return content;
                    },
                    size: function() {
                        return content.length;
                    }
                }
    
                cb();
            });
        }
    }
    
    module.exports = FileListPlugin;
```

### 配置插件


在 webpack 配置文件中引入自定义插件，并添加到插件列表中：

 ``` javascript 
  const FileListPlugin = require('./FileListPlugin');
    
    module.exports = {
        // 其他配置项
        plugins: [
            new FileListPlugin({
                filename: '_filelist.md'
            })
        ]
    };
 ```

### 测试


执行 `npm run build` 后，可以在输出目录（如 `dist`）中看到生成的 `_filelist.md` 文件，其中列出了 webpack 打包后的所有文件信息。
   <img src="/list1.png">

通过这个文件清单插件，您可以方便地查看每次打包生成的文件列表，帮助您更好地管理和调试 webpack 打包过程。
   <img src="/list2.png">


[揭秘webpack-plugin](https://champyin.com/2020/01/12/揭秘webpack-plugin/)