import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // موقتاً همه مسیرها را اجازه دهید (برای تست)
  return NextResponse.next()
  
  // کد اصلی middleware (غیرفعال شده):
  /*
  const token = request.cookies.get('admin_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  const publicRoutes = ['/login', '/unauthorized']
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
