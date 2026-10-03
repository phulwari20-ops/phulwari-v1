import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface R2Config {
  accountId: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName: string;
  endpoint: string;
  region: string;
  publicDomain?: string;
}

export function getR2Config(): R2Config {
  const accountId =
    process.env.R2_ACCOUNT_ID ||
    process.env.NEXT_PUBLIC_R2_ACCOUNT_ID ||
    '98d203bfa51dd119ae438c70538c5f98';

  const bucketName =
    process.env.R2_BUCKET_NAME ||
    process.env.NEXT_PUBLIC_R2_BUCKET_NAME ||
    'media-storage';

  const endpoint =
    process.env.R2_ENDPOINT ||
    `https://${accountId}.r2.cloudflarestorage.com`;

  const region = process.env.R2_REGION || 'auto';

  return {
    accountId,
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName,
    endpoint,
    region,
    publicDomain: process.env.R2_PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN,
  };
}

export function isR2Configured(): boolean {
  const config = getR2Config();
  return Boolean(config.accountId && config.accessKeyId && config.secretAccessKey && config.bucketName);
}

export function getR2Client(): S3Client | null {
  const config = getR2Config();
  if (!isR2Configured()) {
    return null;
  }

  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    credentials: {
      accessKeyId: config.accessKeyId!,
      secretAccessKey: config.secretAccessKey!,
    },
  });
}

/**
 * Generate a temporary secure upload URL for Cloudflare R2
 */
export async function createUploadUrl(contentType: string, filename?: string) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'video/mp4',
    'video/webm',
    'application/pdf',
  ];

  if (!allowedTypes.includes(contentType)) {
    throw new Error(`Unsupported content type: ${contentType}`);
  }

  const client = getR2Client();
  if (!client) {
    throw new Error('Cloudflare R2 is not fully configured with credentials');
  }

  const config = getR2Config();
  const cleanName = filename ? filename.replace(/[^a-zA-Z0-9._-]/g, '_') : 'media';
  const key = `uploads/${Date.now()}-${cleanName}`;

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: key,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: 300,
  });

  const publicUrl = config.publicDomain
    ? `${config.publicDomain.replace(/\/$/, '')}/${key}`
    : `${config.endpoint}/${config.bucketName}/${key}`;

  return {
    uploadUrl,
    key,
    publicUrl,
  };
}
