/**
 * Types for the BAGGY photo management system
 */

export interface PhotoCredit {
  name: string;
  role: string;
  url?: string; // Optional link to the person's portfolio or social media
}

export interface PhotoMetadata {
  title?: string;
  description?: string;
  takenAt?: string; // Date the photo was taken
  location?: string; // Location where the photo was taken
  collection?: string; // Which collection this belongs to
  tags?: string[]; // Tags for categorizing and filtering
  featured?: boolean; // Whether this is a featured image
}

export interface BaggyPhoto {
  id: string; // Unique identifier for the photo
  url: string; // URL to the photo
  title: string; // Title for the photo
  collection: string; // Which collection this belongs to
  
  // Enhanced credit system
  credits: {
    photographer: string;
    agency: string;
    models: string[];
    stylist: string;
    makeup: string;
    hair: string;
    location: string;
  };
  
  // Enhanced metadata
  metadata: {
    date: string;
    tags: string[];
    featured: boolean;
  };
}

// Helper function to get a formatted credit string
export function formatCredits(credits: PhotoCredit[]): string {
  if (!credits.length) return '';
  
  // Group credits by role
  const creditsByRole: Record<string, string[]> = {};
  
  credits.forEach(credit => {
    if (!creditsByRole[credit.role]) {
      creditsByRole[credit.role] = [];
    }
    creditsByRole[credit.role].push(credit.name);
  });
  
  // Format the credits string
  return Object.entries(creditsByRole)
    .map(([role, names]) => `${role}: ${names.join(', ')}`)
    .join(' | ');
}

// Helper to get credits of a specific role
export function getCreditsForRole(credits: PhotoCredit[], role: string): PhotoCredit[] {
  return credits.filter(credit => credit.role.toLowerCase() === role.toLowerCase());
} 