import React, { useState, useRef, useEffect, useContext } from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import { ImageLoadingContext } from '../../App';
import { Home, Image as ImageIcon, Album, Users, X, Minus, Plus } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Masonry from 'react-masonry-css';
import '../../styles/baggy.css';

// Define interface for credits members
interface CreditMember {
  role?: string;
  name: string;
}

// Remove redundant credits data
const creditsSections = [];

// Gallery image details with proper sequencing
// First main_look1-10, then basics_look0-5, then pink_look1 onward
const galleryImages = [
  // Main collection
  { src: "/images/baggy/optimized/main_look1.webp", alt: "Main Collection - Look 1", collection: "Recycled Opulence", lookNumber: 1, model: "Biyanka Datta" },
  { src: "/images/baggy/optimized/main_look2.webp", alt: "Main Collection - Look 2", collection: "Recycled Opulence", lookNumber: 2, model: "Mylene Mae" },
  { src: "/images/baggy/optimized/main_look3.webp", alt: "Main Collection - Look 3", collection: "Recycled Opulence", lookNumber: 3, model: "Marium Kirmani" },
  { src: "/images/baggy/optimized/main_look4.webp", alt: "Main Collection - Look 4", collection: "Recycled Opulence", lookNumber: 4, model: "Ria Prakash" },
  { src: "/images/baggy/optimized/main_look5.webp", alt: "Main Collection - Look 5", collection: "Recycled Opulence", lookNumber: 5, model: "Liz Hudson" },
  { src: "/images/baggy/optimized/main_look6.webp", alt: "Main Collection - Look 6", collection: "Recycled Opulence", lookNumber: 6, model: "Suzy Jung" },
  { src: "/images/baggy/optimized/main_look7.webp", alt: "Main Collection - Look 7", collection: "Recycled Opulence", lookNumber: 7, model: "Ria Prakash" },
  { src: "/images/baggy/optimized/main_look8.webp", alt: "Main Collection - Look 8", collection: "Recycled Opulence", lookNumber: 8, model: "Sally Ip" },
  { src: "/images/baggy/optimized/main_look9.webp", alt: "Main Collection - Look 9", collection: "Recycled Opulence", lookNumber: 9, model: "Jacqline Geng" },
  { src: "/images/baggy/optimized/main_look10.webp", alt: "Main Collection - Look 10", collection: "Recycled Opulence", lookNumber: 10, model: "Jasmine Zhang" },
  
  // Basics collection
  { src: "/images/baggy/optimized/basics_look0.webp", alt: "Basics Collection - Look 0", collection: "Bag to Basics", lookNumber: 1, model: "Jasmine Zhang" },
  { src: "/images/baggy/optimized/basics_look1.webp", alt: "Basics Collection - Look 1", collection: "Bag to Basics", lookNumber: 2, model: "Mylene Mae" },
  { src: "/images/baggy/optimized/basics_look2.webp", alt: "Basics Collection - Look 2", collection: "Bag to Basics", lookNumber: 3, model: "Suzy Jung" },
  { src: "/images/baggy/optimized/basics_look3.webp", alt: "Basics Collection - Look 3", collection: "Bag to Basics", lookNumber: 4, model: "Keelan Collens" },
  { src: "/images/baggy/optimized/basics_look4.webp", alt: "Basics Collection - Look 4", collection: "Bag to Basics", lookNumber: 5, model: "Biyanka Datta" },
  { src: "/images/baggy/optimized/basics_look5.webp", alt: "Basics Collection - Look 5", collection: "Bag to Basics", lookNumber: 6, model: "Iris Guo" },
  
  // Pink collection
  { src: "/images/baggy/optimized/pink_look1.webp", alt: "Pink Collection - Look 1", collection: "Pops of Color", lookNumber: 1, model: "Liz Hudson" },
  { src: "/images/baggy/optimized/pink_look2.webp", alt: "Pink Collection - Look 2", collection: "Pops of Color", lookNumber: 2, model: "Marium Kirmani" },
  { src: "/images/baggy/optimized/pink_look3.webp", alt: "Pink Collection - Look 3", collection: "Pops of Color", lookNumber: 3, model: "Nan Jiang" },
  { src: "/images/baggy/optimized/pink_look4.webp", alt: "Pink Collection - Look 4", collection: "Pops of Color", lookNumber: 4, model: "Keelan Collens" },
  { src: "/images/baggy/optimized/pink_look5.webp", alt: "Pink Collection - Look 5", collection: "Pops of Color", lookNumber: 5, model: "Jess Cho" },
  { src: "/images/baggy/optimized/pink_look6.webp", alt: "Pink Collection - Look 6", collection: "Pops of Color", lookNumber: 6, model: "Jacqline Geng" },
  { src: "/images/baggy/optimized/pink_look7.webp", alt: "Pink Collection - Look 7", collection: "Pops of Color", lookNumber: 7, model: "Sally Ip" },
  { src: "/images/baggy/optimized/pink_look8.webp", alt: "Pink Collection - Look 8", collection: "Pops of Color", lookNumber: 8, model: "Iris Guo" }
];

// Add masonry breakpoints
const breakpointColumns = {
  default: 4,
  1536: 4,
  1280: 3,
  1024: 3,
  768: 2,
  640: 1
};

// Define standard aspect ratios
const aspectRatios = {
  portrait: '3/4',
  landscape: '4/3',
  square: '1/1',
  video: '9/16',
  tallVideo: '2/5' // Adding a taller aspect ratio specifically for this video
};

// Define type for masonry items
type MasonryItem = {
  src: string;
  alt: string;
  aspectRatio: string;
  type?: 'video' | 'image';
};

// Update image data structure
const masonryImages: MasonryItem[] = [
  { src: "/images/baggy/masonry/talking-2.mp4", alt: "Behind the Scenes Video", aspectRatio: aspectRatios.video, type: 'video' },
  { src: "/images/baggy/masonry/grid1.webp", alt: "Editorial Shot 1", aspectRatio: aspectRatios.portrait, type: 'image' },
  { src: "/images/baggy/masonry/grid2.webp", alt: "Editorial Shot 2", aspectRatio: aspectRatios.landscape, type: 'image' },
  { src: "/images/baggy/masonry/grid3.webp", alt: "Editorial Shot 3", aspectRatio: aspectRatios.square, type: 'image' },
  { src: "/images/baggy/masonry/grid4.webp", alt: "Editorial Shot 4", aspectRatio: aspectRatios.portrait, type: 'image' },
  { src: "/images/baggy/masonry/grid5.webp", alt: "Editorial Shot 5", aspectRatio: aspectRatios.landscape, type: 'image' },
  { src: "/images/baggy/masonry/grid6.webp", alt: "Editorial Shot 6", aspectRatio: aspectRatios.square, type: 'image' },
  { src: "/images/baggy/masonry/grid7.webp", alt: "Editorial Shot 7", aspectRatio: aspectRatios.portrait, type: 'image' },
  { src: "/images/baggy/masonry/grid9.webp", alt: "Editorial Shot 9", aspectRatio: aspectRatios.square, type: 'image' },
  { src: "/images/baggy/masonry/grid10.webp", alt: "Editorial Shot 10", aspectRatio: aspectRatios.portrait, type: 'image' },
  { src: "/images/baggy/masonry/grid11.webp", alt: "Editorial Shot 11", aspectRatio: aspectRatios.landscape, type: 'image' },
  { src: "/images/baggy/masonry/grid12.webp", alt: "Editorial Shot 12", aspectRatio: aspectRatios.square, type: 'image' },
  { src: "/images/baggy/masonry/grid13.webp", alt: "Editorial Shot 13", aspectRatio: aspectRatios.portrait, type: 'image' },
  { src: "/images/baggy/masonry/walk-compressed.mp4", alt: "Behind the Scenes Video 2", aspectRatio: aspectRatios.video, type: 'video' }
];

// Add custom masonry styles
const masonryStyles = `
  .my-masonry-grid {
    display: flex;
    width: auto;
    margin-left: -24px; /* Adjust based on your gutter size */
  }
  
  .my-masonry-grid_column {
    padding-left: 24px; /* Adjust based on your gutter size */
    background-clip: padding-box;
  }
`;

// Add useVideoPlayback hook before the BaggySSPage component
const useVideoPlayback = (options = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const defaultOptions = {
      root: null,
      rootMargin: '50px 0px', // Start loading slightly before the video comes into view
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // More granular thresholds
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (!video.paused && !entry.isIntersecting) {
          video.pause();
        } else if (video.paused && entry.isIntersecting && entry.intersectionRatio > 0.1) {
          // Only play if at least 10% of the video is visible
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay was prevented, handle silently
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      ...defaultOptions,
      ...options
    });

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();
    };
  }, [options]);

  return videoRef;
};

// Add new interfaces before the BaggySSPage component
interface TooltipProps {
  message: string;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ message, isVisible }) => {
  return (
    <div
      className={`
        fixed bottom-12 left-1/2 transform -translate-x-1/2
        bg-black text-white px-10 py-6
        text-lg tracking-wide transition-all duration-300 z-[60]
        min-w-[400px] text-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {message}
    </div>
  );
};

interface ShoppingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingModal: React.FC<ShoppingModalProps> = ({ isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);
  
  // Add tooltip messages array
  const tooltipMessages = [
    "wait, you actually want one?",
    "you know this is a joke right...",
    "thanks for the support!",
    "hope it made you smile :)"
  ];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    // Get the current message and advance to the next one
    const message = tooltipMessages[currentTooltipIndex];
    setCurrentTooltipIndex((prevIndex) => (prevIndex + 1) % tooltipMessages.length);
    
    setTooltipPosition({
      x: e.clientX,
      y: e.clientY
    });
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 md:p-6" style={{ paddingBottom: "calc(4rem + 80px)" }}>
      <div className="bg-white w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row h-[80vh] md:h-[70vh] max-h-[800px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-black/10 transition-colors z-10 bg-white/90 backdrop-blur-sm"
        >
          <X size={24} className="text-black" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative">
          <img
            src="/images/baggy/baggyhandbag.webp"
            alt="BAGGY Flower Handbag"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <h3 className="text-xl font-light tracking-wide mb-4">
            BAGGY Flower S/S 2025 Handbag
          </h3>
          <p className="text-sm font-light mb-6 opacity-60">$88 CAD + shipping</p>
          <p className="text-sm font-light leading-relaxed mb-8">
            Wear your BAGGY passion with pride! Transparent bag with red trimming, handmade with 100% plastic bag and fresh flowers.
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-8">
            <span className="text-sm font-light mr-4">Quantity</span>
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-light">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToBag}
            className="bg-black text-white py-3 px-6 text-sm tracking-widest hover:bg-gray-800 transition-colors w-full"
          >
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="fixed bg-black text-white py-3 text-sm tracking-wide z-[60] text-center"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 40}px`,
            transform: 'translate(-50%, -100%)',
            padding: `0.75rem ${Math.min(1.5 + tooltipMessages[currentTooltipIndex ? currentTooltipIndex - 1 : tooltipMessages.length - 1].length * 0.05, 3)}rem`,
            minWidth: 'fit-content',
            maxWidth: '90vw',
            whiteSpace: 'nowrap'
          }}
        >
          {tooltipMessages[currentTooltipIndex ? currentTooltipIndex - 1 : tooltipMessages.length - 1]}
        </div>
      )}
    </div>
  );
};

const BaggySSPage: React.FC = () => {
  const { setImageLoadingProgress } = useContext(ImageLoadingContext);
  const [showAllImages, setShowAllImages] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [loadedMasonryImages, setLoadedMasonryImages] = useState<Set<string>>(new Set());
  const [loadedExperienceImages, setLoadedExperienceImages] = useState<Set<string>>(new Set());
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);

  // Show page after a short delay, regardless of image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle image loading progress
  useEffect(() => {
    const totalImages = galleryImages.length;
    const loadProgress = Math.min(100, Math.round((imagesLoaded / totalImages) * 100));
    setImageLoadingProgress(loadProgress);
  }, [imagesLoaded, setImageLoadingProgress]);

  // Keep only essential scroll handler for fade effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fadeThreshold = window.innerHeight * 1.5;
      const newScrollProgress = Math.min(1, scrollPosition / fadeThreshold);
      setScrollProgress(newScrollProgress);
      
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image preloading and tracking
  useEffect(() => {
    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      setImagesLoaded(loadedCount);
    };

    // Preload first 6 images (first two rows) with high priority
    const preloadImages = galleryImages.slice(0, 6).map(img => {
      // Use window.Image() instead of new Image()
      const imageObj = new window.Image();
      imageObj.src = img.src;
      imageObj.onload = handleImageLoad;
      return imageObj;
    });

    return () => {
      preloadImages.forEach(img => {
        if (img.onload) {
          img.onload = null;
        }
      });
    };
  }, []);

  // Update video refs using the new hook
  const heroVideoRef = useVideoPlayback();
  const bookVideoRef = useVideoPlayback();
  const talkingVideoRef = useVideoPlayback();
  const storeVideoRef = useVideoPlayback();

  // Handler for "View All" button
  const handleViewAllClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default button behavior
    console.log('View All clicked, current state:', showAllImages);
    console.log('Gallery images total:', galleryImages.length);
    console.log('Current visible images:', visibleImages.length);
    
    // Force the state update with functional form
    setShowAllImages(true);
  };

  // Calculate visible images based on state
  const visibleImages = showAllImages ? galleryImages : galleryImages.slice(0, 6);
  
  // Log when component renders
  useEffect(() => {
    console.log('Component rendered, showAllImages:', showAllImages);
    console.log('Visible images count:', visibleImages.length);
  }, [showAllImages, visibleImages.length]);

  // Calculate background color based on scroll progress
  const bgColor = `rgb(${Math.round(scrollProgress * 255)}, ${Math.round(scrollProgress * 255)}, ${Math.round(scrollProgress * 255)})`;
  const textColor = scrollProgress > 0.5 ? '#000000' : '#FFFFFF';

  const handleMasonryImageLoad = (src: string) => {
    setLoadedMasonryImages(prev => new Set(prev).add(src));
  };

  const handleExperienceImageLoad = (src: string) => {
    setLoadedExperienceImages(prev => new Set(prev).add(src));
  };

  return (
    <BaggyLayout>
      <div style={{ opacity: isPageVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}>
        {/* Hero Section */}
        <div 
          id="hero"
          ref={heroRef}
          className="min-h-screen relative flex flex-col items-center justify-center transition-colors duration-300 pt-16"
        >
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={heroVideoRef}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 1 - scrollProgress }}
            >
              <source src="/images/baggy/videos/hero-large.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Hero Content with Simple Elegant Text */}
          <div 
            ref={heroContainerRef}
            className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto relative z-10"
          >
            <h1 
              className="font-cormorant text-8xl md:text-[11rem] font-light tracking-widest mb-8 w-full"
              style={{ color: scrollProgress > 0.5 ? '#000000' : '#FFFFFF' }}
            >
              BAGGY
            </h1>
            <p 
              className="font-cormorant text-2xl md:text-4xl tracking-widest uppercase"
              style={{ color: scrollProgress > 0.5 ? '#000000' : '#FFFFFF' }}
            >
              Spring/Summer 25
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <a href="#about" className="animate-bounce p-2 opacity-70 hover:opacity-100 transition-opacity duration-300" style={{ color: textColor }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Introduction Blurb - Decreased Text Size */}
        <section id="about" className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm md:text-base leading-relaxed tracking-wide mb-12 font-light opacity-90">
              BAGGY reimagines the ordinary as extraordinary, transforming everyday waste into objects of desire. Led by creative director Helen Huang, our Spring/Summer 2025 collection embraces the tension between luxury and landfill, finding beauty in the discarded. Through three distinct lines, we challenge conventional notions of value in fashion, creating a new aesthetic dialogue between sustainability and style.
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="pb-16 px-4 relative">
          <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-center mb-12 uppercase">Collection</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
            {visibleImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden group shadow-sm">
                <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading={index < 6 ? "eager" : "lazy"}
                    onLoad={() => setImagesLoaded(prev => prev + 1)}
                  />
                </div>
                <div 
                  className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)'
                  }}
                >
                  <div className="w-full p-6 text-white">
                    <div className="text-sm tracking-widest font-light mb-2">{`${image.collection} - Look ${image.lookNumber}`}</div>
                    <div className="text-xs tracking-wider opacity-85">Model: {image.model}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button - Using direct conditional rendering */}
          {visibleImages.length < galleryImages.length && (
            <div className="flex justify-center mt-20">
              <button 
                onClick={handleViewAllClick}
                className="border border-black px-16 py-3 text-xs tracking-widest hover:bg-black hover:text-white transition-all duration-300 font-light cursor-pointer relative z-10"
                type="button"
              >
                VIEW ALL ({galleryImages.length - visibleImages.length} MORE)
              </button>
            </div>
          )}
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-center mb-12 uppercase">Experience</h2>
            
            {/* Book Video */}
            <div className="w-full flex justify-center mb-24">
              <div className="w-full md:w-[85%] relative">
                <video
                  ref={bookVideoRef}
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    display: 'block',
                    verticalAlign: 'bottom',
                    transform: 'scale(1.01)',
                  }}
                >
                  <source src="/images/baggy/videos/book-compressed.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Testimonial */}
            <div className="text-center max-w-4xl mx-auto mb-24 px-4">
              <blockquote className="text-xl md:text-2xl italic font-light leading-relaxed">
                "BAGGY doesn't just reimagine fashion—it forces us to confront our throwaway culture head-on, finding profound beauty in what we discard."
              </blockquote>
              <p className="mt-6 text-xs tracking-wider text-gray-500">— Fashion Forward Magazine, a completely legitimate magazine</p>
            </div>

            {/* Event Coverage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative overflow-hidden max-h-[500px]">
                <video
                  ref={talkingVideoRef}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  style={{
                    display: 'block',
                    verticalAlign: 'bottom',
                    transform: 'scale(1.01)',
                  }}
                >
                  <source src="/images/baggy/videos/talking-1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="px-6 flex flex-col justify-center h-full">
                <div>
                  <h3 className="text-base uppercase tracking-widest font-light mb-6">SHOW GUESTS</h3>
                  <p className="mb-6 text-sm leading-relaxed font-light">
                    The BAGGY community gathered to celebrate a shared vision of sustainable luxury, where each guest became part of a larger dialogue about conscious consumption. Industry leaders, artists, and environmental advocates united in their appreciation for fashion that dares to reimagine waste as a medium of creative expression.
                  </p>
                  <p className="text-sm leading-relaxed font-light">
                    Together, we explored the intersection of eco-consciousness and high fashion, proving that environmental responsibility can coexist with cutting-edge design. The evening embodied our collective commitment to reshaping the future of fashion, one recycled piece at a time.
                  </p>
                </div>
              </div>
            </div>

            {/* Behind the Scenes */}
            <div className="flex flex-col items-center max-w-2xl mx-auto">
              <div className="text-center mb-8 px-4">
                <h3 className="text-base uppercase tracking-widest font-light mb-4">Behind the Scenes</h3>
                <p className="mb-4 text-sm leading-relaxed font-light">
                  Each piece in the collection undergoes a rigorous transformation process, where discarded materials are carefully selected, cleaned, and reimagined through innovative construction techniques.
                </p>
                <p className="text-sm leading-relaxed font-light">
                  Using meticuluously-sourced materials from exclusive manufacturing centers such as Dollarama, our design team spent six months developing proprietary methods. All aimed to transform refuse into refined garments - maintaining structural integrity while challenging conventional fashion aesthetics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credits Section */}
        <section id="credits" className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-light tracking-[0.2em] text-center mb-12 uppercase">Team</h2>
            
            {/* Store Video Section */}
            <div className="w-full flex flex-col items-center justify-center mb-24">
              <div className="w-full md:w-[75%] relative mb-12">
                <video
                  ref={storeVideoRef}
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    display: 'block',
                    verticalAlign: 'bottom',
                    transform: 'scale(1.01)',
                  }}
                >
                  <source src="/images/baggy/videos/store.mp4" type="video/mp4" />
                </video>
              </div>
              <button 
                className="border border-black px-16 py-3 text-xs tracking-widest hover:bg-black hover:text-white transition-all duration-300 font-light cursor-pointer"
                onClick={() => setIsShoppingModalOpen(true)}
              >
                SHOP THE BAGGY BAG
              </button>
            </div>

            {/* Special Thanks Section */}
            <div className="mb-24">
              <h3 className="text-center text-base font-light tracking-widest mb-12 opacity-70">SPECIAL THANKS</h3>
              
              <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
                  {/* Column 1 */}
                  <div className="flex flex-col items-center text-center">
                    {/* Leadership */}
                    <div className="w-full">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">LEADERSHIP</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Helen Huang, Creative Director</li>
                        <li className="text-sm font-light">Benjamin Dryden, Co-Curator</li>
                      </ul>
                    </div>

                    {/* Photography */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">PHOTOGRAPHY</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Adrien Yiptong</li>
                        <li className="text-sm font-light">Anna Chang</li>
                        <li className="text-sm font-light">Leslie Seto</li>
                        <li className="text-sm font-light">Katie Ko</li>
                      </ul>
                    </div>

                    {/* Other */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">OTHER</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Model credits in above photos</li>
                        <li className="text-sm font-light">Shoutout to all visitors :)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col items-center text-center">
                    {/* Masters of Ceremony */}
                    <div className="w-full">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">MASTERS OF CEREMONY</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Nova Xu</li>
                        <li className="text-sm font-light">Shaiyan Khan</li>
                        <li className="text-sm font-light">Sean Young as Ash Twin</li>
                      </ul>
                    </div>

                    {/* Editorial */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">EDITORIAL</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Venice Morales-Vallega</li>
                        <li className="text-sm font-light">Karan Balaji</li>
                        <li className="text-sm font-light">Earvin Gocatek</li>
                      </ul>
                    </div>

                    {/* Culinary Moments */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">CULINARY MOMENTS</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">David Wang</li>
                        <li className="text-sm font-light">Sofiya Fursa</li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="flex flex-col items-center text-center">
                    {/* Retail Direction */}
                    <div className="w-full">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">RETAIL DIRECTION</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Nicole Ng</li>
                        <li className="text-sm font-light">David Bryckine</li>
                        <li className="text-sm font-light">Ray Chen</li>
                        <li className="text-sm font-light">Shawn Pear</li>
                      </ul>
                    </div>

                    {/* VIPs */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">VIPs</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Michelle Tang</li>
                        <li className="text-sm font-light">Sherry Ning</li>
                        <li className="text-sm font-light">Justin Cuaresma</li>
                      </ul>
                    </div>

                    {/* Venue */}
                    <div className="w-full mt-8">
                      <h4 className="text-sm font-light tracking-widest mb-3 opacity-70">VENUE</h4>
                      <ul className="space-y-2">
                        <li className="text-sm font-light">Gabe & J, The Ivy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Masonry Grid Section */}
        <section className="pt-8 pb-24 relative bg-white">
          <style>{masonryStyles}</style>
          
          <div className="max-w-[2000px] mx-auto px-6 md:px-8">
            <Masonry
              breakpointCols={breakpointColumns}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {masonryImages.map((item, index) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: loadedMasonryImages.has(item.src) ? 1 : 0,
                    y: loadedMasonryImages.has(item.src) ? 0 : 20
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                  className="mb-6 relative group"
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <div style={{ paddingBottom: item.type === 'video' ? '177.78%' : `calc(100% * ${eval(item.aspectRatio)})` }} />
                    {item.type === 'video' ? (
                      <video
                        ref={useVideoPlayback()}
                        className="absolute inset-0 w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        loop
                        muted
                        playsInline
                        style={{
                          display: 'block',
                          verticalAlign: 'bottom',
                          transform: 'scale(1.01)',
                          height: '100%',
                          minHeight: '100%'
                        }}
                        onLoadedData={() => handleMasonryImageLoad(item.src)}
                      >
                        <source src={item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        onLoad={() => handleMasonryImageLoad(item.src)}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    <div className="absolute inset-0 border border-black/5" />
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </div>
        </section>
      </div>

      {/* Add Shopping Modal */}
      <ShoppingModal
        isOpen={isShoppingModalOpen}
        onClose={() => setIsShoppingModalOpen(false)}
      />
    </BaggyLayout>
  );
};

export default BaggySSPage; 