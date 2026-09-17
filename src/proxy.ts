import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // 1. Permanent (301) Redirect non-WWW (phulwari.co.in) to WWW (www.phulwari.co.in)
  if (host === 'phulwari.co.in') {
    const url = request.nextUrl.clone()
    url.host = 'www.phulwari.co.in'
    url.protocol = 'https'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  // 2. Auth session check for portal routes
  if (request.nextUrl.pathname.startsWith('/portal')) {
    try {
      return await updateSession(request)
    } catch {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files, image optimizations, and public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
}
