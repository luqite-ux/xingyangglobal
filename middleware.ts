import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from './lib/admin-session'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (path === '/admin/login' || path.startsWith('/admin/logout')) return NextResponse.next()
  if (path === '/admin' || path.startsWith('/admin/')) {
    const expectedTenant = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
    const hasTenant = Boolean(expectedTenant) && request.cookies.get(TENANT_COOKIE)?.value === expectedTenant
    if (!hasSession || !hasTenant) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
