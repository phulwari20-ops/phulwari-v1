import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { childName, parentName, phone, program, followUpStatus } = body

    if (!parentName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from('enquiries').insert([
      {
        date: new Date().toISOString().split('T')[0],
        child_details: childName || 'N/A',
        parent_details: parentName,
        phone_number: phone,
        program_interested: program || 'Website Enquiry',
        follow_up_status: followUpStatus || 'Pending',
        status: 'Pending'
      }
    ]).select()

    if (error) {
      console.error('Error inserting enquiry:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error: any) {
    console.error('Server error processing enquiry:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
