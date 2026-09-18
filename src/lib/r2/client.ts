import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

export interface R2Config {
  accountId?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  bucketName?: string;
  publicDomain?: string;
}

export function getR2Config(): R2Config {
  return {
    accountId: process.env.R2_ACCOUNT_ID || process.env.NEXT_PUBLIC_R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID || process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucketName: process.env.R2_BUCKET_NAME || process.env.NEXT_PUBLIC_R2_BUCKET_NAME || 'phulwari-videos',
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
    region: 'auto',
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId!,
      secretAccessKey: config.secretAccessKey!,
    },
  });
}
