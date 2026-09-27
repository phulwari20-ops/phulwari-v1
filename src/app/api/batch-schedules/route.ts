import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: schedules, error } = await supabase
      .from('batch_schedules')
      .select('*');

    if (error) {
      console.error('[api/batch-schedules] Error fetching schedules:', error);
      return NextResponse.json({
        success: false,
        error: error.message,
        data: [],
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: schedules || [],
    });
  } catch (err: any) {
    console.error('[api/batch-schedules] Server exception:', err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Server error',
        data: [],
      },
      { status: 500 }
    );
  }
}
