import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path=request.nextUrl.pathname
  const protectedPaths = ['/profile']
  const token=request.cookies.get('token')?.value || ''

  if(protectedPaths.includes(path) && !token)
  {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next()

}

 
export const config = {
  matcher: ['/','/profile','/login','/signup','/verifyemail'],
}