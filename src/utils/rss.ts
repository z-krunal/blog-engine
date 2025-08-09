import type { BlogPost } from '../types/blog';

interface RSSOptions {
  title: string;
  description: string;
  siteUrl: string;
  feedUrl: string;
  language?: string;
  copyright?: string;
}

export function generateRSSFeed(posts: BlogPost[], options: RSSOptions): string {
  const {
    title,
    description,
    siteUrl,
    feedUrl,
    language = 'en-US',
    copyright = `Copyright ${new Date().getFullYear()}`
  } = options;

  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const content = post.description || '';
      
      return `
        <item>
          <guid isPermaLink="true">${postUrl}</guid>
          <title><![CDATA[${post.title}]]></title>
          <link>${postUrl}</link>
          <description><![CDATA[${content}]]></description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.author ? `<author>${post.author}</author>` : ''}
          ${post.category ? `<category>${post.category}</category>` : ''}
          ${post.tags ? post.tags.map(tag => `<category>${tag}</category>`).join('') : ''}
        </item>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${title}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${description}]]></description>
    <language>${language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <copyright>${copyright}</copyright>
    ${rssItems}
  </channel>
</rss>`;
} 