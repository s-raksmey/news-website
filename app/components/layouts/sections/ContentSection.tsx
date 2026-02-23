import { ContentSectionProps } from '@/types/layout';

/**
 * Content Section Component - Flexible content display with various styling options
 */
export default function ContentSection({ 
  content, 
  maxWidth = 'lg', 
  padding = 'md',
  backgroundColor,
  textAlign = 'left'
}: ContentSectionProps) {
  // Width mappings
  const widthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  // Padding mappings
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20'
  };

  // Text alignment mappings
  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };

  // Background style
  const backgroundStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <section 
      className={`${paddingClasses[padding]}`}
      style={backgroundStyle}
    >
      <div className={`${widthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div 
          className={`prose prose-lg max-w-none ${textAlignClasses[textAlign]} prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
