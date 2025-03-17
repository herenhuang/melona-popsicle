import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  console.log('Markdown content:', content); // Debug log

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Style links to match existing gold color and underline
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#CC9900] underline underline-offset-2 hover:opacity-80"
            />
          ),
          // Style images and captions to match existing style
          img: ({ node, alt, ...props }) => (
            <figure className="rounded-lg overflow-hidden">
              <img {...props} alt={alt} className="w-full h-auto" />
              {alt && (
                <figcaption className="text-sm text-[#969696] mt-2">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          // Style headers
          h1: ({ node, children, ...props }) => (
            <h2 className="text-xl font-medium mb-4" {...props}>{children}</h2>
          ),
          // Style paragraphs
          p: ({ node, children, ...props }) => (
            <p className="leading-relaxed mb-4" {...props}>{children}</p>
          ),
          // Style lists
          ul: ({ node, children, ...props }) => (
            <ul className="list-disc pl-5 space-y-2 mb-6" {...props}>{children}</ul>
          ),
          // Style list items
          li: ({ node, children, ...props }) => (
            <li className="leading-relaxed" {...props}>{children}</li>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
} 