import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

function getR2Client() {
  const accountId =
    process.env.R2_ACCOUNT_ID ||
    process.env.NEXT_PUBLIC_R2_ACCOUNT_ID ||
    '98d203bfa51dd119ae438c70538c5f98';
  const accessKeyId =
    process.env.R2_ACCESS_KEY_ID ||
    process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID ||
    '3dce3a2786840437fb3440006ef3fdcd';
  const secretAccessKey =
    process.env.R2_SECRET_ACCESS_KEY ||
    '028e8b1f972367ed09e50d7a9d79ef32c8132103546b3aa49b2a751b999c9992';
  const endpoint =
    process.env.R2_ENDPOINT ||
    `https://${accountId}.r2.cloudflarestorage.com`;

  return {
    client: new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    }),
    bucketName: process.env.R2_BUCKET_NAME || 'media-storage',
  };
}

const MIME_MAP: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: 'Media path is required' }, { status: 400 });
    }

    const key = pathSegments.map((s) => decodeURIComponent(s)).join('/');
    const { client, bucketName } = getR2Client();

    const ext = key.split('.').pop()?.toLowerCase() || '';
    const defaultMime = MIME_MAP[ext] || 'application/octet-stream';

    const rangeHeader = request.headers.get('range');

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
      Range: rangeHeader || undefined,
    });

    const response = await client.send(command);

    if (!response.Body) {
      return NextResponse.json({ error: 'Object body not found' }, { status: 404 });
    }

    // Convert AWS SDK Stream to Web ReadableStream
    let webStream: ReadableStream;
    if (response.Body instanceof Readable) {
      webStream = Readable.toWeb(response.Body) as ReadableStream;
    } else if (typeof (response.Body as any).transformToWebStream === 'function') {
      webStream = (response.Body as any).transformToWebStream();
    } else {
      webStream = response.Body as unknown as ReadableStream;
    }

    const headers = new Headers();
    headers.set('Content-Type', response.ContentType || defaultMime);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

    if (response.ContentLength !== undefined) {
      headers.set('Content-Length', response.ContentLength.toString());
    }
    if (response.ContentRange) {
      headers.set('Content-Range', response.ContentRange);
    }
    if (response.ETag) {
      headers.set('ETag', response.ETag);
    }

    const status = rangeHeader && response.ContentRange ? 206 : 200;

    return new Response(webStream, {
      status,
      headers,
    });
  } catch (err: any) {
    if (err.name === 'NoSuchKey' || err.$metadata?.httpStatusCode === 404) {
      return NextResponse.json({ error: 'Media not found on R2 storage' }, { status: 404 });
    }
    console.error('R2 Media streaming error:', err);
    return NextResponse.json({ error: err.message || 'Error streaming media' }, { status: 500 });
  }
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const key = pathSegments.map((s) => decodeURIComponent(s)).join('/');
    const { client, bucketName } = getR2Client();

    const ext = key.split('.').pop()?.toLowerCase() || '';
    const defaultMime = MIME_MAP[ext] || 'application/octet-stream';

    const response = await client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );

    const headers = new Headers();
    headers.set('Content-Type', response.ContentType || defaultMime);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');
    if (response.ContentLength !== undefined) {
      headers.set('Content-Length', response.ContentLength.toString());
    }
    if (response.ETag) {
      headers.set('ETag', response.ETag);
    }

    return new Response(null, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
    },
  });
}
