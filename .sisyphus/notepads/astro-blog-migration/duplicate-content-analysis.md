# Duplicate Content Analysis

## Files Analysis

### Blog Directory (8 files)
1. 0x06-interpreter-implementation-racket.md
2. 0x07-closure-mutable-interpreter-racket.md
3. css3实践研究.md
4. from-0-to-1-graphviz.md (UNIQUE - only in blog)
5. frp-tutorial-sodium-reactive-programming.md
6. x个数之和系列问题.md
7. 从零开始的dot可视化历险.md
8. 汇编研究i.md

### Docs Directory (9 files)
1. 0x06-interpreter-implementation-racket.md (duplicate)
2. 0x07-closure-mutable-interpreter-racket.md (duplicate)
3. css3实践研究.md (duplicate)
4. frp-tutorial-sodium-reactive-programming.md (duplicate)
5. index.md (UNIQUE - docs index)
6. mermaid-graphviz-guide.md (UNIQUE - new guide)
7. x个数之和系列问题.md (duplicate)
8. 从零开始的dot可视化历险.md (duplicate)
9. 汇编研究i.md (duplicate)

### Duplicate Files (7 files)
1. 0x06-interpreter-implementation-racket.md
2. 0x07-closure-mutable-interpreter-racket.md
3. css3实践研究.md
4. frp-tutorial-sodium-reactive-programming.md
5. x个数之和系列问题.md
6. 从零开始的dot可视化历险.md
7. 汇编研究i.md

## Dependencies on Blog Collection

### Files using getCollection('blog')
1. `src/components/SeriesNavigation.astro` - Series navigation component
2. `src/pages/blog/index.astro` - Blog listing page
3. `src/pages/blog/[...slug].astro` - Individual blog post pages
4. `src/pages/rss.xml.js` - RSS feed generation

### No files use getCollection('docs')
- Starlight automatically uses docs collection for documentation
- No manual references found

## File Differences

### Frontmatter Differences
**Blog files have:**
- `pubDate`: Publication date
- `tags`: Array of tags
- `series`: Optional series name
- `seriesOrder`: Optional series order number
- `layout`: Optional layout
- `draft`: Boolean flag

**Docs files have:**
- `description`: Optional description
- `sidebar`: Optional sidebar configuration with label and order
- No publication dates, tags, or series information

### Content Differences
- Blog files have original Hexo-style frontmatter
- Docs files have Starlight-optimized frontmatter
- Content body appears similar but not identical (different line counts)

## Risks and Considerations

### High Risk
1. **Series Navigation**: Depends on blog collection for series information
2. **Blog Listing Page**: Shows all blog posts with tags filtering
3. **Individual Blog Pages**: Render blog posts at `/blog/{slug}/`
4. **RSS Feed**: Generates feed from blog collection

### Medium Risk
1. **URL Structure**: Blog posts are at `/blog/{slug}/`, docs at `/docs/{slug}/`
2. **Frontmatter Differences**: Missing fields in docs versions
3. **Content Differences**: Files are not identical

### Low Risk
1. **Starlight Integration**: Docs collection works automatically with Starlight
2. **Build Process**: Both collections build successfully

## Migration Strategy Options

### Option 1: Keep Both Collections (Recommended)
**Pros:**
- No breaking changes
- Blog functionality preserved
- Docs collection for Starlight
- Can migrate gradually

**Cons:**
- Content duplication
- Maintenance overhead
- Potential confusion

### Option 2: Migrate Blog to Docs Collection
**Steps:**
1. Add missing frontmatter fields to docs files (pubDate, tags, series, etc.)
2. Update SeriesNavigation.astro to use docs collection
3. Update blog index and individual pages to use docs collection
4. Update RSS feed to use docs collection
5. Delete blog duplicate files
6. Keep from-0-to-1-graphviz.md in blog (unique file)

**Pros:**
- Single source of truth
- Reduced duplication
- Unified content management

**Cons:**
- High risk of breaking changes
- Requires updating all dependencies
- Need to preserve URL structure

### Option 3: Redirect Blog to Docs
**Steps:**
1. Keep both collections
2. Add redirects from `/blog/{slug}/` to `/docs/{slug}/`
3. Update blog index to show docs content
4. Gradually deprecate blog collection

**Pros:**
- Preserves existing URLs
- Gradual migration
- Lower risk

**Cons:**
- Still have duplication
- Redirect complexity
- SEO considerations

## Recommendation

**Option 1 (Keep Both) for now, with Option 2 (Migrate) as future goal.**

### Immediate Actions:
1. Document the duplication in learnings.md
2. Test that both collections work correctly
3. Verify build and deployment work

### Future Migration Steps:
1. Create migration script to copy frontmatter from blog to docs
2. Test SeriesNavigation with docs collection
3. Update blog pages to use docs collection
4. Delete blog duplicates after successful migration
5. Keep from-0-to-1-graphviz.md in blog (or move to docs with proper frontmatter)

## Testing Plan

### Before Any Changes:
1. Verify current build works
2. Test blog listing page
3. Test individual blog posts
4. Test series navigation
5. Test RSS feed
6. Test Starlight docs pages

### After Migration (if pursued):
1. All of the above tests
2. Verify URLs still work (or redirects work)
3. Check frontmatter preservation
4. Validate RSS feed generation