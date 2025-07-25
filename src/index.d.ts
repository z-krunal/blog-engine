declare module 'blog-engine' {
  export interface BlogPost {
    title: string;
    description: string;
    date: string;
    author?: string;
    tags?: string[];
    category?: string;
    image?: string;
    published?: boolean;
    readingTime?: string;
    slug: string;
    featured?: boolean;
    excerpt?: string;
    ogImage?: string;
    canonical?: string;
    showOn?: string[];
    content: string;
    mdxSource?: any;
    authorSite: string;
    authorLinkedin: string;
    authorTwitter: string;
  }

  export interface BlogPostPageProps {
    post: BlogPost;
  }

  export type ContentConfig = {
    showOn?: string;
    baseDir?: string;
    contentDirs?: string[];
    includeShared?: boolean;
    serializeContent?: boolean;
  };

  export function getAllPosts(config?: ContentConfig): Promise<BlogPost[]>;
  export function getPostBySlug(slug: string, config?: ContentConfig): Promise<BlogPost>;
  export function getPostsByTag(tag: string, config?: ContentConfig): Promise<BlogPost[]>;
  export function getPostsByCategory(categorySlug: string, config?: ContentConfig): Promise<BlogPost[]>;
  export function getAllTags(config?: ContentConfig): Promise<string[]>;
  export function getAllCategories(config?: ContentConfig): Promise<string[]>;
  export function getAllCategoriesWithSlugs(config?: ContentConfig): Promise<Array<{ name: string; slug: string }>>;

  export { default as BlogCoverImage } from './components/BlogCoverImage';
  export { default as BlogHeader } from './components/BlogHeader';
  export { default as MDXContent } from './components/MDXContent';
  export { default as MDXRenderer } from './components/MDXRenderer';
  export { default as Prose } from './components/Prose';
  export { default as ResponsiveImage } from './components/ResponsiveImage';
  export { default as SEO } from './components/SEO';
  export { default as ShareButtons } from './components/ShareButtons';
}

declare module 'blog-engine/mdx' {
  export * from '../src/mdx';
}

declare module 'blog-engine/components/*' {
  const Component: React.ComponentType<any>;
  export default Component;
} 