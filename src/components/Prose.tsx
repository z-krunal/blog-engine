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
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:mb-8 prose-h1:text-gray-900 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
        prose-h2:text-3xl prose-h2:mb-6 prose-h2:text-gray-800 prose-h2:mt-12
        prose-h3:text-2xl prose-h3:mb-4 prose-h3:text-gray-800 prose-h3:mt-8
        prose-h4:text-xl prose-h4:mb-3 prose-h4:text-gray-800 prose-h4:mt-6
        prose-p:mb-6 prose-p:leading-relaxed prose-p:text-gray-700
        prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:shadow-sm
        prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:border prose-pre:border-gray-700
        prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-medium prose-code:text-sm
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-800 hover:prose-a:underline prose-a:transition-colors
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
        prose-li:mb-1 prose-li:text-gray-700
        prose-table:w-full prose-table:border-collapse prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg prose-table:my-8
        prose-th:bg-gradient-to-r prose-th:from-gray-100 prose-th:to-gray-200 prose-th:p-4 prose-th:border prose-th:border-gray-300 prose-th:font-semibold prose-th:text-gray-800
        prose-td:p-4 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
        prose-hr:border-gray-300 prose-hr:my-8
        prose-figure:my-8
        prose-figcaption:text-center prose-figcaption:text-gray-600 prose-figcaption:text-sm prose-figcaption:mt-2
        !max-w-none
        ${className}`}
    >
      {children}
    </Component>
  );
} 