// Layout Registry System - Core layout management
import { LayoutConfig, LayoutValidationResult, LayoutRegistryEntry } from '@/types/layout';
import { ComponentType, lazy } from 'react';

/**
 * Central registry for managing layout configurations and their associated components
 */
class LayoutRegistry {
  private layouts = new Map<string, LayoutRegistryEntry>();
  private componentCache = new Map<string, ComponentType<any>>();
  private initialized = false;

  /**
   * Register a layout configuration with its components
   */
  register(
    layout: LayoutConfig, 
    components: Record<string, ComponentType<any> | (() => Promise<{ default: ComponentType<any> }>)>
  ): void {
    // Validate layout configuration
    const validation = this.validateLayout(layout);
    if (!validation.isValid) {
      console.error(`Failed to register layout "${layout.id}":`, validation.errors);
      return;
    }

    // Process components - handle both direct components and lazy imports
    const componentMap = new Map<string, ComponentType<any>>();
    
    Object.entries(components).forEach(([key, component]) => {
      if (typeof component === 'function' && component.length === 0) {
        // This is a lazy import function
        const LazyComponent = lazy(component as () => Promise<{ default: ComponentType<any> }>);
        componentMap.set(key, LazyComponent);
      } else {
        // This is a direct component
        componentMap.set(key, component as ComponentType<any>);
      }
    });

    // Store in registry
    this.layouts.set(layout.id, {
      config: layout,
      components: componentMap
    });

    // Cache components for quick access
    componentMap.forEach((component, key) => {
      this.componentCache.set(key, component);
    });

    console.log(`✅ Registered layout: ${layout.name} (${layout.id})`);
  }

  /**
   * Get a layout configuration by ID
   */
  getLayout(id: string): LayoutConfig | null {
    const entry = this.layouts.get(id);
    return entry ? entry.config : null;
  }

  /**
   * Get a component by name
   */
  getComponent(name: string): ComponentType<any> | null {
    return this.componentCache.get(name) || null;
  }

  /**
   * Get all layouts, optionally filtered by category
   */
  getAllLayouts(category?: string): LayoutConfig[] {
    const layouts = Array.from(this.layouts.values()).map(entry => entry.config);
    return category 
      ? layouts.filter(layout => layout.category === category)
      : layouts;
  }

  /**
   * Get layouts by multiple categories
   */
  getLayoutsByCategories(categories: string[]): LayoutConfig[] {
    return Array.from(this.layouts.values())
      .map(entry => entry.config)
      .filter(layout => categories.includes(layout.category));
  }

  /**
   * Check if a layout exists
   */
  hasLayout(id: string): boolean {
    return this.layouts.has(id);
  }

  /**
   * Get layout with fallback
   */
  getLayoutWithFallback(id: string, fallbackId = 'default'): LayoutConfig | null {
    return this.getLayout(id) || this.getLayout(fallbackId);
  }

  /**
   * Validate layout configuration
   */
  validateLayout(layout: LayoutConfig): LayoutValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required fields validation
    if (!layout.id) errors.push('Layout ID is required');
    if (!layout.name) errors.push('Layout name is required');
    if (!layout.category) errors.push('Layout category is required');
    if (!layout.sections || layout.sections.length === 0) {
      errors.push('Layout must have at least one section');
    }

    // ID format validation
    if (layout.id && !/^[a-z0-9-]+$/.test(layout.id)) {
      errors.push('Layout ID must contain only lowercase letters, numbers, and hyphens');
    }

    // Sections validation
    if (layout.sections) {
      const sectionIds = new Set<string>();
      const orders = new Set<number>();

      layout.sections.forEach((section, index) => {
        // Check for duplicate section IDs
        if (sectionIds.has(section.id)) {
          errors.push(`Duplicate section ID: ${section.id}`);
        }
        sectionIds.add(section.id);

        // Check for duplicate orders
        if (orders.has(section.order)) {
          warnings.push(`Duplicate section order: ${section.order}`);
        }
        orders.add(section.order);

        // Validate section structure
        if (!section.component) {
          errors.push(`Section ${section.id} is missing component reference`);
        }
        if (typeof section.order !== 'number') {
          errors.push(`Section ${section.id} order must be a number`);
        }
      });
    }

    // Category validation
    const validCategories = ['article', 'page', 'landing', 'special'];
    if (layout.category && !validCategories.includes(layout.category)) {
      warnings.push(`Unknown category: ${layout.category}. Valid categories: ${validCategories.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Get registry statistics
   */
  getStats() {
    const layouts = Array.from(this.layouts.values()).map(entry => entry.config);
    const categories = layouts.reduce((acc, layout) => {
      acc[layout.category] = (acc[layout.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalLayouts: layouts.length,
      totalComponents: this.componentCache.size,
      categoryCounts: categories,
      initialized: this.initialized
    };
  }

  /**
   * Clear all registered layouts (useful for testing)
   */
  clear(): void {
    this.layouts.clear();
    this.componentCache.clear();
    this.initialized = false;
  }

  /**
   * Mark registry as initialized
   */
  markInitialized(): void {
    this.initialized = true;
    console.log('🚀 Layout Registry initialized with', this.layouts.size, 'layouts');
  }

  /**
   * Check if registry is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Export layout configuration (useful for admin interfaces)
   */
  exportLayout(id: string): string | null {
    const layout = this.getLayout(id);
    return layout ? JSON.stringify(layout, null, 2) : null;
  }

  /**
   * Import layout configuration from JSON
   */
  importLayout(jsonConfig: string, components: Record<string, ComponentType<any>>): boolean {
    try {
      const layout: LayoutConfig = JSON.parse(jsonConfig);
      this.register(layout, components);
      return true;
    } catch (error) {
      console.error('Failed to import layout:', error);
      return false;
    }
  }
}

// Create singleton instance
export const layoutRegistry = new LayoutRegistry();

// Export for testing
export { LayoutRegistry };
