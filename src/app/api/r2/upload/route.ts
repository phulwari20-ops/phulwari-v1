import { NextResponse } from 'next/server';
import { createUploadUrl, isR2Configured, getR2Config, getR2Client } from '@/lib/r2/client';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export const dynamic = 'force-dynamic';

export async function GET() {
  const config = getR2Config();
  return NextResponse.json({
    status: 'ok',
    r2_configured: isR2Configured(),
    account_id: config.accountId,
    bucket_name: config.bucketName,
    endpoint: config.endpoint,
    region: config.region,
  });
}

export async function POST(req: Request) {
  try {
    const contentTypeHeader = req.headers.get('content-type') || '';

    // 1. JSON Request for Presigned Upload URL
    if (contentTypeHeader.includes('application/json')) {
      const body = await req.json();
      const { contentType, filename } = body;

      if (!contentType) {
        return NextResponse.json(
          { error: 'contentType is required (e.g. image/jpeg, image/png, video/mp4)' },
          { status: 400 }
        );
      }

      if (!isR2Configured()) {
        return NextResponse.json(
          { error: 'Cloudflare R2 credentials (R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY) not configured' },
          { status: 503 }
        );
      }

      const presigned = await createUploadUrl(contentType, filename);
      return NextResponse.json({ success: true, ...presigned });
    }

    // 2. Direct Multipart FormData File Upload
    if (contentTypeHeader.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided in form data' }, { status: 400 });
      }

      const config = getR2Config();
      const client = getR2Client();

      if (!client || !isR2Configured()) {
        return NextResponse.json(
          { error: 'Cloudflare R2 is not configured for direct upload' },
          { status: 503 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const key = `uploads/${Date.now()}-${cleanName}`;

      await client.send(
        new PutObjectCommand({
          Bucket: config.bucketName,
          Key: key,
          Body: buffer,
          ContentType: file.type || 'application/octet-stream',
          CacheControl: 'public, max-age=31536000, immutable',
        })
      );

      const publicUrl = config.publicDomain
        ? `${config.publicDomain.replace(/\/$/, '')}/${key}`
        : `${config.endpoint}/${config.bucketName}/${key}`;

      return NextResponse.json({
        success: true,
        key,
        publicUrl,
        size: buffer.length,
        contentType: file.type,
      });
    }

    return NextResponse.json({ error: 'Invalid Content-Type header' }, { status: 400 });
  } catch (err: any) {
    console.error('Cloudflare R2 upload error:', err);
    return NextResponse.json({ error: err.message || 'R2 upload failed' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
