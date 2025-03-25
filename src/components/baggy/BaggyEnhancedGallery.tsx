import React, { useState, useMemo } from 'react';
import { BaggyPhoto } from '../../data/baggyPhotoTypes';
import BaggyEnhancedImage from './BaggyEnhancedImage';

interface BaggyEnhancedGalleryProps {
  photos: BaggyPhoto[];
  columns?: 2 | 3 | 4;
  gap?: 'small' | 'medium' | 'large';
  showMetadata?: boolean;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  onDeletePhoto?: (id: string) => void;
}

type SortOption = 'newest' | 'oldest' | 'collection';
type FilterOption = 'all' | string; // 'all' or collection name

const BaggyEnhancedGallery: React.FC<BaggyEnhancedGalleryProps> = ({
  photos,
  columns = 3,
  gap = 'medium',
  showMetadata = false,
  enableFiltering = false,
  enableSorting = false,
  onDeletePhoto,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Get unique collections for filter options
  const collections = useMemo(() => {
    const uniqueCollections = new Set<string>();
    photos.forEach(photo => {
      if (photo.collection) {
        uniqueCollections.add(photo.collection);
      }
    });
    return Array.from(uniqueCollections);
  }, [photos]);

  // Apply sorting and filtering
  const displayedPhotos = useMemo(() => {
    let result = [...photos];
    
    // Apply filtering
    if (filterBy !== 'all') {
      result = result.filter(photo => photo.collection === filterBy);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result.sort((a, b) => {
          const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
          const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'oldest':
        result.sort((a, b) => {
          const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
          const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case 'collection':
        result.sort((a, b) => {
          const collA = a.collection || '';
          const collB = b.collection || '';
          return collA.localeCompare(collB);
        });
        break;
    }
    
    return result;
  }, [photos, filterBy, sortBy]);

  // Gap class mapping
  const gapClass = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-8',
  }[gap];

  // Columns class mapping
  const columnsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns];

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex < displayedPhotos.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    if (onDeletePhoto) {
      onDeletePhoto(id);
    }
  };

  return (
    <div>
      {/* Filter and sort controls */}
      {(enableFiltering || enableSorting) && (
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          {enableFiltering && collections.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Filter:</label>
              <select 
                className="bg-black/20 border border-white/20 text-sm rounded-md px-3 py-2"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Collections</option>
                {collections.map((collection, index) => (
                  <option key={`collection-${index}`} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {enableSorting && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sort:</label>
              <select 
                className="bg-black/20 border border-white/20 text-sm rounded-md px-3 py-2"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="collection">By Collection</option>
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Photos grid */}
      <div className={`grid ${columnsClass} ${gapClass}`}>
        {displayedPhotos.map((photo, index) => (
          <div key={`enhanced-gallery-photo-${photo.id}`} className="relative group">
            <BaggyEnhancedImage
              photo={photo}
              showMetadata={showMetadata}
              className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
              onClick={() => openModal(index)}
            />
            {onDeletePhoto && (
              <button
                className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDeletePhoto(photo.id, e)}
                title="Delete photo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* No results message */}
      {displayedPhotos.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-white/70">No photos found for the selected filter.</p>
        </div>
      )}

      {/* Modal for detailed view */}
      {modalOpen && displayedPhotos.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-50 text-white/70 hover:text-white"
            onClick={closeModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goToPreviousPhoto}
            disabled={currentPhotoIndex === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goToNextPhoto}
            disabled={currentPhotoIndex === displayedPhotos.length - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image container */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-4">
            <div className="relative max-w-full max-h-[80vh] w-auto h-auto">
              <BaggyEnhancedImage
                photo={displayedPhotos[currentPhotoIndex]}
                showDetailedCredits={true}
                showMetadata={true}
                hoverEffect={false}
                className="w-auto h-auto max-w-full max-h-[80vh]"
              />
            </div>

            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/70 text-sm">
              {currentPhotoIndex + 1} / {displayedPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaggyEnhancedGallery; 