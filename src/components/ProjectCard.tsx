import { useState, useEffect } from 'react';

import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
}

export function ProjectCard({ title, description, link }: ProjectCardProps) {
  const content = (
    <>
      <div className="inline-flex items-start flex-wrap gap-x-2">
        <span className="font-sora text-[#ff6b35] font-semibold whitespace-normal">{title}</span>
        <span className="font-inter text-gray-700 whitespace-normal">{description}</span>
        {link && <ArrowUpRight className="flex-shrink-0 w-4 h-4 mt-1 text-gray-400" />}
      </div>
    </>
  );

  return (
    <div className="mb-6">
      {link ? (
        <a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}