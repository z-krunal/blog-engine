import React from 'react';
import type { BlogPost } from '../types/blog';
import BlogList from './BlogList';
import BlogSidebar from './BlogSidebar';

interface BlogLayoutProps {
  posts: BlogPost[];
  categories: string[];
  currentCategory?: string;
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
  baseUrl?: string;
  showSidebar?: boolean;
  showSortControls?: boolean;
  showTagFilters?: boolean;
  postsPerPage?: number;
  className?: string;
}

export default function BlogLayout({
  posts,
  categories,
  currentCategory,
  featuredPosts,
  recentPosts,
  baseUrl = '',
  showSidebar = true,
  showSortControls = true,
  showTagFilters = true,
  postsPerPage = 10,
  className = ''
}: BlogLayoutProps) {
  // Get unique tags from all posts
  const tags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        {showSidebar && (
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <BlogSidebar
                categories={categories}
                currentCategory={currentCategory}
                featuredPosts={featuredPosts}
                recentPosts={recentPosts}
                baseUrl={baseUrl}
              />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1">
          <BlogList
            posts={posts}
            tags={tags}
            baseUrl={baseUrl}
            showSortControls={showSortControls}
            showTagFilters={showTagFilters}
            postsPerPage={postsPerPage}
          />
        </div>
      </div>
    </div>
  );
} 