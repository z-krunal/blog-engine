'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { BlogPost } from '../types/blog';

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
  baseUrl?: string;
  showSortControls?: boolean;
  showTagFilters?: boolean;
  postsPerPage?: number;
  className?: string;
}

interface SortOption {
  key: 'date' | 'title';
  label: string;
}

const sortOptions: SortOption[] = [
  { key: 'date', label: 'Date' },
  { key: 'title', label: 'Title' },
];

export default function BlogList({
  posts,
  tags,
  baseUrl = '',
  showSortControls = true,
  showTagFilters = true,
  postsPerPage = 10,
  className = ''
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter posts by selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    
    return posts.filter(post => 
      post.tags && selectedTags.some(tag => post.tags!.includes(tag))
    );
  }, [posts, selectedTags]);

  // Sort posts
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredPosts, sortBy, sortOrder]);

  // Paginate posts
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const handleSort = (key: 'date' | 'title') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Sort Controls */}
        {showSortControls && (
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleSort(option.key)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  sortBy === option.key
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label} {sortBy === option.key && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            ))}
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          {filteredPosts.length} post{filteredPosts.length === 1 ? '' : 's'} found
          {selectedTags.length > 0 && (
            <span className="ml-2">
              (filtered by {selectedTags.length} tag{selectedTags.length === 1 ? '' : 's'})
            </span>
          )}
        </div>
      </div>

      {/* Tag Filters */}
      {showTagFilters && tags.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter by tags:</span>
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
          {selectedTags.length > 0 && (
            <button
              onClick={clearFilters}
              className="mt-4 text-blue-600 hover:text-blue-800 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {paginatedPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group h-full flex flex-col"
            >
              <Link
                href={`${baseUrl}/blog/${post.slug}`}
                className="absolute inset-0 z-10"
                aria-label={post.title}
                tabIndex={0}
              />
              
              {/* Cover Image */}
              {post.image && (
                <div className="w-full h-32 flex items-center justify-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-32 w-full object-contain mx-auto"
                  />
                </div>
              )}
              
              {/* Beautiful Gradient Card Content */}
              <div className="rounded-b-lg text-white bg-gradient-to-br from-blue-600 to-blue-700 flex-1 flex flex-col p-6 md:p-8">
                {/* Category */}
                {post.category && (
                  <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-3 self-start">
                    {post.category}
                  </span>
                )}

                {/* Title - Full display, no line clamping */}
                <h3 className="text-2xl font-bold leading-tight mb-2 text-white">
                  {post.title}
                </h3>

                {/* Description */}
                {post.description && (
                  <p className="text-base text-blue-100 mb-4">
                    {post.description}
                  </p>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-white/20 text-white rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta */}
                <div className="mt-auto pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-xs text-blue-100">
                    <div className="flex items-center gap-2">
                      {post.author && (
                        <span className="font-semibold bg-white/20 rounded-full px-3 py-1">
                          {post.author}
                        </span>
                      )}
                      {post.date && (
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                    {post.readingTime && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-md ${
                  currentPage === page
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 