import { MenuItem, Article, PageContent, MenuStructure } from '../types';

// Mock menu structure - this would come from your CMS
export const menuStructure: MenuStructure = {
  home: {
    id: '1',
    title: 'Home',
    slug: '',
    type: 'page'
  },
  news: {
    id: '2',
    title: 'News',
    slug: 'news',
    type: 'category',
    children: [
      {
        id: '2-1',
        title: 'Province',
        slug: 'province',
        type: 'category'
      },
      {
        id: '2-2',
        title: 'Nation',
        slug: 'nation',
        type: 'category'
      }
    ]
  },
  about: {
    id: '3',
    title: 'About',
    slug: 'about',
    type: 'category',
    children: [
      {
        id: '3-1',
        title: 'Structure',
        slug: 'structure',
        type: 'page'
      },
      {
        id: '3-2',
        title: 'Units',
        slug: 'units',
        type: 'page'
      }
    ]
  },
  'legal-document': {
    id: '4',
    title: 'Legal Document',
    slug: 'legal-document',
    type: 'category',
    children: [
      {
        id: '4-1',
        title: 'Royal Decree',
        slug: 'royal-decree',
        type: 'category'
      },
      {
        id: '4-2',
        title: 'Sub Decree',
        slug: 'sub-decree',
        type: 'category'
      }
    ]
  },
  more: {
    id: '5',
    title: 'More',
    slug: 'more',
    type: 'category',
    children: [
      {
        id: '5-1',
        title: 'Public Services',
        slug: 'public-services',
        type: 'page'
      },
      {
        id: '5-2',
        title: 'Media',
        slug: 'media',
        type: 'category'
      }
    ]
  }
};

// Mock articles data
export const mockArticles: Article[] = [
  // News > Province articles
  {
    id: 'art-1',
    title: 'Provincial Development Initiative Launched in Siem Reap',
    slug: 'provincial-development-initiative-siem-reap',
    excerpt: 'A new development initiative has been launched to boost economic growth in Siem Reap province.',
    content: `<h2>Major Development Initiative</h2>
    <p>The provincial government of Siem Reap has announced a comprehensive development initiative aimed at boosting economic growth and improving infrastructure across the province.</p>
    <p>This initiative includes:</p>
    <ul>
      <li>Road infrastructure improvements</li>
      <li>Tourism facility upgrades</li>
      <li>Agricultural modernization programs</li>
      <li>Educational facility enhancements</li>
    </ul>
    <p>The project is expected to create thousands of jobs and significantly improve the quality of life for residents.</p>`,
    category: 'news',
    subcategory: 'province',
    publishedAt: '2024-02-20T10:00:00Z',
    author: 'Provincial Reporter',
    image: '/images/siem-reap-development.jpg',
    tags: ['development', 'siem-reap', 'infrastructure']
  },
  {
    id: 'art-2',
    title: 'Battambang Rice Harvest Shows Record Yield',
    slug: 'battambang-rice-harvest-record-yield',
    excerpt: 'Farmers in Battambang province celebrate a record-breaking rice harvest this season.',
    content: `<h2>Record Rice Harvest</h2>
    <p>Battambang province has achieved a record-breaking rice harvest this season, with yields exceeding expectations by 25%.</p>
    <p>Key factors contributing to this success:</p>
    <ul>
      <li>Favorable weather conditions</li>
      <li>Improved farming techniques</li>
      <li>Government support programs</li>
      <li>Quality seed distribution</li>
    </ul>`,
    category: 'news',
    subcategory: 'province',
    publishedAt: '2024-02-19T14:30:00Z',
    author: 'Agriculture Correspondent',
    tags: ['agriculture', 'battambang', 'rice', 'harvest']
  },
  
  // News > Nation articles
  {
    id: 'art-3',
    title: 'National Education Reform Bill Passed',
    slug: 'national-education-reform-bill-passed',
    excerpt: 'Parliament approves comprehensive education reform to modernize the national curriculum.',
    content: `<h2>Education Reform Approved</h2>
    <p>The National Assembly has passed a comprehensive education reform bill that will modernize Cambodia's education system.</p>
    <p>Key reforms include:</p>
    <ul>
      <li>Updated curriculum standards</li>
      <li>Teacher training programs</li>
      <li>Technology integration in classrooms</li>
      <li>Vocational education expansion</li>
    </ul>`,
    category: 'news',
    subcategory: 'nation',
    publishedAt: '2024-02-21T09:15:00Z',
    author: 'Political Reporter',
    tags: ['education', 'reform', 'parliament', 'national']
  },
  
  // Legal Document > Royal Decree articles
  {
    id: 'art-4',
    title: 'Royal Decree on Environmental Protection Measures',
    slug: 'royal-decree-environmental-protection-measures',
    excerpt: 'New royal decree establishes stricter environmental protection measures nationwide.',
    content: `<h2>Environmental Protection Decree</h2>
    <p>His Majesty the King has issued a royal decree establishing comprehensive environmental protection measures.</p>
    <p>The decree covers:</p>
    <ul>
      <li>Forest conservation requirements</li>
      <li>Water resource protection</li>
      <li>Air quality standards</li>
      <li>Waste management protocols</li>
    </ul>`,
    category: 'legal-document',
    subcategory: 'royal-decree',
    publishedAt: '2024-02-18T16:00:00Z',
    author: 'Legal Affairs',
    tags: ['royal-decree', 'environment', 'protection', 'law']
  }
];

// Mock page content data
export const mockPageContent: PageContent[] = [
  {
    id: 'page-1',
    title: 'Organizational Structure',
    slug: 'structure',
    content: `<h2>Our Organizational Structure</h2>
    <p>Our organization is structured to ensure efficient governance and service delivery to the people of Cambodia.</p>
    <h3>Leadership</h3>
    <ul>
      <li>Director General</li>
      <li>Deputy Directors</li>
      <li>Department Heads</li>
    </ul>
    <h3>Departments</h3>
    <ul>
      <li>Administration Department</li>
      <li>Public Relations Department</li>
      <li>Technical Department</li>
      <li>Finance Department</li>
    </ul>`,
    category: 'about',
    subcategory: 'structure',
    publishedAt: '2024-01-15T10:00:00Z',
    type: 'page'
  },
  {
    id: 'page-2',
    title: 'Our Units',
    slug: 'units',
    content: `<h2>Operational Units</h2>
    <p>We operate through various specialized units to serve different aspects of public administration.</p>
    <h3>Core Units</h3>
    <ul>
      <li>Information Technology Unit</li>
      <li>Human Resources Unit</li>
      <li>Legal Affairs Unit</li>
      <li>Public Communication Unit</li>
    </ul>`,
    category: 'about',
    subcategory: 'units',
    publishedAt: '2024-01-15T10:00:00Z',
    type: 'page'
  },
  {
    id: 'page-3',
    title: 'Public Services',
    slug: 'public-services',
    content: `<h2>Available Public Services</h2>
    <p>We provide various public services to citizens and businesses.</p>
    <h3>Citizen Services</h3>
    <ul>
      <li>Document Processing</li>
      <li>Information Requests</li>
      <li>Complaint Resolution</li>
      <li>Public Consultations</li>
    </ul>
    <h3>Business Services</h3>
    <ul>
      <li>License Applications</li>
      <li>Permit Processing</li>
      <li>Regulatory Guidance</li>
      <li>Business Registration</li>
    </ul>`,
    category: 'more',
    subcategory: 'public-services',
    publishedAt: '2024-01-20T10:00:00Z',
    type: 'page'
  }
];

// Helper functions to get data
export const getMenuStructure = (): MenuStructure => menuStructure;

export const getArticlesByCategory = (category: string, subcategory?: string): Article[] => {
  return mockArticles.filter(article => {
    if (subcategory) {
      return article.category === category && article.subcategory === subcategory;
    }
    return article.category === category;
  });
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

export const getPageContent = (category: string, subcategory?: string): PageContent | undefined => {
  return mockPageContent.find(page => {
    if (subcategory) {
      return page.category === category && page.subcategory === subcategory;
    }
    return page.category === category;
  });
};

export const getAllCategories = (): string[] => {
  return Object.keys(menuStructure);
};

export const getCategoryData = (category: string): MenuItem | undefined => {
  return menuStructure[category];
};
