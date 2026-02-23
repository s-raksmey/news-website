import { notFound } from 'next/navigation';
import { getCategoryData, getArticlesByCategory, getPageContent } from '../../data/mockData';
import ArticleCard from '../../components/ArticleCard';
import Breadcrumb from '../../components/Breadcrumb';

interface SubcategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = await params;
  
  // Get category data from mock CMS
  const categoryData = getCategoryData(category);
  
  if (!categoryData) {
    notFound();
  }

  // Find the subcategory data
  const subcategoryData = categoryData.children?.find(child => child.slug === subcategory);
  
  if (!subcategoryData) {
    notFound();
  }

  // Get articles for this subcategory
  const articles = getArticlesByCategory(category, subcategory);
  
  // Get page content if this is a page type
  const pageContent = getPageContent(category, subcategory);

  const breadcrumbItems = [
    { title: categoryData.title, href: `/${category}` },
    { title: subcategoryData.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {subcategoryData.title}
          </h1>
          <p className="text-lg text-gray-600">
            {categoryData.title} › {subcategoryData.title}
          </p>
        </div>

        {/* Show page content if this is a page */}
        {pageContent && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent.content }}
            />
          </div>
        )}

        {/* Show articles if any exist */}
        {articles.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Latest {subcategoryData.title} Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {/* Show message if no content */}
        {!pageContent && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No content available in this subcategory yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for all category/subcategory combinations
export async function generateStaticParams() {
  const { getMenuStructure } = await import('../../data/mockData');
  const menuStructure = getMenuStructure();
  
  const params: { category: string; subcategory: string }[] = [];
  
  Object.entries(menuStructure).forEach(([categorySlug, categoryData]) => {
    if (categoryData.children) {
      categoryData.children.forEach(child => {
        params.push({
          category: categorySlug,
          subcategory: child.slug,
        });
      });
    }
  });
  
  return params;
}
