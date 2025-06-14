'use client';
// components/ShareButtons.tsx
import { FaLinkedin, FaWhatsapp, FaXTwitter, FaRegCopy } from "react-icons/fa6"; // or FaTwitter for old Twitter logo
import { useState } from "react";
import { FiShare2 } from "react-icons/fi"; // Feather share icon

const baseUrl = 'https://yourdomain.com'; // 🔁 Replace with your blog's base URL

type ShareButtonsProps = {
  url: string; // e.g., `/blog/my-post`
  title: string;
  description?: string;
};

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const fullUrl = `${baseUrl}${url}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex items-center">
      <span className="p-2 text-gray-500">
        <FiShare2 className="text-2xl" title="Share" aria-label="Share" />
      </span>
      <button
        onClick={handleCopy}
        className="group p-2 rounded-full hover:bg-gray-200 transition"
        title={copied ? "Copied!" : "Copy Link"}
        aria-label="Copy Link"
      >
        <FaRegCopy className="text-xl text-gray-500 group-hover:text-gray-700" />
      </button>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2 rounded-full hover:bg-blue-100 transition"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="text-xl text-blue-700 group-hover:text-blue-900" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2 rounded-full hover:bg-green-100 transition"
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp className="text-xl text-green-600 group-hover:text-green-800" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group p-2 rounded-full hover:bg-blue-100 transition"
        title="Share on X"
        aria-label="Share on X"
      >
        <FaXTwitter className="text-xl text-black group-hover:text-blue-700" />
      </a>
    </div>
  );
}
