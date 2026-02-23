// Enhanced type system for dynamic layout management

export interface LayoutConfig {
  id: string;
  name: string;
  description: string;
  category: 'article' | 'page' | 'landing' | 'special';
  preview?: string; // Preview image URL for admin interface
  sections: LayoutSection[];
  settings?: Record<string, any>;
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface LayoutSection {
  id: string;
  type: 'header' | 'content' | 'sidebar' | 'footer' | 'hero' | 'gallery' | 'navigation' | 'breadcrumb';
  component: string;
  props?: Record<string, any>;
  order: number;
  responsive?: {
    mobile?: Partial<LayoutSection>;
    tablet?: Partial<LayoutSection>;
    desktop?: Partial<LayoutSection>;
  };
  conditions?: {
    showIf?: string; // Conditional rendering logic
    hideIf?: string;
  };
}

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}

export interface LayoutOverride {
  sectionId: string;
  props?: Record<string, any>;
  hide?: boolean;
  replace?: {
    component: string;
    props?: Record<string, any>;
  };
}

// Component props interfaces for type safety
export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  style?: 'gradient' | 'image' | 'solid' | 'video';
  alignment?: 'left' | 'center' | 'right';
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  overlay?: boolean;
  ctaButton?: {
    text: string;
    href: string;
    style?: 'primary' | 'secondary' | 'outline';
  };
}

export interface ContentSectionProps {
  content: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface SidebarSectionProps {
  position: 'left' | 'right';
  width?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  content?: React.ReactNode;
  widgets?: Array<{
    type: string;
    props: Record<string, any>;
  }>;
}

export interface ArticleHeaderProps {
  title: string;
  excerpt?: string;
  author: string;
  publishedAt: string;
  category: string;
  tags?: string[];
  image?: string;
  readTime?: number;
  showBreadcrumb?: boolean;
}

// Layout registry types
export interface LayoutRegistryEntry {
  config: LayoutConfig;
  components: Map<string, React.ComponentType<any>>;
}

export interface LayoutValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Admin interface types
export interface LayoutSelectorProps {
  selectedLayoutId?: string;
  contentType: 'article' | 'page' | 'landing' | 'special';
  onChange: (layoutId: string) => void;
  showPreview?: boolean;
  allowCustomization?: boolean;
}

export interface LayoutPreviewProps {
  layout: LayoutConfig;
  sampleData?: Record<string, any>;
  interactive?: boolean;
}
