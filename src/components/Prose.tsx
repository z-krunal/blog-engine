import React from "react";

interface ProseProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Prose({ 
  children, 
  className = '',
  as: Component = 'article' 
}: ProseProps) {
  return (
    <Component 
      className={`prose prose-lg prose-slate
        prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-8
        prose-h2:text-3xl prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mb-4
        prose-p:mb-6
        prose-img:rounded-lg prose-img:shadow-md
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:shadow-lg
        prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-ul:list-disc prose-ul:pl-6
        prose-ol:list-decimal prose-ol:pl-6
        prose-li:mb-2
        prose-table:w-full prose-table:border-collapse
        prose-th:bg-gray-100 prose-th:p-3 prose-th:border prose-th:border-gray-300
        prose-td:p-3 prose-td:border prose-td:border-gray-300
        !max-w-none
        ${className}`}
    >
      {children}
    </Component>
  );
} 