'use client';
import ResponsiveImage from './ResponsiveImage';

interface BlogCoverImageProps {
  src: string;
  alt: string;
}

export default function BlogCoverImage({ src, alt }: BlogCoverImageProps) {
  return (

      <div className="mx-auto max-w-3xl">
        <div className="flex justify-center">
          <ResponsiveImage
            src={src}
            alt={alt}
            priority={true}
            variant="natural"
          />
        </div>
      </div>

  );
} 