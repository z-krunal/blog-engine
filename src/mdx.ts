import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export type ContentConfig = {
  showOn?: string;
  baseDir?: string;
  contentDirs?: string[];
  includeShared?: boolean;
  serializeContent?: boolean;
};

export type BlogPost = {
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
};

// Helper function to resolve image paths
function resolveImagePath(imagePath: string, baseDir: string, siteId?: string, isOgImage: boolean = false): string {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/')) return imagePath;
  
  // If the image path is relative, resolve it relative to the appropriate directory
  if (isOgImage) {
    // OG images are stored in the site-specific og directory
    const site = siteId || 'shared';
    return `/images/${site}/og/${imagePath}`;
  } else {
    // Regular images are stored in the site-specific blog directory
    const site = siteId || 'shared';
    return `/images/${site}/blog/${imagePath}`;
  }
}

// Helper function to process content and resolve image paths
function processContentImages(content: string, siteId?: string): string {
  // Replace markdown image syntax with resolved paths
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      const resolvedPath = resolveImagePath(src, '', siteId);
      return `![${alt}](${resolvedPath})`;
    }
  );
}

// Helper function to get content directories
async function getContentDirs(baseDir: string, config: ContentConfig): Promise<string[]> {
  const { showOn, contentDirs, includeShared } = config;
  
  // If specific content directories are provided, use those
  if (contentDirs && contentDirs.length > 0) {
    return contentDirs.map(dir => path.join(baseDir, dir));
  }
  
  const dirs: string[] = [];
  
  // Add site-specific content directory if showOn is provided
  if (showOn) {
    const siteContentPath = path.join(baseDir, 'sites', showOn, 'content/blog');
    try {
      await fs.access(siteContentPath);
      dirs.push(siteContentPath);
    } catch (error) {
      console.warn(`Warning: Could not access site content directory ${siteContentPath}:`, error);
    }
  }
  
  // Add shared content directory if includeShared is true (default)
  if (includeShared !== false) {
    const sharedContentPath = path.join(baseDir, 'shared/content/blog');
    try {
      await fs.access(sharedContentPath);
      dirs.push(sharedContentPath);
    } catch (error) {
      console.warn(`Warning: Could not access shared content directory ${sharedContentPath}:`, error);
    }
  }
  
  return dirs;
}

export async function getAllPosts(config: ContentConfig = {}): Promise<BlogPost[]> {
  const {
    showOn = process.env.SITE_ID || 'default',
    baseDir = process.cwd(),
  } = config;
  
  // Get content directories based on configuration
  const contentDirs = await getContentDirs(baseDir, config);
  
  // Collect posts from all content directories
  const allPosts = await Promise.all(
    contentDirs.map(async (dir) => {
      try {
        const files = await fs.readdir(dir);
        return Promise.all(
          files.filter((f: string) => f.endsWith('.mdx')).map(async (filename: string) => {
            const filePath = path.join(dir, filename);
            const rawContent = await fs.readFile(filePath, 'utf-8');
            const { data: frontmatter, content } = matter(rawContent);
            const slug = filename.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.mdx$/, '');
            
            // Determine if this is a site-specific post
            const isSiteSpecific = dir.includes(`/sites/${showOn}/`);
            const siteId = isSiteSpecific ? showOn : undefined;
            
            // Resolve image paths
            const image = frontmatter.image ? resolveImagePath(frontmatter.image, baseDir, siteId) : undefined;
            const ogImage = frontmatter.ogImage ? resolveImagePath(frontmatter.ogImage, baseDir, siteId, true) : undefined;
            
            // Process content images
            const processedContent = processContentImages(content, siteId);
            
            // Calculate reading time (rough estimate)
            const wordsPerMinute = 200;
            const wordCount = processedContent.split(/\s+/g).length;
            const readingTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;
            
            // Extract excerpt from content if not provided in frontmatter
            const excerpt = frontmatter.excerpt || processedContent.slice(0, 150).trim() + '...';
            
            // Serialize MDX with proper configuration
            const mdxSource = await serialize(processedContent, {
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                format: 'mdx',
                development: process.env.NODE_ENV === 'development',
              },
              parseFrontmatter: false, // We already parsed it with gray-matter
            });
            
            return {
              ...frontmatter,
              slug,
              content: processedContent,
              readingTime,
              excerpt,
              image,
              ogImage,
              mdxSource,
            } as BlogPost;
          })
        );
      } catch (error) {
        console.warn(`Warning: Could not read directory ${dir}:`, error);
        return [];
      }
    })
  );

  // Flatten and filter posts
  const posts = allPosts.flat();
  return posts.filter((post: BlogPost) =>
    !showOn || !post.showOn || post.showOn.length === 0 || post.showOn.includes(showOn)
  );
}

export async function getPostBySlug(
  slug: string,
  config: ContentConfig = {}
): Promise<BlogPost> {
  const {
    showOn = process.env.SITE_ID || 'default',
    serializeContent = true,
    baseDir = process.cwd(),
  } = config;
  
  // Get content directories based on configuration
  const contentDirs = await getContentDirs(baseDir, config);
  
  // Search for the post in all content directories
  for (const dir of contentDirs) {
    try {
      const files = await fs.readdir(dir);
      const filename = files.find((f: string) => f.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '').replace(/\.mdx$/, '') === slug);
      if (filename) {
        const filePath = path.join(dir, filename);
        const rawContent = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(rawContent);
        
        // Determine if this is a site-specific post
        const isSiteSpecific = dir.includes(`/sites/${showOn}/`);
        const siteId = isSiteSpecific ? showOn : undefined;
        
        // Resolve image paths
        const image = frontmatter.image ? resolveImagePath(frontmatter.image, baseDir, siteId) : undefined;
        const ogImage = frontmatter.ogImage ? resolveImagePath(frontmatter.ogImage, baseDir, siteId, true) : undefined;
        
        // Process content images
        const processedContent = processContentImages(content, siteId);
        
        // Calculate reading time (rough estimate)
        const wordsPerMinute = 200;
        const wordCount = processedContent.split(/\s+/g).length;
        const readingTime = `${Math.ceil(wordCount / wordsPerMinute)} min read`;
        
        // Extract excerpt from content if not provided in frontmatter
        const excerpt = frontmatter.excerpt || processedContent.slice(0, 150).trim() + '...';
        
        // Serialize MDX with proper configuration
        const mdxSource = serializeContent ? await serialize(processedContent, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            format: 'mdx',
            development: process.env.NODE_ENV === 'development',
          },
          parseFrontmatter: false, // We already parsed it with gray-matter
        }) : undefined;
        
        return {
          ...frontmatter,
          slug,
          content: processedContent,
          readingTime,
          excerpt,
          mdxSource,
          image,
          ogImage,
        } as BlogPost;
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dir}:`, error);
    }
  }
  
  throw new Error('Post not found');
} 