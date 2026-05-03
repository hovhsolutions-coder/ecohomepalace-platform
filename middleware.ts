import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /board routes
  if (pathname.startsWith('/board')) {
    const founderSession = request.cookies.get('eco_founder_session')

    if (!founderSession || founderSession.value !== 'true') {
      return NextResponse.redirect(new URL('/founder-login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/board/:path*'],
}
