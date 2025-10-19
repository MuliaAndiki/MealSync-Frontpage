/**
 * Performance Monitoring Utilities
 */

/**
 * Measure Web Vitals
 */
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime || lastEntry.entryType);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  };

  // First Input Delay (FID) - Interaction to Next Paint (INP)
  const observeINP = () => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('INP:', entry);
      }
    });
    observer.observe({ type: 'first-input', buffered: true });
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    let clsScore = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsScore += (entry as any).value;
          console.log('CLS:', clsScore);
        }
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  };

  try {
    observeLCP();
    observeINP();
    observeCLS();
  } catch (error) {
    console.error('Error observing web vitals:', error);
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Measure component render time
 */
export function measureRenderTime(componentName: string) {
  if (typeof window === 'undefined') return { start: () => {}, end: () => {} };

  let startTime: number;

  return {
    start: () => {
      startTime = performance.now();
    },
    end: () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);

      // Log warning if render takes too long
      if (renderTime > 16.67) {
        // 60fps threshold
        console.warn(
          `⚠️ ${componentName} took ${renderTime.toFixed(2)}ms (target: <16.67ms for 60fps)`
        );
      }
    },
  };
}

/**
 * Lazy load images using Intersection Observer
 */
export function lazyLoadImages(selector: string = 'img[data-src]') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll<HTMLImageElement>(selector);

  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');

          if (dataSrc) {
            img.src = dataSrc;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Prefetch resources for next navigation
 */
export function prefetchResource(href: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Get page load performance metrics
 */
export function getPageLoadMetrics() {
  if (typeof window === 'undefined' || !window.performance) return null;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (!navigation) return null;

  return {
    dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,

    tcpTime: navigation.connectEnd - navigation.connectStart,

    tlsTime:
      navigation.secureConnectionStart > 0
        ? navigation.connectEnd - navigation.secureConnectionStart
        : 0,

    ttfb: navigation.responseStart - navigation.requestStart,

    downloadTime: navigation.responseEnd - navigation.responseStart,

    domProcessingTime: navigation.domComplete - navigation.domInteractive,

    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,

    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
  };
}

/**
 * Log performance metrics
 */
export function logPerformanceMetrics() {
  const metrics = getPageLoadMetrics();

  if (metrics) {
    console.group('📊 Page Load Performance Metrics');
    console.log('DNS Lookup:', `${metrics.dnsTime.toFixed(2)}ms`);
    console.log('TCP Connection:', `${metrics.tcpTime.toFixed(2)}ms`);
    console.log('TLS Negotiation:', `${metrics.tlsTime.toFixed(2)}ms`);
    console.log('Time to First Byte (TTFB):', `${metrics.ttfb.toFixed(2)}ms`);
    console.log('Content Download:', `${metrics.downloadTime.toFixed(2)}ms`);
    console.log('DOM Processing:', `${metrics.domProcessingTime.toFixed(2)}ms`);
    console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
    console.log('Total Load Time:', `${metrics.totalLoadTime.toFixed(2)}ms`);
    console.groupEnd();

    // Performance recommendations
    if (metrics.ttfb > 600) {
      console.warn('⚠️ Slow TTFB detected. Consider server-side optimization.');
    }
    if (metrics.totalLoadTime > 3000) {
      console.warn('⚠️ Slow page load detected. Consider code splitting and lazy loading.');
    }
  }
}
