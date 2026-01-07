import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        author: z.string().default('Mateusz Margos'),
        tags: z.array(z.string()).optional(),
        lang: z.enum(['en', 'pl']).default('en'),
    }),
});

export const collections = {
    'blog': blogCollection,
};
