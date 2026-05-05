import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { SITE_URL } from '../../config';
import { useTranslations } from '../../i18n/utils';
import { getValidLanguageCode, supportedLangs } from '../../i18n/dictionary';
import { getProjects } from '../../lib/projects';
import { getBlogPosts } from '../../lib/blog';

export function getStaticPaths() {
  return supportedLangs.map(lang => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const currentLang = getValidLanguageCode(context.params.lang as string);
  const t = await useTranslations(currentLang);
  const site = context.site ?? SITE_URL;

  const [projects, blogPosts] = await Promise.all([
    getProjects(currentLang),
    getBlogPosts(currentLang),
  ]);

  const items = [
    ...projects.map(project => ({
      title: project.data.title,
      description: project.data.summary,
      pubDate: project.data.publishedAt,
      link: new URL(`/${currentLang}/projects/${project.data.slug}/`, site).toString(),
    })),
    ...blogPosts.map(post => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.publishedAt,
      link: new URL(`/${currentLang}/blog/${post.data.slug}/`, site).toString(),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: t('feedTitle'),
    description: t('feedDescription'),
    site,
    items,
  });
}
