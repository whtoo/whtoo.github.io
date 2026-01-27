# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Type

Astro static blog site (astro@5.16.15) with custom design. Content is written in Markdown with YAML front matter. Primary language: Chinese (zh-CN).

## Project Structure

This repository contains two main projects:

1. **Root Directory**: Project management and documentation
2. **`astro-blog/`**: Astro blog implementation (primary project)

## Astro Blog Commands

Navigate to `astro-blog/` directory first:

```bash
cd astro-blog
```

Then run:

```bash
npm run dev      # Start local development server
npm run build    # Build production site
npm run preview  # Preview production build locally
npm run astro    # Run Astro CLI commands
```

## Content Structure (Astro Blog)

- **Posts**: `src/content/blog/*.md` - Markdown files with YAML front matter
- **Pages**: `src/pages/*.astro` - Static pages (about, projects, etc.)
- **Layouts**: `src/layouts/` - Page layouts
- **Components**: `src/components/` - Reusable components
- **Config**: `astro.config.mjs` - Astro configuration

## Features

- Modern Astro framework with TypeScript support
- Complete Chinese localization (zh-CN)
- Reading progress bar
- Series navigation for related posts
- Responsive design for mobile and desktop
- SEO optimized with Open Graph and Twitter Cards
- RSS feed and sitemap generation
- GitHub Pages deployment via GitHub Actions

## Deployment

The blog is configured for automatic deployment to GitHub Pages:

- **Production URL**: https://whtoo.github.io
- **Deployment**: Automatic via GitHub Actions on push to main branch
- **Configuration**: See `.github/workflows/deploy.yml`

## Notes

- All content has been migrated from previous Hexo setup
- Project uses modern static site generation with zero client-side JavaScript
- Images are automatically optimized to WebP format
- Full performance optimization implemented