# 迁移学习记录

## 初始分析发现 (2026-01-26)

### Hexo代码库分析
- **Hexo版本**: 8.1.1
- **主题**: NexT v8.26.0
- **语言**: zh-CN (中文)
- **部署**: GitHub Pages

### 目录结构
```
.
├── source/_posts/          # 博客文章 (14篇)
├── source/about/          # About页面
├── source/projects/       # Projects页面  
├── source/tags/           # 标签索引页面
├── source/categories/     # 分类索引页面
├── scaffolds/             # 模板文件
└── themes/next/          # NexT主题
```

### 配置文件
1. **_config.yml**: Hexo主配置
   - 站点信息: title="编译手艺人", subtitle="术之尽头"
   - URL结构: permalink: :year/:month/:day/:title/
   - 部署配置: GitHub Pages (whtoo.github.io)
   - 插件: hexo-filter-mermaid-diagrams, hexo-generator-searchdb等

2. **_config.next.yml**: NexT主题配置
   - 语言: zh-CN
   - 功能: local_search, series_navigation, reading_progress等

3. **package.json**: 依赖和脚本
   - 构建命令: `npm run build` -> `hexo generate`
   - 部署命令: `npm run deploy` -> `hexo deploy`

### 文章格式分析
- Front Matter包含: title, date, tags, categories, series, order, layout
- 部分文章有空的tags数组需要处理
- 使用Hexo标签语法: {% asset_image %}, {% include_code %}

## Astro迁移发现

### 官方文档
- 无官方Hexo到Astro迁移指南
- 但有Hugo到Astro的迁移指南可供参考
- Astro支持内容集合(Content Collections)和类型安全schema

### 中文支持
- Astro内置i18n支持，可配置zh-CN为默认语言
- 有中文博客模板可用: SHBlog Next, pilipiala等

### 部署
- 官方GitHub Actions: `withastro/action`
- 支持GitHub Pages部署

## Astro项目创建 (2026-01-26)

### 项目创建
- 使用命令: `npm create astro@latest astro-blog -- --template blog --typescript strict --install yes --git yes --yes`
- 项目目录: `astro-blog/`
- 模板: 官方博客模板

### 配置更新
- `astro.config.mjs`: 设置site URL为`https://whtoo.github.io`，添加i18n中文支持
- `src/content.config.ts`: 更新schema支持Hexo的Front Matter字段（tags, categories, series, order等）
- 安装依赖: `@astrojs/rss` (已包含mdx和sitemap)

### 验证
- 构建成功: `npm run build` 无错误
- 初始提交: git commit bf673c3
- 项目状态: 就绪，等待内容迁移
# Hexo标签语法转换方案 (2026-01-26)

## 核心发现

### 1. remark-hexo插件 - 最直接解决方案
- **仓库**: https://github.com/bennycode/remark-hexo
- **类型**: TypeScript remark插件
- **支持标签**: 
  - `{% asset_img %}` - 图片引用
  - `{% youtube %}` - YouTube视频嵌入
- **适用框架**: Astro, Gatsby, Docusaurus等支持remark的框架
- **安装方式**: 
  ```bash
  npm install remark-hexo
  ```
- **Astro配置**:
  ```javascript
  import { defineConfig } from 'astro/config';
  import remarkHexo from 'remark-hexo';
  
  export default defineConfig({
    markdown: {
      remarkPlugins: [remarkHexo],
    },
  });
  ```
- **重要提示**: 需要在Astro配置中关闭SmartyPants，否则会破坏标签中的引号
  ```javascript
  markdown: {
    smartypants: false,  // 关闭以保护{% youtube ... %}中的引号
    remarkPlugins: [remarkHexo],
  },
  ```

### 2. Hexo标签完整列表 (官方文档)

#### 基础标签
- **Block Quote**: `{% blockquote [author[, source]] [link] [source_link_title] %}...{% endblockquote %}`
- **Code Block**: `{% codeblock [title] [lang:language] [url] [link text] %}...{% endcodeblock %}`
- **Pull Quote**: `{% pullquote [class] %}...{% endpullquote %}`
- **Image**: `{% img [class names] /path/to/image [width] [height] '"title text" "alt text"' %}`
- **Link**: `{% link text url [external] [title] %}`

#### 资源标签 (Asset Tags)
- **asset_path**: `{% asset_path slug %}`
- **asset_img**: `{% asset_img [class names] slug [width] [height] [title text [alt text]] %}`
- **asset_link**: `{% asset_link filename [title] [escape] %}`
- **工作原理**: 自动解析为post文件夹对应的完整URL路径
- **优势**: 在索引页和归档页都能正确显示

#### 代码包含
- **include_code**: `{% include_code [title] [lang:language] [from:line] [to:line] path/to/file %}`
- **功能**: 从source/downloads/code目录嵌入代码片段
- **参数**:
  - `from:3 to:3` - 只嵌入第3行
  - `from:5 to:8` - 嵌入5到8行
  - `from:5` - 嵌入第5行到文件末尾
  - `to:8` - 嵌入文件开头到第8行

#### 媒体嵌入 (已移除，需插件)
- **YouTube**: `{% youtube video_id [type] [cookie] %}` (v7.0.0+移除)
- **Vimeo**: `{% vimeo video_id [width] [height] %}` (v7.0.0+移除)
- **解决方案**: 使用hexo-tag-embed插件替代

#### 其他标签
- **iframe**: `{% iframe url [width] [height] %}`
- **raw**: `{% raw %}...{% endraw %}` - 避免渲染问题
- **post_path**: `{% post_path filename %}`
- **post_link**: `{% post_link filename [title] [escape] %}`
- **url_for**: `{% url_for text path [relative] %}`
- **full_url_for**: `{% full_url_for text path %}`

### 3. 通用转换策略

#### 方案A: 使用remark-directive插件
- **插件**: https://unifiedjs.com/explore/package/remark-directive/
- **语法**: `:directive[params]{key=value}` 或 `::directive{key=value}`
- **优势**: 
  - 支持通用指令语法
  - 可自定义处理函数
  - 适用于自定义shortcode
- **示例**:
  ```javascript
  import { remarkDirective } from 'remark-directive';
  
  function myDirectivePlugin() {
    return (tree) => {
      remarkDirective(tree, {
        handlers: {
          myDirective: (directive) => {
            // 转换逻辑
          }
        }
      });
    };
  }
  ```

#### 方案B: 自定义remark插件
- **原理**: 在remark处理阶段替换特定文本模式
- **示例**: 将`{% asset_img image.jpg %}`转为Markdown
  ```javascript
  import { visit } from 'unist-util-visit';
  
  function remarkReplaceHexoTags() {
    return (tree) => {
      visit(tree, 'text', (node) => {
        node.value = node.value.replace(
          /\{% asset_img (.*?) %\}/g,
          '![$1](/posts/$1)'
        );
      });
    };
  }
  ```

#### 方案C: MDX + Astro组件
- **优势**: 完全控制，类型安全
- **方法**:
  1. 将.md转为.mdx
  2. 创建对应Astro组件
  3. 在MDX中导入并使用
- **示例**:
  ```mdx
  ---
  title: My Post
  ---
  import CodeBlock from '../components/CodeBlock.astro';
  
  Some content...
  
  <CodeBlock lang="typescript">
    const code = "here";
  </CodeBlock>
  ```

### 4. 具体标签转换示例

#### asset_img转换
**Hexo**:
```md
{% asset_img example.jpg This is an example image %}
```

**方案1 - 转为标准Markdown**:
```md
![This is an example image](example.jpg)
```

**方案2 - 转为Astro Image组件**:
```mdx
---
title: My Post
---
import { Image } from 'astro:assets';
import example from './example.jpg';

<Image src={example} alt="This is an example image" />
```

**方案3 - 使用remark-hexo插件**:
保留原标签，remark-hexo自动转换

#### include_code转换
**Hexo**:
```md
{% include_code lang:javascript test.js %}
```

**方案1 - 手动复制代码**:
```md
\`\`\`javascript
// 手动复制test.js的内容
\`\`\`
```

**方案2 - 使用remark插件读取文件**:
```javascript
import fs from 'fs';
import path from 'path';

function remarkIncludeCode() {
  return (tree) => {
    visit(tree, 'html', (node) => {
      if (node.value?.includes('{% include_code')) {
        // 解析参数，读取文件，插入代码
      }
    });
  };
}
```

**方案3 - 构建时预处理脚本**:
```bash
# 使用脚本在构建前转换
node scripts/convert-hexo-tags.js
```

#### pullquote转换
**Hexo**:
```md
{% pullquote %}
Content here
{% endpullquote %}
```

**方案1 - 转为HTML**:
```md
<blockquote class="pullquote">
  Content here
</blockquote>
```

**方案2 - MDX组件**:
```mdx
import PullQuote from '../components/PullQuote.astro';

<PullQuote>Content here</PullQuote>
```

#### note/blockquote转换 (NexT主题)
**Hexo**:
```md
> Important note
```

**方案1 - MDX自定义组件映射**:
```mdx
import Note from '../components/Note.astro';

export const components = {
  blockquote: Note
}

> Important note  <!-- 将渲染为Note组件 -->
```

**方案2 - rehype插件**:
在HTML生成阶段替换`<blockquote>`为自定义组件

#### tab转换
**Hexo** (NexT主题):
```md
{% tabs %}
  {% tab Tab 1 %}
  Content 1
  {% endtab %}
  {% tab Tab 2 %}
  Content 2
  {% endtab %}
{% endtabs %}
```

**方案1 - MDX + 组件**:
```mdx
import Tabs from '../components/Tabs.astro';
import TabItem from '../components/TabItem.astro';

<Tabs>
  <TabItem title="Tab 1">Content 1</TabItem>
  <TabItem title="Tab 2">Content 2</TabItem>
</Tabs>
```

**方案2 - remark-directive**:
```md
:::tabs{align=centered}
:::tab{title="Tab 1"}
Content 1
:::
:::tab{title="Tab 2"}
Content 2
:::
:::
```

### 5. 工具和插件总结

#### 现有工具
1. **remark-hexo** (bennycode/remark-hexo)
   - 优点: 专门为Hexo标签设计，即插即用
   - 缺点: 只支持asset_img和youtube
   - 适用: 简单的图片和视频嵌入

2. **remark-directive** (unifiedjs.com)
   - 优点: 通用指令语法，可扩展
   - 缺点: 需要自定义每个标签的处理逻辑
   - 适用: 复杂的自定义标签

3. **remark-shortcodes** (djm/remark-shortcodes)
   - 语法: `{{ shortcode_name param=value }}`
   - 优点: Hugo风格shortcodes
   - 缺点: 语法与Hexo不完全兼容

#### 自定义开发
- **所需工具**:
  - `unified` - 统一处理框架
  - `remark` - Markdown解析器
  - `rehype` - HTML转换器
  - `unist-util-visit` - AST遍历工具

- **开发流程**:
  1. 使用`remark`解析Markdown
  2. 遍历AST查找Hexo标签
  3. 根据标签类型执行转换逻辑
  4. 输出修改后的Markdown/HTML

### 6. 推荐方案

#### 对于本博客
基于当前Hexo博客的标签使用情况，推荐以下策略：

**阶段1: 快速迁移** (使用remark-hexo)
- 安装remark-hexo插件
- 配置Astro使用该插件
- 保留所有asset_img标签
- 手动转换其他标签

**阶段2: 逐步优化** (自定义remark插件)
- 开发自定义remark插件处理include_code
- 开发组件处理pullquote, note, tab等
- 逐步替换自定义组件

**阶段3: 完全迁移** (MDX + Astro组件)
- 将所有文章转为.mdx
- 创建可复用的Astro组件
- 实现类型安全和更好的开发体验

### 7. 性能和安全考虑
- **性能**: remark插件在构建时运行，不影响运行时性能
- **安全**: 过滤用户输入的标签参数，避免XSS
- **缓存**: 使用Astro的content collections缓存机制
- **优化**: 使用remark-hexo的`optimize: true`选项加快构建

## 待实现任务
- [ ] 创建remark插件处理include_code标签
- [ ] 创建Astro组件替换pullquote
- [ ] 创建Astro组件替换tab (Tabs)
- [ ] 创建Astro组件替换note
- [ ] 测试所有转换方案
- [ ] 更新迁移脚本

# Astro部署到GitHub Pages最佳实践 (2026-01-26)

## 官方GitHub Actions配置

### withastro/action v5.1.0 (最新版本)

**源代码**: https://github.com/withastro/action
**版本**: v5.1.0 (2026年1月14日发布)
**使用统计**: 26.7k+项目使用, 229 stars, 51 forks

#### 基础工作流配置

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # 每次推送到main分支时触发
  push:
    branches: [main]
  # 允许从GitHub Actions标签页手动触发
  workflow_dispatch:

# 允许任务克隆仓库和创建page部署
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v6
      
      - name: Install, build, and upload your site output
        uses: withastro/action@v5
        # with:
        #   path: . # Astro项目在仓库中的根位置（可选）
        #   node-version: 22 # 构建时使用的Node版本，默认22（可选）
        #   package-manager: pnpm@latest # 包管理器，自动检测lockfile（可选）
        #   build-cmd: pnpm run build # 构建命令，默认执行package的build脚本（可选）
        # env:
        #   PUBLIC_API_URL: 'https://api.example.com' # 公共环境变量（可选）

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### withastro/action 配置选项

**Inputs (输入参数)**:
- `path` - Astro项目根路径（相对于仓库根目录）
- `node-version` - Node.js版本（默认: 22）
- `package-manager` - 包管理器（自动检测，支持npm/yarn/pnpm/bun/deno）
  - 可指定版本: `npm@11.6.2`, `pnpm@10`, `bun@latest`, `deno@v2.x`
- `build-cmd` - 构建命令
  - Deno项目默认: `deno task build`
  - 其他默认: `<package-manager> run build`
- `cache` - 启用Astro构建缓存（默认: true）
  - 缓存优化图片和其他构建资产
- `cache-dir` - Astro缓存目录路径（默认: `node_modules/.astro`）

**环境变量**:
- 公共环境变量（带`PUBLIC_`前缀）可通过`env:`字段配置
- 私密变量应在GitHub仓库Settings中配置Secrets

### Astro配置要求

#### 1. 设置site配置

**astro.config.mjs**:
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 方案A: 使用GitHub默认域名
  site: 'https://<username>.github.io',
  
  // 方案B: 使用组织域名
  site: 'https://<random-string>.pages.github.io',
  
  // 方案C: 使用自定义域名
  site: 'https://example.com',
});
```

#### 2. 设置base配置（通常需要）

GitHub Pages根据用户名和仓库名发布网站（如 `https://<username>/github.io/<my-repo>/`）

```javascript
export default defineConfig({
  site: 'https://astronaut.github.io',
  base: '/my-repo', // 仓库名，以/开头
});
```

**重要提示**:
- 如果仓库名为`<username>.github.io`，则不需要设置`base`
- 配置`base`后，所有内部链接必须带前缀:
  ```html
  <a href="/my-repo/about">About</a>
  ```

#### 3. GitHub Pages设置

在GitHub仓库中:
1. 进入 **Settings** 标签页
2. 找到 **Pages** 部分
3. 选择 **GitHub Actions** 作为 **Source**

## 自定义域名配置

### 步骤1: 配置DNS记录

根据域名提供商（以Namecheap为例）:

**A记录** (根域名 `@`):
```
@ A 1h 185.199.108.153
@ A 1h 185.199.109.153
@ A 1h 185.199.110.153
@ A 1h 185.199.111.153
```

**CNAME记录** (www子域名):
```
www CNAME 1h <username>.github.io
```

**验证工具**: https://dnschecker.org

### 步骤2: 添加CNAME文件

在项目`public/`目录创建`CNAME`文件:

**public/CNAME**:
```
example.com
```

或包含www:
```
www.example.com
```

### 步骤3: 更新Astro配置

**astro.config.mjs**:
```javascript
export default defineConfig({
  site: 'https://example.com', // 更新为自定义域名
  // base: '/my-repo', // 移除或注释掉base配置
});
```

### 步骤4: 更新内部链接

移除所有链接中的`base`前缀:
```html
<!-- 之前 -->
<a href="/my-repo/about">About</a>

<!-- 之后 -->
<a href="/about">About</a>
```

### HTTPS自动启用

GitHub Pages会自动为自定义域名提供HTTPS证书，无需手动配置。

## 性能优化

### 1. 图片优化

#### 使用Astro Image组件

**官方文档**: https://docs.astro.build/en/guides/images/

**图片存储位置**:
- `src/` - 推荐，Astro可转换、优化和打包
- `public/` - 原样复制，无处理

**基本用法**:
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.jpg';
---

<Image 
  src={myImage} 
  alt="描述性文字"
  width={800}
  height={600}
  format="webp"
  quality={90}
/>
```

**优化效果案例**:
- 首页加载时间: 从6秒降至1.8秒（提升70%）
- Lighthouse性能分数: 从62提升至95

**优化技巧**:
1. **格式选择**: WebP > AVIF > PNG > JPEG
2. **懒加载**: 使用`loading="lazy"`
3. **响应式图片**: 使用`<Picture>`组件
4. **压缩质量**: WebP推荐90-95，JPEG推荐80-85

#### 完整图片组件示例

```astro
---
import { Picture } from 'astro:assets';
import hero from '../assets/hero.jpg';
---

<Picture>
  <source
    srcset={hero.src}
    type="image/webp"
    media="(min-width: 768px)"
  />
  <img 
    src={hero.src} 
    alt="Hero image" 
    width={hero.width} 
    height={hero.height}
    loading="lazy"
  />
</Picture>
```

### 2. 构建缓存优化

**withastro/action**内置缓存:

```yaml
- name: Install, build, and upload your site
  uses: withastro/action@v5
  with:
    cache: true # 默认启用
    cache-dir: 'node_modules/.astro' # 可自定义
```

**缓存内容**:
- 优化后的图片
- 构建资产
- 依赖包（部分）

**优势**:
- 加快后续构建速度
- 节省CI/CD时间
- 减少带宽消耗

### 3. CDN集成

#### Cloudflare Pages（推荐）

**优势**:
- 免费CDN
- DDoS防护
- 全球节点
- 自动HTTPS

**配置步骤**:
1. 在Cloudflare添加站点
2. 指向GitHub Pages
3. 开启缓存

#### 其他CDN选项

- **Vercel Edge Network**: 需要部署到Vercel
- **Cloudinary**: 图片CDN，Astro有官方集成
- **AWS CloudFront**: 企业级方案

### 4. 代码分割和懒加载

**Astro默认优化**:
- 岛屿架构 - 零JavaScript by default
- 自动代码分割
- 按需加载组件

**手动优化**:
```astro
---
// 仅在需要时导入交互组件
import InteractiveComponent from './InteractiveComponent.astro';
---

<InteractiveComponent client:load /> 
<!-- client:load, client:visible, client:idle -->
```

## 错误监控和回滚策略

### Sentry监控集成

**官方集成**: https://docs.astro.build/en/guides/backend/sentry/
**官方合作伙伴**: Astro宣布Sentry为官方监控合作伙伴

#### 安装配置

```bash
npx astro add @sentry/astro
```

**astro.config.mjs**:
```javascript
import { defineConfig } from 'astro/config';
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: process.env.SENTRY_DSN,
      sourceMapsUploadOptions: {
        project: 'your-project-slug',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      tracesSampleRate: 1.0,
    }),
  ],
});
```

#### 功能特性

- **错误捕获**: 自动报告JavaScript错误
- **性能追踪**: 完整的分布式追踪
- **Source Maps**: 自动上传，显示源代码
- **本地调试**: Spotlight开发工具

**Spotlight开发工具**:
- 浏览器内调试覆盖层
- 实时显示错误、追踪和上下文
- 本地开发时启用

### 回滚策略

#### 1. Git版本控制

```bash
# 回滚到上一个稳定版本
git revert HEAD
git push origin main

# 或直接checkout特定commit
git checkout <commit-sha>
git push origin main --force
```

#### 2. GitHub Actions工作流

**手动触发**:
- 在GitHub Actions页面点击"workflow_dispatch"
- 选择特定分支或commit

**环境保护规则**:
- Settings > Environments > github-pages
- 添加保护规则（需要审批、限制分支等）

#### 3. 备份策略

- **自动备份**: GitHub仓库本身即为备份
- **快照**: 每次部署前自动打tag
- **多环境**: 保留预览环境用于测试

## 多环境部署

### 环境变量管理

**Astro环境变量文档**: https://docs.astro.build/en/guides/environment-variables/

#### 1. 创建环境配置文件

**.env** (默认):
```
SECRET_API_KEY=your-secret-key
PUBLIC_SITE_URL=https://example.com
```

**.env.production** (生产环境):
```
PUBLIC_SITE_URL=https://example.com
```

**.env.preview** (预览环境):
```
PUBLIC_SITE_URL=https://preview.example.com
```

#### 2. GitHub Actions配置环境变量

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }}
    env:
      # 根据环境设置不同变量
      PUBLIC_API_URL: ${{ github.ref == 'refs/heads/main' && 'https://api.example.com' || 'https://api-preview.example.com' }}
    steps:
      - uses: actions/checkout@v6
      - uses: withastro/action@v5
```

### 预览部署配置

#### GitHub Actions预览工作流

创建 `.github/workflows/preview.yml`:

```yaml
name: Preview Deploy

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      
      - name: Build Preview
        uses: withastro/action@v5
        with:
          node-version: 22
      
      - name: Comment Preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployed! [View it here](https://<username>.github.io/<repo>-preview/)'
            })
```

### 环境隔离策略

#### 选项1: 单仓库多分支

```
main         -> 生产环境
staging      -> 预览环境
develop      -> 开发环境
```

#### 选项2: 多仓库

```
myapp        -> 生产环境
mya
