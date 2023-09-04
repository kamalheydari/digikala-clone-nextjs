import { type NextRequest, NextResponse } from 'next/server'
import { userToken, verifyAuth } from 'utils'

const generateRewritedUrl = (url: string, req: NextRequest): URL => {
  const newUrl = new URL(url, req.url)
  newUrl.searchParams.set('redirectTo', req.nextUrl.pathname)

  return newUrl
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/admin/:path*',
    '/api/:path*',
    '/checkout/shipping',
  ],
}

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)

  const token = req.cookies.get(userToken)?.value

  const verifiedToken = token ? await verifyAuth(token) : null

  if (token && verifiedToken) {
    const userId = verifiedToken.id.toString()
    const userRole = verifiedToken.role.toString()

    requestHeaders.set('user-id', userId)
    requestHeaders.set('user-role', userRole)

    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      verifiedToken.role === 'user'
    ) {
      const rewritedUrl = generateRewritedUrl(
        '/admin/authentication/login',
        req
      )

      return NextResponse.rewrite(rewritedUrl)
    }
  } else {
    if (req.nextUrl.pathname === '/api/auth/user')
      return NextResponse.json(
        { error: 'کاربر وارد نشده است' },
        { status: 401 }
      )

    if (
      req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname === '/checkout/shipping'
    ) {
      const rewritedUrl = generateRewritedUrl('/authentication/login', req)

      return NextResponse.rewrite(rewritedUrl)
    }

    if (req.nextUrl.pathname.startsWith('/admin')) {
      const rewritedUrl = generateRewritedUrl(
        '/admin/authentication/login',
        req
      )

      return NextResponse.rewrite(rewritedUrl)
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
