
## Loader作用

webpack只能直接处理js格式的资源，任何非 js 文件都必须被对应的loader处理转换为js代码
## 手写一个loader
### 一个简单的style-loader
```javascript
// 作用：将css内容，通过style标签插入到页面中
// source为要处理的css源文件
function loader(source) {
  let style = `
    let style = document.createElement('style');
    style.setAttribute("type", "text/css"); 
    style.innerHTML = ${source};
    document.head.appendChild(style)`;
  return style;
}
module.exports = loader;
```
在vue项目中使用自定义loader
1）在vue.config.js引入该loader

const MyStyleLoader = require('./style-loader')

2）在configureWebpack中添加配置
```javascript
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          // 对main.css文件使用MyStyleLoader处理
          test: /main.css/,
          loader: MyStyleLoader
        }
      ]
    }
  }
};
```
3）项目重新编译
main.css样式已加载到页面中
## loader的组成部分
loader的本质是一个 node模块，该模块导出一个函数，函数接收source(源文件)，返回处理后的source
## loader执行顺序
相同优先级的loader链，执行顺序为：从右到左，从下到上
如use: ['loader1', 'loader2', 'loader3']，执行顺序为 loader3 →   loader2 →   loader1
## 常用的loader

  <img src="/loader.png">

