# blog-engine Usage Guide

## Overview

`blog-engine` is a reusable package for handling MDX-based blogs in Next.js projects. It supports multi-site publishing, filtering by site, and efficient server/client rendering.

---

## Setup

1. **Add blog-engine as a submodule:**
   ```bash
   git submodule add git@github.com:z-krunal/blog-engine.git blog-engine
   git submodule update --init --recursive

   git submodule add git@github-z-krunal:z-krunal/blog-engine.git blog-engine

   ```

2. **Set up image symlinks:**
   ```bash
   # Create image directories
   mkdir -p public/images/{krunalsabnis,antphant,shared}

   # Create symlinks for each site
   # For krunalsabnis
   cd public/images/krunalsabnis
   ln -s ../../../blog-engine/sites/krunalsabnis/public/images/blog blog
   ln -s ../../../blog-engine/sites/krunalsabnis/public/images/og og
   cd ../../..

   # For antphant
   cd public/images/antphant
   ln -s ../../../blog-engine/sites/antphant/public/images/blog blog
   ln -s ../../../blog-engine/sites/antphant/public/images/og og
   cd ../../..

   # For shared content
   cd public/images/shared
   ln -s ../../../blog-engine/shared/public/images/blog blog
   ln -s ../../../blog-engine/shared/public/images/og og
   cd ../../..
   ```

3. **Verify symlinks:**
   ```bash
   ls -la public/images/krunalsabnis/
   # Should show:
   # blog -> ../../../blog-engine/sites/krunalsabnis/public/images/blog
   # og -> ../../../blog-engine/sites/krunalsabnis/public/images/og
   ```

4. **Configure path alias in `tsconfig.json`:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "blog-engine/*": ["blog-engine/src/*"],
         "@/*": ["src/*"]
       }
     }
   }
   ```

5. **Set the site ID in your environment:**
   ```env
   SITE_ID=krunalsabnis
   ```

6. **Install required dependencies:**
   ```bash
   npm install --save-dev @types/node
   ```

---

## Usage in Your App

### Importing utilities and components
```ts
import { getAllPosts, getPostBySlug } from 'blog-engine/mdx';
import MDXRenderer from 'blog-engine/components/MDXRenderer';
```

### Listing posts for the current site
```ts
const siteId = process.env.SITE_ID || 'default';
const posts = await getAllPosts({ 
  showOn: siteId,
  baseDir: path.join(process.cwd(), 'blog-engine')
});
```

### Getting a single post
```ts
const post = await getPostBySlug(slug, { 
  showOn: siteId,
  baseDir: path.join(process.cwd(), 'blog-engine')
});
```

### Rendering MDX content
```tsx
<MDXRenderer source={post.mdxSource} />
```

---

## Path Configuration

The `blog-engine` now supports flexible path configuration through three parameters:

1. `baseDir`: The root directory where your blog-engine is located
   - Default: `process.cwd()`
   - Example: `/Users/username/projects/blog-engine`

2. `contentDir`: The directory containing your MDX files relative to `baseDir`
   - Default: `content/blog`
   - Example: `content/blog` or `posts`

3. `showOn`: The site identifier for multi-site filtering
   - Default: `process.env.SITE_ID || 'default'`
   - Example: `krunalsabnis`

### Common Path Configuration Examples

1. **When blog-engine is a submodule in your project root:**
```ts
const posts = await getAllPosts({
  baseDir: path.join(process.cwd(), 'blog-engine'),
  contentDir: 'content/blog'
});
```

2. **When using environment variable for baseDir:**
```ts
// In your .env file:
// BLOG_ENGINE_BASEDIR=/absolute/path/to/blog-engine
// OR
// BLOG_ENGINE_BASEDIR=blog-engine

const posts = await getAllPosts({
  baseDir: process.env.BLOG_ENGINE_BASEDIR || process.cwd(),
  contentDir: 'content/blog'
});
```

### Common Path Issues and Solutions

1. **Double content directory error:**
   - ❌ Incorrect: `BLOG_ENGINE_BASEDIR=blog-engine/content` with `contentDir: 'content/blog'`
   - ✅ Correct: `BLOG_ENGINE_BASEDIR=blog-engine` with `contentDir: 'content/blog'`

2. **Path not found error:**
   - ❌ Incorrect: `baseDir: 'blog-engine'` (relative path without process.cwd())
   - ✅ Correct: `baseDir: path.join(process.cwd(), 'blog-engine')`

3. **Wrong content directory:**
   - ❌ Incorrect: `contentDir: 'blog'` (missing parent directory)
   - ✅ Correct: `contentDir: 'content/blog'`

### Recommended Configuration

For most projects, we recommend:

```ts
// In your .env file:
BLOG_ENGINE_BASEDIR=blog-engine

// In your code:
const posts = await getAllPosts({
  baseDir: process.env.BLOG_ENGINE_BASEDIR || process.cwd(),
  contentDir: 'content/blog',
  showOn: process.env.SITE_ID
});
```

---

## Special Options

### Skipping MDX Serialization (for Open Graph, etc.)
If you only need frontmatter (title, description, etc.) and not the full MDX content, use:
```ts
const post = await getPostBySlug(slug, { 
  contentDir: 'content/blog', 
  baseDir: '/path/to/blog-engine',
  serializeContent: false 
});
```
This avoids unnecessary MDX processing and client rendering warnings.

---

## Multi-site Filtering
- The `showOn` field in your MDX frontmatter controls which sites see each post.
- Set `SITE_ID` in your environment to filter posts for each site.

---

## Moving to a Standalone Package
- When ready, move `blog-engine` to its own repo and publish to npm or your private registry.
- Update your imports to use the published package name.

---

## Example .env
```
SITE_ID=krunalsabnis
```

---

## Questions?
Open an issue or check the README for more details. 




## Handling Images and Assets

### 1. Image Directory Structure
The blog engine supports both shared and site-specific image directories:

```
blog-engine/
├── content/
│   ├── blog/          # MDX files
│   │   └── *.mdx     # Blog posts
│   │   └── site1/     # Site-specific content
│   │   └── site2/     # Site-specific content
│   └── meta/          # Meta content
├── public/
│   └── images/
│       ├── blog/      # Shared blog images
│       ├── site1/     # Site-specific images
│       └── site2/     # Site-specific images
```

### 2. Image Paths in MDX
When referencing images in your MDX files, use paths relative to the appropriate image directory:

```yaml
---
# In frontmatter for shared content (content/blog/*.mdx)
image: "covers/post-cover.jpg"  # Will resolve to /images/blog/covers/post-cover.jpg
ogImage: "og/post-og.jpg"       # Will resolve to /images/blog/og/post-og.jpg

# In frontmatter for site-specific content (content/site1/*.mdx)
image: "covers/post-cover.jpg"  # Will resolve to /images/site1/covers/post-cover.jpg
ogImage: "og/post-og.jpg"       # Will resolve to /images/site1/og/post-og.jpg
---

# In content
![Description](content/post-image.jpg)  # Will resolve to the appropriate image directory
```

The blog engine will automatically resolve these paths to the correct location based on where the MDX file is located.

### 3. Image Path Resolution
The blog engine handles image paths in the following ways:

1. **Absolute URLs**: If the path starts with `http` or `https`, it's used as is
   ```yaml
   image: "https://example.com/image.jpg"
   ```

2. **Absolute Paths**: If the path starts with `/`, it's used as is
   ```yaml
   image: "/images/logo.png"
   ```

3. **Relative Paths**: All other paths are resolved based on the content location:
   - For files in `content/blog/`: Resolves to `/images/blog/`
   - For files in `content/site1/`: Resolves to `/images/site1/`
   - For files in `content/site2/`: Resolves to `/images/site2/`

### 4. Best Practices for Images

1. **Image Organization:**
   - Keep shared images in `public/images/blog/`
   - Keep site-specific images in `public/images/{site-id}/`
   - Use subdirectories to organize by type (covers, og, content)
   - Use descriptive filenames
   - Include post slug in image names

2. **Image Optimization:**
   - Use Next.js Image component
   - Optimize images before uploading
   - Use appropriate formats (WebP when possible)

3. **Image Sizes:**
   - Cover images: 1200x630px
   - OG images: 1200x630px
   - In-post images: max 800x600px

4. **Image References:**
   ```mdx
   # In your MDX files
   ![Description](content/post-slug-image1.jpg)
   
   # Or using Next.js Image component
   <Image
     src={post.image}  # The blog engine will provide the correct path
     alt="Description"
     width={800}
     height={600}
   />
   ```

### 5. Migrating to Site-Specific Images

1. **Create Site Image Directories:**
   ```bash
   mkdir -p public/images/site1 public/images/site2
   ```

2. **Move Site-Specific Images:**
   ```bash
   # For each site
   mv public/images/blog/site1/* public/images/site1/
   mv public/images/blog/site2/* public/images/site2/
   ```

3. **Update Image References:**
   - No need to update image paths in MDX files
   - The blog engine will automatically resolve paths based on content location

### 6. Troubleshooting Image Issues

1. **Images not loading:**
   - Check if images are in the correct directory structure
   - Verify image paths in MDX files
   - Ensure images exist in the appropriate image directory

2. **Wrong image paths:**
   - Use relative paths from the appropriate image directory
   - Don't include '/images/blog' or '/images/site1' in the path
   - Check for typos in paths

3. **Image optimization issues:**
   - Use Next.js Image component
   - Provide width and height
   - Use appropriate image formats

## Content Organization

The blog engine supports both flat and site-specific content organization. The directory structure is as follows:

```
blog-engine/
├── sites/
│   ├── site1/
│   │   ├── content/
│   │   │   └── blog/
│   │   └── public/
│   │       └── images/
│   │           ├── blog/
│   │           └── og/
│   └── site2/
│       ├── content/
│       │   └── blog/
│       └── public/
│           └── images/
│               ├── blog/
│               └── og/
└── shared/
    ├── content/
    │   └── blog/
    └── public/
        └── images/
            ├── blog/
            └── og/
```

## Content Configuration

The blog engine provides flexible configuration options for content loading:

### Basic Usage

```typescript
// Default behavior - loads from site-specific and shared directories
const posts = await getAllPosts({
  showOn: 'site1'  // or process.env.SITE_ID
});
```

### Advanced Configuration

```typescript
// Load only from specific directories
const posts = await getAllPosts({
  showOn: 'site1',
  contentDirs: [
    'sites/site1/content/blog',
    'shared/content/blog'
  ]
});

// Exclude shared content
const posts = await getAllPosts({
  showOn: 'site1',
  includeShared: false
});

// Load from multiple sites
const posts = await getAllPosts({
  showOn: 'site1',
  contentDirs: [
    'sites/site1/content/blog',
    'sites/site2/content/blog',
    'shared/content/blog'
  ]
});
```

### Configuration Options

- `showOn`: Site ID to filter posts by (defaults to `process.env.SITE_ID`)
- `baseDir`: Base directory for content (defaults to `process.cwd()`)
- `contentDirs`: Array of specific directories to load content from
- `includeShared`: Whether to include shared content (defaults to `true`)
- `serializeContent`: Whether to serialize MDX content (for `getPostBySlug`)

## Post Visibility

Posts can be visible on multiple sites regardless of their location:

```mdx
---
title: "Shared Post"
showOn: ["site1", "site2"]  # Visible on both sites
---
```

## Image Organization

Images are organized by site and type:

- Site-specific images: `sites/{siteId}/public/images/`
  - Blog images: `blog/`
  - OG images: `og/`
- Shared images: `shared/public/images/`
  - Blog images: `blog/`
  - OG images: `og/`

## Best Practices

1. **Directory Naming**:
   - Use lowercase for site directories
   - Use descriptive names for content directories

2. **Content Organization**:
   - Keep site-specific content in site directories
   - Use shared directory for content visible on multiple sites
   - Use `showOn` to control post visibility

3. **Image Organization**:
   - Keep site-specific images in site directories
   - Use shared directory for common images
   - Separate blog images from OG images

4. **Post Naming**:
   - Use date prefix: `YYYY-MM-DD-title.mdx`
   - Use descriptive slugs
   - Include relevant metadata

## Migration Steps

1. Create site directories:
   ```bash
   mkdir -p sites/{site1,site2}/content/blog
   mkdir -p sites/{site1,site2}/public/images/{blog,og}
   ```

2. Create shared directories:
   ```bash
   mkdir -p shared/content/blog
   mkdir -p shared/public/images/{blog,og}
   ```

3. Move content:
   ```bash
   # Move site-specific content
   mv content/blog/site1/* sites/site1/content/blog/
   mv content/blog/site2/* sites/site2/content/blog/
   
   # Move shared content
   mv content/blog/shared/* shared/content/blog/
   ```

4. Update image paths in MDX files to reflect new structure

## Troubleshooting

1. **Missing Content**:
   - Check directory permissions
   - Verify content paths in configuration
   - Ensure `showOn` values match site IDs

2. **Image Issues**:
   - Verify image paths in frontmatter
   - Check image directory structure
   - Ensure proper permissions

3. **Performance**:
   - Use `contentDirs` to limit directory scanning
   - Set `includeShared: false` if not needed
   - Consider caching for frequently accessed content

## Content Organization

### Directory Structure
```
blog-engine/
├── sites/
│   ├── krunalsabnis/
│   │   ├── content/
│   │   │   └── blog/
│   │   └── public/
│   │       └── images/
│   │           ├── blog/
│   │           │   ├── content/
│   │           │   └── covers/
│   │           └── og/
│   ├── antphant/
│   │   ├── content/
│   │   │   └── blog/
│   │   └── public/
│   │       └── images/
│   │           ├── blog/
│   │           │   ├── content/
│   │           │   └── covers/
│   │           └── og/
│   └── shared/
│       ├── content/
│       │   └── blog/
│       └── public/
│           └── images/
│               ├── blog/
│               │   ├── content/
│               │   └── covers/
│               └── og/
└── public/
    └── images/
        ├── krunalsabnis/
        │   ├── blog -> ../../../sites/krunalsabnis/public/images/blog
        │   └── og -> ../../../sites/krunalsabnis/public/images/og
        ├── antphant/
        │   ├── blog -> ../../../sites/antphant/public/images/blog
        │   └── og -> ../../../sites/antphant/public/images/og
        └── shared/
            ├── blog -> ../../../shared/public/images/blog
            └── og -> ../../../shared/public/images/og
```

### Image Path Conventions

The blog-engine uses specific paths for images that should be reserved for blog content:

1. Blog Post Images:
   - Path: `/images/{site}/blog/...`
   - Example: `/images/krunalsabnis/blog/covers/test-cover.jpg`
   - Used for: Blog post cover images and content images

2. OG Images:
   - Path: `/images/{site}/og/...`
   - Example: `/images/krunalsabnis/og/test-og.jpg`
   - Used for: Open Graph images for social sharing

#### Important Note for Consuming Sites
When using the blog-engine in your site, please follow these guidelines:

1. **Reserved Paths**: Do not use the following paths for your own images:
   - `/images/{site}/blog/...`
   - `/images/{site}/og/...`
   These paths are reserved for blog-engine content.

2. **Local Images**: Use a different path structure for your site's local images:
   - `/assets/images/...`
   - `/images/local/...`
   - `/static/images/...`

3. **Symlinks**: The blog-engine creates symlinks in your public directory to serve blog images. These symlinks should not be modified or removed.

## Setting Up in Consuming Sites

### Option 1: Using Symlinks (Recommended)

1. **Create Image Directories**:
   ```bash
   mkdir -p public/images/{krunalsabnis,antphant,shared}
   ```

2. **Create Symlinks**:
   ```bash
   # For each site
   ln -s ../../../blog-engine/sites/krunalsabnis/public/images/blog public/images/krunalsabnis/blog
   ln -s ../../../blog-engine/sites/krunalsabnis/public/images/og public/images/krunalsabnis/og
   ```

3. **Verify Symlinks**:
   ```bash
   ls -la public/images/krunalsabnis/
   # Should show:
   # blog -> ../../../blog-engine/sites/krunalsabnis/public/images/blog
   # og -> ../../../blog-engine/sites/krunalsabnis/public/images/og
   ```

### Option 2: Copying Images

1. **Create Image Directories**:
   ```bash
   mkdir -p public/images/{krunalsabnis,antphant,shared}
   ```

2. **Copy Images**:
   ```bash
   # For each site
   cp -r blog-engine/sites/krunalsabnis/public/images/blog/* public/images/krunalsabnis/blog/
   cp -r blog-engine/sites/krunalsabnis/public/images/og/* public/images/krunalsabnis/og/
   ```

3. **Update Images**:
   - Run the copy commands again when blog-engine images are updated
   - Or create a script to automate the process

### Important Notes

1. **Path Resolution**:
   - Blog engine will resolve image paths to `/images/{site}/blog/...`
   - These paths must be available in your consuming site's public directory
   - Either through symlinks or copied files

2. **Local Images**:
   - Use different paths for your site's local images:
     - `/assets/images/...`
     - `/images/local/...`
     - `/static/images/...`

3. **Updating Images**:
   - With symlinks: Images update automatically when blog-engine is updated
   - With copies: Need to re-copy images when blog-engine is updated

4. **Deployment**:
   - Ensure your deployment platform supports symlinks if using Option 1
   - Some platforms may require Option 2 (copying) instead

