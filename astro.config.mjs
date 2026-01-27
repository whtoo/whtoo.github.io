import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';

// Import Shiki languages for proper typing
// Note: Some languages may not have direct imports, using string literals as fallback

// https://astro.build/config
export default defineConfig({
	site: 'https://whtoo.github.io',
	base: '/',
	trailingSlash: 'ignore',
	output: 'static',
	integrations: [
		mdx(),
	],
	// 构建优化
	build: {
		format: 'directory'
	},
  markdown: {
    rehypePlugins: [[rehypeMermaid, {
      strategy: 'img-svg',
      mermaidConfig: {
        startOnLoad: false,
        fontFamily: 'arial,sans-serif',
        theme: 'default'
      }
    }]],
    syntaxHighlight: {
      excludeLangs: ['mermaid'],  // 防止语法高亮干扰Mermaid处理
    },
    shikiConfig: {
      theme: 'github-dark',
      langs: [
        // 基础Web语言
        'javascript',
        'typescript',
        'html',
        'css',
        'json',
        'markdown',
        // 系统语言
        'bash',
        'shell',
        // 编程语言
        'python',
        'java',
        'c',
        'cpp',
        'go',
        'rust',
        'ruby',
        'php',
        // 特殊语言
        'racket',
        // 数据格式
        'sql',
        'xml',
        'yaml',
        // 其他
        'plaintext',
        'diff',
      ],
    },
  },
	vite: {
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						vendor: ['astro']
					}
				}
			}
		}
	}
});
