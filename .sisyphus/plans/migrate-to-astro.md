# 从Hexo迁移到Astro的完整技术迁移计划

## 项目概况
**当前系统**: Hexo 8.1.1 + NexT主题 (v8.26.0)
**目标系统**: Astro最新版本
**迁移目标**: 将现有的中文技术博客从Hexo平台迁移到Astro，保持现有功能，提升性能，并改善开发体验。

## 一、迁移原则与约束

### 1.1 核心原则
1. **功能对等**: 迁移后所有现有功能必须正常工作
2. **内容无损**: 所有文章、页面、媒体文件必须完整迁移
3. **URL保持**: 尽可能保持现有URL结构，确保SEO不受影响
4. **渐进迁移**: 采用分阶段迁移，允许回滚

### 1.2 技术约束
- 保留中文语言支持 (zh-CN)
- 保持GitHub Pages部署方式
- 保持现有Markdown文章的格式和内容
- 保持Mermaid/Graphviz图表支持

## 二、迁移风险评估

| 风险点 | 影响程度 | 缓解措施 |
|--------|----------|----------|
| Hexo特有标签语法 | 高 | 开发转换脚本，逐一检查 |
| NexT主题功能缺失 | 中 | 提前评估，寻找Astro等效组件 |
| URL结构变化 | 高 | 实施301重定向规则 |
| 搜索功能实现 | 中 | 评估Astro内置搜索方案 |
| 构建性能 | 低 | Astro自带优化，预期提升 |

## 三、迁移阶段划分

### 阶段1: 环境准备与分析 (1-2天)
- [x] 创建新的Astro项目
- [x] 分析Hexo目录结构与Astro目录映射
- [x] 制定内容迁移策略
- [x] 评估插件/功能替代方案

### 阶段2: 基础框架搭建 (2-3天)
- [x] 建立Astro项目基础结构
- [x] 配置TypeScript/内容集合
- [ ] 实现基础布局组件
- [ ] 配置构建和部署流程

### 阶段3: 内容迁移 (3-4天)
- [ ] 迁移所有Markdown文章
- [ ] 处理Front Matter转换
- [ ] 迁移静态页面（about, projects等）
- [ ] 处理媒体资源迁移

### 阶段4: 功能实现 (4-5天)
- [ ] 实现导航菜单
- [ ] 实现标签/分类系统
- [ ] 实现搜索功能
- [ ] 实现Mermaid/Graphviz支持
- [ ] 实现主题样式

### 阶段5: 测试与优化 (2-3天)
- [ ] 功能完整性测试
- [ ] 性能测试与优化
- [ ] SEO验证
- [ ] 部署测试

### 阶段6: 切换上线 (1天)
- [ ] 最终部署
- [ ] 监控和验证
- [ ] 文档更新

## 四、详细技术方案

### 4.1 目录结构映射

**Hexo -> Astro 映射表**:
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

### 4.2 Front Matter转换规则

**Hexo Front Matter示例**:
```yaml
---
title: 汇编研究I
date: 2023-09-27 20:29:45
tags:
layout: photo
series: 解释器系列
order: 1
---
```

**Astro Front Matter转换**:
```yaml
---
title: 汇编研究I
pubDate: 2023-09-27T20:29:45
tags: []
layout: ../../layouts/BlogPost.astro
series: 解释器系列
seriesOrder: 1
draft: false
---
```

**转换注意事项**:
1. `date` -> `pubDate` (ISO格式)
2. 空tags数组需要处理
3. layout路径需要调整
4. 保持所有自定义字段

### 4.3 内容集合配置

在`src/content/config.ts`中定义:
```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    layout: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};
```

### 4.4 关键功能实现方案

#### 4.4.1 导航菜单
- **实现**: Astro组件 (`src/components/Navigation.astro`)
- **配置**: 从`src/config/site.ts`读取菜单项
- **样式**: 保持NexT类似的简洁风格

#### 4.4.2 标签/分类系统
- **实现**: 使用Astro内容集合查询
- **页面**: 动态生成标签页和分类页
- **URL**: `/tags/[tag]/` 和 `/categories/[category]/`

#### 4.4.3 搜索功能
- **方案1**: 使用`@astrojs/starlight`的搜索
- **方案2**: 实现客户端搜索（Pagefind或FlexSearch）
- **方案3**: 集成Algolia（如有需要）

#### 4.4.4 Mermaid/Graphviz支持
- **方案**: 使用`@astrojs/mdx` + `rehype-mermaid`插件
- **备用**: 自定义Astro组件渲染图表

#### 4.4.5 代码高亮
- **方案**: 使用Astro内置的Shiki高亮
- **配置**: 在`astro.config.mjs`中配置主题

#### 4.4.6 RSS订阅
- **方案**: 使用`@astrojs/rss`包
- **输出**: `/rss.xml`和`/atom.xml`

### 4.5 样式迁移策略

#### 4.5.1 整体策略
1. **渐进重构**: 先保证功能，再优化样式
2. **组件化**: 将NexT主题组件转为Astro组件
3. **CSS模块**: 使用Astro的CSS模块化支持

#### 4.5.2 样式文件结构
```
src/styles/
├── global.css      # 全局样式
├── variables.css   # CSS变量（颜色、间距等）
├── components/     # 组件样式
│   ├── Navigation.css
│   ├── PostCard.css
│   └── ...
└── pages/         # 页面特定样式
    ├── blog.css
    └── ...
```

### 4.6 构建与部署

#### 4.6.1 构建配置 (`astro.config.mjs`)
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://whtoo.github.io',
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
```

#### 4.6.2 部署配置
- **平台**: GitHub Pages
- **分支**: 主分支或gh-pages
- **工作流**: 使用GitHub Actions自动部署
- **域名**: 保持现有域名配置

## 五、迁移检查清单

### 5.1 内容完整性检查
- [ ] 所有文章数量匹配
- [ ] 每篇文章内容完整
- [ ] Front Matter字段正确转换
- [ ] 图片/资源文件完整
- [ ] 内部链接正确

### 5.2 功能完整性检查
- [ ] 导航菜单工作正常
- [ ] 标签/分类页面正确显示
- [ ] 搜索功能可用
- [ ] Mermaid/Graphviz图表正常渲染
- [ ] 代码高亮正常
- [ ] RSS订阅正常
- [ ] 分页功能正常

### 5.3 性能与SEO检查
- [ ] 页面加载性能
- [ ] Lighthouse评分
- [ ] 移动端适配
- [ ] 结构化数据
- [ ] 站点地图生成
- [ ] 重定向规则

## 六、回滚计划

### 6.1 回滚条件
1. 关键功能无法正常工作
2. 性能显著下降
3. SEO数据异常
4. 用户体验明显变差

### 6.2 回滚步骤
1. 切换GitHub Pages部署分支回Hexo版本
2. 恢复DNS指向（如有自定义域名）
3. 通知用户维护窗口
4. 分析失败原因，制定修复计划

## 七、时间线与里程碑

**总工期**: 约2周（14个工作日）

**关键里程碑**:
1. **M1** (第2天): 完成环境准备和基础框架
2. **M2** (第5天): 完成所有内容迁移
3. **M3** (第9天): 完成核心功能实现
4. **M4** (第12天): 完成测试和优化
5. **M5** (第14天): 正式上线

## 八、资源需求

### 8.1 技术资源
- Node.js 18+
- Git版本控制
- GitHub仓库
- 本地开发环境

### 8.2 人员投入
- 前端开发: 1人（主要实施）
- 测试验证: 1人（交叉验证）
- 文档更新: 1人（同步更新）

## 九、成功指标

### 9.1 技术指标
- 构建时间减少50%以上
- 页面加载速度提升30%以上
- Lighthouse评分90+ 
- 零生产环境故障

### 9.2 业务指标
- 用户访问量不受影响
- SEO排名保持稳定
- 用户满意度不下降
- 新功能开发效率提升

## 十、后续优化计划

### 10.1 短期优化 (上线后1个月内)
- 进一步性能优化
- 添加渐进式Web应用支持
- 优化移动端体验

### 10.2 中期优化 (1-3个月)
- 添加暗色模式
- 增强搜索功能
- 添加更多交互功能

### 10.3 长期规划 (3个月以上)
- 考虑添加评论系统
- 添加用户交互功能
- 国际化支持扩展

---

**最后更新**: 2026-01-26  
**版本**: v1.0  
**状态**: 草稿（待评审）