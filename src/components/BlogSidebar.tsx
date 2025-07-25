import React from 'react';
import Link from 'next/link';
import type { BlogPost } from '../types/blog';
import { normalizeCategory } from '../utils';

interface BlogSidebarProps {
  categories: string[];
  currentCategory?: string;
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
  baseUrl?: string;
  className?: string;
}

export default function BlogSidebar({
  categories,
  currentCategory,
  featuredPosts,
  recentPosts,
  baseUrl = '',
  className = ''
}: BlogSidebarProps) {
  return (
    <aside className={`space-y-8 ${className}`}>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Featured</h3>
          <ul className="space-y-4">
            {featuredPosts.map((post) => (
              <li key={post.slug} className="flex gap-3 items-start">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-12 h-12 object-cover rounded flex-shrink-0" 
                  />
                )}
                <div className="min-w-0 flex-1">
                  <Link 
                    href={`${baseUrl}/blog/${post.slug}`} 
                    className="font-medium text-blue-700 hover:text-blue-800 hover:underline block text-sm leading-tight"
                  >
                    {post.title}
                  </Link>
                  {post.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {post.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent</h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug} className="flex gap-3 items-start">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-12 h-12 object-cover rounded flex-shrink-0" 
                  />
                )}
                <div className="min-w-0 flex-1">
                  <Link 
                    href={`${baseUrl}/blog/${post.slug}`} 
                    className="font-medium text-gray-900 hover:text-blue-600 hover:underline block text-sm leading-tight"
                  >
                    {post.title}
                  </Link>
                  {post.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {post.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link 
                href={`${baseUrl}/blog`} 
                className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                  !currentCategory 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                All Posts
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`${baseUrl}/blog/category/${normalizeCategory(category)}`}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    currentCategory === category 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
} 