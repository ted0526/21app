import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // this reads & refreshes any Supabase auth cookies into `res`
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}

// run on ALL routes (including /api/*), except _next/static, .vercel, etc.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
