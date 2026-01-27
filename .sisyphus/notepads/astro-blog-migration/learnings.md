# Learnings - Astro Blog Migration to Starlight

## Chart Rendering Issues Identified
1. rehype-mermaid plugin only configured for MDX, not for Markdown
2. No Mermaid client-side JavaScript included
3. CSS styles for Mermaid not added to custom.css
4. Charts are showing as syntax-highlighted code blocks instead of rendered diagrams

## Codebase Structure
- Two content collections: blog and docs
- 7 duplicate files between blog/ and docs/
- Blog pages depend on blog collection
- Starlight uses docs collection automatically
- about.md contains Mermaid example but not rendering

## Configuration
- astro.config.mjs has MDX integration with rehype-mermaid
- Shiki config includes mermaid, dot, graphviz languages
- package.json includes rehype-mermaid in devDependencies

## Mermaid Chart Rendering Fixes Applied
1. **Configuration**: Added rehype-mermaid to markdown.rehypePlugins in astro.config.mjs
2. **Dependencies**: Installed mermaid package for client-side rendering
3. **CSS**: Added Mermaid styles to src/styles/custom.css with dark theme support
4. **JavaScript**: Added Mermaid initialization to:
   - SeriesNavigation.astro (for blog posts with series navigation)
   - Page.astro (for pages like about.md that don't have series navigation)
5. **Strategy**: Using 'pre-mermaid' strategy which preserves code for client-side rendering

## Key Insights
- 'pre-mermaid' strategy requires manual Mermaid initialization
- Mermaid initialization must be added to all layouts that might contain charts
- about.md uses Page.astro layout, not BlogPost.astro
- Build passes successfully with all changes
- Development server runs on port 4321 (not 4322 as previously thought)

## Testing Results
- Build: ✅ Success (1.88s, 14 pages)
- Mermaid import: ✅ Present in about page and blog posts
- CSS: ✅ Added with dark theme support
- Configuration: ✅ rehype-mermaid configured for both MDX and Markdown

## Remaining Issues
1. Duplicate content between blog/ and docs/ directories
2. Need to verify actual chart rendering in browser (requires visual testing)
3. Graphviz/DOT support only provides syntax highlighting, not rendering
4. LSP errors in astro.config.mjs (language registration type issues)
5. LSP error in SeriesNavigation.astro (slug property doesn't exist)

## Enhanced Mermaid Features Added
1. **Improved CSS**:
   - Enhanced styling with hover effects
   - Chart title labels
   - Better spacing and shadows
   - Print-friendly styles
   - Theme-aware node styling

2. **Enhanced Configuration**:
   - Better font settings
   - Improved spacing and padding
   - Gantt chart configuration
   - Security level set to 'loose' for flexibility
   - Responsive design with useMaxWidth

3. **Visual Enhancements**:
   - Subtle hover animations
   - Professional chart labeling
   - Consistent theme colors
   - Dark theme optimizations

## Duplicate Content Analysis
- 7 duplicate files between blog/ and docs/
- from-0-to-1-graphviz.md only exists in blog/
- Blog collection used by: blog index, individual posts, series navigation, RSS feed
- Docs collection used automatically by Starlight
- Frontmatter differs between collections (blog has pubDate, tags, series; docs has sidebar config)

## Recommendations
1. **Keep both collections** for now to avoid breaking changes
2. **Future migration**: Copy frontmatter from blog to docs, then update dependencies
3. **Visual testing**: Need to verify Mermaid charts render correctly in browser
4. **Graphviz**: Consider client-side rendering with d3-graphviz or server-side with Graphviz CLI

## Build Performance
- Initial build: 2.24s
- After optimizations: 1.84s
- 14 pages generated
- Pagefind search index built in 134ms

## Next Steps
1. Visual verification of Mermaid chart rendering
2. Consider Graphviz rendering solution
3. Address LSP errors (non-blocking but should be fixed)
4. Plan gradual migration from blog to docs collection
5. Add automated tests for chart rendering