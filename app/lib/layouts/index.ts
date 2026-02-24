// Main exports for the layout system
export { layoutRegistry, LayoutRegistry } from './registry';
export { 
  allLayouts, 
  articleLayouts, 
  pageLayouts, 
  landingLayouts, 
  specialLayouts,
  defaultLayout,
  getLayoutsByCategory,
  getLayoutById 
} from './definitions';
export { 
  initializeLayoutSystem, 
  isLayoutSystemReady, 
  getLayoutSystemStatus,
  reinitializeLayoutSystem,
  validateLayoutSystem 
} from './init';

// Re-export types
export type {
  LayoutConfig,
  LayoutSection,
  LayoutRegistryEntry,
  LayoutValidationResult,
  SEOConfig,
  LayoutOverride
} from '../../types/layout';
