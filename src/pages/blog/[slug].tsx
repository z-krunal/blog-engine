import type { BlogPost, BlogPostPageProps } from '../../types/blog';
import BlogHeader from '../../components/BlogHeader';
import BlogCoverImage from '../../components/BlogCoverImage';
import MDXContent from '../../components/MDXContent';
import ShareButtons from '../../components/ShareButtons';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getAllPosts } from '../../mdx';

export default function BlogPost({ post }: BlogPostPageProps) {
  console.log('Post data:', {
    title: post.title,
    tags: post.tags,
    typeofTags: typeof post.tags,
    isArray: Array.isArray(post.tags)
  });

  return (
    <div className="flex justify-center">

    <article className="prose prose-lg max-w-2xl w-full px-4 py-8">
    <BlogHeader post={post} />  

      {post.image && <BlogCoverImage src={post.image} alt={post.title} />}
      <MDXContent source={post.mdxSource} />
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
    showOn: 'krunalsabnis', // or process.env.SITE_ID
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
    showOn: 'krunalsabnis', // or process.env.SITE_ID
    baseDir: process.cwd()
  });

  return {
    props: {
      post
    }
  };
}; 