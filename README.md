# blog-engine

Reusable blog engine for Next.js sites using MDX content from a shared content repo.

## Features
- Loads MDX files from a content directory (e.g., submodule)
- Filters posts by site using the `showOn` frontmatter and `SITE_ID` env variable
- Provides utilities for listing and rendering blog posts
- Includes ready-to-use React components for MDX rendering

## Usage

1. Install the package (locally or from npm/git)
2. Add your content repo as a submodule (e.g., `content/blog/*.mdx`)
3. Set `SITE_ID` in your environment
4. Use the provided functions and components in your Next.js app

```ts
import { getAllPosts, getPostBySlug } from 'blog-engine/mdx';
import MDXRenderer from 'blog-engine/components/MDXRenderer';

const siteId = process.env.SITE_ID || 'default';
const posts = await getAllPosts({ showOn: siteId });
```

---

You can later move this package to its own repo and publish it for all your sites. 