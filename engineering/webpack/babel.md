AST抽象语法树与 Babel

AST（Abstract Syntax Tree）抽象语法树


## 什么是AST？

AST是源代码的抽象语法结构的树状表现形式，在JavaScript中，可以将AST视为最底层的抽象表示形式。

### 简单的AST示例

以 `let a = 1;` 转化成AST的结果为：

    {
      "type": "Program",
      "start": 0,
      "end": 9,
      "body": [
        {
          "type": "VariableDeclaration",
          "start": 0,
          "end": 9,
          "declarations": [
            {
              "type": "VariableDeclarator",
              "start": 4,
              "end": 9,
              "id": {
                "type": "Identifier",
                "start": 4,
                "end": 5,
                "name": "a"
              },
              "init": {
                "type": "Literal",
                "start": 8,
                "end": 9,
                "value": 1,
                "raw": "1"
              }
            }
          ],
          "kind": "let"
        }
      ],
      "sourceType": "module"
    }
    
AST抽象语法树的结构，可以通过[AST网站](https://astexplorer.net/#/)在线输入代码查看
## Babel的基本原理与作用

### 作用

Babel是一个JavaScript编译器，主要用于将新版本的JavaScript代码转换为向后兼容的代码，以确保代码能够在不同浏览器或环境中运行。

### 基本原理

Babel的核心原理是基于AST（抽象语法树）。它首先将源码转换为AST，然后对AST进行处理生成新的AST，最后再将新的AST转换为新的JavaScript代码。

### Babel的流程

Babel的处理流程通常分为三个阶段：解析（parsing）、转换（transforming）、生成（generating）：

1.  使用babylon将JavaScript代码解析为AST。
2.  使用babel-traverse对AST进行遍历，使用Babel插件进行转换生成新的AST。
3.  使用babel-generator将新的AST生成新的JavaScript代码。

### 配置和使用

1.  针对单个软件包，可在`.babelrc`中配置如下：

    {
      "presets": [],
      "plugins": []
    }
    

2.  在Vue项目中，可以在`babel.config.js`中进行配置，例如：

    module.exports = {
      presets: ["@vue/app"],
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ]
    };
    

3.  配置`browserslist`用于控制要兼容的浏览器版本，示例配置如下：

    "browserslist": [
      "> 1%",
      "last 2 versions",
      "chrome >= 70",
      "not ie <= 8"
    ]
    

通过以上配置，可以灵活使用Babel进行JavaScript代码转换，实现向后兼容和优化，以适配不同的浏览器和环境。

结合Babel和AST的强大功能，开发者可以更好地处理和转换JavaScript代码，提高代码质量和跨浏览器兼容性。
## 开发一个Babel插件
## Babel插件的作用
Babel插件在编译过程中负责转换AST（抽象语法树），是实现JavaScript代码转换的核心部分。
## Babel插件的基本格式
1.  Babel插件是一个函数，参数是`babel`，返回一个对象，其中`visitor`是关键字段，包含一个箭头函数。
2.  箭头函数接受两个参数：`path`表示路径，`state`表示状态。
3.  在`visitor`对象中定义针对不同类型节点的处理逻辑。

### 插件的简单格式示例
```javascript
    module.exports = function (babel) {
      let t = babel.types;
      return {
        visitor: {
          CallExpression: (path, state) => {
            // 处理CallExpression节点
          }
        }
      };
    };
```

### 最简单的插件示例：将`const a`转化为`const b`


### 创建`babelPluginAtoB.js`：
```javascript
    module.exports = function(babel) {
      let t = babel.types;
      return {
        visitor: {
          VariableDeclarator(path, state) {
            if (path.node.id.name === "a") {
              path.node.id.name = 'b'; // 将变量名从a改为b
              // 或者使用以下方式替换节点
              // path.node.id = t.Identifier("b");
            }
          }
        }
      };
    };
    
```
### 在`.babelrc`中引入babelPluginAtoB插件
```javascript

    {
        "plugins": [
            [babelPluginAtoB]
        ]
    }
    
```
### 编写测试代码
```javascript

    let a = 1;
    console.log(b); 
    // 经过Babel插件处理后，不会报错，输出1
    
```
通过开发自定义Babel插件，可以实现对JavaScript代码进行定制化的转换，满足特定需求。插件的开发过程中，需要了解AST的结构和节点类型，以便精确地对目标代码进行处理。优秀的Babel插件可以帮助开发者提高代码质量和效率，实现更灵活、更高效的代码转换。



## 进阶:那么如何实现给所有的async函数添加try/catch呢？
async如果不加 try/catch 会发生什么事？
```javascript
// 示例
async function fn() {
  let value = await new Promise((resolve, reject) => {
    reject('failure');
  });
  console.log('do something...');
}
fn()
```
导致浏览器报错：一个未捕获的错误

  <img src="/error.png">

在开发过程中，为了保证系统健壮性，或者是为了捕获异步的错误，需要频繁的在 async 函数中添加 try/catch，避免出现上述示例的情况
可是我很懒，不想一个个加，懒惰使我们进步😂

下面，通过手写一个babel 插件，来给所有的async函数添加try/catch
### babel插件的最终效果
原始代码：
```javascript
async function fn() {
  await new Promise((resolve, reject) => reject('报错'));
  await new Promise((resolve) => resolve(1));
  console.log('do something...');
}
fn();
```
使用插件转化后的代码：
```JAVASCRIPT
async function fn() {
  try {
    await new Promise((resolve, reject) => reject('报错'));
    await new Promise(resolve => resolve(1));
    console.log('do something...');
  } catch (e) {
    console.log("\nfilePath: E:\\myapp\\src\\main.js\nfuncName: fn\nError:", e);
  }
}
fn();
```
打印的报错信息：

  <img src="/error2.png">

通过详细的报错信息，帮助我们快速找到目标文件和具体的报错方法，方便去定位问题

### babel插件的实现思路

1. 借助AST抽象语法树，遍历查找代码中的await关键字
2. 找到await节点后，从父路径中查找声明的async函数，获取该函数的body（函数中包含的代码）
3. 创建try/catch语句，将原来async的body放入其中
4. 最后将async的body替换成创建的try/catch语句
### babel的核心：AST
AST是代码的树形结构，生成 AST 分为两个阶段：[**词法分析**](https://en.wikipedia.org/wiki/Lexical_analysis)和 [**语法分析**](https://en.wikipedia.org/wiki/Parsing)

**词法分析**

词法分析阶段把字符串形式的代码转换为**令牌（tokens）** ，可以把tokens看作是一个扁平的语法片段数组，描述了代码片段在整个代码中的位置和记录当前值的一些信息

比如`let a = 1`，对应的AST是这样的

  <img src="/ast.png">

**语法分析**

语法分析阶段会把token转换成 AST 的形式，这个阶段会使用token中的信息把它们转换成一个 AST 的表述结构，使用type属性记录当前的类型

例如 let 代表着一个变量声明的关键字，所以它的 type 为 `VariableDeclaration`，而 a = 1 会作为 let 的声明描述，它的 type 为 `VariableDeclarator`

AST在线查看工具：[**AST explorer**](https://astexplorer.net/)

再举个🌰，加深对AST的理解
```javascript
function demo(n) {
  return n * n;
}
```
转化成AST的结构
```javascript
{
  "type": "Program", // 整段代码的主体
  "body": [
    {
      "type": "FunctionDeclaration", // function 的类型叫函数声明；
      "id": { // id 为函数声明的 id
        "type": "Identifier", // 标识符 类型
        "name": "demo" // 标识符 具有名字 
      },
      "expression": false,
      "generator": false,
      "async": false, // 代表是否 是 async function
      "params": [ // 同级 函数的参数 
        {
          "type": "Identifier",// 参数类型也是 Identifier
          "name": "n"
        }
      ],
      "body": { // 函数体内容 整个格式呈现一种树的格式
        "type": "BlockStatement", // 整个函数体内容 为一个块状代码块类型
        "body": [
          {
            "type": "ReturnStatement", // return 类型
            "argument": {
              "type": "BinaryExpression",// BinaryExpression 二进制表达式类型
              "start": 30,
              "end": 35,
              "left": { // 分左 右 中 结构
                "type": "Identifier", 
                "name": "n"
              },
              "operator": "*", // 属于操作符
              "right": {
                "type": "Identifier",
                "name": "n"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```
### await节点对应的AST结构
1）原始代码
```javascript
async function fn() {
   await f()
}
```
对应的AST结构

  <img src="/ast2.png">

2）增加try catch后的代码
```
async function fn() {
    try {
        await f()
    } catch (e) {
        console.log(e)
    }
}
```


  <img src="/ast3.png">

### 通过AST结构对比，插件的核心就是将原始函数的body放到try语句中
### babel插件开发
### 寻找await节点
回到业务需求，现在需要找到await节点，可以通过AwaitExpression表达式获取
```javascript
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       // 设置AwaitExpression
       AwaitExpression(path) {
         // 获取当前的await节点
         let node = path.node;
       }
     }
   }
 }
```
### 向上查找 async 函数
通过findParent方法，在父节点中搜寻 async 节点
```JAVASCRIPT
// async节点的属性为true
const asyncPath = path.findParent(p => p.node.async)
```
async 节点的AST结构


  <img src="/ast4.png">

### 这里要注意，async 函数分为4种情况：函数声明 、箭头函数 、函数表达式 、函数为对象的方法
```javascript
// 1️⃣：函数声明
async function fn() {
  await f()
}

// 2️⃣：函数表达式
const fn = async function () {
  await f()
};

// 3️⃣：箭头函数
const fn = async () => {
  await f()
};

// 4️⃣：async函数定义在对象中
const obj = {
  async fn() {
      await f()
  }
}
```
需要对这几种情况进行分别判断
```javascript
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       // 设置AwaitExpression
       AwaitExpression(path) {
         // 获取当前的await节点
         let node = path.node;
         // 查找async函数的节点
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
       }
     }
   }
 }
```
### 利用babel-template生成try/catch节点
[babel-template](https://babel.docschina.org/docs/en/babel-template/)可以用以字符串形式的代码来构建AST树节点，快速优雅开发插件
```javascript

// 引入babel-template
const template = require('babel-template');

// 定义try/catch语句模板
let tryTemplate = `
try {
} catch (e) {
console.log(CatchError：e)
}`;

// 创建模板
const temp = template(tryTemplate);

// 给模版增加key，添加console.log打印信息
let tempArgumentObj = {
   // 通过types.stringLiteral创建字符串字面量
   CatchError: types.stringLiteral('Error')
};

// 通过temp创建try语句的AST节点
let tryNode = temp(tempArgumentObj);

```
### async函数体替换成try语句
```javascript
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       AwaitExpression(path) {
         let node = path.node;
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
         
         let tryNode = temp(tempArgumentObj);
         
         // 获取父节点的函数体body
         let info = asyncPath.node.body;

         // 将函数体放到try语句的body中
         tryNode.block.body.push(...info.body);

         // 将父节点的body替换成新创建的try语句
         info.body = [tryNode];
       }
     }
   }
 }

```
到这里，插件的基本结构已经成型，但还有点问题，如果函数已存在try/catch，该怎么处理判断呢？
### 若函数已存在try/catch，则不处理
```javascript
// 示例代码，不再添加try/catch
async function fn() {
    try {
        await f()
    } catch (e) {
        console.log(e)
    }
}
```
通过isTryStatement判断是否已存在try语句
  ```javascript
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       AwaitExpression(path) {
       
        // 判断父路径中是否已存在try语句，若存在直接返回
        if (path.findParent((p) => p.isTryStatement())) {
          return false;
        }
       
         let node = path.node;
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
         let tryNode = temp(tempArgumentObj);
         let info = asyncPath.node.body;
         tryNode.block.body.push(...info.body);
         info.body = [tryNode];
       }
     }
   }
 }
   ```
### 添加报错信息
获取报错时的文件路径 filePath 和方法名称 funcName，方便快速定位问题
### 获取文件路径
   ```javascript
// 获取编译目标文件的路径，如：E:\myapp\src\App.vue
const filePath = this.filename || this.file.opts.filename || 'unknown';
```
### 获取报错的方法名称

```javascript
// 定义方法名
let asyncName = '';

// 获取async节点的type类型
let type = asyncPath.node.type;

switch (type) {
// 1️⃣函数表达式
// 情况1：普通函数，如const func = async function () {}
// 情况2：箭头函数，如const func = async () => {}
case 'FunctionExpression':
case 'ArrowFunctionExpression':
  // 使用path.getSibling(index)来获得同级的id路径
  let identifier = asyncPath.getSibling('id');
  // 获取func方法名
  asyncName = identifier && identifier.node ? identifier.node.name : '';
  break;

// 2️⃣函数声明，如async function fn2() {}
case 'FunctionDeclaration':
  asyncName = (asyncPath.node.id && asyncPath.node.id.name) || '';
  break;

// 3️⃣async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
case 'ObjectMethod':
  asyncName = asyncPath.node.key.name || '';
  break;
}

// 若asyncName不存在，通过argument.callee获取当前执行函数的name
let funcName = asyncName || (node.argument.callee && node.argument.callee.name) || '';
```
### 添加用户选项
用户引入插件时，可以设置exclude、include、 customLog选项

exclude： 设置需要排除的文件，不对该文件进行处理

include： 设置需要处理的文件，只对该文件进行处理

customLog： 用户自定义的打印信息
### 最终代码
### 入口文件index.js
```javascript
// babel-template 用于将字符串形式的代码来构建AST树节点
const template = require('babel-template');

const { tryTemplate, catchConsole, mergeOptions, matchesFile } = require('./util');

module.exports = function (babel) {
  // 通过babel 拿到 types 对象，操作 AST 节点，比如创建、校验、转变等
  let types = babel.types;

  // visitor：插件核心对象，定义了插件的工作流程，属于访问者模式
  const visitor = {
    AwaitExpression(path) {
      // 通过this.opts 获取用户的配置
      if (this.opts && !typeof this.opts === 'object') {
        return console.error('[babel-plugin-await-add-trycatch]: options need to be an object.');
      }

      // 判断父路径中是否已存在try语句，若存在直接返回
      if (path.findParent((p) => p.isTryStatement())) {
        return false;
      }

      // 合并插件的选项
      const options = mergeOptions(this.opts);

      // 获取编译目标文件的路径，如：E:\myapp\src\App.vue
      const filePath = this.filename || this.file.opts.filename || 'unknown';

      // 在排除列表的文件不编译
      if (matchesFile(options.exclude, filePath)) {
        return;
      }

      // 如果设置了include，只编译include中的文件
      if (options.include.length && !matchesFile(options.include, filePath)) {
        return;
      }

      // 获取当前的await节点
      let node = path.node;

      // 在父路径节点中查找声明 async 函数的节点
      // async 函数分为4种情况：函数声明 || 箭头函数 || 函数表达式 || 对象的方法
      const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));

      // 获取async的方法名
      let asyncName = '';

      let type = asyncPath.node.type;

      switch (type) {
        // 1️⃣函数表达式
        // 情况1：普通函数，如const func = async function () {}
        // 情况2：箭头函数，如const func = async () => {}
        case 'FunctionExpression':
        case 'ArrowFunctionExpression':
          // 使用path.getSibling(index)来获得同级的id路径
          let identifier = asyncPath.getSibling('id');
          // 获取func方法名
          asyncName = identifier && identifier.node ? identifier.node.name : '';
          break;

        // 2️⃣函数声明，如async function fn2() {}
        case 'FunctionDeclaration':
          asyncName = (asyncPath.node.id && asyncPath.node.id.name) || '';
          break;

        // 3️⃣async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
        case 'ObjectMethod':
          asyncName = asyncPath.node.key.name || '';
          break;
      }

      // 若asyncName不存在，通过argument.callee获取当前执行函数的name
      let funcName = asyncName || (node.argument.callee && node.argument.callee.name) || '';

      const temp = template(tryTemplate);

      // 给模版增加key，添加console.log打印信息
      let tempArgumentObj = {
        // 通过types.stringLiteral创建字符串字面量
        CatchError: types.stringLiteral(catchConsole(filePath, funcName, options.customLog))
      };

      // 通过temp创建try语句
      let tryNode = temp(tempArgumentObj);

      // 获取async节点(父节点)的函数体
      let info = asyncPath.node.body;

      // 将父节点原来的函数体放到try语句中
      tryNode.block.body.push(...info.body);

      // 将父节点的内容替换成新创建的try语句
      info.body = [tryNode];
    }
  };
  return {
    name: 'babel-plugin-await-add-trycatch',
    visitor
  };
};
```
### util.js
```javascript
const merge = require('deepmerge');

// 定义try语句模板
let tryTemplate = `
try {
} catch (e) {
console.log(CatchError,e)
}`;

/*
 * catch要打印的信息
 * @param {string} filePath - 当前执行文件的路径
 * @param {string} funcName - 当前执行方法的名称
 * @param {string} customLog - 用户自定义的打印信息
 */
let catchConsole = (filePath, funcName, customLog) => `
filePath: ${filePath}
funcName: ${funcName}
${customLog}:`;

// 默认配置
const defaultOptions = {
  customLog: 'Error',
  exclude: ['node_modules'],
  include: []
};

// 判断执行的file文件 是否在 exclude/include 选项内
function matchesFile(list, filename) {
  return list.find((name) => name && filename.includes(name));
}

// 合并选项
function mergeOptions(options) {
  let { exclude, include } = options;
  if (exclude) options.exclude = toArray(exclude);
  if (include) options.include = toArray(include);
  // 使用merge进行合并
  return merge.all([defaultOptions, options]);
}

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

module.exports = {
  tryTemplate,
  catchConsole,
  defaultOptions,
  mergeOptions,
  matchesFile,
  toArray
};
```
### 插件使用说明

  <img src="/babels.png">