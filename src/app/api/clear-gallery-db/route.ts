import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ftnbzukwjvgxdnkrvuer.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_GFV9g9M3vPdFlOtFZ_dnEA_bR2Cm0HV';

  const results: any[] = [];
  const endpoints = [
    `${supabaseUrl}/rest/v1/gallery?image_url=like.%25galary%25`,
    `${supabaseUrl}/rest/v1/gallery?image_url=like.%25webp%25`,
    `${supabaseUrl}/rest/v1/gallery?title=neq.__________`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });
      const data = await res.json().catch(() => null);
      results.push({ url, status: res.status, deletedCount: Array.isArray(data) ? data.length : 0, data });
    } catch (err: any) {
      results.push({ url, error: err.message });
    }
  }

  return NextResponse.json({ results });
}
