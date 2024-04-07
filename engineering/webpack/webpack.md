
## 手写一个mini版的Webpack

别担心

我们不需要去掌握具体的实现细节，而是通过这个案例，了解webpack的整体打包流程，明白这个过程中做了哪些事情，最终输出了什么结果即可

创建minipack.js

```javascript
const fs = require("fs"); // 文件读取

const path = require("path"); // 文件路径

const { parse } = require("@babel/parser"); // 解析代码生成 AST，// ast将js代码转化为一种JSON数据结构

const transformFromAst = require("@babel/core").transformFromAst; // 将es6 es7 等高级的语法转化为es5的语法

const traverse = require("@babel/traverse").default; // babel-traverse是一个对ast进行遍历的工具, 对ast进行替换

let ID = 0;

/**

 * @description: 生成文件依赖信息

 * @param {*} filename 文件的绝对路径

 * @return {*}

 */

function createAsset(filename) {

  /* 读取文件内容 */

  // 字符串形式读取文件内容.

  const content = fs.readFileSync(filename, "utf-8");

  // 现在我们需要搞清楚文件的依赖关系，可以通过寻找文件内容中的 import 字符串，为此我们就需要一个 JavaScript 解析器

  /* 生成 AST */

  // JavaScript 解析器可以帮助我们来理解代码，生成一个抽象的数据结构称为 AST(抽象语法树)

  // 可以在这里看看抽象语法树是什么样子

  // AST Explorer (https://astexplorer.net)

  // 获取该文件对应的ast 抽象语法树

  // 一个 AST 包含了代码中的大量信息，我们可以通过它来了解代码想要做什么

  const ast = parse(content, {

    sourceType: "module"

  });

  // 这个数组用来保存当前模块依赖的其他模块的相对路径

  const dependencies = [];

  // 通过查找import节点，找到该文件的依赖关系

  // 遍历 AST 来查询当前模块依赖哪些模块，也就是检查 AST 上每个 import 语句

  // 因为项目中我们都是通过 import 引入其他文件的，找到了import节点，就找到这个文件引用了哪些文件

  traverse(ast, {

    // ES 模块都很简单，因为它们都是静态的，所以看到 import 语句可以直接把值作为依赖

    ImportDeclaration: ({ node }) => {

      dependencies.push(node.source.value);

    }

  });

  // 用 ID 来标识当前模块

  const id = ID++;

  // ES 模块和其他 js 特性可能不是所有浏览器都支持，为了能够在所有浏览器上运行，我们使用 Babel 来转译

  const { code } = transformFromAst(ast, null, {

    presets: ["@babel/preset-env"]

  });

  // 返回该模块的所有信息.

  return {

    id,// 文件id（唯一）

    filename,// 文件路径

    dependencies,// 文件的依赖关系

    code// 文件的代码

  };

}

/**

 * @description: 创建依赖结构图

 * @param {*} entry 入口文件的相对路径

 * @return {*}

 */

function createGraph(entry) {

  // 先解析入口文件的依赖信息.

  const mainAsset = createAsset(entry);

  // 用一个队列来保存所有的依赖信息

  const queue = [mainAsset];
//  对应结构如下:
//   [

//     {

//       id: 0,

//       filename: './example/entry.js',

//       dependencies: [ './message.js' ],

//       code: '"use strict";\n' +

//         '\n' +

//         'var _message = _interopRequireDefault(require("./message.js"));\n' +

//         'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n' +

//         '// 将message的内容显示到页面中\n' +

//         "var p = document.createElement('p');\n" +

//         'p.innerHTML = _message.default;\n' +

//         'document.body.appendChild(p);'

//     }

//   ]

  // 遍历队列

  for (const asset of queue) {

    // 每个 asset 都有一组它依赖模块的相对路径

    // 我们用 createAsset 来迭代解析

    asset.mapping = {};

    // 当前模块的目录.

    const dirname = path.dirname(asset.filename);

    // 迭代访问依赖的相对路径,一直查找到末级节点

    asset.dependencies.forEach(relativePath => {

      // 生成绝对路径

      const absolutePath = path.join(dirname, relativePath);

      // // 递归解析其中所引入的其他资源，提取依赖信息.

      const child = createAsset(absolutePath);
    //  对应结构如下:
    //   {

    //     id: 1,

    //     filename: 'example\\message.js',

    //     dependencies: [ './name.js' ],

    //     code: '"use strict";\n' +

    //       '\n' +

    //       'Object.defineProperty(exports, "__esModule", {\n' +

    //       '  value: true\n' +

    //       '});\n' +

    //       'exports.default = void 0;\n' +

    //       'var _name = require("./name.js");\n' +

    //       'var _default = "hello ".concat(_name.name, "!");\n' +

    //       'exports.default = _default;'

    //   }

      // asset 保存 id 和 相对路径 的映射关系

      asset.mapping[relativePath] = child.id;////示例取值如下: { "./message.js": 1 }

      // 将`child`推入队列, 通过递归实现了这样它的依赖关系解析

      queue.push(child);

    });

  }

  // queue 保存的就是当前应用的所有模块的依赖结构图

  return queue;

}

/**

 * @description: 文件打包

 * @param {*} graph 依赖结构图

 * @return {*}

 */

function bundle(graph) {

  let modules = "";

  graph.forEach(mod => {

    // 每个模块用 id 来标识都是数组类型

    // 每个模块有两个值

    // 第一个是用函数包装每个模块的代码，是为了限定每个模块的作用域

    // 第二个是模块的 相对路径和id 的依赖关系

    modules += `${mod.id}: [

      function (require, module, exports) {

        ${mod.code}

      },

      ${JSON.stringify(mod.mapping)},//示例取值如下: { "./message.js": 1 }

    ],`;

  });

  // 最后实现自动执行函数的主题

  // 1. 创建 require 函数接收模块 id

  // 2. 通过 id 来获取模块代码和映射关系

  // 3. 根据不同的模块导入方式生成代码

  const result = `

    (function(modules) {

      function require(id) {

        const [fn, mapping] = modules[id];

        function localRequire(name) {

          return require(mapping[name]);

        }

        const module = { exports : {} };

        fn(localRequire, module, module.exports);

        return module.exports;

      }

      require(0);

    })({${modules}})

  `;

  // 返回的结果就是打包完成的内容了

  return result;

}

// ❤️ 项目的入口文件

const graph = createGraph("./example/entry.js");

const result = bundle(graph);

console.log(result);

// ⬅️ 创建dist目录，将打包的内容写入main.js中

fs.mkdir('dist', (err) => {

    if (!err)

      fs.writeFile('dist/main.js', result, (e) => {

        if (e) throw e;

        console.log("打包完成");

      });

  });



```
注：mini版的Webpack未涉及loader和plugin等复杂功能，只是一个非常简化的例子
##### mini版的webpack打包流程
1）从入口文件开始解析
2）查找入口文件引入了哪些js文件，找到依赖关系
3）递归遍历引入的其他js，生成最终的依赖关系图谱
4）同时将ES6语法转化成ES5
5）最终生成一个可以在浏览器加载执行的 js 文件
创建测试目录example
在目录下创建以下4个文件
##### 1）创建入口文件entry.js

```
import message from './message.js';
// 将message的内容显示到页面中
let p = document.createElement('p');
p.innerHTML = message;
document.body.appendChild(p);
```
##### 2）创建message.js
```
import { name } from './name.js';
export default `hello ${name}!`;
```
##### 3）创建name.js
```
export const name = 'Webpack';
```
##### 4）创建index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <!-- 引入打包后的main.js --> 
  <script src="./dist/main.js"></script></body>
</html>
```
##### 5） 执行打包

运行node minipack.js，dist目录下生成main.js

##### 6） 浏览器打开index.html

页面上显示hello Webpack!
代码整体结构如下:
![微信图片_20221112164121.png](https://upload-images.jianshu.io/upload_images/28661183-d88fded280281534.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

分析打包生成的文件
分析dist/main.js
文件内容
1）文件里是一个立即执行函数

2）该函数接收的参数是一个对象，该对象有3个属性
0 代表entry.js;
1 代表message.js;
2 代表name.js

dist/main.js代码
```javascript

(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];

    function localRequire(name) {
      // ⬅️ 第四步 跳转到这里 此时mapping[name] = 1，继续执行require(1)
      // ⬅️ 第六步 又跳转到这里 此时mapping[name] = 2，继续执行require(2)
      return require(mapping[name]);
    }

    const module = { exports: {} };
    // ⬅️ 第二步 执行fn
    fn(localRequire, module, module.exports);

    return module.exports;
  }
  // ⬅️ 第一步 执行require(0)
  require(0);
})({
  // 立即执行函数的参数是一个对象，该对象有3个属性
  // 0 代表entry.js;
  // 1 代表message.js
  // 2 代表name.js
  0: [
    function (require, module, exports) {
      "use strict";
      // ⬅️ 第三步 跳转到这里 继续执行require('./message.js')
      var _message = _interopRequireDefault(require("./message.js"));
      // ⬅️ 第九步 跳到这里 此时_message为 {default: 'hello Webpack!'}
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
      // ⬅️ 最后一步 将_message.default: 'hello Webpack!'写到p标签中
      var p = document.createElement('p');
      p.innerHTML = _message.default;
      document.body.appendChild(p);
    },
    { "./message.js": 1 },
  ], 1: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      // ⬅️ 第五步 跳转到这里 继续执行require('./name.js')
      var _name = require("./name.js");
      // ⬅️ 第八步 跳到这里 此时_name为{name: 'Webpack'}, 在exports对象上设置default属性，值为'hello Webpack!'
      var _default = "hello ".concat(_name.name, "!");
      exports.default = _default;
    },
    { "./name.js": 2 },
  ], 2: [
    function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.name = void 0;
      // ⬅️ 第七步 跳到这里 在传入的exports对象上添加name属性，值为'Webpack'
      var name = 'Webpack';
      exports.name = name;
    },
    {},
  ],
})
```
⬅️ 分析文件的执行过程
1）整体大致分为10步，第一步从require(0)开始执行，调用内置的自定义require函数，跳转到第二步，执行fn函数
2）执行第三步require('./message.js')，继续跳转到第四步 require(mapping['./message.js']), 最终转化为require(1)
3）继续执行require(1)，获取modules[1]，也就是执行message.js的内容
4）第五步require('./name.js')，最终转化为require(2)，执行name.js的内容
5）通过递归调用，将代码中导出的属性，放到exports对象中，一层层导出到最外层
6）最终通过_message2.default获取导出的值，页面显示hello Webpack!

## Webpack的打包流程
总结一下webpack完整的打包流程
1）webpack从项目的entry入口文件开始递归分析，调用所有配置的 loader对模块进行编译
因为webpack默认只能识别js代码，所以如css文件、.vue结尾的文件，必须要通过对应的loader解析成js代码后，webpack才能识别
2）利用babel将js代码转化为ast抽象语法树，然后通过babel-traverse对ast进行遍历
3）遍历的目的找到文件的import引用节点
因为现在我们引入文件都是通过import的方式引入，所以找到了import节点，就找到了文件的依赖关系
4）同时每个模块生成一个唯一的id，并将解析过的模块缓存起来，如果其他地方也引入该模块，就无需重新解析，最后根据依赖关系生成依赖图谱
5）递归遍历所有依赖图谱的模块，组装成一个个包含多个模块的 Chunk(块)
6）最后将生成的文件输出到 output 的目录中

## 热更新原理
主要是通过websocket实现，建立本地服务和浏览器的双向通信。当代码变化，重新编译后，通知浏览器请求更新的模块，替换原有的模块
1. **通过webpack-dev-server开启server服务**，本地server启动之后，再去启动websocket服务，建立本地服务和浏览器的双向通信
2. **webpack每次编译后，会生成一个Hash值，Hash代表每一次编译的标识。**本次输出的Hash值会编译新生成的文件标识，被作为下次热更新的标识
3. **webpack监听文件变化（主要是通过文件的生成时间判断是否有变化），当文件变化后，重新编译**
4. 编译结束后，**通知浏览器请求变化的资源，同时将新生成的hash值传给浏览器，用于参考下次热更新使用**
5. **浏览器拿到更新后的模块后，用新模块替换掉旧的模块，从而实现了局部刷新**