import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { blog_id } = await req.json();
    if (!blog_id) {
      return NextResponse.json({ success: false, error: 'Missing blog_id' }, { status: 400 });
    }

    const supabase = await createClient();
    await supabase.rpc('increment_blog_views', { blog_id });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
