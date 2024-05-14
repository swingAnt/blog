
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



  <img src="/q10.png">

  <img src="/q11.png">

  <img src="/q12.png">

  <img src="/q13.png">


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

## QuarkC支持小程序
QuarkC 是一个支持小程序和移动端原生应用开发的跨平台框架。通过 QuarkC，你可以开发一次组件，然后在小程序和移动端应用中都能使用。下面是一个简单的示例，演示如何使用 QuarkC 开发组件，并在微信小程序中使用该组件，并调用其原生能力。

首先，我们创建一个简单的组件，比如一个显示按钮的组件，然后在微信小程序中使用它，并调用其原生能力。
```javascript
    // 在 QuarkC 中创建一个简单的组件 ButtonComponent
    
    // ButtonComponent.quarkc
    
    import { createComponent } from '@quarkc/core';
    
    export default createComponent({
      data: {
        buttonText: 'Click Me!'
      },
      methods: {
        handleClick() {
          wx.showToast({
            title: 'Button Clicked!',
            icon: 'none',
          });
        },
      },
      render() {
        return (
          <button onClick={this.handleClick}>{this.data.buttonText}</button>
        );
      }
    });
```    

在上面的示例中，我们创建了一个名为 `ButtonComponent` 的组件，用于显示按钮并在点击时弹出微信小程序原生的提示框。

接下来，我们将在微信小程序中使用这个组件，并调用其原生能力。
```javascript
    <!-- 在微信小程序中使用组件并调用原生能力 -->
    
    <!-- index.wxml -->
    
    <view class="container">
      <!-- 在页面中使用组件 -->
      <import src="ButtonComponent.quarkc" />
      <button-component></button-component>
    </view>
    

    // 在微信小程序中使用组件并调用原生能力
    
    // index.js
    
    Page({
      onLoad() {
        // 注册组件
        const ButtonComponent = require('ButtonComponent.quarkc');
        const buttonComponent = ButtonComponent.default;
        this.setData({
          buttonComponent
        });
      }
    });
```

在上面的示例中，我们通过 QuarkC 的 `createComponent` 方法创建了一个 `ButtonComponent` 实例，并在微信小程序页面中使用它。

通过 QuarkC，你可以在微信小程序中使用组件并调用其原生能力。当然，在实际开发中，你可能还需要处理一些微信小程序平台特有的适配工作， QuarkC 提供了一种可行的方案来实现组件的跨平台开发和使用。

## 集成小程序原理
在微信小程序中，QuarkC 开发的组件不需要转换成 .wxml 文件，而 Omi 和 Stencil 的组件需要转换的原因主要是因为它们采用了不同的技术架构和开发方式。

QuarkC 是微信小程序原生支持的一种开发方式，它使用类似 HTML 的语法来描述组件的结构，并且支持直接在 .wxml 文件中编写组件的模板代码。因此，当使用 QuarkC 开发组件时，可以直接在 .wxml 文件中编写组件的结构和样式，无需额外的转换步骤。

而 Omi 和 Stencil 是基于 Web 技术的前端框架，它们使用的是类似于 React 的虚拟 DOM 技术来管理组件的状态和渲染。在微信小程序中使用 Omi 或 Stencil 开发的组件时，需要将它们的组件转换成微信小程序能够识别的 .wxml 文件，以便在小程序中使用。

因此，QuarkC、Omi 和 Stencil 采用了不同的技术架构和开发方式，导致在微信小程序中使用它们开发的组件时，需要的处理方式也不同。QuarkC 的组件可以直接在 .wxml 文件中编写，而 Omi 和 Stencil 的组件需要经过转换成 .wxml 文件后才能在微信小程序中使用。