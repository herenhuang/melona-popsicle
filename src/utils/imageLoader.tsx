/**
 * Utility to generate gallery images array based on a pattern
 * This makes it easier to add or remove images without manually editing a long array
 */

export interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  credits?: {
    photographer?: string;
    model?: string;
    stylist?: string;
    makeup?: string;
    location?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Generates an array of gallery images based on a pattern
 * @param basePath Base path for the images
 * @param prefix Prefix for each image file
 * @param startIndex Starting index for the image files
 * @param count Number of images to generate
 * @param extension File extension for the images
 * @param defaultAspectRatio Default aspect ratio for all images
 * @returns Array of gallery image objects
 */
export function generateGalleryImages(
  basePath: string,
  prefix: string,
  startIndex: number,
  count: number,
  extension: string = 'webp',
  defaultAspectRatio: 'portrait' | 'landscape' | 'square' = 'portrait'
): GalleryImage[] {
  return Array.from({ length: count }, (_, index) => {
    const imageNumber = startIndex + index;
    return {
      src: `${basePath}/${prefix}${imageNumber}.${extension}`,
      alt: `BAGGY S/S 25 Look ${imageNumber}`,
      aspectRatio: defaultAspectRatio
    };
  });
}

// Usage example:
// const galleryImages = generateGalleryImages('/images/baggy/ss25', 'look', 1, 20); 