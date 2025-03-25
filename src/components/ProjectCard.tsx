import { useState, useEffect } from 'react';

import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  hoverImage?: string;
}

export function ProjectCard({ title, description, link, hoverImage }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate position relative to viewport
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({ x, y });
  };

  const content = (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="inline-flex items-start flex-wrap gap-x-2">
        <span className="font-sora text-[#ff6b35] font-semibold whitespace-normal">{title}</span>
        <span className="font-inter text-gray-700 whitespace-normal">{description}</span>
        {link && <ArrowUpRight className="flex-shrink-0 w-4 h-4 mt-1 text-gray-400" />}
      </div>
      
      {hoverImage && isHovered && (
        <div
          className="fixed w-64 h-48 pointer-events-none z-50 rounded-lg overflow-hidden shadow-xl transition-opacity duration-200"
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 100}px`,
            opacity: isHovered ? 1 : 0,
          }}
        >
          <img
            src={hoverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
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