import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  variant?: 'cover' | 'content' | 'natural';
}

const VARIANT_CONFIGS = {
  cover: {
    width: 1200,
    height: 630,
    sizes: "(max-width: 768px) 100vw, 1200px"
  },
  content: {
    width: 800,
    height: 600,
    sizes: "(max-width: 768px) 100vw, 800px"
  },
  natural: {
    width: 800,
    height: 800,
    sizes: "(max-width: 768px) 100vw, 800px"
  }
};

export default function ResponsiveImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  variant = 'natural'
}: ResponsiveImageProps) {
  const [isLoading, setLoading] = useState(true);
  const config = VARIANT_CONFIGS[variant];

  return (
    <div className={`relative w-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        width={config.width}
        height={config.height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'}
          rounded-lg
          w-full
          h-auto
          object-contain
        `}
        onLoad={() => setLoading(false)}
        quality={90}
        sizes={config.sizes}
      />
    </div>
  );
} 