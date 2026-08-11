import { NextResponse } from 'next/server';

let sharedPackages = [
  { id: 'p1', name: 'Basic Birthday Package', tagline: 'Perfect for small and cozy celebrations.', price: '₹4,999', includes: 'Celebration Space, Basic Decoration, Music & Entertainment, Fun Activities, Birthday Setup' },
  { id: 'p2', name: 'Premium Birthday Package', tagline: 'Designed for a more memorable and exciting experience.', price: '₹9,999', includes: 'Theme-Based Decoration, Enhanced Activity Setup, Interactive Games, Photo-Friendly Setup' },
  { id: 'p3', name: 'Customized Birthday Package', tagline: 'A fully customized birthday experience, tailored to you.', price: 'Custom Pricing', includes: 'Custom Themes, Personalized Decoration, Special Activities, Flexible Planning Options' }
];

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/party_packages?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return NextResponse.json({ success: true, data }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
    }
  } catch (err) {}

  return NextResponse.json({ success: true, data: sharedPackages }, {
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
    if (Array.isArray(body)) {
      sharedPackages = body;
    }
    return NextResponse.json({ success: true, data: sharedPackages }, {
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

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}
