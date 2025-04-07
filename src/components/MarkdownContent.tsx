import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useLocation } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownContentProps {
  content: string;
  onImagesLoaded?: () => void;
}

export function MarkdownContent({ content, onImagesLoaded }: MarkdownContentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldAnimate = !location.pathname.includes('baggy');
  const isBaggyPage = location.pathname.includes('baggy');

  return (
    <div className="markdown-content" data-baggy={isBaggyPage}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
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
          h1: ({ node, ...props }) => <h1 className="text-lg font-medium mt-6 mb-3" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-base font-medium mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-sm font-medium mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          img: ({ node, src, alt, ...props }) => {
            if (src) {
              return (
                <div className="my-4 max-w-[80%] md:max-w-[400px]">
                  <img 
                    src={src} 
                    alt={alt} 
                    className={`w-full h-auto rounded-md ${shouldAnimate ? 'opacity-0 transition-opacity duration-500 ease-in' : ''}`}
                    onLoad={(e) => {
                      if (shouldAnimate) {
                        e.currentTarget.classList.remove('opacity-0');
                        e.currentTarget.classList.add('opacity-100');
                      }
                      if (onImagesLoaded) {
                        onImagesLoaded();
                      }
                    }}
                    {...props} 
                  />
                  {alt && (
                    <span className="block text-xs text-left mt-1 text-gray-500 font-light">{alt}</span>
                  )}
                </div>
              );
            }
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 