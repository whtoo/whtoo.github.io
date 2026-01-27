import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			// Required fields from Hexo
			title: z.string(),
			pubDate: z.coerce.date(),
			// Optional fields from Hexo
			tags: z.array(z.string()).default([]),
			categories: z.array(z.string()).optional(),
			series: z.string().optional(),
			seriesOrder: z.number().optional(),
			layout: z.string().optional(),
			// Additional fields
			description: z.string().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
