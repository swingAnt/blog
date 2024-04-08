当我们想到滚动驱动的动画时，我们通常指以下两件事之一：

*   **当用户滚动时**发生的动画，动画的进度显式链接到滚动进度。例如，长文章的进度条。
*   当元素进入、退出或穿过可见区域（通常是视口）时在元素上发生的动画，但它可能是另一个可滚动容器的可见部分（这被定义为滚动端口[）](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container)。
滚动[驱动动画规范](https://www.w3.org/TR/scroll-animations-1/)涵盖了这两种类型的动画。在本文中，我们将首先了解[滚动进度时间轴](https://www.w3.org/TR/scroll-animations-1/#scroll-timelines)，顾名思义，它将动画链接到滚动进度。

**注意：**在撰写本文时，本文中的功能浏览器支持有限。最好使用[Chrome Canary](https://www.google.com/chrome/canary/)，但您也可以在 Chrome 115 或更高版本中[启用实验性功能](https://support.google.com/chrome/answer/10612145?hl=en)，以便按照示例进行操作，并自行尝试滚动链接动画

## 使用动画时间轴
在此示例中，我们将实现一个常见功能：当用户滚动网页时，将简单的进度条动画化以从左向右缩放。因为我们想要将动画链接到根滚动条的进度，所以我们可以使用匿名滚动进度时间轴。

首先让我们定义动画本身。我们希望进度条从左向右缩放，因此我们将使用

首先让我们定义动画本身。我们希望进度条从左向右缩放，因此我们将使用[transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform):
```css
@keyframes scaleProgress {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
```
为了将进度条元素的动画与滚动进度相关联，我们使用了该[`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)属性并将[`scroll()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll)函数设置为其值。



```css
.progress {
  animation-timeline: scroll();
}
```
该`scroll()`函数允许我们指定滚动容器和轴。默认值为`scroll(nearest block)`，这意味着动画将链接到块轴上最近的可滚动祖先。这对于我们的目的来说已经足够了，尽管我们可以选择将根指定为滚动容器，因为我们希望将动画显式链接到视口滚动的进度。

```css
.progress {
  animation-timeline: scroll(root block);
}
```
我们可以同时应用多个滚动时间轴动画，例如更改进度条的颜色。
```css
@keyframes colorChange {
  0% {
    background-color: red;
  }
  50% {
    background-color: yellow;
  }
  100% {
    background-color: lime;
  }
}
```
最后，我们需要将动画添加到进度条元素，并将关键帧动画作为[`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name). 我们需要将动画持续时间设置为`auto`，因为持续时间将由滚动进度决定。我们还设置了缓动 ( [`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function))，`linear`以便它能够与滚动顺利进行。如果我们使用默认值 ( `ease`)，动画将缓慢开始，然后快速加速，然后在最后减速 - 这并不是我们想要的进度指示器！
```css
.progress {
  animation-timeline: scroll(root);
  animation-name: scaleProgress,colorChange;
  animation-duration: auto;
  animation-timing-function: linear;
}
```
我们可以使用简写属性来压缩它`animation`：
```css
.progress {
  animation: scaleProgress auto linear, colorChange auto linear;
  animation-timeline: scroll(root);
}
```
**注：**  `animation-timeline`目前不包含在简写中。但是，该`animation`属性重置`animation-timeline`为`auto`（默认值），因此我们需要在简写`animation-timeline` **之后**`animation`声明。
[效果演示](https://code.juejin.cn/pen/7311280777919430668)

## 缓动函数
尽管我们在前面的示例中特意选择了线性缓动，但我们也可以通过`steps()`缓动实现一些有趣的效果。此示例显示了一种不同类型的进度条，它采用离散步骤而不是平滑的线性缩放。我们在进度条元素上为颜色段设置线性渐变背景，然后对剪辑路径进行动画处理以依次显示每个颜色段：
```css
.progress {
  background: linear-gradient(
    to right,
    red 20%,
    orange 0,
    orange 40%,
    yellow 0,
    yellow 60%,
    lime 0,
    lime 80%,
    green 0
  );
  animation: clip auto steps(5) forwards;
  animation-timeline: scroll(root);
}

@keyframes clip {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
```
[效果演示](https://code.juejin.cn/pen/7311285708102467619)
## 重复和翻转动画
[`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)滚动进度动画可以与现有的和属性结合使用[`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)。因此，我们可以使动画在整个滚动时间轴中重复多次，或者反向播放。当我们滚动时，“球”会弹跳几次。

```css
.progress {
  animation: bounce auto linear 6 alternate;
  animation-timeline: scroll(root);
}

@keyframes bounce {
  100% {
    transform: translateY(-50vh);
  }
}

```
[效果演示](https://code.juejin.cn/pen/7311522773812117554)

## 吸顶效果
[效果演示](https://code.juejin.cn/pen/7312736296496496691)
## 定位非祖先滚动容器

![scroll-timeline-01.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e0bb6930df54a4ea6549f93c0ac3eeb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1200&h=630&s=110047&e=png&b=f1fbff)

有时，我们可能想要为不是**滚动**容器后代的元素设置动画，但仍将该元素的动画链接到滚动容器的进度。为此，我们需要创建一个**命名的滚动进度时间轴**。我们将使用（[`scroll-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline)简写）在滚动容器上声明时间轴的名称和轴。同样，块轴是默认值。时间线名称必须以两个破折号作为前缀（类似于自定义属性），这可确保它不会与其他属性值冲突。`scroll-timeline-name``scroll-timeline-axis`
CSS[属性](https://developer.mozilla.org/en-US/docs/Web/CSS)修改指定动画时间轴的范围。**`timeline-scope`**[](https://developer.mozilla.org/en-US/docs/Web/CSS)

默认情况下，命名时间线（即使用[`scroll-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-timeline-name)或声明[`view-timeline-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-timeline-name)）只能设置为直接后代元素的控制时间线（即通过将[`animation-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)时间线名称作为其值进行设置）。这是时间线的默认“范围”。

`timeline-scope`被赋予在后代元素上定义的时间线的名称；这会导致时间线的范围增加到所`timeline-scope`设置的元素及其任何后代。换句话说，现在可以使用该时间线控制该元素及其任何后代元素。
```css
.scroller {
  position: relative;
  max-width: 300px;
  max-height: 300px;
  overflow: scroll;
  border: 1px solid;
  padding: 1rem;
  scroll-timeline: --scale-progress;
}
```

```css
/* Sibling of .scroller */
.progress {
 width: 5px;
  /* background: rgb(0, 255, 128); */
  height: 100%;
  transform-origin: 0 100%;
  animation: scaleProgress auto steps(5) forwards;
   animation-timeline: --scale-progress;
   background: linear-gradient(
    to top,
    red 20%,
    orange 0,
    orange 40%,
    yellow 0,
    yellow 60%,
    lime 0,
    lime 80%,
    green 0
  );
}



@keyframes scaleProgress {
 0% {
    clip-path: inset(100% 0 0 0); /* 从底部开始，不显示任何内容 */
  }
  100% {
    clip-path: inset(0 0 0 0); /* 最终显示全部内容 */
  }
}

```
[效果演示](https://code.juejin.cn/pen/7311976418684960777)

## 探索创意示例
到目前为止，我们已经创建了一些相当基本的进度条动画 - 也许是滚动进度时间线更明显的用例之一。但没有什么可以阻止我们用滚动动画发挥创意。
### 
### 水平图像滚动条
当用户垂直滚动时对元素进行水平动画可以使网页感觉更加动态且更少线性。在这里，我们对一行图像进行动画处理，以便当用户垂直滚动时它们从左侧滑入。
[效果演示](https://code.juejin.cn/pen/7312376624475963427)
### 运动轨迹
我们可以沿着 CSS 中的路径定位元素并为其设置动画，用于[`offset-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)定义元素要遵循的运动路径。这是比矩形进度条更有趣的指示进度的方式！
[效果演示](https://code.juejin.cn/pen/7312382113557577764)

## 组合多个动画
在此演示中，我们在滚动时对多个元素进行动画处理：显示文本，同时框从左向右滑动和翻筋斗。为了简化代码并避免创建多个关键帧，我们对自定义属性进行动画处理并`translateY`使用[三角函数](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#trigonometric_functions)计算值，所有主要浏览器的最新版本都支持三角函数。与转换属性不同，自定义属性在主线程上进行动画处理，这意味着如果您想对大量自定义属性进行动画处理，您的网站可能会遇到性能不佳的问题。
[效果演示](https://code.juejin.cn/pen/7312384298164682761)


## 感谢
[Scroll progress animations in CSS | MDN Blog](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fblog%2Fscroll-progress-animations-in-css%2F "https://developer.mozilla.org/en-US/blog/scroll-progress-animations-in-css/")

[scroll() - CSS: Cascading Style Sheets | MDN](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Fanimation-timeline%2Fscroll "https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/scroll")

https://developer.chrome.com/docs/css-ui/scroll-driven-animations?hl=zh-cn#creating_an_anonymous_scroll_progress_timeline_in_css
