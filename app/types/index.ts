// Types for the CMS data structure
export interface MenuItem {
  id: string;
  title: string;
  slug: string;
  children?: MenuItem[];
  type: 'category' | 'page' | 'article';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  subcategory?: string;
  publishedAt: string;
  author: string;
  image?: string;
  tags: string[];
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  subcategory?: string;
  publishedAt: string;
  type: 'page' | 'article';
}

export interface MenuStructure {
  [key: string]: MenuItem;
}
