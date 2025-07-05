# Blog Engine Best Practices Guide

## SEO Best Practices

### 1. Frontmatter Requirements
Each MDX post should include the following frontmatter:

```yaml
---
title: "Your Post Title"
description: "A compelling description of your post (150-160 characters)"
date: "2024-03-21"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category"
image: "/images/post-cover.jpg"  # Main post image
ogImage: "/images/og-image.jpg"  # Open Graph image (1200x630px recommended)
published: true
canonical: "https://yourdomain.com/blog/post-slug"  # Canonical URL
showOn: ["site1", "site2"]  # Optional: Control post visibility
---
```

### 2. Open Graph & Twitter Meta Tags
The blog engine supports Open Graph and Twitter meta tags through frontmatter. Ensure your MDX files include:

```yaml
---
title: "Post Title"
description: "Post description"
ogImage: "/images/og-image.jpg"  # Required for social sharing
---
```

### 2a. Centralized OGCard Component for Social Images
All dynamic Open Graph (OG) image endpoints now use a single, reusable `OGCard` React component (`src/components/OGCard.tsx`).

- This ensures a consistent, maintainable, and DRY approach for all OG/social preview images.
- The `OGCard` component accepts `title`, `description`, and optional `subtitle` props.
- To update the look or logic for all OG images, edit `OGCard.tsx`.

**How to use in an endpoint:**
```tsx
import { ImageResponse } from 'next/og';
import OGCard from '../../components/OGCard';

export default function OGImage() {
  return new ImageResponse(
    <OGCard
      title="Your Title"
      description="Your description"
      subtitle="Optional subtitle"
    />, {
      width: 1200,
      height: 630,
    }
  );
}
```
- All endpoints for site, blog, post, tag, and category OG images now use this pattern.

### 3. Structured Data (JSON-LD)
The blog engine automatically generates JSON-LD structured data for blog posts. No additional configuration needed in MDX files.

### 4. Sitemap
The blog engine automatically generates a sitemap.xml file. Ensure your posts have:
- Valid `published` status
- Correct `date` format
- Proper `slug` (derived from filename)

### 5. Image Best Practices
- Use descriptive filenames
- Optimize images before uploading
- Include alt text in MDX:
```mdx
![Alt text describing the image](/path/to/image.jpg)
```

## MDX Writing Guidelines

### 1. File Naming
- Use format: `YYYY-MM-DD-post-title.mdx`
- Example: `2024-03-21-getting-started-with-nextjs.mdx`

### 2. Content Structure
```mdx
---
title: "Your Title"
description: "Your description"
date: "YYYY-MM-DD"
author: "Your Name"
tags: ["tag1", "tag2"]
category: "Category"
image: "/images/cover.jpg"
ogImage: "/images/og-image.jpg"
published: true
---

# Main Title

Introduction paragraph...

## Section 1

Content...

### Subsection

More content...

## Section 2

Content...
```

### 3. Code Blocks
Use language-specific code blocks with syntax highlighting:
````mdx
```javascript
const example = "code";
```
````

Supported languages:
- javascript/jsx
- typescript/tsx
- python
- bash
- json
- yaml
- markdown
- html
- css
- sql

### 4. Custom Components
The blog engine supports several custom components:

#### Callout
```mdx
<Callout type="info">
  This is an important note.
</Callout>
```

Types: info, warning, error, success

#### CodeBlock
```mdx
<CodeBlock
  language="javascript"
  code={`console.log("Hello!");`}
  showLineNumbers
/>
```

#### YouTube Embed
```mdx
<YouTubeEmbed videoId="YOUR_VIDEO_ID" />
```

#### Image with Caption
```mdx
<ImageWithCaption
  src="/path/to/image.jpg"
  alt="Description"
  caption="Image caption"
/>
```

### 5. Links
Use descriptive link text:
```mdx
[Link text](https://example.com)
```

### 6. Images
Always include alt text:
```mdx
![Description of image](/path/to/image.jpg)
```

### 7. Tables
```mdx
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### 8. Lists
Unordered:
```mdx
- Item 1
- Item 2
  - Nested item
```

Ordered:
```mdx
1. First item
2. Second item
```

### 9. Task Lists
```mdx
- [x] Completed task
- [ ] Pending task
```

### 10. Blockquotes
```mdx
> This is a blockquote
```

### 11. Footnotes
```mdx
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

### 12. Math Equations (if enabled)
```mdx
$$
E = mc^2
$$
```

## Performance Optimization

### 1. Image Optimization
- Use Next.js Image component in custom components
- Optimize images before uploading
- Use appropriate image formats (WebP when possible)
- Recommended image sizes:
  - Cover images: 1200x630px
  - Inline images: 800x600px max
  - Thumbnails: 400x300px

### 2. Code Splitting
- Keep MDX files focused and concise
- Use lazy loading for heavy components
- Split long posts into logical sections
- Maximum recommended post length: 2000-3000 words

## Multi-site Publishing

### 1. Site-specific Content
Use the `showOn` frontmatter field to control post visibility:
```yaml
---
showOn: ["site1", "site2"]  # Post will only show on these sites
---
```

### 2. Environment Configuration
Set `SITE_ID` in your environment:
```env
SITE_ID=your-site-id
```

## Troubleshooting

### Common Issues
1. **Missing OG Image**: Ensure `ogImage` is set in frontmatter
2. **Invalid Date Format**: Use YYYY-MM-DD format
3. **Broken Links**: Use relative paths for internal links
4. **Missing Meta Tags**: Check frontmatter completeness
5. **Component Errors**: Verify component props and imports
6. **Image Loading**: Check image paths and optimization
7. **Code Highlighting**: Ensure language is specified

### Best Practices Checklist
- [ ] Complete frontmatter
- [ ] Valid date format
- [ ] OG image set
- [ ] Proper file naming
- [ ] Alt text for images
- [ ] Descriptive link text
- [ ] Code blocks with language
- [ ] Proper heading hierarchy
- [ ] Site-specific settings (if needed)
- [ ] Custom components properly used
- [ ] Images optimized
- [ ] Math equations properly formatted (if used)
- [ ] Footnotes properly linked
- [ ] Task lists properly formatted
- [ ] Tables properly aligned
- [ ] Blockquotes properly formatted

## Image Organization

### 1. Directory Structure
```
public/
├── images/
│   ├── blog/           # Blog post images
│   │   ├── covers/     # Post cover images (1200x630px)
│   │   ├── og/        # Open Graph images (1200x630px)
│   │   └── content/   # In-post images (max 800x600px)
│   └── common/        # Shared images (logo, etc.)
```

### 2. Image Paths in MDX
```yaml
---
# Cover image for the post
image: "/images/blog/covers/post-slug-cover.jpg"

# Open Graph image for social sharing
ogImage: "/images/blog/og/post-slug-og.jpg"
---

# In-post images
![Description](/images/blog/content/post-slug-image1.jpg)
```

### 3. Image Naming Conventions
- Use lowercase letters
- Use hyphens for spaces
- Include post slug in filename
- Include image purpose in filename
- Examples:
  - `getting-started-cover.jpg`
  - `getting-started-og.jpg`
  - `getting-started-diagram1.jpg`

### 4. Image Optimization
- Cover images: 1200x630px
- OG images: 1200x630px
- In-post images: max 800x600px
- Use WebP format when possible
- Compress images before uploading
- Include descriptive alt text

### 5. Image Usage in MDX
```mdx
# Using images in content

## With alt text
![Description of the image](/images/blog/content/image-name.jpg)

## With custom component
<ImageWithCaption
  src="/images/blog/content/image-name.jpg"
  alt="Description"
  caption="Image caption"
/>
``` 