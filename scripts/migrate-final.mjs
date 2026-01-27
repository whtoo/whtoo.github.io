#!/usr/bin/env node

/**
 * Hexo到Astro文章转换脚本 - 最终版
 * 直接处理文件，不依赖复杂解析
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置路径
const HEXO_POSTS_DIR = path.join(__dirname, '../../source/_posts');
const ASTRO_CONTENT_DIR = path.join(__dirname, '../src/content/blog');

/**
 * 直接转换单篇文章
 */
async function convertArticleDirectly(filename) {
  const hexoPath = path.join(HEXO_POSTS_DIR, filename);
  
  try {
    // 读取文件内容
    let content = await fs.readFile(hexoPath, 'utf-8');
    
    // 简单清理：移除控制字符，统一换行符
    content = content.replace(/\r\n/g, '\n');
    content = content.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
    
    // 手动解析Front Matter
    let title = '无标题';
    let pubDate = new Date().toISOString();
    let series = '';
    let seriesOrder = 1;
    let tags = [];
    
    // 提取title
    const titleMatch = content.match(/title:\s*(.+)/i);
    if (titleMatch) title = titleMatch[1].trim();
    
    // 提取date
    const dateMatch = content.match(/date:\s*(.+)/i);
    if (dateMatch) pubDate = dateMatch[1].trim();
    
    // 提取series
    const seriesMatch = content.match(/series:\s*(.+)/i);
    if (seriesMatch) series = seriesMatch[1].trim();
    
    // 提取order
    const orderMatch = content.match(/order:\s*(\d+)/i);
    if (orderMatch) seriesOrder = parseInt(orderMatch[1]);
    
    // 移除Front Matter部分
    const contentWithoutFM = content.replace(/^---[\s\S]*?---\n/, '');
    
    // 转换Hexo标签
    let convertedContent = contentWithoutFM;
    
    // 转换 blockquote
    convertedContent = convertedContent.replace(
      /\{%\s*blockquote[^%]*%\}/g,
      '> '
    );
    convertedContent = convertedContent.replace(/\{%\s*endblockquote\s*%\}/g, '');
    
    // 转换 asset_image
    convertedContent = convertedContent.replace(
      /\{%\s*asset_image\s+([^\s]+)\s+"([^"]*)"\s*%\}/g,
      (match, filename, title) => `![${title}](/images/${filename})`
    );
    
    // 转换 include_code（简化）
    convertedContent = convertedContent.replace(
      /\{%\s*include_code[^%]*%\}/g,
      '```\n// 代码文件内容\n```'
    );
    
    // 转换 codeblock
    convertedContent = convertedContent.replace(/\{%\s*codeblock[^%]*%\}/g, '```');
    convertedContent = convertedContent.replace(/\{%\s*endcodeblock\s*%\}/g, '```');
    
    // 移除more标签
    convertedContent = convertedContent.replace(/<!--\s*more\s*-->/g, '');
    
    // 生成Astro文件名
    const astroFilename = filename
      .replace(/\.md$/, '')
      .replace(/[^\w\u4e00-\u9fa5-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase() + '.md';
    
    // 构建Astro内容
    const astroContent = `---
title: "${title}"
pubDate: ${pubDate}
tags: []
${series ? `series: "${series}"` : ''}
${seriesOrder > 1 ? `seriesOrder: ${seriesOrder}` : ''}
description: ""
---

${convertedContent}`;
    
    // 保存文件
    const targetPath = path.join(ASTRO_CONTENT_DIR, astroFilename);
    await fs.writeFile(targetPath, astroContent, 'utf-8');
    
    console.log(`✅ 成功: ${filename} -> ${astroFilename}`);
    return astroFilename;
    
  } catch (error) {
    console.error(`❌ 失败: ${filename}`, error.message);
    return null;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始Hexo到Astro文章迁移...\n');
  
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
    const result = await convertArticleDirectly(filename);
    if (result) successCount++;
  }
  
  console.log(`\n📊 迁移完成: ${successCount}/${articles.length} 篇成功`);
}

// 运行脚本
main().catch(console.error);