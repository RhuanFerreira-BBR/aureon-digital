import { posts } from '../data/site';
import type { BlogPost, Locale } from '../types';

export type WordPressPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
};

const wordpressBaseUrl = import.meta.env.VITE_WORDPRESS_API_URL as string | undefined;

export async function fetchPosts(locale: Locale): Promise<BlogPost[]> {
  if (!wordpressBaseUrl) return posts;

  const endpoint = new URL('/wp-json/wp/v2/posts', wordpressBaseUrl);
  endpoint.searchParams.set('_embed', '1');
  endpoint.searchParams.set('per_page', '12');

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`WordPress returned ${response.status}`);

  const data = (await response.json()) as WordPressPost[];
  return data.map((post) => ({
    id: post.id,
    slug: post.slug,
    category: 'WordPress',
    title: { pt: stripHtml(post.title.rendered), en: stripHtml(post.title.rendered) },
    excerpt: { pt: stripHtml(post.excerpt.rendered), en: stripHtml(post.excerpt.rendered) },
    body: { pt: [stripHtml(post.content.rendered)], en: [stripHtml(post.content.rendered)] },
    date: post.date,
    readingTime: { pt: locale === 'pt' ? 'Leitura' : 'Read', en: 'Read' },
  }));
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}
