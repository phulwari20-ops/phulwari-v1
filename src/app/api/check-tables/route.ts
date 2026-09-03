import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftnbzukwjvgxdnkrvuer.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_GFV9g9M3vPdFlOtFZ_dnEA_bR2Cm0HV';

  const possibleTables = [
    'gallery',
    'gallery_images',
    'gallery_photos',
    'cms_content',
    'banners',
    'photos',
    'images',
    'uploaded_gallery',
    'moments'
  ];

  const results: any = {};

  for (const t of possibleTables) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/${t}?select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        results[t] = { status: res.status, count: data.length, sample: data.slice(0, 3) };
      } else {
        results[t] = { status: res.status, error: res.statusText };
      }
    } catch (e: any) {
      results[t] = { error: e.message };
    }
  }

  return NextResponse.json({ results });
}
