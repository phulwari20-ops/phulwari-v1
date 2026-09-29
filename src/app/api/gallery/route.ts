import { NextResponse } from 'next/server';
import { getSupabaseUrl, getSupabaseKey } from '@/lib/supabase/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbItems: any[] = [];
  try {
    const supabaseUrl = getSupabaseUrl().replace(/\/+$/, '');
    const supabaseKey = getSupabaseKey();

    const res = await fetch(`${supabaseUrl}/rest/v1/gallery?select=*&order=sort_order.asc,created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      dbItems = Array.isArray(data) ? data.map((item: any) => ({
        ...item,
        url: item.image_url || item.url
      })) : [];
    }
  } catch (err) {
    console.error('Error in /api/gallery GET:', err);
  }


  return NextResponse.json({
    success: true,
    count: dbItems.length,
    data: dbItems
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    if (!rawBody.image_url) {
      return NextResponse.json({ success: false, error: 'image_url is required' }, { status: 400 });
    }

    const payload = {
      image_url: rawBody.image_url,
      title: (rawBody.title || 'Phulwari Activity Photo').trim(),
      category: rawBody.category || 'Activities',
      sort_order: Number.isInteger(rawBody.sort_order) ? rawBody.sort_order : 0,
      created_at: new Date().toISOString()
    };

    const supabaseUrl = getSupabaseUrl().replace(/\/+$/, '');
    const supabaseKey = getSupabaseKey();

    const res = await fetch(`${supabaseUrl}/rest/v1/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ success: false, error: errText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const imageUrl = searchParams.get('image_url');

    const supabaseUrl = getSupabaseUrl().replace(/\/+$/, '');
    const supabaseKey = getSupabaseKey();

    const query = id ? `id=eq.${encodeURIComponent(id)}` : imageUrl ? `image_url=eq.${encodeURIComponent(imageUrl)}` : '';
    if (!query) {
      return NextResponse.json({ success: false, error: 'id or image_url is required' }, { status: 400 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/gallery?${query}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      }
    });

    return NextResponse.json({ success: res.ok });
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
