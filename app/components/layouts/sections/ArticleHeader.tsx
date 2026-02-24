import { ArticleHeaderProps } from '../../../types/layout';
import Image from 'next/image';
import Breadcrumb from '../../Breadcrumb';

/**
 * Article Header Component - Displays article metadata and header information
 */
export default function ArticleHeader({ 
  title, 
  excerpt, 
  author, 
  publishedAt, 
  category, 
  tags = [], 
  image,
  readTime,
  showBreadcrumb = true
}: ArticleHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const breadcrumbItems = showBreadcrumb ? [
    { title: category.charAt(0).toUpperCase() + category.slice(1), href: `/${category}` },
    { title: title }
  ] : [];

  return (
    <header className="bg-white">
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}

      {/* Article Header Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 pb-8">
          {/* Meta Information */}
          <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
            <span className="capitalize">{category}</span>
            <span>•</span>
            <time dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime} min read</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Author and Tags */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Author */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-base font-medium text-gray-900">
                  {author}
                </p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
              onError={(e) => {
                // Hide image container if it fails to load
                (e.target as HTMLImageElement).parentElement!.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
