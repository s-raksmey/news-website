import { notFound } from "next/navigation";
import {
  getCategoryData,
  getArticlesByCategory,
  getPageContent,
  getArticleBySlug,
} from "../data/mockData";
import ArticleCard from "../components/ArticleCard";
import Breadcrumb from "../components/Breadcrumb";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    slug?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { slug } = await searchParams;

  // If there's a slug, this is an article page
  if (slug) {
    const article = getArticleBySlug(slug);

    if (!article || article.category !== category || article.subcategory) {
      notFound();
    }

    // Get category data for breadcrumb
    const categoryData = getCategoryData(category);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const breadcrumbItems = [
      { title: categoryData?.title || category, href: `/${category}` },
      { title: article.title },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Article Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="capitalize">{article.category}</span>
                <span className="mx-2">•</span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {article.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {article.author}
                    </p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Article Image */}
            {article.image && (
              <div className="aspect-video bg-gray-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Hide image container if it fails to load
                    (
                      e.target as HTMLImageElement
                    ).parentElement!.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Article Footer */}
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Published on {formatDate(article.publishedAt)}
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Share
                  </button>

                  <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Like
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Regular category page logic
  const categoryData = getCategoryData(category);

  if (!categoryData) {
    notFound();
  }

  // Get articles for this category
  const articles = getArticlesByCategory(category);

  // Get page content if this is a page type
  const pageContent = getPageContent(category);

  const breadcrumbItems = [{ title: categoryData.title }];

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
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryData.children.map((child) => (
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
              {articles.map((article) => (
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
  const { getAllCategories } = await import("../data/mockData");
  const categories = getAllCategories();

  return categories.map((category) => ({
    category: category,
  }));
}
