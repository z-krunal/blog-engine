import React from 'react';
import type { BlogPost } from '../types/blog';
import BlogHeader from './BlogHeader';
import MDXContent from './MDXContent';
import Prose from './Prose';
import ShareButtons from './ShareButtons';

interface BlogPostLayoutProps {
  post: BlogPost;
  className?: string;
  showTags?: boolean;
  showCoverImage?: boolean;
  showShareButtons?: boolean;
  baseUrl?: string;
  footer?: React.ReactNode;
}

export default function BlogPostLayout({ 
  post, 
  className = '',
  showTags = true,
  showCoverImage = true,
  showShareButtons = true,
  baseUrl = 'https://example.com',
  footer
}: BlogPostLayoutProps) {
  const postUrl = post.canonical || `${baseUrl}/blog/${post.slug}`;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-white ${className}`}>
      {/* Share Buttons */}
      {showShareButtons && (
        <ShareButtons postUrl={postUrl} postTitle={post.title} />
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section with Header */}
          <BlogHeader post={post} />
          
          {/* Cover Image */}
          {showCoverImage && post.image && (
            <div className="w-full flex justify-center bg-white">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-contain max-w-3xl my-8 rounded-xl shadow"
              />
            </div>
          )}
          
          {/* Content */}
          <div className="p-8 lg:p-12">
            {/* Tags */}
            {showTags && post.tags && post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <MDXContent source={post.mdxSource} />
            </div>
          </div>
        </article>
        
        {/* Footer */}
        {footer && (
          <div className="mt-8">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
} 