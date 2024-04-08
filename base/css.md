**一、CSS简介**

CSS（Cascading Style Sheets），即层叠样式表，是一种用来为结构化文档（如HTML文档或XML应用）添加样式（字体、间距和颜色等）的计算机语言。CSS描述了如何在屏幕、纸质、音频等媒介中渲染元素。

**二、CSS基础语法与代码示例**

CSS规则由两部分组成：选择器和一条或多条声明。

**示例：**
```css
/* 选择器 { 属性: 值; } */
p {
  color: red;
  font-size: 16px;
}
```
上述代码将页面中所有`<p>`标签的文本颜色设置为红色，字体大小设置为16像素。

**三、选择器类型与代码示例**

1. **元素选择器**
```css
h1 {
  color: blue;
}
```
所有`<h1>`标签的文本颜色将变为蓝色。

1. **类选择器**
```css
.myClass {
  background-color: yellow;
}
```
带有`class="myClass"`属性的所有元素的背景色将变为黄色。

1. **ID选择器**
```css
#myID {
  border: 1px solid black;
}
```
ID为`myID`的元素将具有1像素的黑色实线边框。

**四、CSS盒模型与代码示例**

```css
div {
  width: 300px;
  padding: 10px;
  border: 5px solid gray;
  margin: 0 auto; /* 水平居中 */
}
```
此代码定义了一个`div`元素的盒模型属性：宽度、内边距、边框和外边距。

**五、文本与字体样式代码示例**

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #333;
  line-height: 1.6;
}
```
设置整个页面的字体、文本对齐方式、颜色和行高。

**六、背景与边框代码示例**

```css
.box {
  background-image: url('image.jpg');
  background-repeat: no-repeat;
  border: 2px dashed green;
}
```
给`.box`类的元素设置背景图片，并设置边框为2像素的绿色虚线。

**七、布局与定位代码示例**

使用Flexbox进行布局：

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
使容器内的子元素水平等距分布，并垂直居中。

**八、响应式设计代码示例**

```css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```
当屏幕宽度小于或等于600像素时，背景色变为浅蓝色。

**九、CSS3新特性代码示例**

1. **圆角**
```css
.rounded {
  border-radius: 10px;
}
```
2. **阴影**
```css
.shadow {
  box-shadow: 2px 2px 4px gray;
}
```
3. **渐变**
```css
.gradient {
  background: linear-gradient(to right, red, yellow);
}
```

**十、学习资源与实践**

为了深入学习和掌握CSS，建议查阅专业的CSS书籍、在线教程和参考W3Schools等网站。此外，通过实际项目实践，不断尝试和修改样式，是提升CSS技能的有效途径。

CSS作为前端开发的基石之一，具有广泛的应用和深厚的技术底蕴。通过不断学习和实践，你将能够熟练掌握CSS的各种技法和特性，为网页增添美观和动态效果。