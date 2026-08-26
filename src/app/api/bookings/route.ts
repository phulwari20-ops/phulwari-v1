import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

/** Pull the first integer out of strings like "5th Birthday" -> 5. */
function parseAge(childAge: unknown): number | null {
  if (typeof childAge === 'number' && Number.isFinite(childAge)) return childAge
  if (typeof childAge !== 'string') return null
  const match = childAge.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

/** Accept only a real YYYY-MM-DD date; anything else becomes null. */
function parseEventDate(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null
  const trimmed = value.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null
  return Number.isNaN(new Date(trimmed).getTime()) ? null : trimmed
}

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
  const email = String(body.email ?? '').trim()
  const childName = String(body.childName ?? '').trim()
  const source =
    String(body.source ?? '').trim() || 'User Panel / Birthday Party Celebration'

  if (!parentName || !phone) {
    return NextResponse.json(
      { success: false, error: 'Parent name and phone number are required.' },
      { status: 400 }
    )
  }

  // Extra fields live in `notes` as JSON because the bookings table has no
  // dedicated columns for them.
  const notesJson = {
    guests: String(body.guests ?? ''),
    package_selection: String(body.packageSelection ?? ''),
    requirements: String(body.requirements ?? ''),
    source,
    payment_status: String(body.paymentStatus ?? '') || 'Pending',
  }

  const row = {
    booking_type: source,
    parent_name: parentName,
    phone,
    email,
    child_name: childName || 'N/A',
    child_age: parseAge(body.childAge),
    event_date: parseEventDate(body.eventDate),
    status: String(body.status ?? '') || 'New',
    notes: JSON.stringify(notesJson),
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from('bookings').insert([row]).select()

    if (error) {
      console.error('[api/bookings] insert failed:', error)
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: 502 }
      )
    }

    // Also insert into enquiries table to make it show up in the Lead Manager
    const newEnquiryRow = {
      parent_name: parentName,
      phone: phone,
      email: email,
      child_name: childName || 'N/A',
      program_interested: `Birthday: ${notesJson.package_selection || 'Custom'}`,
      message: `Date: ${row.event_date || 'N/A'} | Age: ${body.childAge || 'N/A'} | Guests: ${notesJson.guests || 'N/A'} | Message: ${notesJson.requirements || 'None'}`,
      source: 'User Panel / Birthday Party Celebration',
      status: 'New'
    }
    const { error: enqErr } = await supabase.from('enquiries').insert([newEnquiryRow])
    if (enqErr) {
      console.warn('⚠️ Could not insert corresponding enquiry row:', enqErr.message)
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    // Reaching here almost always means Supabase credentials are missing.
    const message = error instanceof Error ? error.message : 'Unknown server error'
    console.error('[api/bookings] server error:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
