import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
import { languages } from './i18n/dictionary';

const langKeys = Object.keys(languages) as [string, ...string[]];

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    generateId: ({ data, entry }) => {
      const slug = typeof data.slug === 'string' ? data.slug : entry.replace(/\.mdx$/, '');
      const lang = typeof data.lang === 'string' ? data.lang : 'en';

      return `${slug}-${lang}`;
    },
  }),
  schema: z
    .object({
      title: z.string().min(1),
      slug: z.string().min(1),
      lang: z.enum(langKeys),
      summary: z.string().min(1),
      publishedAt: z.date(),
      tags: z.array(z.string().min(1)).min(1),
    })
    .strict(),
});

export const collections = {
  projects,
};
