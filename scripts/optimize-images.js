import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUALITY = {
  hero: 90,
  masonry: 85,
  gallery: 80,
  experience: 85,
  logo: 100
};

const MAX_WIDTH = {
  hero: 1920,
  masonry: 1200,
  gallery: 800,
  experience: 1400,
  logo: 240
};

async function optimizeImage(inputPath, outputPath, type = 'masonry') {
  try {
    const metadata = await sharp(inputPath).metadata();
    
    const resizeOptions = {
      width: MAX_WIDTH[type],
      withoutEnlargement: true,
      fit: 'inside'
    };

    await sharp(inputPath)
      .resize(resizeOptions)
      .webp({ 
        quality: QUALITY[type],
        effort: 6,
        smartSubsample: true,
        reductionEffort: 6
      })
      .toFile(outputPath);
    
    console.log(`✓ Optimized: ${path.basename(inputPath)} (${type})`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(inputDir, outputDir, type) {
  try {
    const files = await fs.readdir(inputDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
        await optimizeImage(inputPath, outputPath, type);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

async function main() {
  const directories = {
    masonry: {
      input: path.join(process.cwd(), 'public/images/baggy/masonry'),
      output: path.join(process.cwd(), 'public/images/baggy/masonry/optimized')
    },
    gallery: {
      input: path.join(process.cwd(), 'public/images/baggy'),
      output: path.join(process.cwd(), 'public/images/baggy/optimized')
    },
    experience: {
      input: path.join(process.cwd(), 'public/images/baggy/experience'),
      output: path.join(process.cwd(), 'public/images/baggy/experience/optimized')
    }
  };

  // Process logo separately
  const logoInput = path.join(process.cwd(), 'public/images/baggy/garbage-bag-logo.svg');
  const logoOutput = path.join(process.cwd(), 'public/images/baggy/garbage-bag-logo.webp');
  await optimizeImage(logoInput, logoOutput, 'logo');

  // Process other directories
  for (const [type, paths] of Object.entries(directories)) {
    await fs.mkdir(paths.output, { recursive: true });
    console.log(`Processing ${type} images...`);
    await processDirectory(paths.input, paths.output, type);
  }
}

main().catch(console.error); 