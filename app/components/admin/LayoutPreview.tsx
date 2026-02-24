'use client';

import { LayoutConfig } from '../../types/layout';

interface LayoutPreviewProps {
  layout: LayoutConfig;
  interactive?: boolean;
}

/**
 * Layout Preview Component
 * Shows a visual representation of the layout structure
 */
export default function LayoutPreview({ layout, interactive = true }: LayoutPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Layout Header */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">{layout.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{layout.description}</p>
        
        {/* Layout Metadata */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <span>Category: {layout.category}</span>
          {layout.metadata?.version && (
            <span>Version: {layout.metadata.version}</span>
          )}
          {layout.metadata?.author && (
            <span>Author: {layout.metadata.author}</span>
          )}
        </div>
      </div>

      {/* Layout Structure Visualization */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Layout Structure</h4>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {layout.sections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <SectionPreview
                key={section.id}
                section={section}
                isLast={index === layout.sections.length - 1}
                interactive={interactive}
              />
            ))}
        </div>
      </div>

      {/* Layout Tags */}
      {layout.metadata?.tags && layout.metadata.tags.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {layout.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Individual Section Preview Component
 */
interface SectionPreviewProps {
  section: any;
  isLast: boolean;
  interactive: boolean;
}

function SectionPreview({ section, isLast, interactive }: SectionPreviewProps) {
  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'hero':
        return '🎯';
      case 'header':
        return '📄';
      case 'content':
        return '📝';
      case 'sidebar':
        return '📋';
      case 'footer':
        return '🔗';
      default:
        return '📦';
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case 'hero':
        return 'bg-purple-50 border-purple-200';
      case 'header':
        return 'bg-blue-50 border-blue-200';
      case 'content':
        return 'bg-green-50 border-green-200';
      case 'sidebar':
        return 'bg-yellow-50 border-yellow-200';
      case 'footer':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`p-4 ${getSectionColor(section.type)} ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-lg">{getSectionIcon(section.type)}</span>
          <div>
            <h5 className="font-medium text-gray-900">
              {section.component}
            </h5>
            <p className="text-sm text-gray-600">
              Type: {section.type} • Order: {section.order}
            </p>
          </div>
        </div>
        
        {interactive && (
          <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Configure
          </button>
        )}
      </div>

      {/* Section Properties */}
      {section.props && Object.keys(section.props).length > 0 && (
        <div className="mt-3 pl-8">
          <details className="text-sm">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
              Properties ({Object.keys(section.props).length})
            </summary>
            <div className="mt-2 space-y-1">
              {Object.entries(section.props).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="text-gray-800 font-mono text-xs">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
