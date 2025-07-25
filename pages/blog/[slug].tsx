import type { BlogPost, BlogPostPageProps } from '../../src/types/blog';
import BlogPostLayout from '../../src/components/BlogPostLayout';
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
    <BlogPostLayout 
      post={post} 
      showShareButtons={true}
      baseUrl="http://localhost:3000"
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts({
    showOn: 'krunalsabnis', 
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog']
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
    showOn: 'krunalsabnis',
    baseDir: process.cwd(),
    contentDirs: ['../sites/krunalsabnis/content/blog']
  });

  return {
    props: {
      post
    }
  };
}; 