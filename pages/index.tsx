import { getAllPosts } from '../src/mdx';
import type { BlogPost } from '../src/types/blog';
import BlogLayout from '../src/components/BlogLayout';

export default function Home({ posts }: { posts: BlogPost[] }) {
  // Get categories from posts
  const categories = Array.from(
    new Set(posts.map((post) => post.category).filter((cat): cat is string => Boolean(cat)))
  ).sort();

  // Featured posts
  const featuredPosts = posts.filter((post) => post.featured);

  // Recent posts (sorted by date desc, take 5)
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">Blog Engine Test Page</h1>
      
      <div className="mb-8 rounded-lg bg-green-50 p-4">
        <h2 className="text-lg font-semibold text-green-800">✅ Blog Engine Status</h2>
        <p className="text-green-700">Blog engine is working! Found {posts.length} posts.</p>
      </div>

      <BlogLayout
        posts={posts}
        categories={categories}
        featuredPosts={featuredPosts}
        recentPosts={recentPosts}
        baseUrl="http://localhost:3001"
      />
    </main>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts({
    showOn: 'krunalsabnis',
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog']
  });

  return {
    props: {
      posts
    }
  };
} 