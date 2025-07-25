'use client';

import { LinkedinShareButton, WhatsappShareButton, TwitterShareButton, LinkedinIcon, WhatsappIcon, TwitterIcon } from "next-share";

interface ShareButtonsProps {
  postUrl: string;
  postTitle: string;
  className?: string;
}

export default function ShareButtons({ postUrl, postTitle, className = '' }: ShareButtonsProps) {
  return (
    <>
      {/* Floating on right for desktop */}
      <div className={`hidden lg:flex flex-col gap-3 fixed top-1/3 right-8 z-30 bg-white/90 rounded-lg shadow p-3 border border-gray-200 ${className}`}>
        <LinkedinShareButton url={postUrl} title={postTitle}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={postUrl} title={postTitle}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={postUrl} title={postTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <button
          onClick={() => navigator.clipboard.writeText(postUrl)}
          className="mt-2 text-xs text-gray-500 hover:text-blue-700"
          title="Copy Link"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15v-6a2 2 0 0 1 2-2h6"/>
          </svg>
        </button>
      </div>
      
      {/* Bottom bar for mobile */}
      <div className="lg:hidden flex gap-4 justify-center items-center w-full py-4 border-t mt-8 bg-white sticky bottom-0 z-20">
        <LinkedinShareButton url={postUrl} title={postTitle}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <WhatsappShareButton url={postUrl} title={postTitle}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={postUrl} title={postTitle}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <button
          onClick={() => navigator.clipboard.writeText(postUrl)}
          className="text-xs text-gray-500 hover:text-blue-700"
          title="Copy Link"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15v-6a2 2 0 0 1 2-2h6"/>
          </svg>
        </button>
      </div>
    </>
  );
}
