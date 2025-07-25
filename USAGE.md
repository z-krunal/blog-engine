# Blog Engine Usage Guide

The blog-engine is a reusable library for rendering MDX blog posts with beautiful layouts and components.

## Quick Start

### 1. Install the blog-engine

```bash
npm install blog-engine
```

### 2. Basic Usage

```tsx
import { getPostBySlug, BlogPostLayout } from 'blog-engine';

// In your page component
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, {
    showOn: 'your-site-id',
    baseDir: process.cwd(),
    contentDirs: ['sites/yoursite/content/blog']
  });

  return <BlogPostLayout post={post} />;
}
```

### 3. Advanced Usage with Custom Layout

```tsx
import { getPostBySlug, BlogHeader, MDXContent } from 'blog-engine';

export default async function CustomBlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, {
    showOn: 'your-site-id',
    baseDir: process.cwd(),
    contentDirs: ['sites/yoursite/content/blog']
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Beautiful header with gradient background */}
          <BlogHeader post={post} />
          
          {/* Your custom content */}
          <div className="p-8 lg:p-12">
            <MDXContent source={post.mdxSource} />
          </div>
        </article>
      </div>
    </div>
  );
}
```

## Available Components

### BlogLayout
A complete blog listing layout with sidebar, post grid, sorting, filtering, and pagination.

```tsx
import { BlogLayout } from 'blog-engine';

<BlogLayout
  posts={posts}
  categories={categories}
  currentCategory={currentCategory}
  featuredPosts={featuredPosts}
  recentPosts={recentPosts}
  baseUrl="https://yoursite.com"
  showSidebar={true}
  showSortControls={true}
  showTagFilters={true}
  postsPerPage={10}
  className="custom-class"
/>
```

### BlogList
A standalone blog post grid with sorting, filtering, and pagination.

```tsx
import { BlogList } from 'blog-engine';

<BlogList
  posts={posts}
  tags={tags}
  baseUrl="https://yoursite.com"
  showSortControls={true}
  showTagFilters={true}
  postsPerPage={10}
  className="custom-class"
/>
```

### BlogSidebar
A sidebar component with featured posts, recent posts, and category navigation.

```tsx
import { BlogSidebar } from 'blog-engine';

<BlogSidebar
  categories={categories}
  currentCategory={currentCategory}
  featuredPosts={featuredPosts}
  recentPosts={recentPosts}
  baseUrl="https://yoursite.com"
  className="custom-class"
/>
```

### BlogPostLayout
A complete blog post layout with header, content, sharing buttons, and styling.

```tsx
import { BlogPostLayout } from 'blog-engine';

<BlogPostLayout 
  post={post}
  showTags={true}
  showCoverImage={true}
  showShareButtons={true}
  baseUrl="https://yoursite.com"
  footer={<YourCustomFooter />}
  className="custom-class"
/>
```

### BlogHeader
The beautiful header component with gradient background, author info, and tags.

```tsx
import { BlogHeader } from 'blog-engine';

<BlogHeader post={post} className="custom-header-class" />
```

### ShareButtons
Beautiful sharing buttons with LinkedIn, WhatsApp, Twitter, and copy link functionality.

```tsx
import { ShareButtons } from 'blog-engine';

<ShareButtons 
  postUrl="https://yoursite.com/blog/post-slug"
  postTitle="Your Post Title"
  className="custom-class"
/>
```

### MDXContent
Renders MDX content with custom components.

```tsx
import { MDXContent } from 'blog-engine';

<MDXContent source={post.mdxSource} />
```

## MDX Functions

### getAllPosts
Get all blog posts with filtering options.

```ts
import { getAllPosts } from 'blog-engine';

const posts = await getAllPosts({
  showOn: 'your-site-id',
  baseDir: process.cwd(),
  contentDirs: ['sites/yoursite/content/blog'],
  includeShared: false
});
```

### getPostBySlug
Get a single post by its slug.

```ts
import { getPostBySlug } from 'blog-engine';

const post = await getPostBySlug('my-post-slug', {
  showOn: 'your-site-id',
  baseDir: process.cwd(),
  contentDirs: ['sites/yoursite/content/blog']
});
```

## Content Structure

Your MDX files should have this frontmatter structure:

```yaml
---
title: "Your Post Title"
description: "A short description of your post"
date: "2024-01-01"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Your Category"
image: "/images/your-image.jpg"
published: true
showOn: ["your-site-id"]
authorLinkedin: "https://linkedin.com/in/yourprofile"
---
```

## Customization

### Custom Styling
The components use Tailwind CSS classes. You can customize them by:

1. Overriding classes in your CSS
2. Using the `className` prop to add custom classes
3. Modifying the component source code

### Custom Components
You can pass custom components to the MDX renderer:

```tsx
import { MDXRenderer } from 'blog-engine';

const customComponents = {
  Callout: MyCustomCallout,
  CodeBlock: MyCustomCodeBlock,
};

<MDXRenderer source={post.mdxSource} components={customComponents} />
```

## Multi-site Support

The blog-engine supports multiple sites through the `showOn` configuration:

```ts
// Only show posts for this site
const posts = await getAllPosts({
  showOn: 'site-a',
  contentDirs: ['sites/site-a/content/blog']
});

// Show posts from multiple sites
const posts = await getAllPosts({
  showOn: 'site-a',
  contentDirs: [
    'sites/site-a/content/blog',
    'sites/shared/content/blog'
  ]
});
```

## Examples

### Next.js App Router
```tsx
// app/blog/[slug]/page.tsx
import { getPostBySlug, BlogPostLayout } from 'blog-engine';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug, {
    showOn: 'your-site',
    baseDir: process.cwd(),
    contentDirs: ['sites/yoursite/content/blog']
  });

  return <BlogPostLayout post={post} />;
}
```

### Next.js Pages Router
```tsx
// pages/blog/[slug].tsx
import { getPostBySlug, BlogPostLayout } from 'blog-engine';

export default function BlogPost({ post }) {
  return <BlogPostLayout post={post} />;
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug, {
    showOn: 'your-site',
    baseDir: process.cwd(),
    contentDirs: ['sites/yoursite/content/blog']
  });

  return { props: { post } };
}
```

## Troubleshooting

### Common Issues

1. **Posts not found**: Check your `contentDirs` path
2. **Serialization errors**: Ensure all optional fields are properly handled
3. **Styling issues**: Make sure Tailwind CSS is properly configured

### Debug Mode
Enable debug logging by setting environment variables:

```bash
DEBUG=blog-engine npm run dev
```

## Support

For issues and questions, please check the blog-engine documentation or create an issue in the repository.

