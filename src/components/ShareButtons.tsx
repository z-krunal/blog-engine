// components/ShareButtons.tsx
import { useState } from 'react';
import { Copy, Check, Linkedin, Twitter, Share2, MessageCircle } from 'lucide-react';

const baseUrl = 'https://yourdomain.com'; // 🔁 Replace with your blog's base URL

type ShareButtonsProps = {
  url: string; // e.g., `/blog/my-post`
  title: string;
  description?: string;
};

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const fullUrl = `${baseUrl}${url}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center text-sm text-gray-700 mt-8">
      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        title="Copy link"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-blue-50 transition"
        title="Share on LinkedIn"
      >
        <Linkedin size={16} /> LinkedIn
      </a>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n' + fullUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-green-50 transition"
        title="Share on WhatsApp"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        title="Share on X"
      >
        <Twitter size={16} /> X
      </a>
    </div>
  );
}
