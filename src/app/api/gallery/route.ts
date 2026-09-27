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

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
