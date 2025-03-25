import React from 'react';
import BaggyImage from './BaggyImage';
import { GalleryImage } from './BaggyGallery';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  images?: GalleryImage[];
}

interface BaggyTimelineProps {
  events: TimelineEvent[];
}

const BaggyTimeline: React.FC<BaggyTimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/20 transform md:translateX(-0.5px)"></div>
      
      <div className="space-y-16">
        {events.map((event, index) => (
          <div 
            key={`timeline-event-${index}`}
            className={`relative flex flex-col ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-white rounded-full transform -translate-x-1px md:-translate-x-1.5px"></div>
            
            {/* Content container */}
            <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-8">
              {/* Time */}
              <div className="text-white/60 text-sm mb-2">{event.time}</div>
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{event.title}</h3>
              
              {/* Description */}
              <p className="text-white/80 mb-6">{event.description}</p>
              
              {/* Images */}
              {event.images && event.images.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.images.map((image, imgIndex) => (
                    <BaggyImage
                      key={`timeline-img-${index}-${imgIndex}`}
                      src={image.src}
                      alt={image.alt || event.title}
                      aspectRatio="square"
                      credits={image.credits}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Empty space for opposite side in desktop view */}
            <div className="hidden md:block md:w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaggyTimeline; 