import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const [{ data: batches, error: batchErr }, { data: schedules, error: schErr }] = await Promise.all([
      supabase.from('batches').select('*').neq('is_visible', false).order('created_at', { ascending: true }),
      supabase.from('batch_schedules').select('*'),
    ]);

    if (batchErr) {
      console.error('[api/batches] Error fetching batches:', batchErr);
    }
    if (schErr) {
      console.error('[api/batches] Error fetching schedules:', schErr);
    }

    return NextResponse.json(
      {
        success: !batchErr,
        data: batches || [],
        schedules: schedules || [],
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'public, max-age=3600',
        },
      }
    );
  } catch (err: any) {
    console.error('[api/batches] Server exception:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Server error',
        data: [],
        schedules: [],
      },
      { status: 500 }
    );
  }
}
