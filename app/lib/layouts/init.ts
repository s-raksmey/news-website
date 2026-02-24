// Layout System Initialization
import { layoutRegistry } from './registry';
import { allLayouts } from './definitions';
import { 
  HeroSection, 
  ContentSection, 
  ArticleHeader, 
  SidebarSection 
} from '../../components/layouts/sections';

/**
 * Initialize the layout system by registering all default layouts
 */
export function initializeLayoutSystem() {
  console.log('🚀 Initializing Layout System...');

  try {
    // Register all default layouts with their components
    allLayouts.forEach(layout => {
      const components = getComponentsForLayout(layout.id);
      layoutRegistry.register(layout, components);
    });

    // Mark registry as initialized
    layoutRegistry.markInitialized();

    // Log statistics
    const stats = layoutRegistry.getStats();
    console.log('✅ Layout System initialized successfully:', stats);

    return true;
  } catch (error) {
    console.error('❌ Failed to initialize Layout System:', error);
    return false;
  }
}

/**
 * Get the appropriate components for a layout
 */
function getComponentsForLayout(layoutId: string): Record<string, React.ComponentType<any>> {
  // Base components available to all layouts
  const baseComponents = {
    HeroSection,
    ContentSection,
    ArticleHeader,
    SidebarSection
  };

  // Layout-specific component mappings
  const layoutSpecificComponents: Record<string, Record<string, React.ComponentType<any>>> = {
    'article-default': baseComponents,
    'article-hero': baseComponents,
    'article-sidebar': baseComponents,
    'page-default': baseComponents,
    'page-hero': baseComponents,
    'landing-hero-cta': baseComponents,
    'fullwidth': baseComponents,
    'default': baseComponents
  };

  return layoutSpecificComponents[layoutId] || baseComponents;
}

/**
 * Check if layout system is ready
 */
export function isLayoutSystemReady(): boolean {
  return layoutRegistry.isInitialized();
}

/**
 * Get layout system status
 */
export function getLayoutSystemStatus() {
  return {
    initialized: layoutRegistry.isInitialized(),
    stats: layoutRegistry.getStats()
  };
}

/**
 * Reinitialize layout system (useful for development)
 */
export function reinitializeLayoutSystem() {
  console.log('🔄 Reinitializing Layout System...');
  layoutRegistry.clear();
  return initializeLayoutSystem();
}

/**
 * Validate layout system integrity
 */
export function validateLayoutSystem(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    // Check if registry is initialized
    if (!layoutRegistry.isInitialized()) {
      errors.push('Layout registry is not initialized');
    }

    // Check if default layout exists
    if (!layoutRegistry.hasLayout('default')) {
      errors.push('Default layout is missing');
    }

    // Check if all required components are available
    const requiredComponents = ['HeroSection', 'ContentSection', 'ArticleHeader', 'SidebarSection'];
    requiredComponents.forEach(componentName => {
      if (!layoutRegistry.getComponent(componentName)) {
        errors.push(`Required component missing: ${componentName}`);
      }
    });

    // Validate each registered layout
    const layouts = layoutRegistry.getAllLayouts();
    layouts.forEach(layout => {
      const validation = layoutRegistry.validateLayout(layout);
      if (!validation.isValid) {
        errors.push(`Layout ${layout.id} is invalid: ${validation.errors.join(', ')}`);
      }
    });

  } catch (error) {
    errors.push(`Validation error: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
