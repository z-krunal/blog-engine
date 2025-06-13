import { BlogPost } from '../types/blog';
import { formatDate } from '../utils/formatDate';


interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  return (
    
    <header className="text-center max-w-3xl mx-auto">
        <h1>
          {post.title}
        </h1>
        
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 rounded-full inline-flex items-center  px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.author && (
          <>
            {" · By "}
            {post.authorLinkedin ? (
              <a
                href={post.authorLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                {post.author}
              </a>
            ) : (
              post.author
            )}
          </>
        )}
          {post.readingTime && <span> · {post.readingTime} min read</span>}
        </div>
</header>
  );
} 