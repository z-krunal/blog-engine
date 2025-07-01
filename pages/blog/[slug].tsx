import type { BlogPost, BlogPostPageProps } from '../../src/types/blog';
import BlogHeader from '../../src/components/BlogHeader';
import BlogCoverImage from '../../src/components/BlogCoverImage';
import MDXContent from '../../src/components/MDXContent';
import ShareButtons from '../../src/components/ShareButtons';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getAllPosts } from '../../src/mdx';

export default function BlogPost({ post }: BlogPostPageProps) {
  console.log('Post data:', {
    title: post.title,
    tags: post.tags,
    typeofTags: typeof post.tags,
    isArray: Array.isArray(post.tags)
  });

  return (
    <div className="flex justify-center">
      <article className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {post.date} • {post.author}
        </div>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full max-h-80 object-contain rounded-lg shadow mb-6 bg-white"
            style={{ margin: '0 auto' }}
          />
        )}
        <div className="prose prose-lg text-gray-800">
          <MDXContent source={post.mdxSource} />
        </div>
        <ShareButtons 
          url={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
        />
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({
    showOn: process.env.SITE_ID, 
    baseDir: process.cwd()
  });

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const post = await getPostBySlug(params?.slug as string, {
    showOn: process.env.SITE_ID, // or process.env.SITE_ID
    baseDir: process.cwd()
  });

  return {
    props: {
      post
    }
  };
}; 