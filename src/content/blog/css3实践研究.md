---
title: "CSS3实践研究笔记"
pubDate: 2021-04-23 11:45:33
tags:
- CSS
- Frontend
- Web Development
description: "CSS3实践研究笔记"
---


# 前言
以下所有内容来自我对`<<CSS世界>>`的摘录和总结，感谢原作者辛苦著书。

# 1. 拥抱流布局

1. 布局(layout)
    1. 响应式与媒体查询
    2. flexible box layout
    3. grid layout
2. 视觉表现
    1. corner、shadow、progressive
    2. transform
    3. fitler
    4. animatation

## 2. 术语
```css
.track-item {
    width: 480px;
    height : 640px;
    color : 'red';
}
```

1. 属性
`height`和`color`就是属性。


2. 值

| 类型 | 说明|
| -   |   - |
| int | 属于number|
| number | 浮点数 |
| percent | 50% |
| length | 99px |
| color  | #999 |

3. 关键字
`transparent`

4. 变量
`currentColor`

5. 长度单位

`<number> + 长度单位 = <length>`

6. 功能符
`rgba(0,0,0,5)`
`url('css-world.png')`

7. 属性值
`1px solid rgb(0,0,0)` <- `值+关键字+功能符`

8. 声明
`color : transparent`

9. 声明块
```css
{
    width : 10%,
    color : 'red'
}
```

10. 规则或规则集
```css
.track-item {
    width: 480px;
    height : 640px;
    color : 'red';
}
```

11. 选择器

| 选择器 | 符号 | 优先级 |
| - | - | - |
| 类选择器 | '.' | 默认 |
| ID选择器 | '#' | 高  |
| 属性选择器 | '[]' |  |
| 伪类选择器 | ':' |  |
| 伪元素选择器 | '::before' | |

## 3. 布局--从block开始

### 3.1 block-level element

| 元素 | display |
| - | - |
| `<div>` | block |
| `<li>` | list-item |
| `<table>` | block |

一个水平流上只能单独显示一个元素，多个块级元素则换行显示。
正是由于`块级元素`具有换行特性，因此理论上它都可以配合clear属性
来清除浮动带来的影响。

### 简化layout解释
a. 不考虑list-item的情况下
| 盒子 | 职责 |
| - | - |
| `block-level box` | 结构 |
| `inline box` | 内容 |

b. 考虑list-item当前情况下

| 盒子 | 职责 |
| - | - |
| `block-level box` | 主块级盒子 |
| `inline box` | 内容 |
| `list-item` | 附加盒子 |

c. inline-block加入战场

| 盒子 | 职责 |
| - | - |
| `block-level box` | 主块级盒子 |
| `inline box` | 内容 |
| `list-item` | 附加盒子 |
| `inline-block` | 容器盒子 |

d. 可视化盒模型
