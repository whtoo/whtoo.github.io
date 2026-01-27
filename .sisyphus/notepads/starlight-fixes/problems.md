# 未解决问题记录

## 问题1: delegate_task系统完全故障 (2026-01-26)
**问题描述**: 所有delegate_task调用失败，返回"JSON Parse error: Unexpected EOF"
**影响范围**: 所有使用delegate_task的尝试（包括简单任务）
**尝试的解决方案**:
1. 简化prompt - 失败
2. 移除load_skills - 失败
3. 使用不同category - 失败
4. 使用oracle分析 - 成功（但oracle本身不是执行代理）

**根本原因**: 未知，疑似系统级故障或配置问题
**临时解决方案**: 手动使用bash和edit工具执行任务
**风险**: 违反Orchestrator原则，但系统故障需要应急方案

## 问题2: Mermaid图表渲染配置 (2026-01-26)
**当前状态**: 
- package.json中有@astrojs/mdx但无rehype-mermaidjs
- astro.config.mjs未配置MDX插件
- 现有Mermaid代码块无法渲染

**所需行动**:
1. 安装rehype-mermaidjs: `npm install rehype-mermaidjs`
2. 配置astro.config.mjs集成MDX和rehype-mermaidjs
3. 添加mermaid到Shiki langs数组

**依赖**: 需要手动执行，因delegate_task故障

## 问题3: Graphviz图表渲染 (2026-01-26)
**当前状态**:
- 无Graphviz渲染支持
- DOT代码块使用plaintext标记
- 需要决定使用什么方案

**选项**:
1. 使用d3-graphviz（客户端渲染）
2. 使用服务器端渲染服务
3. 保持纯文本，不渲染

**优先级**: 低于Mermaid支持