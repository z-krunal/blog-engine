import { getAllPosts, getPostBySlug } from '../src/mdx';
import Link from 'next/link';
import type { BlogPost } from '../src/types/blog';
import BlogPostLayout from '../src/components/BlogPostLayout';
import BlogLayout from '../src/components/BlogLayout';

export default function TestPage({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Blog Engine Test Page</h1>
      
      <div className="mb-8 rounded-lg bg-green-50 p-4">
        <h2 className="text-lg font-semibold text-green-800">✅ Blog Engine Status</h2>
        <p className="text-green-700">Blog engine is working! Found {posts.length} posts.</p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Available Posts</h2>
        
        {posts.length === 0 ? (
          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-yellow-800">No posts found. Check the content directory path.</p>
          </div>
        ) : (
          posts.map((post) => (
            <article 
              key={post.slug} 
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-2xl font-bold">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-gray-900 hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600">{post.description}</p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <span>Date: {post.date}</span>
                {post.author && (
                  <span className="ml-4">Author: {post.author}</span>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      {/* Show the first post with the beautiful layout */}
      {posts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preview of First Post Layout</h2>
          <BlogPostLayout post={posts[0]} />
        </div>
      )}

      {/* Show blog listing with the new beautiful design */}
      {posts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Preview of Blog Listing</h2>
          <BlogLayout
            posts={posts}
            categories={['Platform Thinking']}
            featuredPosts={posts.filter(p => p.featured)}
            recentPosts={posts.slice(0, 3)}
            baseUrl="http://localhost:3000"
          />
        </div>
      )}
    </main>
  );
}

export async function getStaticProps() {
  try {
    const posts = await getAllPosts({
      showOn: 'krunalsabnis',
      baseDir: process.cwd(),
      contentDirs: ['../sites/krunalsabnis/content/blog']
    });

    console.log(`Found ${posts.length} posts`);
    posts.forEach(post => {
      console.log(`- ${post.title} (${post.slug})`);
    });

    return {
      props: {
        posts
      }
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      props: {
        posts: []
      }
    };
  }
} 