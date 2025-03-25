import React, { useState } from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggySection from '../../components/baggy/BaggySection';
import BaggyPhotoUploader from '../../components/baggy/BaggyPhotoUploader';
import BaggyEnhancedGallery from '../../components/baggy/BaggyEnhancedGallery';
import { BaggyPhoto } from '../../data/baggyPhotoTypes';
import { sampleBaggyPhotos } from '../../data/baggyPhotoData';

const BaggyPhotoManagerPage: React.FC = () => {
  const collections = ['Waste Couture', 'Landfill Luxury', 'Campaign', 'Backstage', 'Behind the Scenes'];
  const [photos, setPhotos] = useState<BaggyPhoto[]>(sampleBaggyPhotos);
  
  const handlePhotoUpload = (newPhotos: BaggyPhoto[]) => {
    setPhotos(prev => [...newPhotos, ...prev]);
  };
  
  const handleDeletePhoto = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  // List of stock image resources for testing
  const stockImageResources = [
    { name: "Unsplash", url: "https://unsplash.com" },
    { name: "Pexels", url: "https://pexels.com" },
    { name: "Pixabay", url: "https://pixabay.com" },
  ];

  return (
    <BaggyLayout>
      <div className="pt-10">
        <BaggySection title="PHOTO MANAGEMENT SYSTEM" subtitle="Upload and manage the BAGGY image library">
          <div className="my-8">
            <p className="text-white/70 mb-6">
              This photo management system allows you to upload images with detailed Getty-style credits and metadata.
              Use this interface to maintain a professional archive of all BAGGY imagery.
            </p>
          </div>
        </BaggySection>
        
        <BaggySection title="TEST WITH STOCK IMAGES" dark={true}>
          <div className="my-8 p-6 border border-white/10 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Using Stock Images for Testing</h3>
            <p className="text-white/70 mb-4">
              While developing and testing this system, you can use stock images instead of uploading your own files.
              This will help you verify that everything works properly before creating your own content.
            </p>
            
            <h4 className="text-lg font-semibold mt-6 mb-3">Recommended Stock Image Resources:</h4>
            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6">
              {stockImageResources.map((resource, index) => (
                <li key={`resource-${index}`}>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    {resource.name}
                  </a>
                  {' - Free high-quality stock images'}
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-semibold mt-6 mb-3">How to Use:</h4>
            <ol className="list-decimal list-inside text-white/70 space-y-2">
              <li>Browse any of the stock image sites above</li>
              <li>Find fashion-related images that fit the BAGGY aesthetic</li>
              <li>Right-click and copy the image address</li>
              <li>When testing the uploader, upload local files as usual</li>
              <li>Images will be converted to data URLs for demonstration</li>
              <li>For real implementation, configure proper cloud storage</li>
            </ol>
            
            <div className="mt-8 bg-white/5 p-4 rounded-md">
              <p className="text-amber-300 font-medium">Note: The sample gallery already uses stock Unsplash images</p>
              <p className="text-white/70 mt-2">
                The gallery below is pre-populated with fashion stock images from Unsplash with sample credit information.
                You can add more images using the uploader above, and they will appear in the gallery.
              </p>
            </div>
          </div>
        </BaggySection>
        
        <BaggySection title="UPLOAD NEW PHOTOS" dark={true}>
          <div className="my-8">
            <BaggyPhotoUploader 
              collections={collections}
              onUpload={handlePhotoUpload}
            />
          </div>
        </BaggySection>
        
        <BaggySection title="PHOTO GALLERY" subtitle={`${photos.length} images in the library`}>
          <div className="my-8">
            <BaggyEnhancedGallery 
              photos={photos}
              columns={3}
              gap="medium"
              showMetadata={true}
              enableFiltering={true}
              enableSorting={true}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>
        </BaggySection>
        
        <BaggySection title="USAGE INSTRUCTIONS" dark={true}>
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Upload Process</h3>
              <ol className="list-decimal list-inside text-white/70 space-y-2">
                <li>Select one or more image files</li>
                <li>Fill in the title and select a collection</li>
                <li>Add photographer and agency credits</li>
                <li>Include model names and styling credits</li>
                <li>Add metadata like date and tags</li>
                <li>Click upload to add to the gallery</li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Gallery Features</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>Filter photos by collection or tags</li>
                <li>Sort by date, title, or collection</li>
                <li>Click on a photo to see full credits</li>
                <li>Hover to see quick image information</li>
                <li>Responsive grid layout adapts to screen size</li>
                <li>Delete photos when no longer needed</li>
              </ul>
            </div>
          </div>
        </BaggySection>
      </div>
    </BaggyLayout>
  );
};

export default BaggyPhotoManagerPage; 