'use client';

import { useState } from 'react';
import { LayoutSelectorProps } from '../../types/layout';
import { layoutRegistry } from '../../lib/layouts/registry';
import LayoutPreview from './LayoutPreview';

/**
 * Layout Selector Component for Admin Interface
 * Allows administrators to select and preview different layouts
 */
export default function LayoutSelector({
  selectedLayoutId,
  contentType,
  onChange,
  showPreview = true,
  allowCustomization = false
}: LayoutSelectorProps) {
  const [previewLayout, setPreviewLayout] = useState<string | null>(null);
  
  // Get available layouts for the content type
  const layouts = layoutRegistry.getAllLayouts(contentType);

  if (layouts.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          No layouts available for content type: {contentType}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Layout Selection Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Choose Layout
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {layouts.map((layout) => (
            <LayoutCard
              key={layout.id}
              layout={layout}
              isSelected={selectedLayoutId === layout.id}
              onSelect={() => onChange(layout.id)}
              onPreview={showPreview ? () => setPreviewLayout(layout.id) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Layout Preview Modal */}
      {showPreview && previewLayout && (
        <LayoutPreviewModal
          layoutId={previewLayout}
          onClose={() => setPreviewLayout(null)}
        />
      )}

      {/* Selected Layout Info */}
      {selectedLayoutId && (
        <SelectedLayoutInfo
          layoutId={selectedLayoutId}
          allowCustomization={allowCustomization}
        />
      )}
    </div>
  );
}

/**
 * Individual Layout Card Component
 */
interface LayoutCardProps {
  layout: any;
  isSelected: boolean;
  onSelect: () => void;
  onPreview?: () => void;
}

function LayoutCard({ layout, isSelected, onSelect, onPreview }: LayoutCardProps) {
  return (
    <div
      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      {/* Preview Image */}
      {layout.preview ? (
        <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
          <img
            src={layout.preview}
            alt={layout.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
          <div className="text-gray-400 text-sm">No Preview</div>
        </div>
      )}

      {/* Layout Info */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">{layout.name}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">
          {layout.description}
        </p>
        
        {/* Layout Tags */}
        {layout.metadata?.tags && (
          <div className="flex flex-wrap gap-1">
            {layout.metadata.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {/* Preview Button */}
      {onPreview && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}
          className="absolute bottom-2 right-2 px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Preview
        </button>
      )}
    </div>
  );
}

/**
 * Layout Preview Modal
 */
interface LayoutPreviewModalProps {
  layoutId: string;
  onClose: () => void;
}

function LayoutPreviewModal({ layoutId, onClose }: LayoutPreviewModalProps) {
  const layout = layoutRegistry.getLayout(layoutId);

  if (!layout) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{layout.name}</h3>
            <p className="text-sm text-gray-600">{layout.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <LayoutPreview layout={layout} interactive={false} />
        </div>
      </div>
    </div>
  );
}

/**
 * Selected Layout Information Panel
 */
interface SelectedLayoutInfoProps {
  layoutId: string;
  allowCustomization: boolean;
}

function SelectedLayoutInfo({ layoutId, allowCustomization }: SelectedLayoutInfoProps) {
  const layout = layoutRegistry.getLayout(layoutId);

  if (!layout) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="font-semibold text-gray-900 mb-4">Selected Layout: {layout.name}</h4>
      
      {/* Layout Sections */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium text-gray-700">Layout Sections:</h5>
        <div className="space-y-2">
          {layout.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between p-3 bg-white rounded border"
              >
                <div>
                  <span className="font-medium text-sm">{section.component}</span>
                  <span className="text-xs text-gray-500 ml-2">({section.type})</span>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  Order: {section.order}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Customization Options */}
      {allowCustomization && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-700 mb-3">Customization Options:</h5>
          <div className="text-sm text-gray-600">
            <p>• Customize section properties</p>
            <p>• Hide/show specific sections</p>
            <p>• Override default styling</p>
          </div>
        </div>
      )}
    </div>
  );
}
