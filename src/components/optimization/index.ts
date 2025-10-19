/**
 * Performance & Accessibility Optimization Components
 *
 * This module exports optimized components for better:
 * - Performance (lazy loading, image optimization, code splitting)
 * - Accessibility (ARIA attributes, keyboard navigation, screen readers)
 * - SEO (proper semantic HTML, meta tags)
 * - User Experience (loading states, error handling)
 */

// Lazy Loading Components
export { lazyLoad, LazyLoadOnView, LazyLoadWrapper, LoadingSkeleton } from './LazyLoadWrapper';

// Optimized Image Components
export { OptimizedAvatar, OptimizedImage } from './OptimizedImage';

// Accessibility Components
export {
  AccessibleButton,
  AccessibleFormField,
  AccessibleList,
  FocusTrap,
  ScreenReaderOnly,
  SkipToMain,
} from './AccessibilityHelpers';
