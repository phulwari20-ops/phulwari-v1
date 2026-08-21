import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getSupabaseKey, getSupabaseUrl } from './env'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  try {
    createServerClient(getSupabaseUrl(), getSupabaseKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    })

    // Session refresh is intentionally not awaited here — public pages must not
    // block on an auth round-trip. Portal auth is enforced page-side.
  } catch {
    // Never let middleware take the whole site down.
  }

  return supabaseResponse
}
