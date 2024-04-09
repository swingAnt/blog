不使用第三方库怎么实现【前端引导页】功能？
实现引导页功能
引导页核心功能其实就两点：

一是 高亮部分
二是 引导部分
而这两点其实真的不难实现，无非就是 引导部分 跟着 高亮部分 移动，并且添加一些简单的动画或过渡效果即可，也分为 蒙层引导 和 无蒙层引导，这里介绍相对比较复杂的 蒙层引导，下面就简单介绍两种简单的实现方案。

## cloneNode + position + transition
核心实现：

高亮部分 通过 el.cloneNode(true) 复制对应目标元素节点，并将克隆节点添加到蒙层上
通过 margin（或 tranlate、position 等）实现克隆节点的位置与目标节点重合
引导部分 通过 position: fixed 实现定位效果，并通过动态修改 left、top 属性实现引导弹窗跟随目标移动
过渡动画 通过 transition 实现位置的平滑移动
页面 位置/内容 发生变化时（如：resize、scroll 事件），需要重新计算位置信息
缺点：

目标节点需要被深度复制
不能实现边引导边操作

核心代码：

```javascript

import { useMount,useReactive ,useUnmount} from 'ahooks';
import { Table } from 'antd';
import React, { CSSProperties, PropsWithChildren,useState, useRef, } from 'react'
import styles from './index.module.less'

// 核心配置参数
const selectors = [
  {
    selector: "#btn1",
    message: "点此【新增】数据！",
  },
  {
    selector: "#btn2",
    message: "小心【删除】数据！",
  },
  {
    selector: "#btn3",
    message: "可通过此按钮【修改】数据！",
  },
  {
    selector: "#btn4",
    message: "一键【完成】所有操作！",
  },
];
let cloneNode = null;
let currNode = null;

export default function PositionTip(props) {
  const guideModalRef=useRef(null)
  const guideBoxRef=useRef(null)
  const state = useReactive({
    index:0,
    show:false,

  })

  
  let message = () => {
    return  selectors[state.index]?.message;
  };
  const genGuide = (hasChange = true) => {
    // 前置操作
    cloneNode && guideModalRef?.current?.removeChild(cloneNode);
    // 所有指引完毕
    if (state.index >  selectors.length - 1) {
      state.show=false
      cloneNode=null
      return;
    }
  
    // 获取目标节点信息
    currNode =
      currNode || document.querySelector(selectors[state.index].selector);
    const { x, y, width, height } = currNode.getBoundingClientRect();
  
    // 克隆节点
    cloneNode = hasChange ? currNode.cloneNode(true) : cloneNode;
    cloneNode.id = currNode.id + "_clone";
    cloneNode.style = `
    margin-left: ${x}px;
    margin-top: ${y}px;
    `;


    // 指引相关
    if (guideBoxRef.current) {
      const halfClientHeight = guideBoxRef.current.clientHeight / 2;
      guideBoxRef.current.style = `
     left:${x + width + 10}px;
     top:${y <= halfClientHeight ? y : y - halfClientHeight + height / 2}px;
    `;
      guideModalRef.current?.appendChild(cloneNode);
    }
  };
  // 上一步/下一步
const changeStep = (isPre) => {
  isPre ? state.index=state.index-1 : state.index=state.index+1 ;
  currNode = null;

    genGuide();

};


useMount(()=>{
    // 页面内容发生变化时，重新计算位置  
    // window.addEventListener("resize", () => genGuide(false));
    // window.addEventListener("scroll", () => genGuide(false));
})
useUnmount(()=>{
  // window.removeEventListener("resize", () => genGuide(false));
  // window.removeEventListener("scroll", () => genGuide(false));
})
  return <><div style={state.show?{display:'block'}:{left:'-9999px',zIndex: -1}} ref={guideModalRef}  className={styles.guideModal} >
  <div ref={guideBoxRef}  className={styles.guideBox}>
    <div>{ message() }</div>
    <button  className={styles.btn} disabled={state.index === 0} onClick={()=>{
      changeStep(true)
    }}>
      上一步
    </button>
    <button className={styles.btn}  onClick={()=>{
      changeStep(false)
    }}>下一步</button>
  </div>
</div>
<button onClick={()=>{alert('666')}} className={styles.btn1} id="btn1">点此【新增】数据！</button>
<button className={styles.btn2} id="btn2">小心【删除】数据！</button>
<button className={styles.btn3} id="btn3">可通过此按钮【修改】数据！</button>
<button className={styles.btn4} id="btn4">一键【完成】所有操作！</button>
<div><a onClick={()=>{state.show=true;state.index=0;genGuide()}}>操作引导</a></div>

</>
}
```
## z-index + position + transition
核心实现：

高亮部分 通过控制 z-index 的值，让目标元素展示在蒙层之上
引导部分 通过 position: fixed 实现定位效果，并通过动态修改 left、top 属性实现引导弹窗跟随目标移动
过渡动画 通过 transition 实现位置的平滑移动
页面 位置/内容 发生变化时（如：resize、scroll 事件），需要重新计算位置信息
缺点：

当目标元素的父元素 position: fixed | absolute | sticky 时，目标元素的 z-index 无法超过蒙版层（可参考 shepherd.js 的 svg 解决方案）
```javascript
import { useMount,useReactive ,useUnmount} from 'ahooks';
import { Table } from 'antd';
import React, { CSSProperties, PropsWithChildren,useState, useRef, } from 'react'
import styles from './index.module.less'

// 核心配置参数
const selectors = [
  {
    selector: "#btn1",
    message: "点此【新增】数据！",
  },
  {
    selector: "#btn2",
    message: "小心【删除】数据！",
  },
  {
    selector: "#btn3",
    message: "可通过此按钮【修改】数据！",
  },
  {
    selector: "#btn4",
    message: "一键【完成】所有操作！",
  },
];
let preNode = null;
let currNode = null;

export default function PositionTip(props) {
  const guideModalRef=useRef(null)
  const guideBoxRef=useRef(null)
  const state = useReactive({
    index:0,
    show:false,

  })

  
  let message = () => {
    return  selectors[state.index]?.message;
  };
  const genGuide = (hasChange = true) => { 

    // 所有指引完毕
    if (state.index >  selectors.length - 1) {
      state.show=false
      cloneNode=null
      return;
    }
      // 修改上一个节点的 z-index

    if (preNode) preNode.style = `z-index: 0;`;

   const target =
    preNode = document.querySelector(props.selectors[index.value].selector);
  target.style = `
  position: relative; 
  z-index: 1000;
  `;
   const { x, y, width, height } = target.getBoundingClientRect();

  // 指引相关
  if (guideBoxRef.value) {
    const halfClientHeight = guideBoxRef.value.clientHeight / 2;
    guideBoxRef.value.style = `
   left:${x + width + 10}px;
   top:${y <= halfClientHeight ? y : y - halfClientHeight + height / 2}px;
  `;
  }
  };
  // 上一步/下一步
const changeStep = (isPre) => {
  isPre ? state.index=state.index-1 : state.index=state.index+1 ;
  currNode = null;

    genGuide();

};


useMount(()=>{
    // 页面内容发生变化时，重新计算位置  
    // window.addEventListener("resize", () => genGuide(false));
    // window.addEventListener("scroll", () => genGuide(false));
})
useUnmount(()=>{
  // window.removeEventListener("resize", () => genGuide(false));
  // window.removeEventListener("scroll", () => genGuide(false));
})
  return <><div style={state.show?{display:'block'}:{left:'-9999px',zIndex: -1}} ref={guideModalRef}  className={styles.guideModal} >
  <div ref={guideBoxRef}  className={styles.guideBox}>
    <div>{ message() }</div>
    <button  className={styles.btn} disabled={state.index === 0} onClick={()=>{
      changeStep(true)
    }}>
      上一步
    </button>
    <button className={styles.btn}  onClick={()=>{
      changeStep(false)
    }}>下一步</button>
  </div>
</div>
<button onClick={()=>{alert('666')}} className={styles.btn1} id="btn1">点此【新增】数据！</button>
<button className={styles.btn2} id="btn2">小心【删除】数据！</button>
<button className={styles.btn3} id="btn3">可通过此按钮【修改】数据！</button>
<button className={styles.btn4} id="btn4">一键【完成】所有操作！</button>
<div><a onClick={()=>{state.show=true;state.index=0;genGuide()}}>操作引导</a></div>

</>
}
```
```css
.guideModal {
    position: fixed;
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .guideBox {
        width: 250px;
        min-height: 10px;
        border-radius: 5px;
        background-color: #fff;
        position: absolute;
        transition: 0.5s;
        padding: 10px;
        text-align: center;
        .btn {
            margin: 20px 5px 5px 5px;
          }
      }
      
  }
  .btn1 {
    color: rgb(0 0 0 / 85%);
    margin-right: 30px;
    background: white;
    border: 1px solid;
  }
  .btn2 {
    color: rgb(0 0 0 / 85%);
    margin-right: 30px;
    background: white;
    border: 1px solid;
  }
  .btn3 {
    color: rgb(0 0 0 / 85%);
    margin-right: 30px;
    background: white;
    border: 1px solid;
  }
  .btn4{
    color: rgb(0 0 0 / 85%);
    margin-right: 30px;
    background: white;
    border: 1px solid;
  }


```