---
title: 0x07.闭包与可变量 - 实现一个解释器 in Racket
pubDate: 2021-04-22 14:30:15
tags:
- Interpreter
- Racket
- Closure
- Mutable
series: 解释器实现系列
seriesOrder: 2
description: 本文记录实现闭包和可变量支持的过程，包括函数闭包和变量赋值功能。
---

## 前言
继续解释器实现系列，本文将添加对闭包和可变量的支持。

## 目标
- [x] 实现闭包（Closure）
- [x] 支持可变量赋值
- [x] 处理变量作用域

## 核心实现

### 1. 闭包数据结构
```racket
(define-type Closure
  [closure (params : (listof symbol)) 
           (body : ExprC) 
           (env : Env)])
```

### 2. 变量赋值
```racket
(define-type ExprC
  [numC (n : number)]
  [idC (s : symbol)]
  [appC (fun : ExprC) (args : (listof ExprC))]
  [plusC (l : ExprC) (r : ExprC)]
  [multC (l : ExprC) (r : ExprC)]
  [lamC (params : (listof symbol)) (body : ExprC)]
  [setC (var : symbol) (val : ExprC)] ; 新增赋值表达式
  [seqC (es : (listof ExprC))])      ; 新增序列表达式
```

### 3. 环境扩展
```racket
(define-type Binding
  [bind (name : symbol) (val : (boxof number))]) ; 使用box包装值
```

## 测试用例
```racket
;; 测试闭包
(test (interp (appC (lamC '(x) (plusC (idC 'x) (numC 1))) (list (numC 5)))
              (list (bind 'y (box 10))))
      => 6)

;; 测试变量赋值
(test (interp (seqC (list (setC 'x (numC 5)) (idC 'x)))
              (list (bind 'x (box 0))))
      => 5)
```

## 总结
通过引入闭包和可变量，我们的解释器现在支持更复杂的编程模式，包括函数式编程和命令式编程特性。