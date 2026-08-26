import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_FILE = path.join(process.cwd(), 'public', 'uploaded_gallery.json');

function getLocalGallery() {
  try {
    if (fs.existsSync(GALLERY_FILE)) {
      const data = fs.readFileSync(GALLERY_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {}
  return [];
}

function saveLocalGallery(data: any[]) {
  try {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {}
}

export async function GET() {
  const localItems: any[] = getLocalGallery();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  let dbItems: any[] = [];
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/gallery?select=*&order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      dbItems = data.map((item: any) => ({
        ...item,
        url: item.image_url || item.url
      }));
    }
  } catch (err) {}

  // Merge dbItems and localItems uniquely
  const mergedMap = new Map();
  dbItems.forEach((item: any) => mergedMap.set(item.id || item.url, item));
  localItems.forEach((item: any) => mergedMap.set(item.id || item.url, item));

  const finalItems = Array.from(mergedMap.values());

  return NextResponse.json({
    success: true,
    count: finalItems.length,
    data: finalItems
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const existing = getLocalGallery();
    const updated = [body, ...existing.filter((item: any) => item.id !== body.id)];
    saveLocalGallery(updated);

    return NextResponse.json({ success: true, data: updated }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id, url } = await request.json();
    const existing = getLocalGallery();
    const updated = existing.filter((item: any) => item.id !== id && item.url !== url);
    saveLocalGallery(updated);

    return NextResponse.json({ success: true, data: updated }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
