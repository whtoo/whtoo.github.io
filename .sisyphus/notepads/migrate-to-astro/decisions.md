# 架构决策记录

## 决策1: 迁移策略 (2026-01-26)
**问题**: 如何从Hexo迁移到Astro？
**选项**:
1. 完全从头开始重建
2. 使用转换脚本迁移内容
3. 分阶段渐进迁移

**决策**: 选择分阶段渐进迁移
**理由**:
- 降低风险，允许回滚
- 可以并行测试新旧系统
- 能够及时发现问题
- 符合复杂系统迁移的最佳实践

## 决策2: 目录结构映射 (2026-01-26)
**问题**: Hexo目录如何映射到Astro目录？
**决策**:
```
Hexo                    -> Astro
-----------------------|-----------------------
source/_posts/*.md     -> src/content/blog/*.md
source/about/index.md  -> src/pages/about.astro
source/projects/*.md   -> src/pages/projects/*.astro
source/tags/index.md   -> src/pages/tags.astro (动态生成)
source/categories/*.md -> src/pages/categories/*.astro (动态生成)
scaffolds/             -> templates/ (可选)
themes/next/           -> src/components/ + src/styles/
```

**理由**:
- 符合Astro的最佳实践
- 利用内容集合管理博客文章
- 保持URL结构相似性
- 便于维护和扩展

## 决策3: Front Matter转换 (2026-01-26)
**问题**: Hexo的Front Matter如何转换为Astro格式？
**决策**:
- `date` -> `pubDate` (转换为ISO格式)
- 保持所有自定义字段: title, tags, categories, series, order
- 添加`draft: false`字段
- 空tags数组保持为空数组

**转换规则**:
```yaml
# Hexo
---
title: 文章标题
date: 2023-09-27 20:29:45
tags:
---

# Astro  
---
title: 文章标题
pubDate: 2023-09-27T20:29:45
tags: []
draft: false
---
```

**理由**:
- Astro推荐使用pubDate字段
- 保持向后兼容
- 明确文章状态

## 决策4: 主题迁移策略 (2026-01-26)
**问题**: NexT主题功能如何迁移？
**决策**: 不直接迁移NexT主题，而是选择现有Astro博客模板并自定义

**选择模板**: SHBlog Next (支持中文的轻量级博客模板)
**理由**:
- 避免从头开始重建的复杂性
- 利用社区验证的代码
- 专注于内容迁移而非UI重建
- 更容易维护和更新

## 决策5: 搜索功能实现 (2026-01-26)
**问题**: 如何实现Hexo的本地搜索功能？
**决策**: 使用Astro的内置搜索功能或集成Pagefind

**方案选择**: 先使用简单标签过滤，后续集成Pagefind
**理由**:
- 初始阶段保持简单
- Pagefind提供更好的搜索体验
- 可以渐进增强

## 决策6: 图表支持 (2026-01-26)
**问题**: 如何支持Mermaid/Graphviz图表？
**决策**: 使用`@astrojs/mdx` + `rehype-mermaid`插件

**理由**:
- 官方推荐的MDX集成方案
- 社区支持良好
- 与Astro生态系统兼容

## 决策7: 部署策略 (2026-01-26)
**问题**: 如何部署到GitHub Pages？
**决策**: 使用官方`withastro/action` GitHub Action

**理由**:
- 官方维护，可靠性高
- 配置简单
- 与Astro版本保持同步

## 决策8: 国际化策略 (2026-01-26)
**问题**: 如何支持中文(zh-CN)？
**决策**: 配置Astro内置i18n，设置zh-CN为默认语言

**配置**:
```javascript
// astro.config.mjs
i18n: {
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
}
```

**理由**:
- 原生支持，无需第三方插件
- 符合现代Web标准
- 易于维护和扩展