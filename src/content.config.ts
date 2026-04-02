import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const workspaceItemSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    link: z.url().optional(),
  })
  .strict();

const workspaceCategorySchema = z
  .object({
    category: z.enum(['Hardware', 'Editor', 'Software']),
    label: z.string().min(1),
    items: z.array(workspaceItemSchema).min(1),
  })
  .strict();

const workspace = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/workspace' }),
  schema: z
    .object({
      lang: z.enum(['en', 'cs']),
      title: z.string().min(1),
      intro: z.string().min(1),
      categories: z.array(workspaceCategorySchema).min(1),
    })
    .strict(),
});

export const collections = {
  workspace,
};
