export function formatDateForContent(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function formatDateForPreview(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
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