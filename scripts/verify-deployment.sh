#!/bin/bash

# 部署验证脚本
# 用于验证 GitHub Pages 部署的完整性

set -e

echo "🔍 开始验证部署配置..."

# 检查关键文件
echo "📁 检查关键文件..."
required_files=(
    ".github/workflows/deploy.yml"
    "astro.config.mjs"
    "package.json"
    "DEPLOYMENT.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file - 缺失"
        exit 1
    fi
done

# 检查构建配置
echo "⚙️  检查构建配置..."
if grep -q '"build": "astro build"' package.json; then
    echo "  ✅ package.json 构建脚本配置正确"
else
    echo "  ❌ package.json 构建脚本配置错误"
    exit 1
fi

# 检查站点配置
echo "🌐 检查站点配置..."
if grep -q "site: 'https://whtoo.github.io'" astro.config.mjs; then
    echo "  ✅ 站点 URL 配置正确"
else
    echo "  ❌ 站点 URL 配置错误"
    exit 1
fi

# 检查输出配置
echo "📦 检查输出配置..."
if grep -q "output: 'static'" astro.config.mjs; then
    echo "  ✅ 静态输出配置正确"
else
    echo "  ❌ 静态输出配置错误"
    exit 1
fi

# 检查 GitHub Actions 配置
echo "🚀 检查 GitHub Actions 配置..."
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "  ✅ GitHub Actions 工作流文件存在"
    
    # 检查关键配置
    if grep -q "actions/deploy-pages" .github/workflows/deploy.yml; then
        echo "  ✅ 使用 GitHub Pages 部署动作"
    else
        echo "  ❌ 未找到 GitHub Pages 部署动作"
        exit 1
    fi
    
    if grep -q "ubuntu-latest" .github/workflows/deploy.yml; then
        echo "  ✅ 使用 Ubuntu 最新版运行器"
    else
        echo "  ❌ 运行器配置错误"
        exit 1
    fi
else
    echo "  ❌ GitHub Actions 工作流文件缺失"
    exit 1
fi

# 检查构建输出
echo "🏗️  检查构建输出..."
if [ -d "dist" ]; then
    echo "  ✅ 构建输出目录存在"
    
    # 检查关键文件
    dist_files=(
        "dist/index.html"
        "dist/sitemap-index.xml"
        "dist/robots.txt"
    )
    
    for file in "${dist_files[@]}"; do
        if [ -f "$file" ]; then
            echo "  ✅ $file"
        else
            echo "  ⚠️  $file - 缺失（可能需要重新构建）"
        fi
    done
    
    # 统计页面数量
    page_count=$(find dist -name "*.html" -type f | wc -l)
    echo "  📄 生成页面数量: $page_count"
    
    # 检查文件大小
    total_size=$(du -sh dist | cut -f1)
    echo "  📊 构建输出总大小: $total_size"
else
    echo "  ⚠️  构建输出目录不存在（需要运行 npm run build）"
fi

echo ""
echo "✅ 部署配置验证完成！"
echo ""
echo "📋 下一步："
echo "1. 提交代码到 GitHub: git add . && git commit -m '部署 Astro 博客' && git push origin main"
echo "2. 访问 GitHub Actions 监控部署状态"
echo "3. 部署完成后访问: https://whtoo.github.io"
echo ""
echo "🔗 相关链接："
echo "- GitHub Actions: https://github.com/whtoo/whtoo.github.io/actions"
echo "- GitHub Pages: https://github.com/whtoo/whtoo.github.io/settings/pages"
echo "- 生产站点: https://whtoo.github.io"