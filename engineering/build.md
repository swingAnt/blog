脚手架是开发中经常会使用的工具，比如vue-cli、create-react-app等，这些脚手架可以通过简单的命令，快速去搭建项目，让我们更专注于项目的开发
随着项目的增多、人员的扩展，大家开发的基础组件和公共方法也越来越多，希望把这些积累添加到脚手架中，当成项目模板留存下来
这样再创建项目时，就不用每次去其他项目中来回copy

### 手写一个mini版的脚手架
下面我们一起，手写一个mini版的脚手架

通过这个案例来了解脚手架的工作流程，以及使用了哪些常用工具

新建文件夹my-build-cli，执行npm init -y

  <img src="/build1.png">

###配置脚手架入口文件
### 1）创建bin目录，该目录下创建www.js

bin/www.js 内容
```javascript
#! /usr/bin/env node

console.log('link 成功');
   ```
注：/usr/bin/env node 这行的意思是使用node来执行此文件
### 2）package.json中配置入口文件的路径
```javascript
{
  "name": "my-build-cli",
  "version": "1.0.0",
  "description": "",
  "bin": "./bin/www.js", // 手动添加入口文件为 ./bin/www.js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
### 3）项目目录结构
```javascript
my-build-cli              
├─ bin               
│  └─ www.js           
└─ package.json 
```
### npm link 到全局
在控制台输入npm link

  <img src="/build2.png">

测试是否连接成功

在控制台输入my-build-cli

  <img src="/build3.png">

### 安装脚手架所需的工具

一次性安装所需的工具

```npm install commander inquirer download-git-repo util ora fs-extra axios```

  <img src="/build4.png">


### commander 自定义命令行工具
commander.js 是自定义命令行工具

这里用来创建create 命令，用户可以通过输入 my-cli creat appName 来创建项目

修改www.js
```javascript
#! /usr/bin/env node

const program = require('commander');

program
  // 创建create 命令，用户可以通过 my-cli creat appName 来创建项目
  .command('create <app-name>')
  // 命名的描述
  .description('create a new project')
  // create命令的选项
  .option('-f, --force', 'overwrite target if it exist')
  .action((name, options) => {
    // 执行'./create.js'，传入项目名称和 用户选项
    require('./create')(name, options);
  });

program.parse();
```
### inquirer 命令行交互工具
inquirer.js 命令行交互工具，用来询问用户的操作，让用户输入指定的信息，或给出对应的选项让用户选择
此处inquirer的运用场景有2个
1. 场景1：当用户要创建的项目目录已存在时，提示用户是否要覆盖 or 取消
2. 场景2：让用户输入项目的author作者和项目description描述
### 创建create.js
bin/create.js
```javascript
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator');

module.exports = async function (name, options) {
  // process.cwd获取当前的工作目录
  const cwd = process.cwd();
  // path.join拼接 要创建项目的目录
  const targetAir = path.join(cwd, name);

  // 如果该目录已存在
  if (fs.existsSync(targetAir)) {
    // 强制删除
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      // 通过inquirer：询问用户是否确定要覆盖 or 取消
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target already exists',
          choices: [
            {
              name: 'overwrite',
              value: 'overwrite'
            },
            {
              name: 'cancel',
              value: false
            }
          ]
        }
      ]);
      if (!action) {
        return;
      } else {
        // 删除文件夹
        await fs.remove(targetAir);
      }
    }
  }

  const args = require('./ask');

  // 通过inquirer，让用户输入的项目内容：作者和描述
  const ask = await inquirer.prompt(args);
  // 创建项目
  const generator = new Generator(name, targetAir, ask);
  generator.create();
};
```
### 创建ask.js
配置 ask 选项，让用户输入作者和项目描述

bin/create.js

```javascript
// 配置ask 选项
module.exports = [
  {
    type: 'input',
    name: 'author',
    message: 'author?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'description?'
  }
];

```
### 创建generator.js
generator.js的工作流程
1. 通过接口获取git上的模板目录
2. 通过inquirer让用户选择需要下载的项目
3. 使用download-git-repo下载用户选择的项目模板
4. 将用户创建时，将项目名称、作者名字、描述写入到项目模板的package.json文件中
bin/generator.js

```javascript
const path = require('path');
const fs = require('fs-extra');
// 引入ora工具：命令行loading 动效
const ora = require('ora');
const inquirer = require('inquirer');
// 引入download-git-repo工具
const downloadGitRepo = require('download-git-repo');
// download-git-repo 默认不支持异步调用，需要使用util插件的util.promisify 进行转换
const util = require('util');
// 获取git项目列表
const { getRepolist } = require('./http');

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  // 下载开始
  spinner.start();

  try {
    const result = await fn(...args);
    // 下载成功
    spinner.succeed();
    return result;
  } catch (e) {
    // 下载失败
    spinner.fail('Request failed ……');
  }
}

// 创建项目类
class Generator {
  // name 项目名称
  // target 创建项目的路径
  // 用户输入的 作者和项目描述 信息
  constructor(name, target, ask) {
    this.name = name;
    this.target = target;
    this.ask = ask;
    // download-git-repo 默认不支持异步调用，需要使用util插件的util.promisify 进行转换
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async getRepo() {
    // 获取git仓库的项目列表
    const repolist = await wrapLoading(getRepolist, 'waiting fetch template');
    if (!repolist) return;

    const repos = repolist.map((item) => item.name);

    // 通过inquirer 让用户选择要下载的项目模板
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template'
    });

    return repo;
  }

  // 下载用户选择的项目模板
  async download(repo, tag) {
    const requestUrl = `yuan-cli/${repo}`;
    await wrapLoading(this.downloadGitRepo, 'waiting download template', requestUrl, path.resolve(process.cwd(), this.target));
  }

  // 文件入口，在create.js中 执行generator.create();
  async create() {
    const repo = await this.getRepo();
    console.log('用户选择了', repo);

    // 下载用户选择的项目模板
    await this.download(repo);

    // 下载完成后，获取项目里的package.json
    // 将用户创建项目的填写的信息（项目名称、作者名字、描述），写入到package.json中
    let targetPath = path.resolve(process.cwd(), this.target);

    let jsonPath = path.join(targetPath, 'package.json');

    if (fs.existsSync(jsonPath)) {
      // 读取已下载模板中package.json的内容
      const data = fs.readFileSync(jsonPath).toString();
      let json = JSON.parse(data);
      json.name = this.name;
      // 让用户输入的内容 替换到 package.json中对应的字段
      Object.keys(this.ask).forEach((item) => {
        json[item] = this.ask[item];
      });

      //修改项目文件夹中 package.json 文件
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, '\t'), 'utf-8');
    }
  }
}

module.exports = Generator;

```
### 创建http.js
用来发送接口，获取git上的模板列表
bin/http.js
```javascript 
// 引入axios
const axios = require('axios');

axios.interceptors.response.use((res) => {
  return res.data;
});

// 获取git上的项目列表
async function getRepolist() {
  return axios.get('https://api.github.com/orgs/yuan-cli/repos');
}

module.exports = {
  getRepolist
};

```
最终的目录结构

  <img src="/build5.png">

### 脚手架发布到npm库
完善package.json
1）配置main属性，指定包的入口 "main": "./bin/www.js"
2）增加files属性，files用来描述当把 npm 包，作为依赖包安装的文件列表。当npm包发布时，files指定的文件会被推送到npm服务器中
3）增加description、keywords等描述字段
```javascript
{
  "name": "qiuck-start-project",
  "version": "1.0.0",
  "description": "一个快速创建项目的脚手架",
  "bin": {
    "qiuck-start-project": "bin/index.js"
  },
  "main": "bin/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "files": [
    "bin"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/swingAnt/qiuck-start-project.git"
  },
  "keywords": [
    "qiuck-start-project",
    "快速创建项目脚手架"
  ],
  "author": "ljk",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.4.0",
    "commander": "^10.0.1",
    "download-git-repo": "^3.0.2",
    "fs-extra": "^11.1.1",
    "inquirer": "8.0.0",
    "ora": "5.4.1",
    "util": "^0.12.5"
  }
}

增加README.md说明文档
```
## qiuck-start-project

一个 mini 版的自定义脚手架

### 安装

```npm install qiuck-start-project -g```

### 使用说明

1. 通过 qiuck-start-project create appName 创建项目

2. author? 输入项目作者

3. description? 输入项目描述

4. 选择项目模块 appDemo or pcDemo

5. 安装选择的模板

### 演示示例

发布成功后，在npm网站搜索qiuck-start-project

<img src="/qiuck.png">

