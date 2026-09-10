import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const position = searchParams.get('position');

    const supabase = await createClient();
    let query = supabase.from('banners').select('*').eq('status', 'active').order('priority', { ascending: true });

    if (position) {
      query = query.eq('display_position', position);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[api/banners] Error fetching banners:', error);
      return NextResponse.json({ success: false, data: [] }, { status: 500 });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const activeList = (data || []).filter((b: any) => {
      if (b.start_date && b.start_date > todayStr) return false;
      if (b.end_date && b.end_date < todayStr) return false;
      return true;
    });

    return NextResponse.json({
      success: true,
      data: activeList,
    });
  } catch (err: any) {
    console.error('[api/banners] Server exception:', err);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id } = body || {};

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing banner ID' }, { status: 400 });
    }

    const supabase = await createClient();

    if (action === 'click') {
      const { data: banner } = await supabase.from('banners').select('clicks').eq('id', id).single();
      const currentClicks = banner?.clicks || 0;
      await supabase.from('banners').update({ clicks: currentClicks + 1 }).eq('id', id);
    } else if (action === 'impression') {
      const { data: banner } = await supabase.from('banners').select('impressions').eq('id', id).single();
      const currentImpressions = banner?.impressions || 0;
      await supabase.from('banners').update({ impressions: currentImpressions + 1 }).eq('id', id);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
