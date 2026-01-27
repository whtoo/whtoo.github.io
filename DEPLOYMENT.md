# GitHub Pages 部署指南

## 部署配置

### 1. GitHub Actions 工作流
项目已配置 GitHub Actions 工作流文件：`.github/workflows/deploy.yml`

工作流会在以下情况下自动触发：
- 推送到 `main` 分支
- 创建到 `main` 分支的 Pull Request
- 手动触发（Workflow Dispatch）

### 2. 部署流程
1. **构建阶段**：
   - 使用 Ubuntu 最新版
   - Node.js 20
   - 安装依赖：`npm ci`
   - 构建项目：`npm run build`

2. **部署阶段**：
   - 将构建产物上传为 Pages Artifact
   - 部署到 GitHub Pages 环境
   - 使用环境：`github-pages`

### 3. 部署 URL
- 主站点：https://whtoo.github.io
- 博客列表：https://whtoo.github.io/blog/
- 关于页面：https://whtoo.github.io/about/
- 项目页面：https://whtoo.github.io/projects/

## 手动部署步骤

### 步骤 1：推送代码到 GitHub
```bash
git add .
git commit -m "部署 Astro 博客"
git push origin main
```

### 步骤 2：监控部署状态
1. 访问 GitHub 仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流运行状态
3. 等待部署完成（通常需要 1-2 分钟）

### 步骤 3：验证部署
部署完成后，访问以下 URL 验证：

1. **主站点**：
   ```
   https://whtoo.github.io/
   ```

2. **关键页面**：
   - 博客列表：`/blog/`
   - 关于页面：`/about/`
   - 项目页面：`/projects/`

3. **功能验证**：
   - 站点地图：`/sitemap-index.xml`
   - RSS 订阅：`/rss.xml`
   - robots.txt：`/robots.txt`

## 故障排除

### 常见问题

#### 1. 构建失败
**症状**：GitHub Actions 构建阶段失败
**解决方案**：
- 检查 Node.js 版本兼容性
- 验证依赖安装：`npm ci` 是否成功
- 查看构建日志中的具体错误信息

#### 2. 部署失败
**症状**：构建成功但部署失败
**解决方案**：
- 检查 GitHub Pages 设置
- 验证仓库权限
- 确保 `gh-pages` 分支不存在冲突

#### 3. 页面 404 错误
**症状**：部署成功但页面无法访问
**解决方案**：
- 检查 `astro.config.mjs` 中的 `site` 配置
- 验证路由配置
- 检查构建输出中的文件结构

#### 4. 资源加载失败
**症状**：页面显示但样式/图片缺失
**解决方案**：
- 检查静态资源路径
- 验证图片优化配置
- 查看浏览器控制台错误

## 性能优化验证

### 构建性能
- 预期构建时间：< 2 秒
- 构建输出大小：< 2 MB
- 页面数量：18 个静态页面

### 页面性能
- 无客户端 JavaScript
- 图片已优化为 WebP 格式
- CSS 文件已压缩
- 字体预加载配置

### SEO 优化
- ✅ 完整的 Open Graph 标签
- ✅ Twitter Card 支持
- ✅ 规范 URL 配置
- ✅ 站点地图生成
- ✅ robots.txt 配置
- ✅ RSS 订阅支持

## 监控和维护

### 定期检查
1. **构建状态**：每周检查 GitHub Actions 运行状态
2. **页面性能**：每月使用 Lighthouse 测试关键页面
3. **内容更新**：确保新文章正确显示

### 更新流程
1. 本地开发测试
2. 提交到 GitHub
3. 监控自动部署
4. 验证生产环境

## 回滚方案

如果部署出现问题，可以：

1. **快速回滚**：
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **手动回滚**：
   - 恢复到之前的稳定版本
   - 强制推送到 main 分支（谨慎使用）

3. **禁用部署**：
   - 在 GitHub Actions 中禁用工作流
   - 手动修复问题后重新启用

## 联系支持

如果遇到无法解决的问题：
1. 查看 [Astro 文档](https://docs.astro.build)
2. 检查 [GitHub Pages 文档](https://docs.github.com/en/pages)
3. 在项目 Issues 中报告问题

---

**最后更新**：2026年1月26日
**部署状态**：✅ 配置完成，等待首次部署