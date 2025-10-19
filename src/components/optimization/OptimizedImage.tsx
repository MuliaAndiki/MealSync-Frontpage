'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/utils/classname';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  showPlaceholder?: boolean;
}

/**
 * Optimized Image Component with:
 * - Automatic blur placeholder
 * - Error fallback
 * - Aspect ratio presets
 * - Lazy loading by default
 * - WebP/AVIF format optimization
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  aspectRatio = 'auto',
  className,
  priority = false,
  quality = 85,
  showPlaceholder = true,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(fallbackSrc);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], className)}>
      {isLoading && showPlaceholder && <div className="absolute inset-0 animate-pulse bg-muted" />}

      <Image
        src={imageSrc}
        alt={alt}
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'opacity-50'
        )}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        quality={quality}
        {...props}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

/**
 * Optimized Avatar Component
 */
interface OptimizedAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}

export function OptimizedAvatar({
  src,
  alt,
  size = 'md',
  fallback,
  className,
}: OptimizedAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const getFallbackInitial = () => {
    return fallback || alt.charAt(0).toUpperCase();
  };

  return (
    <div className={cn('relative rounded-full', sizeClasses[size], className)}>
      {src ? (
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          className="rounded-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground">
          <span className="text-sm font-medium">{getFallbackInitial()}</span>
        </div>
      )}
    </div>
  );
}
