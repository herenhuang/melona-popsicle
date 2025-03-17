import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

// Custom optimized image component
const OptimizedImage = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // Extract filename without extension for SEO if no alt text is provided
  const getDefaultAlt = (src: string = '') => {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const imageAlt = alt || getDefaultAlt(src);
  
  return (
    <div className="my-4">
      <div className="max-w-[80%] md:max-w-[400px] w-full" style={{ minWidth: '240px' }}>
        <img 
          className="w-full h-auto object-contain rounded-md shadow-sm" 
          src={src}
          alt={imageAlt}
          loading="lazy"
          {...props} 
        />
        {imageAlt && <p className="text-xs text-left mt-1 text-gray-500 font-light">{imageAlt}</p>}
      </div>
    </div>
  );
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  console.log('Markdown content:', content);
  const navigate = useNavigate();

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => {
            const href = props.href || '';
            
            // Handle internal links (starting with /)
            if (href.startsWith('/')) {
              return (
                <a
                  {...props}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                  }}
                  className="text-[#CC9900] underline cursor-pointer"
                />
              );
            }
            
            // External links
            return (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC9900] underline"
              />
            );
          },
          h1: ({ node, ...props }) => <h1 className="text-xl font-medium mt-6 mb-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-lg font-medium mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-base font-medium mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          img: OptimizedImage,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 