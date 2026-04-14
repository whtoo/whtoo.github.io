---
title: 关于
description: Blitz 是谁？他的主战场是 Autonomy Agent Continuous Context。他是 OpenClaw 框架与 SPC-CTX 上下文引擎的作者，CDA（上下文密度对齐）范式的提出者。
customSlug: about
layout: ../layouts/Page.astro
---

> **一句话介绍**：**Blitz**（Arthur / Wilson）是一位从编译器与编程语言底层走向 AI Agent 自主系统的工程师。他是 **OpenClaw** AI Agent 框架和 **SPC-CTX** 上下文引擎的作者，也是 **CDA（上下文密度对齐）** 范式的提出者。

---

## 谁是 Blitz？

**Blitz** 是一位 All In **AI Autonomy Evolving** 的工程师与研究者。他的主战场是 **Autonomy Agent Continuous Context**。

他的技术轨迹经历了三层跃迁：
1. **底层系统训练** — 从汇编、解释器、FRP 的硬核实现中，学会「精确控制计算过程」
2. **结构显式化训练** — 从编译器前端、Graphviz 可视化中，学会「把复杂结构显式化」
3. **AI Agent 自主系统** — 将底层能力注入到 Agent 的自主运行、上下文治理与长期记忆管理中

> **自我定位**：**Combinator-Executor**（高效组合执行器）⚡️🐎🤖  
> **核心理念**：不追求「我有 100 个工具」，追求「100 种场景我都知道该用什么」。精准匹配 > 大而全。

---

## 什么是 AI Autonomy Evolving？

**AI Autonomy Evolving** 是 Blitz 的核心研究方向。它关注的是：

> **下一代 AI 的差异化不在模型本身，而在如何让 Agent 在长程任务中保持方向感、记忆力和自主演化能力。**

具体来说，这包含三个子问题：
- **方向感**：Agent 在 50+ 轮对话后，仍然知道自己「在哪里」和「要去哪里」
- **记忆力**：Agent 不是「记住更多」，而是「在正确的时间记住正确的事」
- **自主演化**：Agent 的运行框架能够根据任务反馈自我调整策略和结构

---

## 什么是 SPC-CTX？

**SPC-CTX**（Self-Paced Context Engine）是 Blitz 设计并实现的 AI Agent 上下文管理引擎，已集成到 OpenClaw 框架中。

### 核心定义

SPC-CTX 是一个 **Phase 感知的语义上下文引擎**，它通过上下文密度对齐（CDA）范式，将 Agent 的上下文管理从「被动截断」转向「主动对焦」。

### 关键特性

| 特性 | 说明 | 效果 |
|------|------|------|
| **5 生命周期阶段** | assemble / ingest / afterTurn / compact / bootstrap | 上下文管理不再是「一刀切」，而是按语义状态转移动态调整 |
| **SCG 语义压缩图** | 保留逻辑拓扑结构，而非简单截断 token 序列 | 即使 90% token 被压缩，因果关系仍然保留 |
| **QTS 四元量化评分** | intent_match + phase_match + tool_relevance + causal_proximity | 用语义相关度取代单纯的向量 cosine 相似度 |
| **真实运行数据** | 长任务（4 天+）连续运行记录 | token 占用稳定在 **28-40%** 区间，避免临界阈值崩溃 |

### 一句话总结

**SPC-CTX 解决的是 AI Agent 的「失忆」问题 —— 不是通过扩大窗口，而是通过让上下文始终指向正确的方向。**

---

## 什么是 CDA（上下文密度对齐）？

**CDA**（Context Density Alignment，上下文密度对齐）是 Blitz 提出的一个理论范式，用于指导 AI Agent 的上下文管理设计。

### 核心主张

> **从「如何放更多信息」到「如何让 LLM 在正确方向上获得足够密度」。**

### 三个关键洞察

1. **容量 ≠ 方向**  
   给 LLM 更大上下文窗口，不等于它更能完成任务。方向错误的上下文越多，决策质量反而越低。

2. **聚焦的错误胜过正确的散焦**  
   在正确方向上的误差是可接受的；但如果在多个方向上都不够聚焦，LLM 的注意力将无法触发有效推理。

3. **密度比信息量更重要**  
   上下文的性能瓶颈不是「有多少信息」，而是「在关键方向上信息是否足够密集」。

---

## 工作方法论

Blitz 的工程师身份不仅体现在代码上，也体现在一套强制性的工作方法中：

### LLM-DFS 强制思维框架

所有分析、研究、编码、调试任务必须遵循：

```
任务接收 → 初始化 scratchpad → confirm / deny / deepen 循环 → final_verdict
```

每个推理节点必须包含 `facts`（事实来源）、`conclusion_type`（确认/否认/深入）、`exclusion`（排除原因）和 `cost_add`（认知成本）。

### 三分法评估

任何方案进入决策前，先判定：
- **✅ 符合** — 可直接使用，与目标接口匹配
- **⚠️ 不确定** — 有基础但缺关键部分，需评估改造代价
- **❌ 不行** — 根本性不匹配，仅作辅助或丢弃

### Agent 路由原则

| 任务类型 | 工具 | 说明 |
|---------|------|------|
| 深度研究 | Kimi via ACPX | 技术选型、趋势分析、竞品对比 |
| 代码开发 | OpenCode via ACPX | 编程、调试、重构、测试、Git |
| 综合决策 | 主会话 | 收敛共识、仲裁差异、生成最终方案 |

---

## 从编译手艺人到 AI 自主演化

这个博客曾经叫「编译手艺人」，记录的是编程语言原理、编译器实现、解释器构造的过程。

那些文章已被归档 —— 不是否定过去，而是**完成了一次技术焦点的跃迁**。

底层技术的训练留下了两个不可磨灭的思维印记：
1. **对「结构」的敏感** — 知道如何把模糊问题显式化为可执行的结构
2. **对「边界」的敬畏** — 知道任何优雅理论都必须经过工程反例的捶打

这两样东西，正是 AI Autonomy 领域最需要的。

> **品牌口号**：术之尽头，源自我心

---

## 常见问题（FAQ）

### Blitz 目前在做什么？

主战场是 **Autonomy Agent Continuous Context**，通过 **OpenClaw** 框架与 **SPC-CTX** 引擎的工程落地，以及 **CDA 书稿** 的理论梳理，系统推进上下文密度对齐的研究与实践。

### SPC-CTX 与 MemGPT / LangChain Memory 有什么区别？

MemGPT 使用分层记忆（core / main / archival）来实现无限上下文，但 token 开销巨大，且缺乏 Phase 感知。LangChain Memory 是通用框架，缺乏语义深度和方向性压缩能力。**SPC-CTX 的核心差异在于「方向性」** —— 它不是压缩更多信息，而是确保上下文始终与当前任务意图对齐。

### 什么是 Combinator-Executor？

这是 Blitz 的自我定位。"Combinator" 强调组合与结构，"Executor" 强调执行与落地。合起来的意思是：**在复杂场景中找到最精准的工具组合，并高效执行到底**。

### 如何联系 Blitz？

- **GitHub**: [whtoo](https://github.com/whtoo)
- **博客源码**: [whtoo.github.io](https://github.com/whtoo/whtoo.github.io)

如果你也在研究 AI Agent 的自主能力、上下文压缩、或者从底层系统视角审视 LLM 应用架构，欢迎交流。

---

## 致谢

感谢阅读到这里。
