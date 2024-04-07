# Vite：下一代构建工具

## Vite原理

Vite利用了现代浏览器对原生ES Module的支持，从而在开发过程中跳过了传统的打包过程，极大地提升了编译效率。当我们在代码中通过import语句加载资源时，浏览器会发出对应的HTTP请求来获取这些文件。Vite正是通过拦截这些请求，并返回相应的模块文件，从而实现了快速的开发体验。

## ES Module简单示例

```html
<script type="module">
  import { a } from './a.js';
</script>
```

在上面的示例中，当声明一个type为module的script标签时，浏览器会对其内部的import引用发起HTTP请求，获取对应的模块内容。例如，它会发起一个对`HOST/a.js`的HTTP请求，并在获取到内容之后执行。

## Vite的限制

需要注意的是，Vite主要对应的是开发模式。在生产模式下，Vite会使用Rollup进行打包，以确保最终构建出的代码能够在各种环境中高效运行。

## Vite热更新速度

Vite的热更新速度是其一大优势，且不会随着模块数量的增多而变慢。这主要得益于其独特的热更新原理。

- **Webpack的热更新原理**：当某个依赖（如`a.js`）发生改变时，Webpack会将整个包含这个依赖的module进行更新，并将新的module发送给浏览器重新执行。因此，随着依赖的增多，即使只修改了一个文件，热更新的速度也可能会变慢。

- **Vite的热更新原理**：当`a.js`文件发生改变时，Vite只会重新编译这个文件，而无需重新编译其他文件。这种精细化的更新策略使得Vite的热更新速度在理论上不会随着文件数量的增加而变慢。

## 手写Vite

想要更深入地了解Vite的实现原理，可以参考一些从零开始手写Vite的教程或视频，如[珠峰的从零手写vite视频](https://link.juejin.cn/?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1at4y1a7zi%3Ffrom%3Dsearch%26seid%3D13340994191382185418%26spm_id_from%3D333.337.0.0 "https://www.bilibili.com/video/BV1at4y1a7zi?from=search&seid=13340994191382185418&spm_id_from=333.337.0.0")等。这些教程通常会详细介绍Vite的实现流程，包括通过Koa开启服务、使用es-module-lexer解析AST获取import内容、处理三方模块和.vue文件的编译等。

## Vite的实现流程简述

1. **开启服务**：使用Koa等Node.js框架开启一个本地开发服务器。

2. **请求处理**：当浏览器发起对静态文件的请求时，Vite会拦截这些请求并进行处理。

3. **解析import**：使用工具如es-module-lexer来解析文件的AST（抽象语法树），从而获取import语句的内容。

4. **处理三方模块**：如果import的是三方模块，Vite会将其重定向到node_modules目录下的对应模块。

5. **编译.vue文件**：对于.vue文件，Vite会读取文件内容并进行编译。这包括使用compileTemplate等工具将template部分转化为render函数。

6. **编译JS**：使用Babel等工具对JS部分进行编译，以确保其能够在浏览器中运行。

7. **返回编译后的内容**：最后，Vite将编译后的内容返回给浏览器，完成整个开发流程的循环。

通过这些步骤，Vite实现了高效的开发体验，为前端开发者带来了极大的便利。

