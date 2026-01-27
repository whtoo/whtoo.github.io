# 遇到的问题和障碍

## 问题1: 官方迁移指南缺失 (2026-01-26)
**描述**: Astro官方文档中没有Hexo到Astro的迁移指南
**影响**: 需要自行研究迁移策略，增加复杂度和风险
**解决方案**: 参考Hugo到Astro的迁移指南，结合Hexo特点制定方案
**状态**: 已识别，需要关注

## 问题2: Hexo标签语法转换 (2026-01-26)
**描述**: Hexo使用自定义标签语法如 `{% asset_image %}`, `{% include_code %}`
**影响**: 这些语法在Astro中不被支持，需要转换

**详细问题和解决方案**:

### 子问题2.1: asset_img标签
**Hexo语法**:
```md
{% asset_img example.jpg "Title" "Alt text" %}
```

**方案A - 使用remark-hexo插件** (推荐用于快速迁移)
- **优点**: 即插即用，保留原语法
- **实现**:
  ```bash
  npm install remark-hexo
  ```
- **配置**:
  ```javascript
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  import remarkHexo from 'remark-hexo';
  
  export default defineConfig({
    markdown: {
      smartypants: false,  // 关闭SmartyPants保护引号
      remarkPlugins: [remarkHexo],
    },
  });
  ```
- **注意**: 只支持asset_img和youtube标签

**方案B - 转换为标准Markdown** (推荐用于简单场景)
- **转换**:
  ```md
  <!-- Hexo: {% asset_img example.jpg "Title" %} -->
  ![Title](example.jpg)
  ```
- **优点**: 标准语法，跨平台兼容
- **缺点**: 丢失asset文件夹自动路径解析功能

**方案C - 转换为Astro Image组件** (推荐用于性能优化)
- **转换**:
  ```mdx
  ---
  title: Post Title
  ---
  import { Image } from 'astro:assets';
  import example from '../../public/assets/example.jpg';
  
  <Image src={example} alt="Alt text" width={500} height={400} />
  ```
- **优点**: 
  - 自动优化
  - 响应式图片
  - 懒加载
  - 类型安全

### 子问题2.2: include_code标签
**Hexo语法**:
```md
{% include_code lang:javascript from:5 to:8 test.js %}
```

**方案A - 手动转换** (推荐用于少量使用)
- **转换**:
  ```md
  \`\`\`javascript
  // 手动复制test.js第5到8行的内容
  const code = "here";
  \`\`\`
  ```
- **优点**: 简单直接
- **缺点**: 维护成本高

**方案B - 自定义remark插件** (推荐用于中等使用)
- **实现思路**:
  ```javascript
  import fs from 'fs';
  import path from 'path';
  import { visit } from 'unist-util-visit';
  
  function remarkIncludeCode(options = {}) {
    return (tree) => {
      visit(tree, 'html', (node) => {
        const match = node.value?.match(/{% include_code (.*?) %\}/);
        if (match) {
          // 解析参数：lang, from, to, 文件路径
          // 读取文件内容
          // 提取指定行
          // 替换为代码块
        }
      });
    };
  }
  ```

**方案C - 构建时预处理脚本** (推荐用于大量使用)
- **实现**:
  ```javascript
  // scripts/preprocess.js
  import fs from 'fs';
  import { glob } from 'glob';
  
  const files = await glob('src/content/**/*.md');
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    // 正则匹配include_code标签
    content = content.replace(/{% include_code (.*?) %\}/g, (match, args) => {
      // 解析参数并读取代码文件
      return transformedCode;
    });
    fs.writeFileSync(file, content);
  }
  ```
- **集成到npm scripts**:
  ```json
  {
    "scripts": {
      "prebuild": "node scripts/preprocess.js",
      "build": "astro build"
    }
  }
  ```

### 子问题2.3: pullquote标签
**Hexo语法**:
```md
{% pullquote class-name %}
  This is a pull quote
{% endpullquote %}
```

**方案A - 转换为HTML** (最简单)
- **转换**:
  ```md
  <blockquote class="pullquote class-name">
    This is a pull quote
  </blockquote>
  ```
- **优点**: 保留原有类名
- **缺点**: HTML直接嵌入

**方案B - MDX + Astro组件** (推荐)
- **组件** (src/components/PullQuote.astro):
  ```astro
  ---
  interface Props {
    class?: string;
  }
  const { class: className = '' } = Astro.props;
  ---
  <blockquote class={`pullquote ${className}`}>
    <slot />
  </blockquote>
  ```
- **使用**:
  ```mdx
  ---
  title: Post Title
  ---
  import PullQuote from '../components/PullQuote.astro';
  
  <PullQuote class="class-name">
    This is a pull quote
  </PullQuote>
  ```

### 子问题2.4: note/blockquote标签 (NexT主题)
**Hexo语法**:
```md
> Important note content
```

**方案A - MDX自定义组件映射** (推荐)
- **使用**:
  ```mdx
  ---
  title: Post Title
  ---
  import Note from '../components/Note.astro';
  
  export const components = {
    blockquote: Note
  }
  
  > Important note content
  ```
- **组件** (src/components/Note.astro):
  ```astro
  ---
  ---
  <div class="note">
    <slot />
  </div>
  ```

**方案B - rehype插件** (高级)
- **实现思路**: 在HTML生成阶段替换所有`<blockquote>`
- **优点**: 全局应用，无需修改每个文件
- **缺点**: 可能影响不想替换的blockquote

### 子问题2.5: tab标签 (NexT主题)
**Hexo语法**:
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

**方案A - 使用remark-directive插件** (推荐)
- **安装**:
  ```bash
  npm install remark-directive
  ```
- **转换语法**:
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
- **处理器**:
  ```javascript
  import { remarkDirective } from 'remark-directive';
  
  function remarkTabsPlugin() {
    return (tree) => {
      remarkDirective(tree, {
        handlers: {
          tabs: (directive) => {
            // 生成Tabs组件AST
          },
          tab: (directive) => {
            // 生成TabItem组件AST
          }
        }
      });
    };
  }
  ```

**方案B - MDX + Astro组件** (类型安全)
- **组件** (src/components/Tabs.astro):
  ```astro
  ---
  const tabs = Astro.slots.has('default') ? Astro.slots.get('default') : [];
  ---
  <div class="tabs">
    {tabs.map((tab, index) => (
      <div class={`tab ${index === 0 ? 'active' : ''}`}>
        {tab}
      </div>
    ))}
  </div>
  ```

### 子问题2.6: youtube/vimeo标签
**Hexo语法**:
```md
{% youtube video_id %}
{% vimeo video_id [width] [height] %}
```

**方案A - 使用remark-hexo插件** (快速)
- remark-hexo支持youtube标签
- 保留原语法

**方案B - 转换为HTML** (简单)
```md
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/video_id"
  frameborder="0" 
  allowfullscreen>
</iframe>
```

**方案C - MDX组件** (可复用)
```mdx
---
title: Post
---
import VideoEmbed from '../components/VideoEmbed.astro';

<VideoEmbed platform="youtube" id="video_id" />
```

### 子问题2.7: 其他Hexo标签
**iframe标签**:
```md
<!-- Hexo -->
{% iframe url [width] [height] %}

<!-- Astro -->
<iframe src="url" width="width" height="height"></iframe>
```

**raw标签**:
```md
<!-- Hexo -->
{% raw %}
  <script>console.log('not rendered')</script>
{% endraw %}

<!-- Astro - markdown -->
<script is:inline>console.log('rendered')</script>
```

**link标签**:
```md
<!-- Hexo -->
{% link text url %}

<!-- Astro -->
<a href="url" target="_blank">text</a>
```

**状态**: 已识别详细转换策略，需要根据使用频率选择

## 问题3: 空tags数组处理 (2026-01-26)
**描述**: 部分文章的tags字段为空数组或只有`tags:`没有值
**影响**: 在Astro的Zod schema验证中可能失败
**解决方案**: 转换时确保tags总是数组，空值为`[]`
**状态**: 已识别解决方案

## 问题4: NexT主题功能缺失 (2026-01-26)
**描述**: NexT主题的特定功能(如阅读进度条、系列导航)在Astro中需要重新实现
**影响**: 用户可能注意到功能差异
**解决方案**:
- 阅读进度条: 使用Astro组件实现
- 系列导航: 通过内容集合查询实现
- 需要评估哪些功能是必须的
**状态**: 需要详细功能分析

## 问题5: URL结构保持 (2026-01-26)
**描述**: 需要保持现有URL结构以确保SEO不受影响
**影响**: Astro的路由系统与Hexo不同，需要仔细配置
**解决方案**:
- 配置Astro的permalink格式匹配Hexo
- 设置重定向规则处理不匹配的URL
**状态**: 需要验证

## 问题6: 搜索功能替代 (2026-01-26)
**描述**: Hexo使用hexo-generator-searchdb插件，需要找到Astro替代方案
**影响**: 搜索体验可能不同
**解决方案**:
- 方案1: 使用Pagefind (推荐)
- 方案2: 实现客户端搜索
- 方案3: 集成Algolia (如有需要)
**状态**: 需要测试不同方案

## 问题7: RSS订阅支持 (2026-01-26)
**描述**: Hexo自动生成RSS，需要在Astro中配置
**影响**: 订阅用户可能受到影响
**解决方案**: 使用`@astrojs/rss`包生成RSS和Atom订阅
**状态**: 解决方案明确

## 问题8: 构建性能差异 (2026-01-26)
**描述**: Astro的构建系统与Hexo不同，可能影响构建时间和输出
**影响**: 部署流程可能需要调整
**解决方案**: 测试Astro构建性能，优化配置
**状态**: 需要基准测试

## 问题9: 图片资源处理 (2026-01-26)
**描述**: Hexo的post_asset_folder功能可能需要调整
**影响**: 文章内图片链接可能需要更新
**解决方案**:
- 将图片移动到Astro的public目录
- 更新文章中的图片路径
- 使用Astro的图片优化功能
**状态**: 需要详细迁移计划

## 问题10: 代码高亮差异 (2026-01-26)
**描述**: Hexo使用highlight.js，Astro使用Shiki
**影响**: 代码高亮样式可能不同
**解决方案**: 配置Shiki使用类似主题，或自定义CSS
**状态**: 需要样式调整

## 问题11: 草稿文章处理 (2026-01-26)
**描述**: Hexo的draft文章需要正确处理
**影响**: 可能意外发布草稿
**解决方案**: 在Astro schema中添加draft字段，构建时过滤
**状态**: 解决方案明确

## 问题12: 插件生态系统差异 (2026-01-26)
**描述**: Hexo插件在Astro中不可用
**影响**: 需要找到替代方案或自定义实现
**解决方案**: 评估每个插件的功能需求，寻找Astro等效方案
**状态**: 需要插件功能分析
