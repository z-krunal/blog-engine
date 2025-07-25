import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPosts, getPostsByCategory, getAllCategoriesWithSlugs } from '../../../src/mdx';
import { getCategoryDisplayName } from '../../../src/utils';
import BlogLayout from '../../../src/components/BlogLayout';
import type { BlogPost } from '../../../src/types/blog';

interface CategoryPageProps {
  posts: BlogPost[];
  categories: string[];
  currentCategory: string;
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
}

export default function CategoryPage({ posts, categories, currentCategory, featuredPosts, recentPosts }: CategoryPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Posts in "{currentCategory}"
        </h1>
        <p className="text-gray-600">
          {posts.length} post{posts.length === 1 ? '' : 's'} found
        </p>
      </div>

      <BlogLayout
        posts={posts}
        categories={categories}
        currentCategory={currentCategory}
        featuredPosts={featuredPosts}
        recentPosts={recentPosts}
        baseUrl="http://localhost:3001"
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoriesWithSlugs = await getAllCategoriesWithSlugs({
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog'],
    showOn: 'krunalsabnis',
    includeShared: false
  });
  
  return {
    paths: categoriesWithSlugs.map(({ slug }: { slug: string }) => ({
      params: { category: slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const category = params?.category as string;
  const displayName = getCategoryDisplayName(category);
  
  // Get posts for this category
  const posts = await getPostsByCategory(category, {
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog'],
    showOn: 'krunalsabnis',
    includeShared: false
  });

  // Get all posts for sidebar data
  const allPosts = await getAllPosts({
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog'],
    showOn: 'krunalsabnis',
    includeShared: false
  });

  // Get categories
  const categories = Array.from(
    new Set(allPosts.map((post: BlogPost) => post.category).filter((cat: string | undefined): cat is string => Boolean(cat)))
  ).sort();

  // Featured posts
  const featuredPosts = allPosts.filter((post: BlogPost) => post.featured);

  // Recent posts
  const recentPosts = [...allPosts]
    .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    props: {
      posts,
      categories,
      currentCategory: displayName,
      featuredPosts,
      recentPosts,
    },
  };
}; 