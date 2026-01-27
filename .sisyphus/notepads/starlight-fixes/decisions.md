# 架构决策记录 - Starlight修复

## 决策1: 修复语法高亮问题的方法 (2026-01-26)
**问题**: delegate_task调用失败，如何修复代码语法高亮大小写问题？
**选项**:
1. 继续尝试delegate_task，调整参数
2. 手动使用sed命令批量替换
3. 使用ast_grep_replace工具

**决策**: 选择手动sed命令批量替换
**理由**:
- delegate_task出现JSON解析错误，系统可能有限制
- sed命令简单直接，可以快速修复问题
- 可以在bash中执行，便于验证
- 适用于简单的文本替换任务

## 决策2: 处理重复blog内容的策略 (2026-01-26)
**问题**: 如何安全删除重复的blog内容？
**选项**:
1. 直接删除blog目录中的所有重复文件
2. 先备份再删除
3. 保留blog目录，但修改页面使用docs集合

**决策**: 先备份再删除重复文件，保留from-0-to-1-graphviz.md
**理由**:
- 用户明确要求删除重复的blog内容
- 备份提供安全网，可以回滚
- from-0-to-1-graphviz.md只在blog中存在，需要保留或迁移
- 后续可能需要处理依赖blog集合的页面

## 决策3: 图表渲染支持配置 (2026-01-26)
**问题**: 如何配置Mermaid和Graphviz支持？
**选项**:
1. 安装@astrojs/mdx + rehype-mermaidjs
2. 使用自定义组件渲染图表
3. 使用客户端JavaScript渲染

**决策**: 先安装@astrojs/mdx + rehype-mermaidjs，Graphviz稍后处理
**理由**:
- 根据决策记录，已有决策使用rehype-mermaidjs
- Mermaid支持更为迫切（现有文档中有Mermaid代码块）
- Graphviz可以后续添加，优先级较低
- 保持与Astro生态系统兼容