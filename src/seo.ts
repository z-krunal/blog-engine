import { BlogPost } from './types/blog';

export function generateMetaTags(post: BlogPost, siteUrl: string) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const title = post.title;
  const description = post.description;
  const ogImage = post.ogImage ? `${siteUrl}${post.ogImage}` : `${siteUrl}/og-default.jpg`;
  const author = post.author || 'Default Author';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@yourtwitterhandle', // Replace with your Twitter handle
    },
    canonical: post.canonical || url,
  };
}

export function generateStructuredData(post: BlogPost, siteUrl: string) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.ogImage ? `${siteUrl}${post.ogImage}` : `${siteUrl}/og-default.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Default Author',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Organization Name', // Replace with your organization name
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`, // Replace with your logo path
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
  };
}

export async function generateSitemap(posts: BlogPost[], siteUrl: string) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
    .filter(post => post.published !== false)
    .map(
      post => `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return sitemap;
} 