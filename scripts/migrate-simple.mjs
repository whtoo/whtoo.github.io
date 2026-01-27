#!/usr/bin/env node

/**
 * Hexo到Astro文章转换脚本 - 简化版
 * 处理Hexo特有标签语法，迁移媒体资源
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置路径
const HEXO_POSTS_DIR = path.join(__dirname, '../../source/_posts');
const ASTRO_CONTENT_DIR = path.join(__dirname, '../src/content/blog');
const ASTRO_PUBLIC_DIR = path.join(__dirname, '../public');

/**
 * 手动迁移单篇文章
 */
async function migratePostManually(filename) {
  const hexoPath = path.join(HEXO_POSTS_DIR, filename);
  
  try {
    let content = await fs.readFile(hexoPath, 'utf-8');
    
    // 修复编码问题
    content = content.replace(/\r\n/g, '\n'); // 统一换行符
    content = content.replace(/[\x00-\x1F\x7F-\x9F]/g, ''); // 移除控制字符
    
    // 分离Front Matter和正文
    const parts = content.split('\n---\n');
    if (parts.length < 2) {
      console.error(`❌ 无法解析文件格式: ${filename}`);
      return null;
    }
    
    const frontMatterRaw = parts[0].replace(/^---\n/, '');
    const articleContent = parts.slice(1).join('\n---\n');
    
    // 解析Front Matter
    const astroFM = {};
    const fmLines = frontMatterRaw.split('\n');
    
    for (const line of fmLines) {
      if (!line.trim() || line.trim() === '---') continue;
      
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      if (key === 'date') {
        astroFM.pubDate = value;
      } else if (key === 'order') {
        astroFM.seriesOrder = parseInt(value) || 1;
      } else if (key === 'tags') {
        astroFM.tags = [];
      } else if (key === 'title') {
        astroFM.title = value;
      } else if (key === 'series') {
        astroFM.series = value;
      } else {
        astroFM[key] = value;
      }
    }
    
    // 转换Hexo标签
    let convertedContent = articleContent;
    
    // 转换 blockquote
    convertedContent = convertedContent.replace(
      /\{%\s*blockquote\s+([^%]+)\s*%\}/g,
      (match, args) => {
        const parts = args.trim().split(' ');
        const author = parts[0]?.replace(/^@/, '');
        const url = parts[1];
        return url ? `> 来源: [${author}](${url})\n> ` : `> ${author ? `${author}: ` : ''}`;
      }
    );
    convertedContent = convertedContent.replace(/\{%\s*endblockquote\s*%\}/g, '');
    
    // 转换 asset_image
    convertedContent = convertedContent.replace(
      /\{%\s*asset_image\s+([^\s]+)\s+"([^"]*)"\s*%\}/g,
      (match, filename, title) => `![${title}](/images/${filename})`
    );
    
    // 转换 include_code（简化处理）
    convertedContent = convertedContent.replace(
      /\{%\s*include_code[^%]*%\}/g,
      '```\n// 代码文件内容需要手动添加\n```'
    );
    
    // 转换 codeblock
    convertedContent = convertedContent.replace(/\{%\s*codeblock[^%]*%\}/g, '```');
    convertedContent = convertedContent.replace(/\{%\s*endcodeblock\s*%\}/g, '```');
    
    // 移除more标签
    convertedContent = convertedContent.replace(/<!--\s*more\s*-->/g, '');
    
    // 生成Astro文件名
    const astroFilename = filename.replace(/\.md$/, '').replace(/[^\w\u4e00-\u9fa5-]/g, '') + '.md';
    
    // 构建Astro内容
    const astroContent = `---
title: "${astroFM.title || '无标题'}"
pubDate: ${astroFM.pubDate || new Date().toISOString()}
tags: []
${astroFM.series ? `series: "${astroFM.series}"` : ''}
${astroFM.seriesOrder ? `seriesOrder: ${astroFM.seriesOrder}` : ''}
description: ""
---

${convertedContent}`;
    
    // 保存文件
    const targetPath = path.join(ASTRO_CONTENT_DIR, astroFilename);
    await fs.writeFile(targetPath, astroContent);
    
    console.log(`✅ 成功迁移: ${filename} -> ${astroFilename}`);
    return astroFilename;
    
  } catch (error) {
    console.error(`❌ 迁移失败: ${filename}`, error.message);
    return null;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始手动Hexo到Astro迁移...\n');
  
  const articles = [
    'CSS3实践研究.md',
    'From-0-to-1-Graphviz.md', 
    'X个数之和系列问题.md',
    '从零开始的Dot可视化历险.md',
    '汇编研究I.md'
  ];
  
  let successCount = 0;
  
  for (const filename of articles) {
    console.log(`📄 处理: ${filename}`);
    const result = await migratePostManually(filename);
    if (result) successCount++;
  }
  
  console.log(`\n📊 迁移完成: ${successCount}/${articles.length} 篇成功`);
}

// 运行脚本
main().catch(console.error);