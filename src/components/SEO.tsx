import Head from 'next/head';
import type { BlogPost } from '../types/blog';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  post?: BlogPost;
  baseUrl?: string;
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  post,
  baseUrl = 'https://example.com'
}: SEOProps) {
  // Use post data if available
  const finalTitle = title || post?.title || 'Blog';
  const finalDescription = description || post?.description || 'Blog post';
  const finalImage = image || post?.image || `${baseUrl}/og-default.png`;
  const finalCanonical = canonical || (post ? `${baseUrl}/blog/${post.slug}` : `${baseUrl}/blog`);
  const finalAuthor = author || post?.author;
  const finalTags = tags || post?.tags || [];
  const finalPublishedTime = publishedTime || post?.date;
  const finalModifiedTime = modifiedTime || post?.date; // Using date as fallback since lastModified doesn't exist

  // Generate structured data
  const structuredData = post ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: finalTitle,
    description: finalDescription,
    image: finalImage,
    author: {
      '@type': 'Person',
      name: finalAuthor || 'Unknown Author'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: finalPublishedTime,
    dateModified: finalModifiedTime || finalPublishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': finalCanonical
    },
    keywords: finalTags.join(', '),
    articleSection: post.category,
    url: finalCanonical
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: finalTitle,
    description: finalDescription,
    url: finalCanonical
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalTags.join(', ')} />
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Blog" />
      {finalAuthor && <meta property="og:author" content={finalAuthor} />}
      {finalPublishedTime && <meta property="article:published_time" content={finalPublishedTime} />}
      {finalModifiedTime && <meta property="article:modified_time" content={finalModifiedTime} />}
      {finalTags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="RSS Feed" href={`${baseUrl}/rss.xml`} />
    </Head>
  );
} 