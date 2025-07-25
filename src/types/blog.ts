export interface BlogPost {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  image?: string | null;
  published?: boolean;
  readingTime?: string;
  slug: string;
  featured?: boolean;
  excerpt?: string;
  ogImage?: string | null;
  canonical?: string;
  showOn?: string[];
  content: string;
  mdxSource?: any;
  authorSite?: string;
  authorLinkedin?: string;
  authorTwitter?: string;
}

export interface BlogPostPageProps {
  post: BlogPost;
} 