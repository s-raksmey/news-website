import { Suspense } from 'react';
import { layoutRegistry } from '../lib/layouts/registry';
import { PageContent } from '../types';

interface LayoutRendererProps {
  pageData: PageContent;
  children?: React.ReactNode;
}

/**
 * Layout Renderer Component - Dynamically renders layouts based on page configuration
 */
export default function LayoutRenderer({ pageData, children }: LayoutRendererProps) {
  // Get layout configuration
  const layout = pageData.layoutId 
    ? layoutRegistry.getLayoutWithFallback(pageData.layoutId, 'default')
    : layoutRegistry.getLayout('default');
  
  // Fallback to basic layout if no layout is found
  if (!layout) {
    console.warn(`No layout found for ID: ${pageData.layoutId}, using fallback layout`);
    return <FallbackLayout pageData={pageData}>{children}</FallbackLayout>;
  }

  // Apply layout overrides if any
  const finalLayout = applyLayoutOverrides(layout, pageData.layoutOverrides || []);

  return (
    <div className="min-h-screen bg-gray-50">
      {finalLayout.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          // Skip hidden sections
          if (pageData.layoutOverrides?.some(override => 
            override.sectionId === section.id && override.hide
          )) {
            return null;
          }

          const Component = layoutRegistry.getComponent(section.component);
          
          if (!Component) {
            console.warn(`Component not found: ${section.component}`);
            return (
              <div key={section.id} className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800">
                Missing component: {section.component}
              </div>
            );
          }

          // Prepare props for the component
          const props = prepareComponentProps(section, pageData);

          return (
            <Suspense 
              key={section.id} 
              fallback={<SectionSkeleton type={section.type} />}
            >
              <Component {...props} />
            </Suspense>
          );
        })}
      {children}
    </div>
  );
}

/**
 * Apply layout overrides to the base layout configuration
 */
function applyLayoutOverrides(
  layout: any, 
  overrides: Array<{ sectionId: string; props?: Record<string, any>; hide?: boolean }>
) {
  const modifiedLayout = { ...layout };
  
  modifiedLayout.sections = layout.sections.map((section: any) => {
    const override = overrides.find(o => o.sectionId === section.id);
    if (override) {
      return {
        ...section,
        props: { ...section.props, ...override.props }
      };
    }
    return section;
  });

  return modifiedLayout;
}

/**
 * Prepare props for layout components based on section type and page data
 */
function prepareComponentProps(section: any, pageData: PageContent) {
  const baseProps = { ...section.props };

  // Add page-specific data based on section type
  switch (section.type) {
    case 'hero':
      return {
        ...baseProps,
        title: pageData.title,
        subtitle: pageData.excerpt || baseProps.subtitle,
        // Add any hero-specific data
      };

    case 'header':
      return {
        ...baseProps,
        title: pageData.title,
        excerpt: pageData.excerpt,
        category: pageData.category,
        publishedAt: pageData.publishedAt,
        // Add article-specific data if available
        ...(pageData.type === 'article' && {
          author: 'Admin', // You might want to add author to PageContent type
          tags: [], // You might want to add tags to PageContent type
        })
      };

    case 'content':
      return {
        ...baseProps,
        content: pageData.content,
      };

    case 'breadcrumb':
      return {
        ...baseProps,
        items: [
          { 
            title: pageData.category.charAt(0).toUpperCase() + pageData.category.slice(1), 
            href: `/${pageData.category}` 
          },
          { title: pageData.title }
        ]
      };

    case 'sidebar':
      return {
        ...baseProps,
        // Add sidebar-specific data
        widgets: baseProps.widgets || []
      };

    default:
      return baseProps;
  }
}

/**
 * Fallback layout for when no layout is configured
 */
function FallbackLayout({ pageData, children }: { pageData: PageContent; children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-2 capitalize">
            {pageData.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {pageData.title}
          </h1>
          {pageData.excerpt && (
            <p className="text-xl text-gray-600 mb-6">
              {pageData.excerpt}
            </p>
          )}
        </header>
        
        <main className="bg-white rounded-lg shadow-md p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </main>
        
        {children}
      </div>
    </div>
  );
}

/**
 * Loading skeleton for sections
 */
function SectionSkeleton({ type }: { type: string }) {
  switch (type) {
    case 'hero':
      return (
        <div className="bg-gray-200 animate-pulse">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="h-12 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded mb-8 w-1/2"></div>
          </div>
        </div>
      );

    case 'header':
      return (
        <div className="bg-white animate-pulse">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded mb-6 w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded mb-8 w-1/2"></div>
          </div>
        </div>
      );

    case 'content':
      return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-20 bg-gray-200 animate-pulse"></div>
      );
  }
}
