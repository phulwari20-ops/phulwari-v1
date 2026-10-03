const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Native .env.local parser (no dotenv dependency required)
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const accountId = process.env.R2_ACCOUNT_ID || '98d203bfa51dd119ae438c70538c5f98';
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME || 'media-storage';
const endpoint = process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`;

if (!accessKeyId || !secretAccessKey) {
  console.log('\n❌ Cannot connect to Cloudflare R2 yet: Missing R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.\n');
  console.log('To upload your files to the bucket, follow these simple steps:');
  console.log('1. Go to Cloudflare Dashboard > R2 Object Storage');
  console.log('2. Click "Manage R2 API Tokens" on the right sidebar');
  console.log('3. Click "Create API Token" with "Object Read & Write" permission');
  console.log('4. Copy the "Access Key ID" and "Secret Access Key" and paste them in .env.local:');
  console.log('     R2_ACCESS_KEY_ID=your_access_key');
  console.log('     R2_SECRET_ACCESS_KEY=your_secret_key');
  console.log('5. Run: node scripts/sync-to-r2.js\n');
  process.exit(1);
}

const r2 = new S3Client({
  region: 'auto',
  endpoint: endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const mimeMap = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
};

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
  'videos',
];

const publicRoot = path.join(__dirname, '..', 'public');

async function uploadFile(filePath, key) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeMap[ext] || 'application/octet-stream';
  const fileBuffer = fs.readFileSync(filePath);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  });

  await r2.send(command);
  console.log(`✅ Uploaded: ${key} (${Math.round(fileBuffer.length / 1024)} KB)`);
}

async function walkAndUpload(dir, baseDir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkAndUpload(fullPath, baseDir);
    } else if (entry.isFile()) {
      const relPath = path.relative(publicRoot, fullPath).replace(/\\/g, '/');
      await uploadFile(fullPath, relPath);
    }
  }
}

async function main() {
  console.log(`🚀 Syncing local media assets to Cloudflare R2 bucket: "${bucketName}"...`);
  for (const dirName of targetDirs) {
    const targetPath = path.join(publicRoot, dirName);
    console.log(`\n📁 Syncing ${dirName}...`);
    await walkAndUpload(targetPath, publicRoot);
  }

  // Also upload root webp assets
  const rootFiles = ['summercamp.webp', 'wintercamp.webp', 'mothertod.webp', 'motherhappy.webp', 'motherfit.webp', 'phulwari_logo.webp', 'b1.webp'];
  for (const file of rootFiles) {
    const p = path.join(publicRoot, file);
    if (fs.existsSync(p)) {
      await uploadFile(p, file);
    }
  }

  console.log('\n🎉 All media files successfully uploaded to Cloudflare R2 bucket!');
}

main().catch(err => {
  console.error('\n❌ Upload error:', err.message);
  process.exit(1);
});
