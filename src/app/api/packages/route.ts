import { NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Packages come exclusively from the admin-managed party_packages table.
// There is no hardcoded fallback — if nothing is published, nothing is returned.
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/party_packages?select=*&is_visible=eq.true&order=name.asc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ success: true, data: Array.isArray(data) ? data : [] }, { headers: CORS_HEADERS });
    }
  } catch (err) {}

  return NextResponse.json({ success: true, data: [] }, { headers: CORS_HEADERS });
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}
