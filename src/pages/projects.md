---
title: 项目
description: Blitz 的开源项目与工程实践，包括 OpenClaw AI Agent 框架、SPC-CTX 上下文引擎、CDA 理论研究，以及历史项目合集。
customSlug: projects
layout: ../layouts/Page.astro
---

## 核心项目

### OpenClaw
> **一句话定义**：一个支持多 Agent 协同、ACPX 路由与上下文生命周期管理的 AI Agent 运行框架。

OpenClaw 是 Blitz 正在构建的 AI Agent 运行框架。它不仅是代码集合，更是一套将 **AI Autonomy Evolving** 理念落地的工程基础设施。

**关键能力**：
- **多 Agent 协同**：通过 ACPX（Agent Communication Protocol eXtended）路由，在主会话、子 Agent、外部工具之间分配任务
- **上下文生命周期管理**：原生集成 SPC-CTX，支持 assemble / ingest / afterTurn / compact / bootstrap 五阶段治理
- **工具编排**：动态工具发现、调用、结果回传与错误恢复
- **会话持久化**：基于 SQLite 的 messageStore 与 SPC tokens 数据库

**项目信息**：
- **GitHub**: [whtoo](https://github.com/whtoo)（即将开源）
- **技术栈**: TypeScript, Node.js, SQLite
- **关联研究**: CDA 范式、SPC-CTX 引擎设计

---

### SPC-CTX
> **一句话定义**：一个通过 Phase 感知和语义压缩图（SCG）让 AI Agent 实现「主动对焦」式上下文管理的引擎。

SPC-CTX（Self-Paced Context Engine）是 OpenClaw 内置的上下文管理引擎，也是 **CDA（上下文密度对齐）** 范式的首个完整工程实现。

#### 它解决了什么问题？

现有 AI Agent 的上下文管理通常依赖两种思路：
1. **扩大窗口** — 给 LLM 更多 token，但方向错误的上下文越多，决策越差
2. **向量检索** — 返回语义相似的文档，但检索方向 ≠ LLM 的注意力方向

**SPC-CTX 的解法**：不做「更大」或「更全」，做**更对齐**。通过量化当前任务意图与上下文条目的相关度，动态决定保留、压缩或丢弃。

#### 核心机制

| 机制 | 功能 | 工程效果 |
|------|------|---------|
| **Phase 感知** | 根据 Agent 当前语义状态（assemble / ingest / afterTurn / compact / bootstrap）选择不同的上下文组装策略 | 避免「一刀切」的上下文截断 |
| **SCG 语义压缩图** | 用图结构保留核心节点与关键边，替代线性 token 截断 | 90% token 压缩后逻辑关系仍然完整 |
| **QTS 四元量化** | intent_match + phase_match + tool_relevance + causal_proximity | 从「语义相似」升级到「因果相关」 |
| **热经验发现** | 当某个 context 模式重复出现且方差低时，自动提炼为经验原子 | 减少重复计算，提升长期一致性 |

#### 真实运行数据

基于 2026-04-11 至 2026-04-13 的连续运行记录：
- contextUsage 在 61.6% 时触发 AGGRESSIVE compact
- 修复 QTS 在 compact 子集上运行后，assemble 阶段读取条目从 **1287 条降至 90 条**
- 长任务中有效 token 稳定在 **28-40%** 区间

---

### CDA 书稿
> **一句话定义**：一本系统阐述 AI Agent 上下文密度对齐理论框架与工程实践的技术书稿。

《上下文密度对齐》是 Blitz 正在撰写的书稿，目标读者是 AI Agent 开发者、架构师与技术决策者。

**书稿结构**：
- **第一章**：AI Agent 上下文困境与主流解法局限（扩展窗口、RAG、MemGPT 的问题）
- **第二章**：CDA 理论框架 — 密度 vs 信息量、三层内存架构、Phase 语义切片、QTS 量化理论、SCG 结构保留
- **第三章**：真实运行数据、v0.16.0 关键修复的工程价值、市场共鸣与反例边界
- **第四章**：SPC-CTX 的完整工程实现路径

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

2024-至今    AI Autonomy Evolving
    ├── OpenClaw 框架
    ├── SPC-CTX 引擎
    └── CDA 范式与书稿
```

---

> 如果你对 OpenClaw、SPC-CTX、CDA 范式，或 AI Agent 的自主系统架构感兴趣，欢迎通过 [GitHub](https://github.com/whtoo) 联系交流。
