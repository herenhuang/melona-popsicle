/**
 * Generates a short, clean preview from markdown content.
 * It strips markdown formatting and truncates the text.
 */
export function generatePreview(content: string): string {
  if (!content) return '';
  
  // Remove empty lines at start and end
  const trimmedContent = content.trim();
  
  // Remove markdown headers, list markers, and multiple newlines
  const cleanContent = trimmedContent
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/^[-*+]\s+/gm, '') // Remove list markers but keep the text
    .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
    .replace(/\n/g, ' ')    // Replace all remaining newlines with spaces
    .trim();

  // Get the first 100 characters for preview
  return cleanContent.length > 100 
    ? cleanContent.substring(0, 100) + '...' 
    : cleanContent;
}