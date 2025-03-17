export function formatDateForContent(date: string): string {
  // Parse the date string
  const parsedDate = new Date(date);
  
  // Extract the exact values from the ISO string without timezone conversion
  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth(); // 0-11
  const day = parsedDate.getUTCDate();
  const hours = parsedDate.getUTCHours();
  const minutes = parsedDate.getUTCMinutes();
  
  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Format hours for 12-hour clock with AM/PM
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Format minutes with leading zero if needed
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  
  // Return formatted date string
  return `${monthNames[month]} ${day}, ${year} at ${hour12}:${minutesFormatted} ${ampm}`;
}

export function formatDateForPreview(date: string): string {
  // Parse the date string
  const parsedDate = new Date(date);
  
  // Extract the exact values from the ISO string without timezone conversion
  const year = parsedDate.getUTCFullYear();
  const month = parsedDate.getUTCMonth() + 1; // 0-11, add 1 to get 1-12
  const day = parsedDate.getUTCDate();
  
  // Format with leading zeros if needed
  const monthFormatted = month < 10 ? `0${month}` : month;
  const dayFormatted = day < 10 ? `0${day}` : day;
  
  // Return formatted date string (MM/DD/YYYY)
  return `${monthFormatted}/${dayFormatted}/${year}`;
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