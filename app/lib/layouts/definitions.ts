import { LayoutConfig } from '../../types/layout';

/**
 * Default Layout Configurations
 * These are the predefined layouts available for different content types
 */

// Article Layouts
export const articleLayouts: LayoutConfig[] = [
  {
    id: 'article-default',
    name: 'Default Article',
    description: 'Standard article layout with header and content',
    category: 'article',
    preview: '/previews/article-default.jpg',
    sections: [
      {
        id: 'header',
        type: 'header',
        component: 'ArticleHeader',
        order: 1,
        props: {
          showBreadcrumb: true
        }
      },
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'lg',
          padding: 'md'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['article', 'default'],
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'article-hero',
    name: 'Hero Article',
    description: 'Article with large hero section and content',
    category: 'article',
    preview: '/previews/article-hero.jpg',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        component: 'HeroSection',
        order: 1,
        props: {
          style: 'gradient',
          alignment: 'center',
          height: 'lg'
        }
      },
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'lg',
          padding: 'lg'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['article', 'hero'],
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'article-sidebar',
    name: 'Article with Sidebar',
    description: 'Article layout with sidebar for related content',
    category: 'article',
    preview: '/previews/article-sidebar.jpg',
    sections: [
      {
        id: 'header',
        type: 'header',
        component: 'ArticleHeader',
        order: 1,
        props: {
          showBreadcrumb: true
        }
      },
      {
        id: 'main-content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'xl',
          padding: 'md'
        }
      },
      {
        id: 'sidebar',
        type: 'sidebar',
        component: 'SidebarSection',
        order: 3,
        props: {
          position: 'right',
          width: 'md',
          sticky: true,
          widgets: [
            {
              type: 'recent-articles',
              props: {
                title: 'Related Articles',
                articles: []
              }
            },
            {
              type: 'tags',
              props: {
                title: 'Popular Tags',
                tags: ['news', 'politics', 'sports', 'technology']
              }
            }
          ]
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['article', 'sidebar'],
      createdAt: new Date().toISOString()
    }
  }
];

// Page Layouts
export const pageLayouts: LayoutConfig[] = [
  {
    id: 'page-default',
    name: 'Default Page',
    description: 'Simple page layout with title and content',
    category: 'page',
    preview: '/previews/page-default.jpg',
    sections: [
      {
        id: 'header',
        type: 'header',
        component: 'ArticleHeader',
        order: 1,
        props: {
          showBreadcrumb: true
        }
      },
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'lg',
          padding: 'lg'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['page', 'default'],
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'page-hero',
    name: 'Hero Page',
    description: 'Page with prominent hero section',
    category: 'page',
    preview: '/previews/page-hero.jpg',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        component: 'HeroSection',
        order: 1,
        props: {
          style: 'gradient',
          alignment: 'center',
          height: 'xl'
        }
      },
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'xl',
          padding: 'xl'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['page', 'hero'],
      createdAt: new Date().toISOString()
    }
  }
];

// Landing Page Layouts
export const landingLayouts: LayoutConfig[] = [
  {
    id: 'landing-hero-cta',
    name: 'Hero with CTA',
    description: 'Landing page with hero section and call-to-action',
    category: 'landing',
    preview: '/previews/landing-hero-cta.jpg',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        component: 'HeroSection',
        order: 1,
        props: {
          style: 'gradient',
          alignment: 'center',
          height: 'full',
          ctaButton: {
            text: 'Get Started',
            href: '/signup',
            style: 'primary'
          }
        }
      },
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 2,
        props: {
          maxWidth: 'xl',
          padding: 'xl',
          textAlign: 'center'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['landing', 'hero', 'cta'],
      createdAt: new Date().toISOString()
    }
  }
];

// Special Layouts
export const specialLayouts: LayoutConfig[] = [
  {
    id: 'fullwidth',
    name: 'Full Width',
    description: 'Full width layout without containers',
    category: 'special',
    preview: '/previews/fullwidth.jpg',
    sections: [
      {
        id: 'content',
        type: 'content',
        component: 'ContentSection',
        order: 1,
        props: {
          maxWidth: 'full',
          padding: 'lg'
        }
      }
    ],
    metadata: {
      author: 'System',
      version: '1.0.0',
      tags: ['special', 'fullwidth'],
      createdAt: new Date().toISOString()
    }
  }
];

// Default fallback layout
export const defaultLayout: LayoutConfig = {
  id: 'default',
  name: 'Default Layout',
  description: 'Basic fallback layout',
  category: 'page',
  sections: [
    {
      id: 'content',
      type: 'content',
      component: 'ContentSection',
      order: 1,
      props: {
        maxWidth: 'lg',
        padding: 'md'
      }
    }
  ],
  metadata: {
    author: 'System',
    version: '1.0.0',
    tags: ['default', 'fallback'],
    createdAt: new Date().toISOString()
  }
};

// Export all layouts
export const allLayouts = [
  defaultLayout,
  ...articleLayouts,
  ...pageLayouts,
  ...landingLayouts,
  ...specialLayouts
];

// Helper function to get layouts by category
export function getLayoutsByCategory(category: string): LayoutConfig[] {
  return allLayouts.filter(layout => layout.category === category);
}

// Helper function to get layout by ID
export function getLayoutById(id: string): LayoutConfig | undefined {
  return allLayouts.find(layout => layout.id === id);
}
