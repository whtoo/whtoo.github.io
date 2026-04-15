<!-- From: /Users/blitz/whtoo.github.io/AGENTS.md -->
# AGENTS.md

此文件为在此仓库中工作的 AI 代理提供指导。阅读本文件前，请假设你对本项目一无所知。

---

## 项目概述

本项目是一个基于 **Astro 5.16.15** 的静态博客/个人站点，站点标题为「随性」，作者是 Blitz（Arthur / Wilson）。站点部署在 **GitHub Pages**，域名为 `https://whtoo.github.io`。

博客的核心内容是关于 **Autonomy Agent Continuous Context** 的研究，以及其附属实现：**SPC-CTX**（上下文引擎）、**OpenClaw SPC plugin**（插件层实现）和 **CDA（上下文方向对齐）** 理论范式。

### 主要特性

- **静态站点生成**：Astro `output: 'static'`，构建产物输出到 `dist/`
- **内容集合（Content Collections）**：博客文章存放在 `src/content/blog/`，使用 Zod 进行 frontmatter 类型校验
- **MDX 支持**：通过 `@astrojs/mdx` 集成，支持在 Markdown 中使用组件
- **Mermaid 图表构建时渲染**：通过 `rehype-mermaid` 在构建阶段将 Mermaid 代码块渲染为 SVG 图片
- **RSS 订阅**：通过 `@astrojs/rss` 自动生成 `/rss.xml`
- **站点地图**：通过 `@astrojs/sitemap` 自动生成
- **中文本地化**：站点语言为 `zh-CN`，日期格式化为中文
- **阅读进度条**：博客文章页面顶部有固定阅读进度指示器
- **系列文章导航**：支持通过 `series` 和 `seriesOrder` frontmatter 字段组织系列文章

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Astro 5.16.15 |
| 语言 | TypeScript（严格模式，`astro/tsconfigs/strict`） |
| 内容格式 | Markdown / MDX |
| 前端样式 | 原生 CSS（基于 Bear Blog 默认样式改造） |
| 字体 | Atkinson（WOFF 格式，预加载） |
| 图表 | Mermaid 11.12.2 + rehype-mermaid 2.0.0 |
| 图片处理 | `astro:assets` + sharp |
| 语法高亮 | Shiki（`material-theme-darker` 主题） |
| 代码检查 | oxlint 1.41.0 |
| E2E 测试 | Playwright 1.58.0 |
| 部署 | GitHub Actions → GitHub Pages |

---

## 项目结构

```
├── .github/workflows/deploy.yml    # GitHub Actions 自动部署配置
├── .astro/                         # Astro 生成的类型和缓存
├── dist/                           # 构建输出目录（静态文件）
├── public/                         # 公共静态资源（直接复制到 dist）
│   ├── fonts/                      # Atkinson 字体文件
│   ├── images/                     # 静态图片
│   ├── favicon.ico
│   └── robots.txt
├── scripts/                        # 辅助脚本（迁移、部署验证）
│   ├── migrate-final.mjs
│   ├── migrate-simple.mjs
│   └── verify-deployment.sh
├── src/
│   ├── assets/                     # 可被 Astro 资源系统处理的图片
│   ├── components/                 # Astro 组件
│   │   ├── BaseHead.astro          # <head> 元数据、SEO、OpenGraph
│   │   ├── Footer.astro
│   │   ├── FormattedDate.astro     # 中文日期格式化
│   │   ├── Header.astro
│   │   ├── HeaderLink.astro        # 带 active 状态的路由链接
│   │   ├── ReadingProgress.astro   # 阅读进度条（含客户端 JS）
│   │   └── SeriesNavigation.astro  # 系列文章导航（含前后篇）
│   ├── content/
│   │   └── blog/                   # 博客文章（.md / .mdx）
│   │       └── images/             # 文章配图
│   ├── layouts/
│   │   ├── BlogPost.astro          # 博客文章页面布局
│   │   └── Page.astro              # 通用页面布局（about / projects）
│   ├── pages/                      # 路由定义
│   │   ├── index.astro             # 首页
│   │   ├── about.md                # 关于页面
│   │   ├── projects.md             # 项目页面
│   │   ├── rss.xml.js              # RSS 路由
│   │   └── blog/
│   │       ├── index.astro         # 博客列表页
│   │       └── [...slug].astro     # 博客文章动态路由
│   ├── styles/
│   │   ├── global.css              # 全局样式（CSS 变量、基础排版）
│   │   └── custom.css              # 自定义覆盖样式（Mermaid、中文排版）
│   ├── consts.ts                   # 全局常量（SITE_TITLE, SITE_DESCRIPTION）
│   └── content.config.ts           # 内容集合 schema 定义
├── tests/                          # Playwright E2E 测试
│   ├── console-check.spec.ts       # 全站控制台错误检查
│   ├── mermaid-chart.spec.ts       # Mermaid 渲染验证
│   └── screenshots/                # 测试截图输出
├── astro.config.mjs                # Astro 主配置
├── package.json
├── playwright.config.ts            # Playwright 配置
├── oxlint.config.json              # 代码检查规则
└── tsconfig.json
```

---

## 构建与开发命令

所有命令均在项目根目录执行：

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 构建生产版本（输出到 dist/）
npm run build

# 本地预览构建结果
npm run preview

# 运行代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# E2E 测试（Playwright）
npx playwright test
```

---

## 代码风格指南

### 导入规范

```typescript
// Astro 内置导入
import { getCollection, render, type CollectionEntry } from 'astro:content';
import { Image } from 'astro:assets';

// 本地组件导入（相对路径）
import Header from '../components/Header.astro';

// 全局常量导入
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
```

### 文件命名约定

- **组件文件**：PascalCase（如 `Header.astro`、`SeriesNavigation.astro`）
- **页面文件**：kebab-case（如 `blog/index.astro`、`[...slug].astro`）
- **变量**：camelCase（如 `seriesPosts`, `post`）
- **常量**：UPPER_SNAKE_CASE（如 `SITE_TITLE`）
- **接口/类型**：PascalCase（如 `Props`, `CollectionEntry`）

### Astro 组件结构

```astro
---
// 1. Frontmatter：导入、类型定义、props 解构
import ComponentName from './ComponentName.astro';

interface Props {
  prop1: string;
  prop2?: number;
}

const { prop1, prop2 } = Astro.props;
---

<!-- 2. Template：组件模板 -->
<ComponentName prop1={prop1} />

<!-- 3. Style： scoped CSS（如需） -->
<style>
  .component { padding: 1rem; }
</style>

<!-- 4. Script：客户端脚本（如需） -->
<script>
  // 客户端交互逻辑
</script>
```

### TypeScript 规范

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

### CSS 规范

- 优先使用 CSS 自定义变量（定义在 `:root` 或 `global.css`）
- 响应式断点以 `720px` 和 `768px` 为主
- 深色模式支持通过 `:global([data-theme="dark"])` 选择器
- 关键颜色变量：
  - `--accent: #2337ff`
  - `--black: 15, 18, 25`
  - `--gray: 96, 115, 159`
  - `--gray-light: 229, 233, 240`
  - `--gray-dark: 34, 41, 57`

---

## 内容集合与 Frontmatter

博客文章位于 `src/content/blog/`，支持 `.md` 和 `.mdx`。

### Frontmatter Schema

定义在 `src/content.config.ts`：

```yaml
---
title: "文章标题"           # 必填，string
pubDate: 2024-01-27        # 必填，date
tags: [标签1, 标签2]        # 可选，string[]，默认 []
categories: [分类1]         # 可选，string[]
series: "系列名称"          # 可选，string
seriesOrder: 1             # 可选，number
description: "描述"         # 可选，string
updatedDate: 2024-02-01    # 可选，date
heroImage: ./images/cover.jpg  # 可选，相对路径图片
draft: false               # 可选，boolean，默认 false
---
```

### 系列文章

若文章属于某个系列，需同时设置 `series` 和 `seriesOrder`。`SeriesNavigation` 组件会自动：
1. 列出同系列所有文章
2. 高亮当前文章
3. 在底部显示「上一篇 / 下一篇」分页链接
4. 支持键盘左右箭头快速切换

---

## Mermaid 图表规范

项目使用 **构建时渲染**（`rehype-mermaid`，`strategy: 'img-svg'`），Mermaid 代码块在构建阶段被转换为 `<img>` 标签（SVG data URI）。

### 语法规则

- **不要**使用 `title` 语句（会导致解析错误）
- 特殊字符用双引号包裹：`node["中文<br/>字符"]`
- Astro 配置中已排除 Mermaid 的语法高亮：`excludeLangs: ['mermaid']`

### 示例

```markdown
```mermaid
graph TD
  A[节点] --> B[节点]
  A --|标签| C
```
```

### 样式

Mermaid 渲染结果的样式定义在 `src/styles/custom.css` 中，包含：
- 白色圆角卡片背景
- 悬浮阴影和轻微上浮效果
- 左上角「图表」标签
- 深色主题适配
- 响应式调整

---

## 测试策略

项目使用 **Playwright** 进行端到端测试。

### 测试配置

- 测试目录：`tests/`
- 只使用 Chromium 浏览器（`projects: [{ name: 'chromium', ... }]`）
- 开发服务器由 Playwright 自动启动：`npm run dev` @ `http://localhost:4321`
- CI 环境下重试 2 次、单 worker 运行

### 现有测试

1. **`tests/console-check.spec.ts`**
   - 遍历首页、关于页、博客列表页、项目页、以及若干博客文章页
   - 收集 `console.error` 和 `console.warning`
   - 断言没有任何控制台错误或警告

2. **`tests/mermaid-chart.spec.ts`**
   - 访问 about 页面（包含 Mermaid 图表）
   - 验证页面中存在 `id` 以 `mermaid-` 开头的 `<img>` 标签
   - 验证 `src` 属性包含 `data:image/svg+xml`
   - 验证图片尺寸大于 50x50
   - 自动截图保存到 `tests/screenshots/mermaid-flowchart.png`

### 运行测试

```bash
# 运行所有测试
npx playwright test

# 带 UI 模式调试
npx playwright test --ui

# 只运行特定测试文件
npx playwright test tests/mermaid-chart.spec.ts
```

---

## Linting 规则

使用 **oxlint** 进行代码检查，`.astro` 文件被主动忽略。

配置在 `oxlint.config.json`：

```json
{
  "categories": {
    "correctness": "error",
    "suspicious": "warn",
    "pedantic": "off",
    "style": "off",
    "nursery": "off",
    "restriction": "off"
  },
  "plugins": ["import", "jsx-a11y"],
  "rules": {
    "no-console": "warn",
    "no-debugger": "error"
  },
  "ignorePatterns": [
    "dist/**",
    "node_modules/**",
    ".astro/**",
    "public/**",
    "**/*.astro"
  ]
}
```

- 正确性（correctness）问题必须修复
- 样式（style）问题由人工审核，不强制自动修复
- 添加新脚本或工具代码后，应运行 `npm run lint` 检查

---

## 部署流程

### 自动部署

- **触发条件**：推送到 `main` 分支，或手动触发 Workflow Dispatch
- **工作流文件**：`.github/workflows/deploy.yml`
- **Node.js 版本**：24（GitHub Actions 中明确指定）
- **步骤**：
  1. `actions/checkout@v4`
  2. `actions/setup-node@v4`（cache: 'npm'）
  3. `npm ci`
  4. 安装 Playwright Chromium 浏览器
  5. `npm run build`
  6. `actions/upload-pages-artifact@v3`（上传 `dist/`）
  7. `actions/deploy-pages@v4`（部署到 GitHub Pages）

### 部署验证

可运行验证脚本检查配置完整性：

```bash
bash scripts/verify-deployment.sh
```

该脚本会检查：
- 关键文件是否存在（`deploy.yml`、`astro.config.mjs`、`package.json`）
- `package.json` 中构建脚本是否正确
- `astro.config.mjs` 中 `site` 和 `output` 配置是否正确
- GitHub Actions 是否使用了正确的部署动作和运行器
- `dist/` 目录及关键输出文件是否存在

---

## 常见任务模式

### 添加博客文章

1. 在 `src/content/blog/` 创建 `.md` 或 `.mdx` 文件
2. 添加 frontmatter 字段（至少 `title` 和 `pubDate`）
3. 编写内容（支持 Mermaid、代码块、图片等）
4. 若需要配图，将图片放入 `src/content/blog/images/`，在 frontmatter 中用相对路径引用
5. 运行 `npm run lint`
6. 本地用 `npm run dev` 预览，确认渲染正常
7. 提交到 git

### 创建新组件

1. 在 `src/components/` 创建 `.astro` 文件
2. 定义 `Props` 接口
3. 实现模板和 scoped CSS
4. 若需要深色模式，添加 `:global([data-theme="dark"])` 规则
5. 若需要客户端交互，在底部添加 `<script>` 标签

### 修改现有页面

- **首页**：`src/pages/index.astro`
- **博客列表**：`src/pages/blog/index.astro`
- **博客文章路由**：`src/pages/blog/[...slug].astro`（通常不需要修改，它负责渲染所有博客文章）
- **关于页面**：`src/pages/about.md`
- **项目页面**：`src/pages/projects.md`

---

## 安全与性能注意事项

- 站点为纯静态输出，**没有服务端逻辑**
- 图片使用 Astro `<Image />` 组件自动优化（输出 WebP）
- 博客列表页会过滤掉没有 `tags` 的文章：`.filter(post => post.data.tags && post.data.tags.length > 0)`
- 所有外部链接（如 GitHub）均使用 `target="_blank"`，建议保持 `rel="noopener"`（当前已部分遵循）
- 构建产物全部在 `dist/` 中，请勿将敏感信息硬编码到任何会被构建到 `dist/` 的文件中

---

## 故障排查

### Mermaid 未渲染
1. 检查 `astro.config.mjs` 中 `excludeLangs: ['mermaid']` 是否生效
2. 检查 Mermaid 语法是否正确（特别注意没有 `title` 语句）
3. 特殊字符是否用双引号包裹
4. 查看构建日志是否有 rehype-mermaid 报错

### TypeScript LSP 错误
检测到的 `Property 'mermaid' does not exist` 等 LSP 错误**不影响构建**：
- 项目使用构建时渲染，不依赖客户端 `mermaid` 对象
- 这些警告可忽略

### Playwright 测试失败
1. 确保开发服务器未被其他进程占用 `localhost:4321`
2. 运行 `npx playwright install chromium` 确保浏览器已安装
3. 检查是否有控制台错误或 Mermaid 渲染异常

### 构建后页面 404
1. 检查 `astro.config.mjs` 中的 `site` 和 `base` 配置
2. 检查 `src/pages/` 下是否有对应路由文件
3. 检查动态路由 `getStaticPaths()` 是否正常返回路径

---

## 外部文档链接

- Astro 官方文档：https://docs.astro.build
- Astro Content Collections：https://docs.astro.build/en/guides/content-collections
- Mermaid 语法文档：https://mermaid.js.org/intro/
- MDX 文档：https://mdxjs.com/
- Playwright 文档：https://playwright.dev/

---

**最后更新**：2026年4月14日
