---
title: 0x06.如何实现一个解释器 in Racket
pubDate: 2021-04-21 09:55:28
tags:
- Interpreter
- Racket
series: 解释器实现系列
seriesOrder: 1
description: 本文是`6. From Substitution to Environments`的实验记录，实现了环境的定义和查找功能。
---

## 前言
本文是`6. From Substitution to Environments`的实验记录。

## 计划
- [x] Define a environment
- [x] Implement lookup in environment

## codes
1. Define a environment as list.
```racket
(define-type Binding
  [bind (name : symbol) (val : number)])
(define-type-alias Env (listof Binding))
```

2. Implement lookup in environment
```racket
; DONE : Define lookup
(define (lookup [for : symbol] [env : Env]) : number
  (cond
    [(empty? env) (error 'lookup "name not found")]
    [(equal? for (bind-name (first env))) (bind-val (first env))]
    [else (lookup for (rest env))]))
```

3. Test cases
```racket
(test (lookup 'a (list (bind 'a 5))) => 5)
(test (lookup 'b (list (bind 'a 5) (bind 'b 6))) => 6)
(test (lookup 'a (list (bind 'a 5) (bind 'b 6))) => 5)
```

## 总结
通过实现环境的定义和查找功能，我们为解释器添加了状态管理的能力。环境作为绑定的列表，允许我们在运行时存储和检索变量值。