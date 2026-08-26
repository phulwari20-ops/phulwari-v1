import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: Record<string, unknown>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const parentName = String(body.parentName ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const childName = String(body.childName ?? '').trim()
  const email = String(body.email ?? '').trim()
  const program = String(body.program ?? '').trim() || 'Website Enquiry'
  const message = String(body.message ?? '').trim()

  if (!parentName || !phone) {
    return NextResponse.json(
      { success: false, error: 'Parent name and phone number are required.' },
      { status: 400 }
    )
  }

  const row = {
    date: new Date().toISOString().split('T')[0],
    child_name: childName || 'N/A',
    parent_name: parentName,
    phone,
    email,
    program_interested: program,
    message,
    follow_up_status: String(body.followUpStatus ?? '') || 'Pending',
    status: 'New',
    source: 'Website',
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('enquiries').insert([row]).select()

    if (error) {
      console.error('[api/enquiries] insert failed:', error)
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error'
    console.error('[api/enquiries] server error:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
