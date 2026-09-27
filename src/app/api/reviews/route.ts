import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('[api/reviews] Error fetching reviews:', error);
      return NextResponse.json({ success: false, data: [] });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    console.error('[api/reviews] Server exception:', err);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author_name, review_date, rating, content, program_tag } = body || {};

    if (!author_name || !content || !rating) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const cleanAuthor = String(author_name).trim();
    const cleanContent = String(content).trim();

    const supabase = await createClient();

    // Check for duplicate submission with the same author and content
    const { data: existing } = await supabase
      .from('reviews')
      .select('*')
      .ilike('author_name', cleanAuthor)
      .eq('content', cleanContent)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ success: true, data: existing, note: 'Review already recorded' });
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          author_name: cleanAuthor,
          review_date: review_date || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
          rating: Number(rating),
          content: cleanContent,
          program_tag: program_tag || 'Phulwari Premium Circle',
          is_verified: true,
        },
      ])
      .select();

    if (error) {
      console.error('[api/reviews] Error posting review:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[api/reviews] Server exception:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

