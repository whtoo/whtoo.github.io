---
title: 项目
description: Blitz 的开源项目与工程实践。主战场是 Autonomy Agent Continuous Context，SPC-CTX 与 OpenClaw SPC plugin 是附属实现。
customSlug: projects
layout: ../layouts/Page.astro
---

## 主战场与附属实现

### Autonomy Agent Continuous Context
> **一句话定义**：Blitz 当前的核心问题域 —— 如何让 AI Agent 在无限延伸的任务流中，持续保持对自身状态、目标方向和历史决策的有效感知。

这不是一个具体产品，而是一个贯穿理论、引擎与插件的完整问题域。它决定了所有工程实现的方向和评价标准。

解决这个问题需要同时触及三个层面：
1. **理论层** — **CDA（上下文方向对齐）**：定义正确方向上的上下文，量化上下文与任务意图的对齐程度
2. **引擎层** — **SPC-CTX**：动态组装、压缩、筛选上下文的运行时引擎
3. **插件层** — **OpenClaw SPC plugin**：将引擎嵌入 OpenClaw Agent 工作流的适配与扩展机制

**SPC-CTX** 与 **OpenClaw SPC plugin** 都是主战场的附属实现，不是主战场本身。

---

## 附属实现

### SPC-CTX（Self-Paced Context Engine）
> **一句话定义**：一个服务于 Autonomy Agent Continuous Context 的 Phase 感知语义上下文引擎。

SPC-CTX 是 CDA 范式的首个完整工程实现。它不做「更大」或「更全」的上下文，而是做**更对齐**的上下文 —— 通过量化当前任务意图与上下文条目的相关度，动态决定保留、压缩或丢弃。

#### 核心机制

| 机制 | 功能 | 工程效果 |
|------|------|---------|
| **Phase 感知** | 根据 Agent 语义状态（assemble / ingest / afterTurn / compact / bootstrap）切换上下文组装策略 | 避免「一刀切」的上下文截断 |
| **SCG 语义压缩图** | 用图结构保留核心节点与关键边，渐进最优逻辑关联保持 | 高比例 token 压缩后，因果关系仍然可控 |
| **QTS 四元量化** | intent_match + phase_match + tool_relevance + causal_proximity | 从「语义相似」升级到「因果相关」 |
| **热经验发现** | 当某个 context 模式重复出现且方差低时，自动提炼为经验原子 | 减少重复计算，提升长期一致性 |

#### 真实运行数据

基于 2026-04-11 至 2026-04-13 的连续运行记录：
- contextUsage 在 61.6% 时触发 AGGRESSIVE compact
- 修复 QTS 在 compact 子集上运行后，assemble 阶段读取条目从 **1287 条降至 90 条**
- 长任务中有效 token 稳定在 **28-40%** 区间

---

### OpenClaw SPC plugin
> **一句话定义**：将 SPC-CTX 接入 OpenClaw 运行框架的插件实现。

OpenClaw SPC plugin 是主战场在 OpenClaw 生态中的具体落地形态。它负责：
- 在 OpenClaw 的 Agent 会话生命周期中挂载 SPC-CTX 的 5 个 Phase
- 提供 messageStore 到 SPC tokens 数据库的桥接
- 支持热经验发现与上下文对齐评估的回调机制
- 通过 ACPX 路由，在主会话、子 Agent、外部工具之间分配上下文相关任务

**项目信息**：
- **GitHub**: [whtoo](https://github.com/whtoo)（即将开源）
- **技术栈**: TypeScript, Node.js, SQLite
- **关联研究**: CDA 范式、SPC-CTX 引擎设计

---

### CDA 书稿
> **一句话定义**：一本系统阐述 AI Agent 上下文方向对齐理论框架与工程实践的技术书稿。

《上下文方向对齐》是 Blitz 正在撰写的书稿，目标读者是 AI Agent 开发者、架构师与技术决策者。

**书稿结构**：
- **第一章**：AI Agent 上下文困境与主流解法局限（扩展窗口、RAG、MemGPT 的问题）
- **第二章**：CDA 理论框架 — 方向 vs 信息量、三层内存架构、Phase 语义切片、QTS 量化理论、SCG 结构保留
- **第三章**：真实运行数据、v0.16.0 关键修复的工程价值、市场共鸣与反例边界
- **第四章**：SPC-CTX 与 OpenClaw SPC plugin 的完整工程实现路径

**状态**: 撰写中

---

## 历史项目

### JSTankGame
> 基于 FRP 的坦克大战游戏

使用 JavaScript 和函数式响应式编程（FRP）思想实现的坦克大战游戏，用于验证 FRP 概念在交互式应用中的落地。

- **GitHub**: [whtoo/JSTankGame](https://github.com/whtoo/JSTankGame)
- **技术栈**: JavaScript, FRP

---

### 解释器实现系列

使用 Racket 语言从零实现的解释器系列代码，涵盖：
- substitution 模型
- 环境模型
- 闭包与可变量
- 解释器完整执行链路

- **技术栈**: Racket
- **主题**: 解释器构造、环境模型、闭包、可变状态

---

## 项目时间线与演进

```
2019-2023    底层系统训练
    ├── 汇编语言研究
    ├── Racket 解释器实现
    └── FRP 理论与实践

2023-2024    结构显式化训练
    ├── Graphviz / DOT 可视化
    └── 编译器前端与算法研究

2024-至今    Autonomy Agent Continuous Context
    ├── CDA 理论框架
    ├── SPC-CTX 引擎（附属实现）
    └── OpenClaw SPC plugin（附属实现）
```

---

> 如果你对 Autonomy Agent Continuous Context、SPC-CTX、OpenClaw SPC plugin，或 CDA 范式感兴趣，欢迎通过 [GitHub](https://github.com/whtoo) 或 [X](https://x.com/wilsonblitz) 联系交流。
