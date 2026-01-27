# AGENTS.md

此文件为在此仓库中工作的AI代理提供指导。

## 项目概述

这是一个基于Astro 5.16.15的静态博客项目，主要特性包括：
- MDX支持，用于增强内容创作
- Mermaid图表支持（通过rehype-mermaid进行构建时渲染）
- 中文本地化（zh-CN）
- 内容集合系统，使用Zod进行frontmatter验证
- TypeScript严格模式

## 构建与测试命令

### 主要命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 运行代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix
```

### 单个文件/组件测试

Astro不内置单元测试框架，测试方式：
```bash
# 开发模式：启动服务器后访问对应路由
npm run dev

# 构建模式：检查dist/目录生成的文件
npm run build

# E2E测试（Playwright）
npx playwright test
```

## 代码风格指南

### 导入规范

```typescript
// Astro内容导入
import { getCollection, render, type CollectionEntry } from 'astro:content';
import { Image } from 'astro:assets';

// 本地组件导入（相对路径）
import Header from '../components/Header.astro';

// 全局常量导入
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
```

### 组件结构

```astro
---
// Frontmatter：导入、类型定义、props解构
import ComponentName from './ComponentName.astro';
interface Props {
  prop1: string;
  prop2?: number;
}
const { prop1, prop2 } = Astro.props;
---

<!-- Template：组件模板 -->
<ComponentName prop1={prop1} />
```

### 命名约定

- **组件文件**：PascalCase（如`Header.astro`）
- **页面文件**：kebab-case（如`blog/index.astro`）
- **变量**：camelCase（如`seriesPosts`, `post`）
- **常量**：UPPER_SNAKE_CASE（如`SITE_TITLE`）
- **接口/类型**：PascalCase（如`Props`, `CollectionEntry`）

### TypeScript规范

```typescript
// 类型定义
type BlogPost = CollectionEntry<'blog'>;
interface Props {
  series: string;
  currentSlug: string;
}

// 可选参数安全访问
const { title, description } = Astro.props;
{description && <p>{description}</p>}
```

### 样式规范

```css
:root {
  --accent: #2337ff;
  --gray: 96, 115, 159;
  --gray-dark: 34, 41, 57;
}

/* 使用变量 */
color: rgb(var(--gray-dark));

/* 响应式设计 */
@media (min-width: 768px) {
  .component { padding: 2rem; }
}

/* 深色模式 */
:global([data-theme="dark"]) .component {
  background: rgba(var(--gray), 0.05);
}
```

### Mermaid规范

**重要**：项目使用`rehype-mermaid`进行**构建时渲染**

```mermaid
graph TD
  A[节点] --> B[节点]
  A --|标签| C
```

**规则：**
- 不使用`title`语句（会导致解析错误）
- 特殊字符用双引号：`node["中文<br/>字符"]`
- 通过`excludeLangs: ['mermaid']`排除语法高亮

### Frontmatter规范

```yaml
---
title: "文章标题"  # 必填
pubDate: 2024-01-27  # 必填
tags: [标签1, 标签2]  # 可选
series: "系列名称"  # 可选
seriesOrder: 1  # 可选
description: "描述"  # 可选
heroImage: ./images/cover.jpg  # 可选
---
```

## Linting规则

```json
{
  "categories": {
    "correctness": "error",
    "suspicious": "warn"
  },
  "plugins": ["import", "jsx-a11y"],
  "rules": {
    "no-console": "warn",
    "no-debugger": "error"
  }
}
```

- `*.astro`文件被忽略
- 修复所有正确性错误
- 样式问题由人工审核

## 常见任务模式

### 添加博客文章
1. 在`src/content/blog/`创建`.md`文件
2. 添加frontmatter字段
3. 编写内容（支持Mermaid）
4. 运行`npm run lint`
5. 提交到git

### 创建组件
1. 在`src/components/`创建`.astro`文件
2. 定义Props接口
3. 实现组件逻辑和样式
4. 确保响应式设计
5. 考虑深色模式

### 修改样式
1. 优先使用CSS变量
2. 测试移动端
3. 测试深色模式
4. 保持样式隔离

## 性能优化

```astro
<Image
  width={1020}
  height={510}
  src={heroImage}
  alt="描述"
  loading="lazy"
/>
```

## 部署相关

- **自动部署**：推送到master分支触发GitHub Actions
- **构建输出**：`dist/`目录
- **站点URL**：https://whtoo.github.io

## 故障排查

### Mermaid未渲染
1. 检查`excludeLangs: ['mermaid']`配置
2. 检查Mermaid语法（无title语句）
3. 特殊字符用双引号
4. 查看构建日志

### TypeScript LSP错误
检测到的`Property 'mermaid' does not exist`错误不影响构建：
- 项目使用构建时渲染，不依赖客户端mermaid对象
- 可忽略这些LSP警告

## 文档资源

- Astro: https://docs.astro.build
- Content Collections: https://docs.astro.build/en/guides/content-collections
- Mermaid: https://mermaid.js.org/intro/
- MDX: https://mdxjs.com/

## 总结

项目遵循现代Astro最佳实践：
- 清晰的代码组织
- 强类型系统
- 响应式设计
- 中文本地化支持
- 构建时Mermaid渲染
- 自动化部署

遵循本指南确保代码一致性、可维护性和性能。
