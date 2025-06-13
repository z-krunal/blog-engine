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
}

export interface BlogPostPageProps {
  post: BlogPost;
} 