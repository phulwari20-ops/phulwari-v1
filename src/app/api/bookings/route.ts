import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      parentName, 
      phone, 
      email, 
      childName, 
      childAge, 
      eventDate, 
      guests, 
      packageSelection, 
      requirements, 
      source,
      paymentStatus,
      status
    } = body

    if (!parentName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    // Store extra fields in notes column as JSON
    const notesJson = {
      guests: guests || '',
      package_selection: packageSelection || '',
      requirements: requirements || '',
      source: source || 'User Panel / Birthday Party Celebration',
      payment_status: paymentStatus || 'Pending'
    }

    // Try parsing childAge to integer if possible, e.g. "5th Birthday" -> 5
    let ageInt: number | null = null;
    if (childAge) {
      const match = childAge.match(/\d+/);
      if (match) {
        ageInt = parseInt(match[0]);
      }
    }

    const { data, error } = await supabase.from('bookings').insert([
      {
        booking_type: source || 'User Panel / Birthday Party Celebration',
        parent_name: parentName,
        phone: phone,
        email: email || '',
        child_name: childName || 'N/A',
        child_age: ageInt,
        event_date: eventDate || null,
        status: status || 'New',
        notes: JSON.stringify(notesJson)
      }
    ]).select()

    if (error) {
      console.error('Error inserting booking:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error: any) {
    console.error('Server error processing booking:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
