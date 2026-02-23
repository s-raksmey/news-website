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
  layoutId?: string; // Reference to layout configuration
  layoutOverrides?: Array<{
    sectionId: string;
    props?: Record<string, any>;
    hide?: boolean;
  }>; // Page-specific layout customizations
  seoConfig?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  excerpt?: string; // For hero sections and previews
}

export interface MenuStructure {
  [key: string]: MenuItem;
}
