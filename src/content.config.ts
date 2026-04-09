import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    modifiedDate: z.string().optional(),
    author: z.string().default('Tinsae Mesfin'),
    category: z.string().default('Technology'),
    tags: z.array(z.string()).default([]),
    readTime: z.string().default('5 min read'),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
