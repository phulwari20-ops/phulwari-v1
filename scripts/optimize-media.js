const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  'mother_fitness_program',
  'mother_and_toddler_program',
  'Yoga',
  'summer_camp',
  'winter_camp',
  'birthday_party',
  'birthday',
  'Art_and_Craft',
  'Chess',
  'Cricket',
  'Gymnastics',
  'Karate',
  'MMA',
  'Play_zone',
  'Roller_skating',
  'dance',
  'music',
];

const publicRoot = path.join(__dirname, '..', 'public');

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const baseWithoutExt = filePath.slice(0, -ext.length);
  const webpPath = baseWithoutExt + '.webp';

  const stats = fs.statSync(filePath);
  const origSizeKB = Math.round(stats.size / 1024);

  try {
    const img = sharp(filePath);
    const meta = await img.metadata();

    // Create optimized WebP
    // Max width 1920 to keep crystal clear quality while keeping size tiny
    let webpPipeline = sharp(filePath);
    if (meta.width && meta.width > 1920) {
      webpPipeline = webpPipeline.resize({ width: 1920, withoutEnlargement: true });
    }

    await webpPipeline
      .webp({ quality: 82, effort: 4 })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSizeKB = Math.round(webpStats.size / 1024);

    // Also optimize original PNG if it's over 300KB
    if (ext === '.png' && stats.size > 300 * 1024) {
      const tempPng = baseWithoutExt + '.tmp.png';
      let pngPipeline = sharp(filePath);
      if (meta.width && meta.width > 1920) {
        pngPipeline = pngPipeline.resize({ width: 1920, withoutEnlargement: true });
      }
      await pngPipeline
        .png({ compressionLevel: 9, effort: 7, palette: true, quality: 85 })
        .toFile(tempPng);
      
      const newPngStats = fs.statSync(tempPng);
      if (newPngStats.size < stats.size) {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPng, filePath);
        console.log(`Optimized PNG ${path.basename(filePath)}: ${origSizeKB}KB -> ${Math.round(newPngStats.size / 1024)}KB`);
      } else {
        fs.unlinkSync(tempPng);
      }
    }

    console.log(`Created WebP: ${path.relative(publicRoot, webpPath)} (${origSizeKB}KB -> ${webpSizeKB}KB, -${Math.round((1 - webpSizeKB / origSizeKB) * 100)}%)`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

async function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (entry.isFile()) {
      await processFile(fullPath);
    }
  }
}

async function main() {
  console.log('🚀 Starting Image Optimization for Mothers, Camps, Events, and Activities...');
  for (const dirName of targetDirs) {
    const targetPath = path.join(publicRoot, dirName);
    console.log(`\n📁 Processing directory: ${dirName}`);
    await walkDir(targetPath);
  }
  console.log('\n✅ All images successfully optimized!');
}

main().catch(err => {
  console.error('Fatal optimization error:', err);
  process.exit(1);
});
