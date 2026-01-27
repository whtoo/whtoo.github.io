import { test, expect } from '@playwright/test';

test.describe('Mermaid Chart Rendering', () => {
  test('should render Mermaid flowchart on about page', async ({ page }) => {
    // Navigate to about page
    await page.goto('http://localhost:4321/about/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page contains Mermaid-rendered elements
    // Mermaid charts are rendered as <img> tags with id starting with 'mermaid-'
    const mermaidImages = await page.locator('img[id^="mermaid-"]').count();
    expect(mermaidImages).toBeGreaterThan(0);
    
    // 2. Check that Mermaid images have valid src (SVG data)
    const firstMermaidImg = page.locator('img[id^="mermaid-"]').first();
    const src = await firstMermaidImg.getAttribute('src');
    expect(src).toContain('data:image/svg+xml');
    
    // 3. Verify the image has reasonable size (not 0x0)
    const imgBoundingBox = await firstMermaidImg.boundingBox();
    expect(imgBoundingBox?.width).toBeGreaterThan(50);
    expect(imgBoundingBox?.height).toBeGreaterThan(50);
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'tests/screenshots/mermaid-flowchart.png', fullPage: true });
  });
  
  test('should not have JavaScript console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Capture page errors
    page.on('pageerror', error => {
      consoleErrors.push(`PageError: ${error.message}`);
    });
    
    await page.goto('http://localhost:4321/about/');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for any async errors
    await page.waitForTimeout(1000);
    
    if (consoleErrors.length > 0) {
      console.error('Console errors found:', consoleErrors);
    }
    
    expect(consoleErrors.length).toBe(0);
  });
  
  test('should have Mermaid images with proper attributes', async ({ page }) => {
    await page.goto('http://localhost:4321/about/');
    await page.waitForLoadState('networkidle');
    
    // Check that Mermaid images exist and have proper attributes
    const mermaidImages = page.locator('img[id^="mermaid-"]');
    
    // Should have at least one mermaid image
    await expect(mermaidImages.first()).toBeVisible();
    
    // Check each mermaid image has valid dimensions
    const count = await mermaidImages.count();
    for (let i = 0; i < count; i++) {
      const img = mermaidImages.nth(i);
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');
      
      // Dimensions should be valid numbers
      expect(Number(width)).toBeGreaterThan(0);
      expect(Number(height)).toBeGreaterThan(0);
    }
  });
});
