import { test, expect } from '@playwright/test';

// 收集所有 console 消息
const checkPageConsole = async (page, url: string) => {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const allMessages: string[] = [];
  
  page.on('console', msg => {
    const text = msg.text();
    allMessages.push(`[${msg.type()}] ${text}`);
    
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(text);
    }
  });
  
  // 捕获页面错误
  page.on('pageerror', error => {
    consoleErrors.push(`PageError: ${error.message}`);
  });
  
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  
  // 等待一段时间以捕获异步错误
  await page.waitForTimeout(1000);
  
  return { consoleErrors, consoleWarnings, allMessages };
};

const pages = [
  { url: 'http://localhost:4321/', name: 'Home' },
  { url: 'http://localhost:4321/about/', name: 'About' },
  { url: 'http://localhost:4321/blog/', name: 'Blog Index' },
  { url: 'http://localhost:4321/projects/', name: 'Projects' },
  { url: 'http://localhost:4321/blog/x个数之和系列问题/', name: 'Blog Post 1' },
  { url: 'http://localhost:4321/blog/css3实践研究/', name: 'Blog Post 2' },
  { url: 'http://localhost:4321/blog/0x06-interpreter-implementation-racket/', name: 'Blog Post 3' },
];

test.describe('Console Error and Warning Check', () => {
  for (const pageInfo of pages) {
    test(`check console for ${pageInfo.name}`, async ({ page }) => {
      const { consoleErrors, consoleWarnings, allMessages } = await checkPageConsole(page, pageInfo.url);
      
      console.log(`\n=== ${pageInfo.name} (${pageInfo.url}) ===`);
      console.log('All messages:', allMessages.length > 0 ? allMessages.join('\n') : '(none)');
      
      if (consoleErrors.length > 0) {
        console.error('Errors found:', consoleErrors);
      }
      if (consoleWarnings.length > 0) {
        console.warn('Warnings found:', consoleWarnings);
      }
      
      // 报告但不失败，用于收集信息
      expect(consoleErrors).toEqual([]);
      expect(consoleWarnings).toEqual([]);
    });
  }
});
