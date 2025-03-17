export function formatDateForContent(date: string): string {
  // Create date in Eastern Time with time
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York' // Eastern Time
  } as Intl.DateTimeFormatOptions;
  
  return new Date(date).toLocaleString('en-US', options);
}

export function formatDateForPreview(date: string): string {
  // Create date in Eastern Time
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'America/New_York' // Eastern Time
  } as Intl.DateTimeFormatOptions;
  
  return new Date(date).toLocaleDateString('en-US', options);
}

export function generatePreview(content: string): string {
  // Remove markdown headers and list markers
  const cleanContent = content
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/^[-*+].*$/gm, '') // Remove list items
    .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
    .trim();

  // Get first non-empty paragraph
  const firstParagraph = cleanContent.split('\n\n')[0];
  return firstParagraph;
} 