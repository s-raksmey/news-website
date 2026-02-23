import { getCategoryData } from '../../data/mockData';
import Breadcrumb from '../../components/Breadcrumb';
import Image from 'next/image';

export default function RoyalDecreePage() {
  // Get category data for breadcrumb
  const categoryData = getCategoryData('legal-document');
  const subcategoryData = categoryData?.children?.find(child => child.slug === 'royal-decree');

  const breadcrumbItems = [
    { title: categoryData?.title || 'Legal Document', href: '/legal-document' },
    { title: subcategoryData?.title || 'Royal Decree' }
  ];

  // Mock royal decree data - you can move this to mockData.ts later
  const royalDecrees = [
    {
      id: 1,
      title: 'ព្រះរាជក្រឹត្យ សម្តេចព្រះបរមនាថ ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា ស្តីពីសណ្តាប់ធ្នាប់',
      date: '2024-08-15',
      image: '/api/placeholder/200/280'
    },
    {
      id: 2,
      title: 'ព្រះរាជក្រឹត្យ សម្តេចព្រះបរមនាថ ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា ស្តីពីសណ្តាប់ធ្នាប់',
      date: '2024-08-15',
      image: '/api/placeholder/200/280'
    },
    {
      id: 3,
      title: 'ព្រះរាជក្រឹត្យ សម្តេចព្រះបរមនាថ ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា ស្តីពីសណ្តាប់ធ្នាប់',
      date: '2024-08-15',
      image: '/api/placeholder/200/280'
    },
    {
      id: 4,
      title: 'ព្រះរាជក្រឹត្យ សម្តេចព្រះបរមនាថ ព្រះមហាក្សត្រ នៃព្រះរាជាណាចក្រកម្ពុជា ស្តីពីសណ្តាប់ធ្នាប់',
      date: '2024-08-15',
      image: '/api/placeholder/200/280'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Royal Decree
          </h1>
        </div>

        {/* Royal Decree Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {royalDecrees.map((decree) => (
            <div 
              key={decree.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex gap-4">
                {/* Document Image */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-32 bg-gray-100 rounded border border-gray-300 overflow-hidden">
                    <Image
                      src={decree.image}
                      alt="Royal Decree Document"
                      width={96}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Show a placeholder document icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center bg-gray-50">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 leading-relaxed">
                    {decree.title}
                  </h3>
                  
                  <div className="flex items-center text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{decree.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (Optional) */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Load More Decrees
          </button>
        </div>
      </div>
    </div>
  );
}
