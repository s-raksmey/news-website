import { notFound } from 'next/navigation';
import { getCategoryData, getArticlesByCategory, getPageContent } from '../data/mockData';
import ArticleCard from '../components/ArticleCard';
import Breadcrumb from '../components/Breadcrumb';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  // Get category data from mock CMS
  const categoryData = getCategoryData(category);
  
  if (!categoryData) {
    notFound();
  }

  // Get articles for this category
  const articles = getArticlesByCategory(category);
  
  // Get page content if this is a page type
  const pageContent = getPageContent(category);

  const breadcrumbItems = [
    { title: categoryData.title }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryData.title}
          </h1>
          
          {/* Show subcategories if they exist */}
          {categoryData.children && categoryData.children.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.children.map(child => (
                  <a
                    key={child.id}
                    href={`/${category}/${child.slug}`}
                    className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {child.title}
                    </h3>
                    <p className="text-gray-600">
                      Explore {child.title.toLowerCase()} content
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
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
              Latest {categoryData.title}
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
              No content available in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const { getAllCategories } = await import('../data/mockData');
  const categories = getAllCategories();
  
  return categories.map((category) => ({
    category: category,
  }));
}
