import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GalleryImage } from './BaggyGallery';
import { Carousel, SlideData } from '../ui/carousel';

interface BaggyShowHighlightsProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  buttonText: string;
  buttonLink: string;
}

const BaggyShowHighlights: React.FC<BaggyShowHighlightsProps> = ({
  title,
  subtitle,
  images,
  buttonText,
  buttonLink,
}) => {
  const navigate = useNavigate();

  // Convert GalleryImage[] to SlideData[] for the carousel with custom button text
  const carouselSlides: SlideData[] = images.map((image, index) => ({
    title: image.alt,
    button: "EXPLORE LOOK",
    src: image.src,
    link: buttonLink,
  }));

  // Handle the button click in the carousel slides
  const handleButtonClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="py-16 md:py-32 bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-wide mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-black/70 text-lg max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Component */}
        <div className="relative overflow-visible w-full py-16">
          <div className="min-h-[calc(50vmin+120px)]">
            <Carousel slides={carouselSlides} onButtonClick={handleButtonClick} />
          </div>
        </div>

        {/* Main CTA Button */}
        <div className="text-center mt-20">
          <Link
            to={buttonLink}
            className="inline-block px-10 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition duration-300 tracking-widest text-sm font-medium"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaggyShowHighlights; 