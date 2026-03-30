import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Optimizes an image for use in content pages and copies it to public/images/.
 *
 * Usage: node scripts/add-content-image.js <input-path> [output-name]
 *
 * Examples:
 *   node scripts/add-content-image.js ~/Downloads/photo.jpg
 *   node scripts/add-content-image.js ~/Downloads/photo.jpg my-cool-photo
 *
 * Output: public/images/<output-name>.webp
 * Markdown: ![alt text](/images/<output-name>.webp)
 */

const MAX_WIDTH = 1200;
const QUALITY = 82;

async function addContentImage(inputPath, outputName) {
  const resolvedInput = path.resolve(inputPath);

  // Check input exists
  try {
    await fs.access(resolvedInput);
  } catch {
    console.error(`File not found: ${resolvedInput}`);
    process.exit(1);
  }

  // Derive output name from input filename if not provided
  if (!outputName) {
    outputName = path.parse(resolvedInput).name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  const outputDir = path.join(process.cwd(), 'public/images');
  const outputPath = path.join(outputDir, `${outputName}.webp`);

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Check if output already exists
  try {
    await fs.access(outputPath);
    console.error(`Warning: ${outputPath} already exists, overwriting.`);
  } catch {
    // Doesn't exist, good
  }

  // Optimize and convert to webp
  const metadata = await sharp(resolvedInput).metadata();

  await sharp(resolvedInput)
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({
      quality: QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  const inputStats = await fs.stat(resolvedInput);
  const outputStats = await fs.stat(outputPath);
  const savings = Math.round((1 - outputStats.size / inputStats.size) * 100);

  console.log(`✓ Optimized: ${path.basename(resolvedInput)} → ${outputName}.webp`);
  console.log(`  ${Math.round(inputStats.size / 1024)}KB → ${Math.round(outputStats.size / 1024)}KB (${savings}% smaller)`);
  if (metadata.width > MAX_WIDTH) {
    console.log(`  Resized: ${metadata.width}px → ${MAX_WIDTH}px wide`);
  }
  console.log(`\n  Markdown: ![alt text](/images/${outputName}.webp)`);
}

const [,, inputPath, outputName] = process.argv;

if (!inputPath) {
  console.log('Usage: node scripts/add-content-image.js <input-path> [output-name]');
  console.log('  Optimizes image to WebP and copies to public/images/');
  process.exit(1);
}

addContentImage(inputPath, outputName).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
