import { getCategoryData } from '../data/mockData';
import Breadcrumb from '../components/Breadcrumb';
import Link from 'next/link';

export default function LegalDocumentPage() {
  // Get category data
  const categoryData = getCategoryData('legal-document');

  const breadcrumbItems = [
    { title: categoryData?.title || 'Legal Document' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryData?.title || 'Legal Document'}
          </h1>
          <p className="text-xl text-gray-600">
            Access official legal documents, royal decrees, and sub decrees
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData?.children?.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/legal-document/${subcategory.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {subcategory.title}
              </h3>
              
              <p className="text-gray-600 text-sm">
                {subcategory.slug === 'royal-decree' 
                  ? 'Official royal decrees and proclamations from His Majesty the King'
                  : subcategory.slug === 'sub-decree'
                  ? 'Government sub-decrees and administrative regulations'
                  : 'Legal documents and official publications'
                }
              </p>
              
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                View Documents
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
