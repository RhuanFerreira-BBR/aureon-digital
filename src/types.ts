export type Locale = 'pt' | 'en';

export type RouteKey = 'home' | 'services' | 'work' | 'about' | 'insights' | 'contact';

export type CaseStudy = {
  slug: string;
  title: Record<Locale, string>;
  shortTitle: Record<Locale, string>;
  client: string;
  sector: Record<Locale, string>;
  year: string;
  duration: Record<Locale, string>;
  categories: string[];
  result: Record<Locale, string>;
  summary: Record<Locale, string>;
  challenge: Record<Locale, string[]>;
  solution: Record<Locale, string[]>;
  bullets: Record<Locale, string[]>;
  stats: Array<{ value: string; label: Record<Locale, string> }>;
  image: string;
};

export type BlogPost = {
  id: number;
  slug: string;
  category: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string[]>;
  date: string;
  readingTime: Record<Locale, string>;
  featured?: boolean;
};
