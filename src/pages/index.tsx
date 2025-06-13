import { getAllPosts } from '../mdx';
import Link from 'next/link';
import type { BlogPost } from '../types/blog';

export default function Home({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Blog Engine Test Page</h1>
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">Available Posts</h2>
        <div className="bg-gray-100 rounded-full p-4 text-blue-700">Tailwind 22</div>
        {posts.map((post) => (
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
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts({
    showOn: 'krunalsabnis',
    baseDir: process.cwd()
  });

  return {
    props: {
      posts
    }
  };
} 