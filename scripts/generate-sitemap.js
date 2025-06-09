import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nowNote } from '../src/data/now.js';
import { staticNotes } from '../src/data/static.js';
import { journalNotes } from '../src/data/journal.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates an XML sitemap based on the notes data
 */
function generateSitemap() {
  const notes = [nowNote, ...staticNotes, ...journalNotes];
  const baseUrl = 'https://helenhuang.io';
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Start XML content
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/now</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Note pages -->
`;

  // Add each note as a URL
  notes.forEach(note => {
    // Special case for mar172025 note which is accessible at /now
    if (note.id === 'mar172025') return;
    
    // Format the date for lastmod
    const lastMod = new Date(note.date).toISOString().split('T')[0];
    
    // Determine priority based on whether the note is pinned
    const priority = note.isPinned ? '0.8' : '0.6';
    
    // Add URL entry
    xmlContent += `  <url>
    <loc>${baseUrl}/${note.id}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
  });

  // Close XML
  xmlContent += '</urlset>';
  
  // Write to file
  const publicDir = path.resolve(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xmlContent);
  
  console.log('Sitemap generated successfully!');
}

// Run the generator
generateSitemap(); 