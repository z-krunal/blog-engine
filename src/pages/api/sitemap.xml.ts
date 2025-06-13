import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPosts } from '../../mdx';
import { generateSitemap } from '../../seo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await getAllPosts();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const sitemap = await generateSitemap(posts, siteUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
} 