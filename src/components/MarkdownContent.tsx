import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

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
                  className="text-[#CC9900] hover:underline cursor-pointer"
                />
              );
            }
            
            // External links
            return (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CC9900] hover:underline"
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
          img: ({ node, ...props }) => (
            <div className="my-4">
              <img className="max-w-full rounded-md" {...props} />
              {props.alt && <p className="text-sm text-center mt-1 text-gray-600">{props.alt}</p>}
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 