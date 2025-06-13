import Head from 'next/head';
import { BlogPost } from '../mdx';
import { generateMetaTags, generateStructuredData } from '../seo';

interface SEOProps {
  post: BlogPost;
  siteUrl: string;
}

export default function SEO({ post, siteUrl }: SEOProps) {
  const metaTags = generateMetaTags(post, siteUrl);
  const structuredData = generateStructuredData(post, siteUrl);

  return (
    <Head>
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <link rel="canonical" href={metaTags.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTags.openGraph.title} />
      <meta property="og:description" content={metaTags.openGraph.description} />
      <meta property="og:url" content={metaTags.openGraph.url} />
      <meta property="og:type" content={metaTags.openGraph.type} />
      <meta property="og:published_time" content={metaTags.openGraph.publishedTime} />
      {metaTags.openGraph.authors.map((author, index) => (
        <meta key={index} property="og:author" content={author} />
      ))}
      {metaTags.openGraph.images.map((image, index) => (
        <meta key={index} property="og:image" content={image.url} />
      ))}
      <meta property="og:image:width" content={metaTags.openGraph.images[0].width.toString()} />
      <meta property="og:image:height" content={metaTags.openGraph.images[0].height.toString()} />
      <meta property="og:image:alt" content={metaTags.openGraph.images[0].alt} />

      {/* Twitter */}
      <meta name="twitter:card" content={metaTags.twitter.card} />
      <meta name="twitter:title" content={metaTags.twitter.title} />
      <meta name="twitter:description" content={metaTags.twitter.description} />
      {metaTags.twitter.images.map((image, index) => (
        <meta key={index} name="twitter:image" content={image} />
      ))}
      <meta name="twitter:creator" content={metaTags.twitter.creator} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
} 