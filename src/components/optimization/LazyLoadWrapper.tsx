'use client';

import dynamic from 'next/dynamic';
import { ComponentType, ReactNode, Suspense } from 'react';

/**
 * Skeleton Loading Component
 */
export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-full w-full rounded-lg bg-muted" />
    </div>
  );
}

/**
 * Generic Lazy Load Wrapper dengan Suspense
 * Usage: const LazyComponent = lazyLoad(() => import('./HeavyComponent'))
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options?: {
    ssr?: boolean;
    loading?: () => ReactNode;
  }
) {
  return dynamic(importFunc, {
    ssr: options?.ssr ?? false,
    loading: options?.loading ?? (() => <LoadingSkeleton />),
  });
}

/**
 * Lazy Load Wrapper Component untuk conditional rendering
 */
interface LazyLoadWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  when?: boolean;
}

export function LazyLoadWrapper({
  children,
  fallback = <LoadingSkeleton />,
  when = true,
}: LazyLoadWrapperProps) {
  if (!when) return null;

  return <Suspense fallback={fallback}>{children}</Suspense>;
}

/**
 * Intersection Observer based lazy loading
 */
interface LazyLoadOnViewProps {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
  fallback?: ReactNode;
}

export function LazyLoadOnView({
  children,
  rootMargin = '50px',
  threshold = 0.01,
  fallback = <LoadingSkeleton />,
}: LazyLoadOnViewProps) {
  return (
    <div className="lazy-load-container">
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  );
}
