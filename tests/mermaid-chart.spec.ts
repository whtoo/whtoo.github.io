import { test, expect } from '@playwright/test';

test.describe('Mermaid Chart Rendering', () => {
  test('should render Mermaid flowchart on about page', async ({ page }) => {
    // Navigate to about page
    await page.goto('http://localhost:4321/about/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page contains Mermaid-related elements
    // 1. Check for Mermaid container elements
    const mermaidContainers = await page.locator('.mermaid').count();
    expect(mermaidContainers).toBeGreaterThan(0);
    
    // 2. Check that Mermaid containers have been transformed to SVG
    const svgElements = await page.locator('.mermaid svg').count();
    expect(svgElements).toBeGreaterThan(0);
    
    // 3. Check for specific flowchart elements
    const flowChartElements = await page.locator('.mermaid svg .flowchart').count();
    expect(flowChartElements).toBeGreaterThan(0);
    
    // 4. Verify the chart has reasonable size (not 0x0)
    const firstSvg = page.locator('.mermaid svg').first();
    const svgBoundingBox = await firstSvg.boundingBox();
    expect(svgBoundingBox?.width).toBeGreaterThan(50);
    expect(svgBoundingBox?.height).toBeGreaterThan(50);
    
    // 5. Check for specific text in the flowchart
    await expect(page.locator('text=Start')).toBeVisible();
    await expect(page.locator('text=End')).toBeVisible();
    
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
    
    await page.goto('http://localhost:4321/about/');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for any async errors
    await page.waitForTimeout(1000);
    
    if (consoleErrors.length > 0) {
      console.error('Console errors found:', consoleErrors);
    }
    
    expect(consoleErrors.length).toBe(0);
  });
  
  test('should have Mermaid CSS styles applied', async ({ page }) => {
    await page.goto('http://localhost:4321/about/');
    await page.waitForLoadState('networkidle');
    
    // Check that Mermaid containers have expected CSS
    const mermaidContainer = page.locator('.mermaid').first();
    
    // Check for background color (from custom.css)
    const backgroundColor = await mermaidContainer.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Should have a background color (not transparent)
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    
    // Check for border radius
    const borderRadius = await mermaidContainer.evaluate(el => {
      return window.getComputedStyle(el).borderRadius;
    });
    
    // Should have border radius from custom.css
    expect(borderRadius).toBe('8px');
  });
});