import React from 'react';
import type { BlogPost } from '../types/blog';

interface BlogHeaderProps {
  post: BlogPost;
  className?: string;
}

export default function BlogHeader({ post, className = '' }: BlogHeaderProps) {
  return (
    <div className={`p-8 lg:p-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white ${className}`}>
      <div className="max-w-3xl mx-auto">
        {post.category && (
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-4">
            {post.category}
          </span>
        )}
        
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-blue-100 leading-relaxed mb-8">
          {post.description}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-6 text-blue-100">
          {post.author && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium">
                  {post.authorLinkedin ? (
                    <a
                      href={post.authorLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {post.author}
                    </a>
                  ) : (
                    post.author
                  )}
                </p>
                <p className="text-sm text-blue-200">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
          
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{post.readingTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 