import { SidebarSectionProps } from '@/types/layout';

/**
 * Sidebar Section Component - Flexible sidebar with widget support
 */
export default function SidebarSection({ 
  position = 'right', 
  width = 'md',
  sticky = false,
  content,
  widgets = []
}: SidebarSectionProps) {
  // Width mappings
  const widthClasses = {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96'
  };

  // Position classes
  const positionClasses = {
    left: 'order-first',
    right: 'order-last'
  };

  return (
    <aside 
      className={`${widthClasses[width]} ${positionClasses[position]} ${
        sticky ? 'sticky top-8' : ''
      } space-y-6`}
    >
      {/* Custom Content */}
      {content && (
        <div className="bg-white rounded-lg shadow-md p-6">
          {content}
        </div>
      )}

      {/* Widgets */}
      {widgets.map((widget, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <SidebarWidget type={widget.type} props={widget.props} />
        </div>
      ))}
    </aside>
  );
}

/**
 * Sidebar Widget Component - Renders different widget types
 */
function SidebarWidget({ type, props }: { type: string; props: Record<string, any> }) {
  switch (type) {
    case 'recent-articles':
      return <RecentArticlesWidget {...props} />;
    case 'categories':
      return <CategoriesWidget {...props} />;
    case 'tags':
      return <TagsWidget {...props} />;
    case 'newsletter':
      return <NewsletterWidget {...props} />;
    case 'social-links':
      return <SocialLinksWidget {...props} />;
    default:
      return (
        <div className="text-gray-500 text-sm">
          Unknown widget type: {type}
        </div>
      );
  }
}

/**
 * Recent Articles Widget
 */
function RecentArticlesWidget({ title = 'Recent Articles', articles = [] }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {articles.map((article: any, index: number) => (
          <a
            key={index}
            href={`/${article.category}?slug=${article.slug}`}
            className="block group"
          >
            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Categories Widget
 */
function CategoriesWidget({ title = 'Categories', categories = [] }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {categories.map((category: any, index: number) => (
          <a
            key={index}
            href={`/${category.slug}`}
            className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span>{category.name}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {category.count}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Tags Widget
 */
function TagsWidget({ title = 'Popular Tags', tags = [] }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <a
            key={index}
            href={`/tags/${tag}`}
            className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Newsletter Widget
 */
function NewsletterWidget({ title = 'Subscribe to Newsletter', description = 'Get the latest news delivered to your inbox.' }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

/**
 * Social Links Widget
 */
function SocialLinksWidget({ title = 'Follow Us', links = [] }: any) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex space-x-3">
        {links.map((link: any, index: number) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
            title={link.platform}
          >
            <span className="text-sm font-semibold">
              {link.platform.charAt(0).toUpperCase()}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
