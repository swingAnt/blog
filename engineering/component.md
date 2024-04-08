
<!-- Quarkc:https://quark.hellobike.com
Quarkd ：https://github.com/hellof2e/quark-design -->
## 无框架/跨技术栈组件化
### web component实例

```javascript
<div class="container">
<order-card title="xxx" data="cccc" submit={()=>{console.log('submit')}}> </oder-card>
</div>
```
```javascript
//template
const template=document.createElement("template");
template.innerHTML=`
<style>
:host{
contain:content;
display:inline-block
}//...
</style>
<div class="card">
//...
</div>`
//shadow dom
class OrderCard extends HTMLElement{
constructor(){
super();
const shadowRoot=this.attachShadow({mode:"closed"})
shadowRoot.appendChild(template.content.cloneNode(true))
}
//自定义元素
customElements.define("order-card",OderCard);
```


### Web Components 组成三剑客（符合W3C规范）

#### Custom Elements（自定义元素）

Custom Elements 是一组JavaScript API，允许开发者定义自定义元素及其行为。这些自定义元素可以像标准HTML元素一样，在用户界面中按需使用。通过这种方式，开发者能够扩展HTML的词汇表，创建出符合项目特定需求的全新元素。

#### Shadow DOM（影子DOM）

Shadow DOM 同样是基于JavaScript的一组API，它允许开发者将封装的“影子”DOM树附加到元素上。这些影子DOM树与主文档DOM分开呈现，使得开发者可以控制其关联的功能。这种机制确保了元素功能的私有性，即使它们可以被脚本化和样式化，也不用担心与文档的其他部分发生冲突。

#### HTML Templates（HTML模版）

HTML Templates 主要通过 `<template>` 和 `<slot>` 元素来实现。`<template>` 元素允许开发者编写不会立即呈现在页面上的标记模版，而 `<slot>` 元素则用于定义如何在自定义元素内部使用这些内容。这些模版可以作为自定义元素结构的基础被多次使用，极大地提高了代码的可复用性和可维护性。

优化后的内容更加清晰明了，每个部分都使用了加粗标题来突出主题，使得读者能够更快地找到他们感兴趣的内容。同时，每个部分的解释也更加详细和具体，有助于读者更好地理解Web Components的组成和功能。

优化版本

```javascript
//import styles from './haorooms.css';
class OrderCard extends HTMLElement{
constructor(){
super();
const shadowRoot=this.attachShadow({mode:"closed"})
   //      创建样式1
     //     let node = document.createElement('style');
    //      node.innerHTML = `@import './haorooms.css';`;
     //     this.shadowRoot.append(node);
 // 获取样式2
    //      fetch('./haorooms.css').then(response => 
   //     response.text()).then(data => {
       //       let node = document.createElement('style');
     //         node.innerHTML = data;
     //         this.shadowRoot.appendChild(node);
  //          });
 // 获取样式3
 //     shadow.adoptedStyleSheets = [styles];
}
connectedCallback(){
this.render()
this.shadowRoot.querySelector("#toComment").addEentListener('click'),()=>{
this.dispatchEvent(new CustomEvent('submit'))
}
render(){
//获取属性
const title=this.getAttribute('title')
this.shadowRoot.innerHTML=`
<div class=`card-container`>
<header>预定于2023-8-15</header>
<div class="body"></div>
<div class="footer">
<div id="toComment">
去评价
</div>
</div>
</div>
`
}
}
```
### 痛点:

  <img src="/q1.png">

  <img src="/q2.png">

  <img src="/q3.png">

  <img src="/q4.png">

  <img src="/q5.png">

  <img src="/q6.png">

  <img src="/q7.png">

  <img src="/q8.png">

  <img src="/q9.png">

  <img src="/q1.png">

  <img src="/q10.png">

  <img src="/q11.png">

  <img src="/q12.png">

  <img src="/q13.png">

  <img src="/q1.png">

  <img src="/q14.png">

  <img src="/q15.png">

  <img src="/q16.png">

  <img src="/q17.png">

  <img src="/q18.png">

  <img src="/q19.png">

  <img src="/q20.png">

  <img src="/q21.png">



## Quarkd

## 简介

Quarkd 是一个基于 Quark 设计的开源项目。Quark 设计是一种现代且简洁的视觉语言，旨在为用户提供一致而愉悦的体验。Quarkd 实现了 Quark 设计中的核心组件和样式，帮助开发者快速构建出符合 Quark 设计规范的界面。

## 安装与使用

### 安装

你可以通过 npm 或 yarn 来安装 Quarkd：

```bash
# 使用 npm
npm install @hellof2e/quark-design

# 使用 yarn
yarn add @hellof2e/quark-design
```

### 引入

在你的项目中引入 Quarkd 的 CSS 样式和组件：

```javascript
import '@hellof2e/quark-design/dist/index.css';
import { Button, Input } from '@hellof2e/quark-design';
```

### 使用组件

在你的组件或页面中，你可以像使用普通 React 组件一样使用 Quarkd 的组件：

```jsx
import React from 'react';
import { Button, Input } from '@hellof2e/quark-design';

function MyComponent() {
  return (
    <div>
      <Input placeholder="请输入内容" />
      <Button type="primary">确认</Button>
    </div>
  );
}

export default MyComponent;
```

## 组件与样式

Quarkd 提供了丰富的组件和样式，包括但不限于按钮（Button）、输入框（Input）、表格（Table）、导航（Navigation）等。每个组件都有详细的文档说明和示例，方便开发者快速上手。

此外，Quarkd 还提供了一套统一的样式变量，用于定义颜色、字体、间距等样式属性。开发者可以通过覆盖这些变量来定制自己的主题样式。

## 贡献与反馈

如果你在使用 Quarkd 的过程中遇到问题，或者有更好的建议和改进意见，欢迎通过 GitHub 的 issue 来进行反馈。同时，我们也欢迎开发者为 Quarkd 贡献代码，共同完善这个项目。

## 许可证

Quarkd 使用 MIT 许可证进行开源，你可以在遵守许可证的前提下自由地使用、修改和分发这个项目。

## 链接

- GitHub 仓库：<https://github.com/hellof2e/quark-design>
- 文档：<https://hellof2e.github.io/quark-design/>（假设有官方文档网站）
- 示例：<https://hellof2e.github.io/quark-design/examples/>（假设有官方示例网站）

请注意，以上链接和文档内容仅为示例，实际使用时请参考项目仓库中的最新信息和文档。